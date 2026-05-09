using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Linq;
using System.IO;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System.Data;

namespace backend.Services;

public partial class AccomplishmentReportService : IAccomplishmentReportService
{
    private readonly ApplicationDbContext _db;
    private readonly UserManager<ApplicationUser> _userManager;

    public AccomplishmentReportService(ApplicationDbContext db, UserManager<ApplicationUser> userManager)
    {
        _db = db;
        _userManager = userManager;
    }
    /// <summary>
    /// Retrieves all non-deleted accomplishment reports for a specific user.
    /// </summary>
    /// <param name="userId">The ID of the user whose reports to fetch.</param>
    /// <returns>A collection of accomplishment reports.</returns>
    public async Task<IEnumerable<AccomplishmentReport>> GetByUserAsync(string userId)
    {
        var reports = await _db.AccomplishmentReports.AsNoTracking()
            .Where(r => r.UserId == userId && !r.IsDeleted)
            .OrderByDescending(r => r.Date)
            .ToListAsync();

        var teamName = await GetApproverTeamNameAsync(userId);

        return reports.Select(r => new AccomplishmentReport
        {
            ReportId = r.ReportId,
            UserId = r.UserId,
            Date = r.Date,
            Title = r.Title,
            Tasks = r.Tasks,
            Status = r.Status,
            ReceiverId = r.ReceiverId,
            ViewerId = r.ViewerId,
            FeedbackHistory = r.FeedbackHistory,
            ReturnedById = r.ReturnedById,
            CreatedAt = r.CreatedAt,
            BreakStartTime = r.BreakStartTime,
            BreakEndTime = r.BreakEndTime,
            BreakDurationMinutes = r.BreakDurationMinutes,
            ApproverTeam = teamName
        });
    }

    private async Task<string> GetApproverTeamNameAsync(string userId)
    {
        // 1. Check associative membership table first
        var teamMembership = await _db.ApprovalTeamMembers
            .AsNoTracking()
            .Include(m => m.ApprovalTeam)
            .FirstOrDefaultAsync(m => m.UserId == userId);

        if (teamMembership?.ApprovalTeam != null)
        {
            return teamMembership.ApprovalTeam.Name;
        }

        // 2. Fallback to direct user profile link
        var user = await _userManager.Users
            .AsNoTracking()
            .Include(u => u.ApprovalTeam)
            .FirstOrDefaultAsync(u => u.Id == userId);

        return user?.ApprovalTeam?.Name ?? "No Team Assigned";
    }

    /// <summary>
    /// Retrieves a single report and groups it with owner information for the review UI.
    /// </summary>
    /// <param name="id">The ID of the report to retrieve.</param>
    /// <returns>A grouped report object or null if not found.</returns>
    public async Task<object?> GetGroupedReportByIdAsync(int id)
    {
        var report = await _db.AccomplishmentReports.AsNoTracking().FirstOrDefaultAsync(r => r.ReportId == id && !r.IsDeleted);
        if (report == null) return null;

        var owner = await _userManager.FindByIdAsync(report.UserId!);
        if (owner == null) return null;

        return await BuildReviewGroupItemAsync(new List<AccomplishmentReport> { report }, owner);
    }

    /// <summary>
    /// Retrieves a single accomplishment report by its unique ID.
    /// </summary>
    /// <param name="id">The ID of the report.</param>
    /// <returns>The report object or null if not found/deleted.</returns>
    public async Task<AccomplishmentReport?> GetByIdAsync(int id)
    {
        var r = await _db.AccomplishmentReports.FindAsync(id);
        if (r == null || r.IsDeleted) return null;

        var owner = await _userManager.Users.Include(u => u.ApprovalTeam).FirstOrDefaultAsync(u => u.Id == r.UserId);

        return new AccomplishmentReport
        {
            ReportId = r.ReportId,
            UserId = r.UserId,
            Date = r.Date,
            Title = r.Title,
            Tasks = r.Tasks,
            Status = r.Status,
            ReceiverId = r.ReceiverId,
            ViewerId = r.ViewerId,
            FeedbackHistory = r.FeedbackHistory,
            ReturnedById = r.ReturnedById,
            ReturnedByName = r.ReturnedByName,
            ApprovedById = r.ApprovedById,
            ApprovedByName = r.ApprovedByName,
            CreatedAt = r.CreatedAt,
            BreakStartTime = r.BreakStartTime,
            BreakEndTime = r.BreakEndTime,
            BreakDurationMinutes = r.BreakDurationMinutes,
            IsModifiedByAdmin = r.IsModifiedByAdmin,
            ApproverTeam = await GetApproverTeamNameAsync(r.UserId!)
        };
    }

