using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public interface IAuditLogService
{
    Task<(IEnumerable<object> Data, int Total)> GetAuditLogsAsync(
        string? tableName = null, 
        string? action = null, 
        string? query = null,
        int page = 1, 
        int perPage = 10);
    Task<object?> GetAuditLogByIdAsync(int id);
}

public class AuditLogService : IAuditLogService
{
    private readonly ApplicationDbContext _db;
    private readonly UserManager<ApplicationUser> _userManager;

    public AuditLogService(ApplicationDbContext db, UserManager<ApplicationUser> userManager)
    {
        _db = db;
        _userManager = userManager;
    }

    /// <summary>
    /// Retrieves a paginated list of audit logs, optionally filtered by table name, action, or search query.
    /// </summary>
    /// <param name="tableName">The name of the database table to filter by.</param>
    /// <param name="action">The type of action (e.g., Create, Update, Delete) to filter by.</param>
    /// <param name="query">A search string to match against table names, actions, or record IDs.</param>
    /// <param name="page">The page number for pagination.</param>
    /// <param name="perPage">The number of items per page.</param>
    /// <returns>A tuple containing the list of logs and the total count for pagination.</returns>
    public async Task<(IEnumerable<object> Data, int Total)> GetAuditLogsAsync(
        string? tableName = null, 
        string? action = null, 
        string? query = null,
        int page = 1, 
        int perPage = 10)
    {
        var dbQuery = _db.AuditLogs.AsNoTracking();

        if (!string.IsNullOrEmpty(tableName))
            dbQuery = dbQuery.Where(l => l.TableName == tableName);

        if (!string.IsNullOrEmpty(action))
            dbQuery = dbQuery.Where(l => l.Action == action);

        if (!string.IsNullOrEmpty(query))
        {
            var normalized = query.ToLower();
            dbQuery = dbQuery.Where(l => 
                (l.TableName ?? "").ToLower().Contains(normalized) ||
                (l.Action ?? "").ToLower().Contains(normalized) ||
                (l.RecordId ?? "").Contains(normalized));
        }

        var total = await dbQuery.CountAsync();
        var logs = await dbQuery
            .OrderByDescending(l => l.ChangedAt)
            .Skip((page - 1) * perPage)
            .Take(perPage)
            .ToListAsync();

        // Resolve user names for ChangedBy IDs
        var userIds = logs.Select(l => l.ChangedBy).Distinct().ToList();
        var userMap = await _db.Users
            .Where(u => userIds.Contains(u.Id))
            .Select(u => new { u.Id, Name = u.FullName ?? u.UserName })
            .ToDictionaryAsync(u => u.Id, u => u.Name);

        var result = logs.Select(l => new
        {
            id = l.AuditId,
            l.AuditId,
            l.TableName,
            l.RecordId,
            l.Action,
            l.OldData,
            l.NewData,
            l.ChangedBy,
            ChangedByName = (l.ChangedBy != null && userMap.TryGetValue(l.ChangedBy, out var name)) ? name : (string.Equals(l.ChangedBy, "SYSTEM", StringComparison.OrdinalIgnoreCase) ? "System" : "Unknown"),
            l.ChangedAt
        });

        return (result, total);
    }

    /// <summary>
    /// Retrieves a detailed audit log entry by its unique ID, resolving target entity names (Users/Reports).
    /// </summary>
    /// <param name="id">The ID of the audit log.</param>
    /// <returns>A detailed audit log object or null if not found.</returns>
    public async Task<object?> GetAuditLogByIdAsync(int id)
    {
        var log = await _db.AuditLogs.AsNoTracking()
            .FirstOrDefaultAsync(l => l.AuditId == id);

        if (log == null) return null;

        var name = "Unknown";
        if (string.Equals(log.ChangedBy, "SYSTEM", StringComparison.OrdinalIgnoreCase))
        {
            name = "System";
        }
        else if (log.ChangedBy != null)
        {
            var user = await _db.Users.FindAsync(log.ChangedBy);
            name = user?.FullName ?? user?.UserName ?? "Unknown";
        }

        // Resolve Target Name (The thing that was changed)
        var targetName = "Unknown Record";
        if (log.TableName == "AspNetUsers" && log.RecordId != null)
        {
            var targetUser = await _db.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == log.RecordId);
            targetName = targetUser?.FullName ?? targetUser?.UserName ?? log.RecordId;
        }
        else if (log.TableName == "AccomplishmentReports" && log.RecordId != null && int.TryParse(log.RecordId, out var reportId))
        {
            var targetReport = await _db.AccomplishmentReports.AsNoTracking().FirstOrDefaultAsync(r => r.ReportId == reportId);
            targetName = targetReport?.Title ?? $"Report #{reportId}";
        }
        else if (log.TableName == "ApprovalTeams" && log.RecordId != null && int.TryParse(log.RecordId, out var teamId))
        {
            var team = await _db.ApprovalTeams.AsNoTracking().FirstOrDefaultAsync(t => t.Id == teamId);
            targetName = team?.Name ?? $"Team #{teamId}";
        }
        else if (log.TableName == "Departments" && log.RecordId != null && int.TryParse(log.RecordId, out var deptId))
        {
            var dept = await _db.Departments.AsNoTracking().FirstOrDefaultAsync(d => d.Id == deptId);
            targetName = dept?.Name ?? $"Department #{deptId}";
        }
        else if (log.TableName == "ApprovalTeamMembers" && log.RecordId != null && int.TryParse(log.RecordId, out var memberId))
        {
            var member = await _db.ApprovalTeamMembers.Include(m => m.User).AsNoTracking().FirstOrDefaultAsync(m => m.Id == memberId);
            targetName = member?.User?.FullName ?? member?.User?.UserName ?? $"Member #{memberId}";
        }
        else if (log.TableName == "ApprovalTeamApprovers" && log.RecordId != null && int.TryParse(log.RecordId, out var approverId))
        {
            var approver = await _db.ApprovalTeamApprovers.Include(a => a.User).AsNoTracking().FirstOrDefaultAsync(a => a.Id == approverId);
            targetName = approver?.User?.FullName ?? approver?.User?.UserName ?? $"Approver #{approverId}";
        }

        return new
        {
            id = log.AuditId,
            log.AuditId,
            log.TableName,
            log.RecordId,
            TargetName = targetName,
            log.Action,
            log.OldData,
            log.NewData,
            log.ChangedBy,
            ChangedByName = name,
            log.ChangedAt
        };
    }
}
