using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using OfficeOpenXml;
using OfficeOpenXml.Style;

namespace backend.Services;

public partial class AccomplishmentReportService
{
    /// <summary>
    /// Utility: Calculates the total hours between two time points.
    /// Used for DTR and accomplishment tracking.
    /// </summary>
    private static double CalculateHours(TimeOnly start, TimeOnly end)
    {
        var startSpan = start.ToTimeSpan();
        var endSpan = end.ToTimeSpan();
        var duration = endSpan - startSpan;
        if (duration.TotalMinutes < 0) return 0; 
        return Math.Round(duration.TotalHours, 2);
    }

    /// <summary>
    /// Fetches dashboard statistics for both personal and oversight views.
    /// Aggregates counts for Pending, Approved, Returned, and Draft reports.
    /// </summary>
    /// <param name="userId">The ID of the user requesting stats.</param>
    /// <returns>A DashboardDto containing categorized report counts and pending actions.</returns>
    public async Task<backend.DTOs.DashboardDto> GetDashboardStatsAsync(string userId, string? range = null)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) throw new System.Exception("User not found");

        var today = DateOnly.FromDateTime(DateTime.Today);
        DateOnly? startDate = null;

        // Resolve Date Range
        if (!string.IsNullOrEmpty(range))
        {
            var r = range.ToLowerInvariant();
            if (r == "today") startDate = today;
            else if (r == "week")
            {
                // Start of current week (Monday)
                int diff = (7 + (DateTime.Today.DayOfWeek - DayOfWeek.Monday)) % 7;
                startDate = DateOnly.FromDateTime(DateTime.Today.AddDays(-1 * diff));
            }
            else if (r == "month")
            {
                // Start of current month
                startDate = new DateOnly(DateTime.Today.Year, DateTime.Today.Month, 1);
            }
        }

        var personalQuery = _db.AccomplishmentReports.Where(r => r.UserId == userId && !r.IsDeleted);
        if (startDate.HasValue)
        {
            personalQuery = personalQuery.Where(r => r.Date >= startDate.Value);
        }

        var dashboard = new backend.DTOs.DashboardDto
        {
            Personal = new backend.DTOs.PersonalStatsDto
            {
                TotalSubmitted = await personalQuery.CountAsync(r => r.Status != "Draft"),
                Pending = await personalQuery.CountAsync(r => r.Status == "Pending"),
                Approved = await personalQuery.CountAsync(r => r.Status == "Approved"),
                Returned = await personalQuery.CountAsync(r => r.Status == "Returned" || r.Status == "Returned_Draft"),
                Draft = await personalQuery.CountAsync(r => r.Status == "Draft")
            }
        };

        var roles = await _userManager.GetRolesAsync(user);
        var isAdmin = roles.Contains("SuperAdmin");
        var isViewer = roles.Contains("Viewer");
        var isApprover = roles.Contains("Approver");


        if (isAdmin || isApprover || isViewer)
        {
            bool hasGlobalAccess = isAdmin || isViewer;

            // Base query for team-wide reports
            IQueryable<AccomplishmentReport> teamQuery = _db.AccomplishmentReports
                .AsNoTracking()
                .Where(r => !r.IsDeleted && r.Status != "Draft" && r.UserId != userId);

            if (startDate.HasValue)
            {
                teamQuery = teamQuery.Where(r => r.Date >= startDate.Value);
            }

            List<string> overseenUserIds = new List<string>();
            if (!isAdmin)
            {
                // Scoped oversight for Approvers and Viewers: See only reports from users in teams you manage
                overseenUserIds = await _db.ApprovalTeamMembers
                    .Where(m => _db.ApprovalTeamApprovers.Any(a => a.ApprovalTeamId == m.ApprovalTeamId && a.UserId == userId))
                    .Select(m => m.UserId)
                    .Distinct()
                    .ToListAsync();

                var overseenUserIdsLower = overseenUserIds.Select(id => id.ToLowerInvariant()).ToList();

                teamQuery = teamQuery.Where(r => 
                    (!string.IsNullOrEmpty(r.UserId) && overseenUserIdsLower.Contains(r.UserId.ToLower())) || 
                    (r.CurrentApproverId != null && r.CurrentApproverId.ToLower() == userId.ToLowerInvariant()));
            }

            var allTeamReports = await teamQuery.ToListAsync();
            var todayReports = allTeamReports.Where(r =>
                r.Date == today || DateOnly.FromDateTime(r.CreatedAt) == today).ToList();

            var actionQueueQuery = teamQuery.Where(r => r.Status == "Pending");
            
            var pendingQueue = await (from r in actionQueueQuery
                                     join u in _db.Users on r.UserId equals u.Id
                                     where !u.IsDeleted
                                     orderby r.CreatedAt descending
                                     select new { Report = r, User = u })
                                    .Take(5)
                                    .ToListAsync();

            var pendingActions = pendingQueue.Select(q => new backend.DTOs.PendingActionDto
            {
                Id = q.Report.ReportId,
                EmployeeName = q.User.FullName ?? "Unknown",
                Date = q.Report.Date.ToString("yyyy-MM-dd"),
                Status = q.Report.Status ?? "Pending",
                Position = q.User.Position ?? "Employee"
            }).ToList();

            // --- Team Breakdown Calculation ---
            var managedTeams = await (from a in _db.ApprovalTeamApprovers
                                      where a.UserId == userId
                                      join t in _db.ApprovalTeams on a.ApprovalTeamId equals t.Id
                                      select new { t.Id, t.Name }).ToListAsync();

            var teamBreakdowns = new List<backend.DTOs.TeamBreakdownDto>();
            if (managedTeams.Count > 0)
            {
                var allTeamIds = managedTeams.Select(t => t.Id).ToList();
                var members = await _db.ApprovalTeamMembers
                    .Where(m => m.ApprovalTeamId.HasValue && allTeamIds.Contains(m.ApprovalTeamId.Value))
                    .ToListAsync();

                foreach (var team in managedTeams)
                {
                    var teamMemberIds = members.Where(m => m.ApprovalTeamId == team.Id).Select(m => m.UserId).ToList();
                    var teamReports = allTeamReports.Where(r => r.UserId != null && teamMemberIds.Contains(r.UserId)).ToList();

                    teamBreakdowns.Add(new backend.DTOs.TeamBreakdownDto
                    {
                        TeamName = team.Name,
                        Submitted = teamReports.Count,
                        Pending = teamReports.Count(r => r.Status == "Pending"),
                        Approved = teamReports.Count(r => r.Status == "Approved"),
                        Returned = teamReports.Count(r => r.Status == "Returned" || r.Status == "Returned_Draft")
                    });
                }
            }

            // Calculate Total Submitting Employees for Denominator
            var superAdmins = await _userManager.GetUsersInRoleAsync("SuperAdmin");
            var viewers = await _userManager.GetUsersInRoleAsync("Viewer");
            var excludedAdminViewerIds = superAdmins.Select(u => u.Id).Union(viewers.Select(u => u.Id)).ToList();

            int totalEmployeesDenominator;
            if (isAdmin)
            {
                totalEmployeesDenominator = await _db.Users.CountAsync(u => !u.IsDeleted && u.IsActive && !excludedAdminViewerIds.Contains(u.Id));
            }
            else
            {
                totalEmployeesDenominator = await _db.Users.CountAsync(u => !u.IsDeleted && u.IsActive && overseenUserIds.Contains(u.Id) && !excludedAdminViewerIds.Contains(u.Id));
            }

            dashboard.Admin = new backend.DTOs.AdminStatsDto
            {
                TotalEmployees = totalEmployeesDenominator,
                TotalSubmitted = allTeamReports.Count,
                TotalPending = allTeamReports.Count(r => r.Status == "Pending"),
                TotalApproved = allTeamReports.Count(r => r.Status == "Approved"),
                TotalReturned = allTeamReports.Count(r => r.Status == "Returned" || r.Status == "Returned_Draft"),

                TodaySubmitted = todayReports.Count,
                TodayPending = todayReports.Count(r => r.Status == "Pending"),
                TodayApproved = todayReports.Count(r => r.Status == "Approved"),
                TodayReturned = todayReports.Count(r => r.Status == "Returned" || r.Status == "Returned_Draft"),
                PendingActions = pendingActions,
                TeamBreakdown = teamBreakdowns
            };
        }

        dashboard.RecentActivity = await (from r in _db.AccomplishmentReports
                                          where r.UserId == userId && !r.IsDeleted
                                          orderby r.CreatedAt descending
                                          select new backend.DTOs.RecentActivityDto
                                          {
                                              Id = r.ReportId,
                                              Title = r.Title ?? "Untitled Report",
                                              Date = r.Date.ToString("yyyy-MM-dd"),
                                              Status = r.Status ?? "Pending",
                                              CreatedAt = r.CreatedAt.ToString("yyyy-MM-dd HH:mm"),
                                              ApprovedByName = r.ApprovedByName,
                                              ReturnedByName = r.ReturnedByName,
                                              IsModifiedByAdmin = r.IsModifiedByAdmin,
                                              ActionText = r.Status == "Approved" ? "Your report was approved" :
                                                           r.Status == "Returned" ? "Revision requested" :
                                                           r.Status == "Pending" ? "Awaiting review" : "Draft saved"
                                          }).Take(10).ToListAsync();

        return dashboard;
    }

    /// <summary>
    /// Checks if a user has the 'Management' permission claim.
    /// </summary>
    public async Task<bool> IsManagementAsync(ApplicationUser user)
    {
        var roles = await _userManager.GetRolesAsync(user);
        return roles.Contains("Viewer") || roles.Contains("SuperAdmin");
    }

    /// <summary>
    /// Finds a reviewer with the 'Approver' claim in the specified department.
    /// </summary>
    private async Task<string?> FindDepartmentApproverAsync(string? department)
    {
        if (string.IsNullOrEmpty(department)) return null;

        var usersInDept = await _userManager.Users
            .Where(u => u.Department == department)
            .ToListAsync();

        foreach (var u in usersInDept)
        {
            if (await IsApproverAsync(u))
            {
                return u.Id;
            }
        }
        return null;
    }

    /// <summary>
    /// Resolves the global management ID using hierarchy: Middle Management -> Global Management -> Super Admin.
    /// </summary>
    private async Task<string?> FindGlobalManagementAsync()
    {
        var managementUsers = await _userManager.GetUsersInRoleAsync("Viewer");

        var middleMgmt = await FindMiddleManagementIdAsync();
        if (!string.IsNullOrEmpty(middleMgmt)) return middleMgmt;

        if (managementUsers.Any())
        {
            return managementUsers.FirstOrDefault()?.Id;
        }

        var admins = await _userManager.GetUsersInRoleAsync("SuperAdmin");
        return admins.FirstOrDefault()?.Id;
    }

    /// <summary>
    /// Finds a user who possesses BOTH 'Approver' and 'Management' permission claims.
    /// </summary>
    private async Task<string?> FindMiddleManagementIdAsync()
    {
        var approvers = await _userManager.GetUsersInRoleAsync("Approver");
        foreach (var u in approvers)
        {
            if (await IsManagementAsync(u))
            {
                return u.Id;
            }
        }
        return null;
    }

    /// <summary>
    /// Checks if a user has the 'Approver' permission claim.
    /// </summary>
    public async Task<bool> IsApproverAsync(ApplicationUser user)
    {
        var roles = await _userManager.GetRolesAsync(user);
        return roles.Contains("Approver");
    }

    /// <summary>
    /// Generates an Excel byte array containing filtered accomplishment reports.
    /// Handles headers, styling, task rows, and break rows.
    /// </summary>
    public async Task<byte[]> ExportToExcelAsync(
        List<int>? ids = null, 
        string? currentUserId = null, 
        string? status = null, 
        string? reportDate = null,
        bool isAdmin_unused = false,
        bool isApprover_unused = false,
        bool isManagement_unused = false,
        string? q = null,
        string? department = null)
    {
        var query = _db.AccomplishmentReports
            .AsNoTracking()
            .Where(r => !r.IsDeleted && r.Status != "Draft");

        var currentUser = !string.IsNullOrEmpty(currentUserId) 
            ? await _userManager.FindByIdAsync(currentUserId) 
            : null;

        var roles = currentUser != null ? await _userManager.GetRolesAsync(currentUser) : new List<string>();
        var isAdmin = roles.Contains("SuperAdmin");
        var isViewer = roles.Contains("Viewer");
        var isApprover = roles.Contains("Approver");

        if (isAdmin || isViewer)
        {
            // Global oversight
            query = from r in query
                    join u in _db.Users on r.UserId equals u.Id
                    where !u.IsDeleted
                    select r;

            if (!string.IsNullOrEmpty(department))
            {
                query = from r in query
                        join u in _db.Users on r.UserId equals u.Id
                        where u.Department == department
                        select r;
            }
        }
        else if (isApprover)
        {
            // Sequential Oversight: Approvers only export what was assigned to them
            query = query.Where(r => r.CurrentApproverId == currentUserId);
        }
        else if (!string.IsNullOrEmpty(currentUserId))
        {
            query = query.Where(r => r.UserId == currentUserId);
        }
        else
        {
            return await Task.FromResult(Array.Empty<byte>());
        }

        if (ids != null && ids.Any())
        {
            query = query.Where(r => ids.Contains(r.ReportId));
        }
        else
        {
            if (!string.IsNullOrEmpty(status))
            {
                var searchStatus = status;
                if (status.Equals("pending", StringComparison.OrdinalIgnoreCase) || status.Equals("submitted", StringComparison.OrdinalIgnoreCase))
                {
                    searchStatus = "Pending";
                }
                else if (status.Equals("approved", StringComparison.OrdinalIgnoreCase))
                {
                    searchStatus = "Approved";
                }
                else if (status.Equals("returned", StringComparison.OrdinalIgnoreCase) || status.Equals("rejected", StringComparison.OrdinalIgnoreCase))
                {
                    searchStatus = "Returned";
                }

                if (searchStatus == "Returned")
                {
                    query = query.Where(r => r.Status == "Returned" || r.Status == "Returned_Draft");
                }
                else
                {
                    query = query.Where(r => r.Status == searchStatus);
                }
            }

            if (!string.IsNullOrEmpty(reportDate))
            {
                if (DateOnly.TryParse(reportDate, out var date))
                {
                    query = query.Where(r => r.Date == date);
                }
            }

            if (!string.IsNullOrEmpty(q))
            {
                var normalized = q.Trim().ToLowerInvariant();
                query = query.Where(r =>
                    r.ReportId.ToString().Contains(normalized) ||
                    (r.Title != null && r.Title.ToLower().Contains(normalized)) ||
                    (r.Status != null && r.Status.ToLower().Contains(normalized)) ||
                    r.Date.ToString().Contains(normalized) ||
                    _db.Users.Any(u => u.Id == r.UserId && 
                        ((u.FullName != null && u.FullName.ToLower().Contains(normalized)) || 
                         (u.UserName != null && u.UserName.ToLower().Contains(normalized))))
                );
            }
        }

        var reports = await query.OrderByDescending(r => r.Date).ToListAsync();
        var userIds = reports.Select(r => r.UserId).Distinct().ToList();
        var users = await _db.Users
            .Where(u => userIds.Contains(u.Id))
            .Select(u => new { u.Id, u.FullName, u.UserName })
            .ToListAsync();

        ExcelPackage.License.SetNonCommercialPersonal("HRIS");
        using var package = new ExcelPackage();
        var worksheet = package.Workbook.Worksheets.Add("Accomplishment Reports");

        var headers = new string[] 
        { 
            "Employee", "Report Title", "Client", "Task Name", 
            "Time In", "Time Out", "Task Duration", "Status", "Report Date", 
            "Submitted At", "Approved By", "Daily Net Worked (Hrs)", "Daily Break (Hrs)", "Daily Total Report (Hrs)"
        };

        for (int i = 0; i < headers.Length; i++)
        {
            worksheet.Cells[1, i + 1].Value = headers[i];
            worksheet.Cells[1, i + 1].Style.Font.Bold = true;
            worksheet.Cells[1, i + 1].Style.Fill.PatternType = ExcelFillStyle.Solid;
            worksheet.Cells[1, i + 1].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.LightGray);
        }

        int row = 2;
        foreach (var report in reports)
        {
            var user = users.FirstOrDefault(u => u.Id == report.UserId);
            var employeeName = !string.IsNullOrEmpty(user?.FullName) 
                ? user.FullName 
                : (!string.IsNullOrEmpty(user?.UserName) ? user.UserName : "Unknown User");

            // Calculate Daily Totals
            double dailyRawWorked = 0;
            double overlapMinutes = 0;
            double dailyBreakHours = 0;

            if (report.BreakStartTime.HasValue && report.BreakEndTime.HasValue)
            {
                dailyBreakHours = CalculateHours(report.BreakStartTime.Value, report.BreakEndTime.Value);
            }

            foreach (var t in report.Tasks)
            {
                if (t.StartTime.HasValue && t.EndTime.HasValue)
                {
                    dailyRawWorked += CalculateHours(t.StartTime.Value, t.EndTime.Value);
                    if (report.BreakStartTime.HasValue && report.BreakEndTime.HasValue)
                    {
                        // Calculate overlap inline
                        var tStart = t.StartTime.Value.ToTimeSpan().TotalMinutes;
                        var tEnd = t.EndTime.Value.ToTimeSpan().TotalMinutes;
                        var bStart = report.BreakStartTime.Value.ToTimeSpan().TotalMinutes;
                        var bEnd = report.BreakEndTime.Value.ToTimeSpan().TotalMinutes;
                        var overlapStart = Math.Max(tStart, bStart);
                        var overlapEnd = Math.Min(tEnd, bEnd);
                        if (overlapEnd > overlapStart)
                        {
                            overlapMinutes += (overlapEnd - overlapStart);
                        }
                    }
                }
            }

            double dailyNetWorked = Math.Max(0, dailyRawWorked - (overlapMinutes / 60.0));
            double dailyTotalReport = dailyNetWorked + dailyBreakHours;

            foreach (var task in report.Tasks)
            {
                worksheet.Cells[row, 1].Value = employeeName;
                worksheet.Cells[row, 2].Value = report.Title ?? $"AR - {report.Date:yyyy-MM-dd}";
                worksheet.Cells[row, 3].Value = task.Client;
                worksheet.Cells[row, 4].Value = task.TaskName;
                worksheet.Cells[row, 5].Value = task.StartTime?.ToString("hh:mm tt");
                worksheet.Cells[row, 6].Value = task.EndTime?.ToString("hh:mm tt");
                
                double hours = 0;
                if (task.StartTime.HasValue && task.EndTime.HasValue)
                {
                    hours = CalculateHours(task.StartTime.Value, task.EndTime.Value);
                }
                worksheet.Cells[row, 7].Value = hours;
                worksheet.Cells[row, 8].Value = report.Status;
                worksheet.Cells[row, 9].Value = report.Date.ToString("yyyy-MM-dd");
                worksheet.Cells[row, 10].Value = report.CreatedAt.ToString("yyyy-MM-dd HH:mm");
                worksheet.Cells[row, 11].Value = report.ApprovedByName ?? "N/A";
                worksheet.Cells[row, 12].Value = Math.Round(dailyNetWorked, 2);
                worksheet.Cells[row, 13].Value = Math.Round(dailyBreakHours, 2);
                worksheet.Cells[row, 14].Value = Math.Round(dailyTotalReport, 2);

                row++;
            }

            if (report.BreakStartTime.HasValue || report.BreakEndTime.HasValue || report.BreakDurationMinutes > 0)
            {
                worksheet.Cells[row, 1].Value = employeeName;
                worksheet.Cells[row, 2].Value = report.Title ?? $"AR - {report.Date:yyyy-MM-dd}";
                worksheet.Cells[row, 3].Value = "BREAK";
                worksheet.Cells[row, 4].Value = $"Duration: {report.BreakDurationMinutes} mins";
                worksheet.Cells[row, 5].Value = report.BreakStartTime?.ToString("hh:mm tt") ?? "N/A";
                worksheet.Cells[row, 6].Value = report.BreakEndTime?.ToString("hh:mm tt") ?? "N/A";
                worksheet.Cells[row, 7].Value = Math.Round(report.BreakDurationMinutes / 60.0, 2);
                worksheet.Cells[row, 8].Value = report.Status;
                worksheet.Cells[row, 9].Value = report.Date.ToString("yyyy-MM-dd");
                worksheet.Cells[row, 10].Value = report.CreatedAt.ToString("yyyy-MM-dd HH:mm");
                worksheet.Cells[row, 11].Value = report.ApprovedByName ?? "N/A";
                worksheet.Cells[row, 12].Value = Math.Round(dailyNetWorked, 2);
                worksheet.Cells[row, 13].Value = Math.Round(dailyBreakHours, 2);
                worksheet.Cells[row, 14].Value = Math.Round(dailyTotalReport, 2);

                worksheet.Rows[row].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Rows[row].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.FromArgb(245, 245, 245));
                
                row++;
            }
        }

        worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();

        // Enforce maximum widths for Client and Task to ensure they wrap instead of expanding infinitely.
        // This mirrors the UI boundary logic (20 chars for Client, 95 chars for Tasks).
        worksheet.Column(3).Width = 22; 
        worksheet.Column(3).Style.WrapText = true;
        
        worksheet.Column(4).Width = 120; 
        worksheet.Column(4).Style.WrapText = true;

        return await Task.FromResult(package.GetAsByteArray());
    }

    /// <summary>
    /// Fetches accomplishment reports based on role-based visibility rules.
    /// SuperAdmins see everything; Team Leads see their department; Employees see their own.
    /// </summary>
    public async Task<IEnumerable<object>> GetAllReportsAsync(string currentUserId, string? q = null, string? status = null, string? reportDate = null)
    {
        var currentUser = await _userManager.FindByIdAsync(currentUserId);
        if (currentUser == null) return Enumerable.Empty<object>();

        var roles = await _userManager.GetRolesAsync(currentUser);
        var isAdmin = roles.Contains("SuperAdmin");
        var isViewer = roles.Contains("Viewer");
        var isApprover = roles.Contains("Approver");

        List<AccomplishmentReport> reports;

        if (isAdmin || isViewer)
        {
            // Admins and Viewers see all reports (submitted)
            reports = await _db.AccomplishmentReports
                                    .AsNoTracking()
                                    .Where(r => r.Status != "Draft" && !r.IsDeleted)
                                    .OrderByDescending(r => r.Date)
                                    .ToListAsync();
        }
        else
        {
            // Both Approvers and Creators only see THEIR OWN reports in the main AccomplishmentReports resource (My AR)
            // Oversight is handled via the separate ArReviews resource.
            reports = await _db.AccomplishmentReports
                                    .AsNoTracking()
                                    .Where(r => r.UserId == currentUserId && !r.IsDeleted)
                                    .OrderByDescending(r => r.Date)
                                    .ToListAsync();
        }

        if (!string.IsNullOrWhiteSpace(status))
        {
            var normalizedFilter = status.Trim().ToLowerInvariant();
            if (normalizedFilter.Contains(','))
            {
                var statuses = normalizedFilter.Split(',').Select(s => s.Trim()).ToList();
                reports = reports.Where(r => !string.IsNullOrEmpty(r.Status) && statuses.Contains(r.Status.ToLowerInvariant())).ToList();
            }
            else
            {
                reports = reports.Where(r => !string.IsNullOrEmpty(r.Status) && r.Status.ToLowerInvariant() == normalizedFilter).ToList();
            }
        }

        if (!string.IsNullOrWhiteSpace(reportDate))
        {
            reports = reports.Where(r => r.Date.ToString("yyyy-MM-dd") == reportDate).ToList();
        }

        if (!string.IsNullOrWhiteSpace(q))
        {
            var normalized = q.Trim().ToLowerInvariant();
            reports = reports.Where(r =>
                r.ReportId.ToString().Contains(normalized) ||
                (r.Title ?? string.Empty).ToLowerInvariant().Contains(normalized) ||
                (r.Status ?? string.Empty).ToLowerInvariant().Contains(normalized) ||
                r.Date.ToString("yyyy-MM-dd").Contains(normalized)
            ).ToList();
        }

        var userIds = reports.Select(r => r.UserId).Distinct().ToList();
        var receiverIds = reports.Where(r => !string.IsNullOrEmpty(r.ReceiverId)).Select(r => r.ReceiverId!).Distinct().ToList();
        var viewerIds = reports.Where(r => !string.IsNullOrEmpty(r.ViewerId)).Select(r => r.ViewerId!).Distinct().ToList();
        var returnerIds = reports.Where(r => !string.IsNullOrEmpty(r.ReturnedById)).Select(r => r.ReturnedById!).Distinct().ToList();

        var allUserIds = userIds.Concat(receiverIds).Concat(viewerIds).Concat(returnerIds).Distinct().ToList();

        var users = await _db.Users
                                        .Where(u => allUserIds.Contains(u.Id))
                                        .Select(u => new { u.Id, u.FullName, u.UserName, u.Email, u.SupervisorId, u.ViewerId, u.Department })
                                        .ToListAsync();

        var result = new List<object>();

        var approversList = await _userManager.GetUsersInRoleAsync("Approver");
        var managementList = await _userManager.GetUsersInRoleAsync("Viewer");
        var superAdminsList = await _userManager.GetUsersInRoleAsync("SuperAdmin");

        foreach (var report in reports)
        {
            var owner = users.FirstOrDefault(u => u.Id == report.UserId);
            var fullName = owner?.FullName ?? report.UserId ?? "Unknown";

            // PHASE 21: Resolve reviewer based on current stage in sequence
            string receiverName = "Reviewer";
            if (!string.IsNullOrEmpty(report.CurrentApproverId))
            {
                var currentApprover = users.FirstOrDefault(u => u.Id == report.CurrentApproverId);
                receiverName = ExtractFirstName(currentApprover?.FullName, currentApprover?.UserName);
            }
            else
            {
                var resolvedReviewer = ResolveDynamicReviewer(owner?.Department, owner?.Id, approversList, managementList, superAdminsList);
                receiverName = resolvedReviewer.Name;
            }

            var resolvedViewer = ResolveDynamicViewer(managementList, superAdminsList);
            string viewerName = resolvedViewer.Name;

            var returner = users.FirstOrDefault(u => u.Id == report.ReturnedById);
            string? returnedByName = null;
            if (returner != null)
            {
                returnedByName = !string.IsNullOrWhiteSpace(returner.FullName) ? returner.FullName.Split(' ')[0] : "Supervisor";
            }

            result.Add(new
            {
                report.ReportId,
                date = report.Date.ToString("yyyy-MM-dd"),
                reportDate = report.Date.ToString("yyyy-MM-dd"),
                title = report.Title ?? "Untitled Report",
                status = report.Status,
                createdAt = report.CreatedAt,
                userId = report.UserId,
                receiverId = report.ReceiverId,
                viewerId = report.ViewerId,
                receiverName = receiverName,
                viewerName = viewerName,
                fullName = fullName,
                feedbackHistory = report.FeedbackHistory,
                returnFeedback = report.FeedbackHistory.LastOrDefault()?.Message ?? "",
                returnedByName = returnedByName,
                approvedByName = report.ApprovedByName,
                breakStartTime = report.BreakStartTime?.ToString("HH:mm"),
                breakEndTime = report.BreakEndTime?.ToString("HH:mm"),
                breakDurationMinutes = report.BreakDurationMinutes,
                accomplishments = report.Tasks.Select(t => new
                {
                    project = t.Client,
                    task = t.TaskName,
                    notes = t.Particulars,
                    start = t.StartTime?.ToString("HH:mm") ?? "",
                    end = t.EndTime?.ToString("HH:mm") ?? "",
                    hours = (t.StartTime.HasValue && t.EndTime.HasValue) ? CalculateHours(t.StartTime.Value, t.EndTime.Value) : 0
                }).ToArray()
            });
        }

        return result;
    }

    /// <summary>
    /// Retrieves a queue of reports awaiting review by the current user.
    /// Handles filtering by status, date, department, and search queries.
    /// </summary>
    public async Task<IEnumerable<backend.DTOs.ReviewQueueItemDto>> GetReviewQueueAsync(
        string currentUserId,
        string? q = null,
        string? status = null,
        string? reportDate = null,
        string? reportId = null,
        string? department = null,
        string? position = null
    )
    {
        var currentUser = await _userManager.FindByIdAsync(currentUserId);
        if (currentUser == null) return Enumerable.Empty<backend.DTOs.ReviewQueueItemDto>();

        var currentUserRoles = await _userManager.GetRolesAsync(currentUser);
        var isAdmin = currentUserRoles.Contains("SuperAdmin");
        var isViewer = currentUserRoles.Contains("Viewer");
        var isApprover = currentUserRoles.Contains("Approver");

        IQueryable<AccomplishmentReport> query = _db.AccomplishmentReports
            .AsNoTracking()
            .Where(r => r.IsDeleted != true && r.Status != "Draft");

        // Force Pending status by default for the Review Queue if no status filter is provided
        // We only do this if status is not explicitly "All"
        // Status filtering:
        // 1. If status is explicitly "All", we don't apply any status filter (shows everything but drafts)
        // 2. If status is null/empty AND the user is NOT a Viewer/Admin, default to Pending
        // 3. Otherwise, apply the requested status filter
        if (status?.Trim().Equals("All", StringComparison.OrdinalIgnoreCase) == true)
        {
            // Show all (Drafts are already filtered out globally at line 607)
        }
        else if (string.IsNullOrWhiteSpace(status))
        {
            // Default to Pending for standard roles (Creators), but All for oversight roles (Admin/Viewer/Approver)
            if (!isAdmin && !isViewer && !isApprover)
            {
                query = query.Where(r => r.Status == "Pending");
            }
        }
        else if (status.Trim().Equals("Active", StringComparison.OrdinalIgnoreCase))
        {
            // Active means both Pending and Returned
            query = query.Where(r => r.Status == "Pending" || r.Status == "Returned");
        }
        else 
        {
            query = query.Where(r => r.Status == status);
        }

        // Normalize currentUserId for case-insensitive comparison
        var normalizedCurrentUserId = currentUserId.ToLowerInvariant();

        if (isAdmin)
        {
            // SuperAdmins see all reports for system-wide oversight
        }
        else if (isViewer)
        {
            // Viewers see reports from users in teams they oversee OR reports explicitly assigned to them OR their own submitted reports
            var overseenUserIds = await _db.ApprovalTeamMembers
                .Where(m => _db.ApprovalTeamApprovers.Any(a => a.ApprovalTeamId == m.ApprovalTeamId && a.UserId == currentUserId))
                .Select(m => m.UserId)
                .Distinct()
                .ToListAsync();

            var overseenUserIdsLower = overseenUserIds.Select(id => id.ToLowerInvariant()).ToList();

            // Use case-insensitive comparison for PostgreSQL compatibility
            query = query.Where(r => (!string.IsNullOrEmpty(r.UserId) && r.UserId.ToLower() == normalizedCurrentUserId) || 
                                     (!string.IsNullOrEmpty(r.ViewerId) && r.ViewerId.ToLower() == normalizedCurrentUserId) || 
                                     (!string.IsNullOrEmpty(r.UserId) && overseenUserIdsLower.Contains(r.UserId.ToLower())));
        }
        else if (isApprover)
        {
            // PARALLEL APPROVAL: Approvers see all reports from users in teams they oversee.
            // This allows backup approvers to see the reports simultaneously.
            var overseenUserIds = await _db.ApprovalTeamMembers
                .Where(m => _db.ApprovalTeamApprovers.Any(a => a.ApprovalTeamId == m.ApprovalTeamId && a.UserId == currentUserId))
                .Select(m => m.UserId)
                .Distinct()
                .ToListAsync();

            var overseenUserIdsLower = overseenUserIds.Select(id => id.ToLowerInvariant()).ToList();

            // They see reports explicitly assigned to them (Primary) OR any report from their managed team (Backup)
            query = query.Where(r => (!string.IsNullOrEmpty(r.CurrentApproverId) && r.CurrentApproverId.ToLower() == normalizedCurrentUserId) || 
                                     (!string.IsNullOrEmpty(r.UserId) && overseenUserIdsLower.Contains(r.UserId.ToLower())));
        }
        else
        {
            // Creators or unknown roles see nothing in the review queue
            return Enumerable.Empty<backend.DTOs.ReviewQueueItemDto>();
        }

        // Specific status filtering is already handled at the start of this method (lines 607-621)
        // No redundant status filter here to avoid matching literal "all"

        if (!string.IsNullOrWhiteSpace(reportDate))
        {
            if (DateOnly.TryParse(reportDate, out var d))
                query = query.Where(r => r.Date == d);
        }

        if (!string.IsNullOrWhiteSpace(department))
        {
            query = from r in query
                    join u in _db.Users on r.UserId equals u.Id
                    where u.Department == department
                    select r;
        }

        var finalReports = await query.OrderByDescending(r => r.Date).ToListAsync();
        var mappedReports = finalReports.Select(r => new AccomplishmentReport
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
            BreakDurationMinutes = r.BreakDurationMinutes
        }).ToList();

        var queue = await BuildReviewQueueAsync(mappedReports);
        
        if (!string.IsNullOrWhiteSpace(q))
        {
            var normalized = q.Trim().ToLowerInvariant();
            return queue.Where(item => 
                item.Employee.ToLowerInvariant().Contains(normalized)
                || item.Role.ToLowerInvariant().Contains(normalized)
                || item.Items.ToLowerInvariant().Contains(normalized)
                || item.ReportDate.ToLowerInvariant().Contains(normalized)
                || item.Department.ToLowerInvariant().Contains(normalized)
                || item.Position.ToLowerInvariant().Contains(normalized)
                || item.Status.ToLowerInvariant().Contains(normalized)
                || item.ReportId.ToString().Contains(normalized)
            );
        }

        return queue;
    }

    /// <summary>
    /// Internal engine that builds the DTOs for the review queue, including owner roles and positions.
    /// </summary>
    private async Task<IEnumerable<backend.DTOs.ReviewQueueItemDto>> BuildReviewQueueAsync(List<AccomplishmentReport> reports)
    {
        var userIds = reports
            .Where(r => !string.IsNullOrEmpty(r.UserId))
            .Select(r => r.UserId!)
            .Distinct()
            .ToList();

        var users = await _db.Users
            .Where(u => userIds.Contains(u.Id!))
            .Select(u => new { u.Id, u.UserName, u.FullName, u.Position, u.Department, u.SupervisorId, u.ViewerId, u.ApprovalTeamId })
            .ToListAsync();

        var teamIds = users.Where(u => u.ApprovalTeamId.HasValue).Select(u => u.ApprovalTeamId!.Value).Distinct().ToList();
        var teams = await _db.ApprovalTeams
            .Where(t => teamIds.Contains(t.Id))
            .Select(t => new { t.Id, t.Name })
            .ToListAsync();

        var allUserRoles = await _db.UserRoles
            .Join(_db.Roles, ur => ur.RoleId, r => r.Id, (ur, r) => new { ur.UserId, r.Name })
            .Where(x => userIds.Contains(x.UserId))
            .ToListAsync();

        var allUserClaims = await _db.UserClaims
            .Where(x => userIds.Contains(x.UserId))
            .ToListAsync();

        var queue = new List<backend.DTOs.ReviewQueueItemDto>();

        foreach (var report in reports)
        {
            var owner = users.FirstOrDefault(u => u.Id == report.UserId);
            var name = owner?.FullName ?? owner?.UserName ?? report.UserId ?? "Unknown";

            var userRoles = allUserRoles.Where(x => x.UserId == report.UserId).Select(x => x.Name).ToList();
            var userClaims = allUserClaims.Where(x => x.UserId == report.UserId).ToList();
            string roleLabel = "Creator";
            if (userRoles.Contains("SuperAdmin"))
            {
                roleLabel = "Admin";
            }
            else if (userRoles.Contains("Viewer"))
            {
                roleLabel = "Viewer";
            }
            else if (userRoles.Contains("Approver"))
            {
                roleLabel = "Approver";
            }

            queue.Add(new backend.DTOs.ReviewQueueItemDto
            {
                ReportId = report.ReportId,
                Employee = name,
                Role = roleLabel,
                Date = report.Date.ToString("yyyy-MM-dd"),
                ReportDate = report.Date.ToString("yyyy-MM-dd"),
                Title = report.Title ?? "Untitled Report",
                Items = report.Title ?? "Untitled Report",
                Submitted = report.CreatedAt.ToString("yyyy-MM-dd HH:mm"),
                Status = report.Status ?? "Pending",
                Department = owner?.Department ?? string.Empty,
                Position = owner?.Position ?? string.Empty,
                ApproverTeam = await GetApproverTeamNameAsync(report.UserId!),
                ApprovedByName = report.ApprovedByName,
                ReturnedByName = report.ReturnedByName,
            });
        }

        return queue;
    }

    /// <summary>
    /// Fetches a specific report for review, validating access permissions based on role hierarchy.
    /// </summary>
    public async Task<object?> GetReviewReportAsync(int reportId, string currentUserId)
    {
        var currentUser = await _userManager.FindByIdAsync(currentUserId);
        if (currentUser == null) return null;

        var exp = await _db.AccomplishmentReports.FirstOrDefaultAsync(r => r.ReportId == reportId && !r.IsDeleted);
        if (exp == null || string.IsNullOrEmpty(exp.UserId)) return null;

        var report = new AccomplishmentReport
        {
            ReportId = exp.ReportId,
            UserId = exp.UserId,
            Date = exp.Date,
            Title = exp.Title,
            Tasks = exp.Tasks,
            Status = exp.Status,
            ReceiverId = exp.ReceiverId,
            ViewerId = exp.ViewerId,
            FeedbackHistory = exp.FeedbackHistory,
            ReturnedById = exp.ReturnedById,
            ReturnedByName = exp.ReturnedByName,
            ApprovedById = exp.ApprovedById,
            ApprovedByName = exp.ApprovedByName,
            CreatedAt = exp.CreatedAt,
            ViewedAt = exp.ViewedAt,
            ViewedById = exp.ViewedById,
            ViewedByName = exp.ViewedByName,
            BreakStartTime = exp.BreakStartTime,
            BreakEndTime = exp.BreakEndTime,
            BreakDurationMinutes = exp.BreakDurationMinutes,
            IsModifiedByAdmin = exp.IsModifiedByAdmin
        };


        var owner = await _userManager.FindByIdAsync(report.UserId);
        if (owner == null) return null;

        var currentRoles = await _userManager.GetRolesAsync(currentUser);
        var isAdmin = currentRoles.Contains("SuperAdmin");
        var isViewer = currentRoles.Contains("Viewer");
        var isApprover = currentRoles.Contains("Approver");

        if (!isAdmin && !isViewer && report.UserId != currentUserId)
        {
            // Approvers only see reports they are currently assigned to
            if (isApprover && report.CurrentApproverId != currentUserId)
            {
                return null;
            }

            // If they have no relevant role and it's not their own report, block access
            if (!isApprover)
            {
                return null;
            }
        }

        return await BuildReviewGroupItemAsync(new List<AccomplishmentReport> { report }, owner);
    }

    /// <summary>
    /// Internal engine that builds the detailed review DTO, including dynamic reviewer/viewer stamps.
    /// </summary>
    private async Task<object> BuildReviewGroupItemAsync(List<AccomplishmentReport> reports, ApplicationUser owner)
    {
        var report = reports.First();
        var fullName = owner.FullName ?? owner.UserName ?? "Unknown";

        var approversList = await _userManager.GetUsersInRoleAsync("Approver");
        var managementList = await _userManager.GetUsersInRoleAsync("Viewer");
        var superAdminsList = await _userManager.GetUsersInRoleAsync("SuperAdmin");

        // PHASE 21: Resolve reviewer based on current stage in sequence
        string receiverName = "Reviewer";
        string? targetReceiverId = report.ReceiverId;

        if (!string.IsNullOrEmpty(report.CurrentApproverId))
        {
            var currentApprover = await _userManager.FindByIdAsync(report.CurrentApproverId);
            receiverName = ExtractFirstName(currentApprover?.FullName, currentApprover?.UserName);
            targetReceiverId = report.CurrentApproverId;
        }
        else
        {
            var resolvedReviewer = ResolveDynamicReviewer(owner.Department, owner.Id, approversList, managementList, superAdminsList);
            receiverName = resolvedReviewer.Name;
            targetReceiverId = resolvedReviewer.Id ?? report.ReceiverId;
        }

        var resolvedViewer = ResolveDynamicViewer(managementList, superAdminsList);
        string viewerName = resolvedViewer.Name;
        var targetViewerId = resolvedViewer.Id ?? report.ViewerId;

        return new
        {
            reportId = report.ReportId,
            userId = report.UserId,
            receiverId = targetReceiverId,
            viewerId = targetViewerId,
            employee = fullName,
            role = await GetUserRoleLabelAsync(owner),
            date = report.Date.ToString("yyyy-MM-dd"),
            reportDate = report.Date.ToString("yyyy-MM-dd"),
            title = report.Title ?? "Untitled Report",
            items = report.Title ?? "Untitled Report",
            submitted = report.CreatedAt.ToString("yyyy-MM-dd HH:mm"),
            status = report.Status,
            receiverName = receiverName,
            viewerName = viewerName,
            feedbackHistory = report.FeedbackHistory,
            returnFeedback = report.FeedbackHistory.LastOrDefault()?.Message ?? "",
            viewedAt = report.ViewedAt?.ToString("yyyy-MM-dd HH:mm"),
            viewedById = report.ViewedById,
            viewedByName = report.ViewedByName,
            approvedByName = report.ApprovedByName,
            returnedByName = report.ReturnedByName,
            breakStartTime = report.BreakStartTime?.ToString("HH:mm"),
            breakEndTime = report.BreakEndTime?.ToString("HH:mm"),
            breakDurationMinutes = report.BreakDurationMinutes,
            isModifiedByAdmin = report.IsModifiedByAdmin,
            approverTeam = await GetApproverTeamNameAsync(owner.Id),
            accomplishments = report.Tasks.Select(t => new
            {
                project = t.Client,
                task = t.TaskName,
                notes = t.Particulars,
                start = t.StartTime?.ToString("HH:mm") ?? "",
                end = t.EndTime?.ToString("HH:mm") ?? "",
                hours = (t.StartTime.HasValue && t.EndTime.HasValue) ? CalculateHours(t.StartTime.Value, t.EndTime.Value) : 0
            }).ToArray()
        };
    }

    /// <summary>
    /// Resolves the primary reviewer name and ID using department hierarchy.
    /// Logic: Dept Approver -> Middle Management -> Super Admin.
    /// </summary>
    private (string Name, string? Id) ResolveDynamicReviewer(string? department, string? ownerId,
        IList<ApplicationUser> approvers, 
        IList<ApplicationUser> management, 
        IList<ApplicationUser> superAdmins)
    {
        var managementIds = management.Select(m => m.Id).ToHashSet();
        
        var deptApprover = approvers.FirstOrDefault(a => a.Department == department && !managementIds.Contains(a.Id) && a.Id != ownerId);
        if (deptApprover != null) return (ExtractFirstName(deptApprover.FullName, deptApprover.UserName), deptApprover.Id);

        var middleMgmt = management.FirstOrDefault(m => approvers.Any(a => a.Id == m.Id) && m.Id != ownerId);
        if (middleMgmt != null) return (ExtractFirstName(middleMgmt.FullName, middleMgmt.UserName), middleMgmt.Id);

        var superAdmin = superAdmins.FirstOrDefault(a => a.Id != ownerId);
        if (superAdmin != null) return (ExtractFirstName(superAdmin.FullName, superAdmin.UserName), superAdmin.Id);

        return ("Reviewer", null);
    }
    
    /// <summary>
    /// Resolves the global viewer name and ID using Management claims and Super Admin roles.
    /// </summary>
    private (string Name, string? Id) ResolveDynamicViewer(
        IList<ApplicationUser> management, 
        IList<ApplicationUser> superAdmins)
    {
        var mgmtUser = management.FirstOrDefault();
        if (mgmtUser != null) return (ExtractFirstName(mgmtUser.FullName, mgmtUser.UserName), mgmtUser.Id);

        var superAdmin = superAdmins.FirstOrDefault();
        if (superAdmin != null) return (ExtractFirstName(superAdmin.FullName, superAdmin.UserName), superAdmin.Id);

        return ("None", null);
    }

    /// <summary>
    /// Resolves a human-readable role label for a user based on their roles and claims.
    /// </summary>
    private async Task<string> GetUserRoleLabelAsync(ApplicationUser user)
    {
        var roles = await _userManager.GetRolesAsync(user);
        if (roles.Contains("SuperAdmin")) return "Admin";
        if (roles.Contains("Viewer")) return "Viewer";
        if (roles.Contains("Approver")) return "Approver";

        return "Creator";
    }

    /// <summary>
    /// Utility: Extracts the first name from a full name or email address.
    /// </summary>
    private static string ExtractFirstName(string? fullName, string? fallbackUserName = null)
    {
        var name = fullName?.Trim();

        if (string.IsNullOrEmpty(name))
        {
            name = fallbackUserName?.Trim();
            if (string.IsNullOrEmpty(name)) return "Reviewer";

            if (name.Contains('@'))
            {
                var prefix = name.Split('@')[0];
                return char.ToUpper(prefix[0]) + prefix[1..];
            }

            return name;
        }

        if (name.Contains('@'))
        {
            var prefix = name.Split('@')[0];
            return char.ToUpper(prefix[0]) + prefix[1..];
        }

        if (name.Contains(','))
        {
            var parts = name.Split(',');
            return parts.Length > 1 ? parts[1].Trim().Split(' ')[0] : name;
        }

        return name.Split(' ')[0];
    }
}