    /// <summary>
    /// Creates a new accomplishment report and automatically routes it to the appropriate reviewer.
    /// </summary>
    /// <param name="report">The report data to save.</param>
    /// <returns>The created report with assigned IDs and metadata.</returns>
    public async Task<AccomplishmentReport> CreateAsync(AccomplishmentReport report)
    {
        var exp = new AccomplishmentReport
        {
            UserId = report.UserId,
            Date = report.Date,
            Title = report.Title,
            Tasks = report.Tasks,
            Status = report.Status ?? "Pending",
            ReceiverId = report.ReceiverId,
            ViewerId = report.ViewerId,
            FeedbackHistory = report.FeedbackHistory ?? new List<ARFeedback>(),
            ReturnedById = report.ReturnedById,
            ReturnedByName = report.ReturnedByName,
            ApprovedById = report.ApprovedById,
            ApprovedByName = report.ApprovedByName,
            IdempotencyKey = report.IdempotencyKey,
            CreatedAt = DateTime.UtcNow,
            BreakStartTime = report.BreakStartTime,
            BreakEndTime = report.BreakEndTime,
            BreakDurationMinutes = report.BreakDurationMinutes
        };

        // --- SEQUENTIAL APPROVAL ROUTING (PHASE 18) ---
        await ResolveReportRoutingAsync(exp);

        _db.AccomplishmentReports.Add(exp);
        await _db.SaveChangesAsync();
        
        // Sync return object
        report.ReportId = exp.ReportId;
        report.ReceiverId = exp.ReceiverId;
        report.ViewerId = exp.ViewerId;
        report.CurrentApproverId = exp.CurrentApproverId;
        report.CurrentApprovalStage = exp.CurrentApprovalStage;

        return report;
    }

    /// <summary>
    /// Updates the core fields of an existing accomplishment report.
    /// </summary>
    /// <param name="report">The report object with updated values.</param>
    /// <returns>True if the update was successful, false if the report was not found.</returns>
    public async Task<bool> UpdateAsync(AccomplishmentReport report)
    {
        var existing = await _db.AccomplishmentReports.FindAsync(report.ReportId);
        if (existing == null) return false;

        var wasDraft = existing.Status == "Draft" || existing.Status == "Returned" || existing.Status == "Returned_Draft";
        var isSubmitting = report.Status == "Pending";

        existing.Date = report.Date;
        existing.Title = report.Title;
        existing.Tasks = report.Tasks;
        existing.Status = report.Status;
        existing.BreakStartTime = report.BreakStartTime;
        existing.BreakEndTime = report.BreakEndTime;
        existing.BreakDurationMinutes = report.BreakDurationMinutes;

        // If transitioning from draft/returned to pending, resolve routing
        if (wasDraft && isSubmitting)
        {
            await ResolveReportRoutingAsync(existing);
        }
        else
        {
            existing.ReceiverId = report.ReceiverId;
            existing.ViewerId = report.ViewerId;
        }

        await _db.SaveChangesAsync();
        return true;
    }

    private async Task ResolveReportRoutingAsync(AccomplishmentReport exp)
    {
        // 0. Get user details
        var owner = await _userManager.Users
            .Include(u => u.ApprovalTeam)
            .FirstOrDefaultAsync(u => u.Id == exp.UserId);

        // 1. Find the user's team membership (Associative Table)
        var teamMembership = await _db.ApprovalTeamMembers
            .AsNoTracking()
            .Include(m => m.ApprovalTeam)
                .ThenInclude(t => t!.Approvers)
                    .ThenInclude(a => a.User)
            .FirstOrDefaultAsync(m => m.UserId == exp.UserId);

        var team = teamMembership?.ApprovalTeam;

        // 2. Fallback to legacy direct ApprovalTeamId if no associative membership exists yet
        if (team == null && owner?.ApprovalTeam != null)
        {
            team = await _db.ApprovalTeams
                .Include(t => t.Approvers)
                    .ThenInclude(a => a.User)
                .FirstOrDefaultAsync(t => t.Id == owner.ApprovalTeamId);
        }

        if (team != null && team.Approvers.Any())
        {
            exp.ApprovalFlowSnapshot = team.Approvers
                .OrderBy(a => a.Order)
                .Select(a => new ApproverConfig
                {
                    UserId = a.UserId,
                    UserName = a.User?.FullName ?? "Unknown",
                    Order = a.Order
                })
                .ToList();
            exp.CurrentApprovalStage = 1;

            var firstApprover = exp.ApprovalFlowSnapshot.First();
            exp.CurrentApproverId = firstApprover.UserId;
            exp.ReceiverId = firstApprover.UserId;
        }
        else
        {
            if (exp.Status == "Pending")
            {
                throw new InvalidOperationException("You cannot submit a report because you are not assigned to an active Approval Team. Please contact your supervisor.");
            }

            if (string.IsNullOrEmpty(exp.ReceiverId))
            {
                if (!string.IsNullOrEmpty(owner?.SupervisorId))
                {
                    exp.ReceiverId = owner.SupervisorId;
                }
                else
                {
                    exp.ReceiverId = await FindDepartmentApproverAsync(owner?.Department);
                }

                if (string.IsNullOrEmpty(exp.ReceiverId))
                {
                    exp.ReceiverId = await FindMiddleManagementIdAsync();
                }

                if (string.IsNullOrEmpty(exp.ReceiverId))
                {
                    var admins = await _userManager.GetUsersInRoleAsync("SuperAdmin");
                    exp.ReceiverId = admins.FirstOrDefault()?.Id;
                }
            }
            exp.CurrentApproverId = exp.ReceiverId;
        }

        if (string.IsNullOrEmpty(exp.ViewerId))
        {
            exp.ViewerId = await FindGlobalManagementAsync();
        }
    }

    /// <summary>
    /// Soft-deletes an accomplishment report by marking it as deleted in the database.
    /// </summary>
    /// <param name="id">The ID of the report to delete.</param>
    /// <param name="deletedByUserId">The ID of the user performing the deletion.</param>
    /// <returns>True if deletion was successful.</returns>
    public async Task<bool> DeleteAsync(int id, string deletedByUserId)
    {
        var existing = await _db.AccomplishmentReports.FindAsync(id);
        if (existing == null) return false;

        existing.IsDeleted = true;
        await _db.SaveChangesAsync();
        return true;
    }

    /// <summary>
    /// Updates a report's tasks, metadata, and status based on grouped review DTOs.
    /// </summary>
    /// <param name="reportId">The ID of the report to update.</param>
    /// <param name="updateData">The DTO containing updated accomplishments and metadata.</param>
    /// <param name="isAdminCorrection">Whether this update is an administrative override.</param>
    public async Task UpdateGroupedReportAsync(int reportId, object updateData, bool isAdminCorrection = false)
    {
        var existing = await _db.AccomplishmentReports.FindAsync(reportId);

        if (existing == null) throw new Exception("Report not found");

        var json = System.Text.Json.JsonSerializer.Serialize(updateData);
        var dto = System.Text.Json.JsonSerializer.Deserialize<GroupedUpdateDto>(json, new System.Text.Json.JsonSerializerOptions { PropertyNameCaseInsensitive = true });

        if (dto == null) throw new Exception("Invalid update data");

        // Determine the underlying target status for the DB
        var targetStatus = string.IsNullOrWhiteSpace(dto.Status) ? "Pending" : dto.Status;

        var newTasks = dto.Accomplishments.Select(item =>
        {
            if (string.IsNullOrWhiteSpace(item.StartTime) || string.IsNullOrWhiteSpace(item.EndTime))
            {
                throw new Exception("All task rows must have a valid Start Time and End Time.");
            }

            return new ARTask
            {
                Client = item.Client ?? "",
                TaskName = item.TaskName ?? "",
                Particulars = item.Particulars ?? "",
                StartTime = TimeOnly.Parse(item.StartTime),
                EndTime = TimeOnly.Parse(item.EndTime)
            };
        }).ToList();

        // SUBMITTING OR NORMAL DRAFT
        // Update the main Tasks and Title
        existing.Tasks = newTasks;
        existing.Title = dto.Title;
        existing.Status = targetStatus;
        existing.Date = DateOnly.FromDateTime(dto.Date);
        existing.BreakStartTime = !string.IsNullOrEmpty(dto.BreakStartTime) ? TimeOnly.Parse(dto.BreakStartTime) : null;
        existing.BreakEndTime = !string.IsNullOrEmpty(dto.BreakEndTime) ? TimeOnly.Parse(dto.BreakEndTime) : null;
        existing.BreakDurationMinutes = dto.BreakDurationMinutes;

        if (isAdminCorrection)
        {
            existing.IsModifiedByAdmin = true;
        }

        // --- SEQUENTIAL APPROVAL ROUTING (PHASE 21 REFINEMENT) ---
        bool isSubmitting = targetStatus.Equals("Pending", StringComparison.OrdinalIgnoreCase) && 
                           (existing.Status == "Draft" || existing.Status == "Returned" || existing.Status == "Returned_Draft" || string.IsNullOrEmpty(existing.Status));

        if (isSubmitting)
        {
            var owner = await _userManager.Users
                .Include(u => u.ApprovalTeam)
                .FirstOrDefaultAsync(u => u.Id == existing.UserId);

            // Find the user's team membership
            var teamMembership = await _db.ApprovalTeamMembers
                .AsNoTracking()
                .Include(m => m.ApprovalTeam)
                    .ThenInclude(t => t!.Approvers)
                        .ThenInclude(a => a.User)
                .FirstOrDefaultAsync(m => m.UserId == existing.UserId);

            var team = teamMembership?.ApprovalTeam;

            // Fallback to legacy direct link
            if (team == null && owner?.ApprovalTeam != null)
            {
                team = await _db.ApprovalTeams
                    .Include(t => t.Approvers)
                        .ThenInclude(a => a.User)
                    .FirstOrDefaultAsync(t => t.Id == owner.ApprovalTeamId);
            }

            if (team != null && team.Approvers.Any())
            {
                existing.ApprovalFlowSnapshot = team.Approvers
                    .OrderBy(a => a.Order)
                    .Select(a => new ApproverConfig 
                    { 
                        UserId = a.UserId, 
                        UserName = a.User?.FullName ?? "Unknown", 
                        Order = a.Order 
                    })
                    .ToList();
                existing.CurrentApprovalStage = 1;
                
                var firstApprover = existing.ApprovalFlowSnapshot.First();
                existing.CurrentApproverId = firstApprover.UserId;
                existing.ReceiverId = firstApprover.UserId; 
            }
            else
            {
                // Fallback to legacy routing if no team
                if (string.IsNullOrEmpty(existing.ReceiverId))
                {
                    if (!string.IsNullOrEmpty(owner?.SupervisorId))
                        existing.ReceiverId = owner.SupervisorId;
                    else
                        existing.ReceiverId = await FindDepartmentApproverAsync(owner?.Department);

                    if (string.IsNullOrEmpty(existing.ReceiverId))
                        existing.ReceiverId = await FindMiddleManagementIdAsync();

                    if (string.IsNullOrEmpty(existing.ReceiverId))
                    {
                        var admins = await _userManager.GetUsersInRoleAsync("SuperAdmin");
                        existing.ReceiverId = admins.FirstOrDefault()?.Id;
                    }
                }
                existing.CurrentApproverId = existing.ReceiverId;
            }
        }
        else
        {
            existing.ReceiverId = dto.ReceiverId ?? existing.ReceiverId;
        }

        existing.ViewerId = dto.ViewerId ?? existing.ViewerId;

        await _db.SaveChangesAsync();
        // Notifications removed - users will refresh manually
    }

    /// <summary>
    /// Updates the review status (Approved/Returned) of a report and handles feedback history.
    /// </summary>
    /// <param name="reportId">The ID of the report.</param>
    /// <param name="status">The new status string.</param>
    /// <param name="returnFeedback">Optional feedback if the report is returned.</param>
    /// <param name="reviewerId">The ID of the reviewer performing the action.</param>
    public async Task UpdateGroupedReportStatusAsync(int reportId, string status, string? returnFeedback = null, string? reviewerId = null)
    {
        var report = await _db.AccomplishmentReports.FindAsync(reportId);

        if (report == null) throw new Exception("Report not found");

        // PHASE 4: Authorization Guard
        if (!string.IsNullOrEmpty(reviewerId))
        {
            var reviewer = await _userManager.FindByIdAsync(reviewerId);
            if (reviewer != null)
            {
                var roles = await _userManager.GetRolesAsync(reviewer);
                var isAdmin = roles.Contains("SuperAdmin");

                if (!isAdmin)
                {
                    // 1. Must have the 'Approver' role
                    var isApprover = await IsApproverAsync(reviewer);
                    var isManagement = await IsManagementAsync(reviewer);

                    // 2. Must be in the same department as the report owner (unless they have global management oversight)
                    var owner = await _userManager.FindByIdAsync(report.UserId!);
                    var isInSameDept = owner?.Department == reviewer.Department;

                    // Role Logic:
                    // - If they have BOTH Viewer + Approver roles -> Global Approval Authority (Super Management)
                    // - If they have ONLY Approver role -> Departmental Approval Authority (Team Lead)
                    // - If they have ONLY Viewer role -> Read-only Oversight (Higher Management)
                    bool hasGlobalApproval = isApprover && isManagement;
                    bool hasDeptApproval = isApprover && isInSameDept;

                    if (!hasGlobalApproval && !hasDeptApproval)
                    {
                        throw new UnauthorizedAccessException("Unauthorized: Only department leads or Management with approval claims can approve/return reports.");
                    }
                }
            }
        }

        bool isReturned = status.Equals("Returned", StringComparison.OrdinalIgnoreCase);
        bool isApproved = status.Equals("Approved", StringComparison.OrdinalIgnoreCase);

        // Resubmission Guard: If report is currently Returned, it cannot be Approved until resubmitted (Pending)
        if (isApproved && (report.Status?.Equals("Returned", StringComparison.OrdinalIgnoreCase) ?? false))
        {
            throw new Exception("Returned reports must be resubmitted by the employee before they can be approved.");
        }

        report.Status = status;

        if (isApproved || isReturned)
        {
            var reviewer = !string.IsNullOrEmpty(reviewerId) ? await _userManager.FindByIdAsync(reviewerId) : null;
            var reviewerName = reviewer?.FullName ?? reviewer?.UserName ?? "Reviewer";

            if (isApproved)
            {
                // PARALLEL APPROVAL (First-Responder Wins)
                // Any approval from an authorized team approver fully approves the report.
                // Sequential stages are dropped. The "Order" in Team Setup merely denotes Primary vs Backup.
                
                report.Status = "Approved";
                report.ApprovedById = reviewerId;
                report.ApprovedByName = reviewerName;
                report.CurrentApproverId = null;
                report.ReturnedById = null;
                report.ReturnedByName = null;
                report.CurrentApprovalStage = 0; // Reset stage as it is no longer sequential
                
                var history = report.FeedbackHistory.ToList();
                history.Add(new ARFeedback
                {
                    Message = $"Approved by {reviewerName}.",
                    AuthorId = reviewerId,
                    AuthorName = reviewerName,
                    Timestamp = DateTime.UtcNow,
                    Action = "Approved"
                });
                report.FeedbackHistory = history;
            }
            else if (isReturned)
            {
                report.Status = "Returned";
                report.CurrentApprovalStage = 0;
                report.CurrentApproverId = null;
                report.ReturnedById = reviewerId;
                report.ReturnedByName = reviewerName;
                report.ApprovedById = null;
                report.ApprovedByName = null;

                if (!string.IsNullOrWhiteSpace(returnFeedback))
                {
                    var history = report.FeedbackHistory.ToList();
                    history.Add(new ARFeedback
                    {
                        Message = returnFeedback,
                        AuthorId = reviewerId,
                        AuthorName = reviewerName,
                        Timestamp = DateTime.UtcNow,
                        Action = "Returned"
                    });
                    report.FeedbackHistory = history;
                }
            }
        }
        else
        {
            // If status is changed back to Pending or something else
            report.ApprovedById = null;
            report.ApprovedByName = null;
            report.ReturnedById = null;
            report.ReturnedByName = null;
        }

        await _db.SaveChangesAsync();
        // Notifications removed - users will refresh manually
    }

    /// <summary>
    /// Marks a report as viewed by a Viewer role user (first-open only).
    /// Subsequent opens by any user do NOT overwrite the original viewer stamp.
    /// </summary>
    public async Task<bool> MarkViewedAsync(int reportId, string viewerUserId)
    {
        var report = await _db.AccomplishmentReports.FirstOrDefaultAsync(r => r.ReportId == reportId && !r.IsDeleted);
        if (report == null) return false;

        // First-view only — never overwrite
        if (report.ViewedAt.HasValue) return false;

        var viewer = await _userManager.FindByIdAsync(viewerUserId);
        if (viewer == null) return false;

        report.ViewedAt = DateTime.UtcNow;
        report.ViewedById = viewerUserId;
        report.ViewedByName = viewer.FullName ?? viewer.UserName ?? "Viewer";

        await _db.SaveChangesAsync();
        // Notifications removed - users will refresh manually
        return true;
    }

    /// <summary>
    /// Internal DTO for grouped updates.
    /// </summary>
    private class GroupedUpdateDto
    {
        public string Title { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string Status { get; set; } = string.Empty;
        public string? ReturnFeedback { get; set; }
        public string? ReceiverId { get; set; }
        public string? ViewerId { get; set; }
        public string? BreakStartTime { get; set; }
        public string? BreakEndTime { get; set; }
        public int BreakDurationMinutes { get; set; }
        public List<AccomplishmentEntryDto> Accomplishments { get; set; } = new();
    }

    /// <summary>
    /// Internal DTO for individual accomplishment entries.
    /// </summary>
    private class AccomplishmentEntryDto
    {
        public string Client { get; set; } = string.Empty;
        public string TaskName { get; set; } = string.Empty;
        public string Particulars { get; set; } = string.Empty;
        public string StartTime { get; set; } = string.Empty;
        public string EndTime { get; set; } = string.Empty;
    }

    /// <summary>
    /// Finds a report by its idempotency key to prevent duplicate submissions.
    /// </summary>
    /// <param name="idempotencyKey">The unique submission key.</param>
    /// <returns>The report if found, otherwise null.</returns>
    public async Task<AccomplishmentReport?> FindByIdempotencyKeyAsync(Guid idempotencyKey)
    {
        return await _db.AccomplishmentReports
            .AsNoTracking()
            .FirstOrDefaultAsync(r => r.IdempotencyKey == idempotencyKey && !r.IsDeleted);
    }
}
