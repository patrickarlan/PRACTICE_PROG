using backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Services;

public interface IAccomplishmentReportService
{
    Task<IEnumerable<AccomplishmentReport>> GetByUserAsync(string userId);
    Task<AccomplishmentReport?> GetByIdAsync(int id);
    Task<AccomplishmentReport> CreateAsync(AccomplishmentReport report);
    Task<IEnumerable<object>> GetAllReportsAsync(string currentUserId, string? q = null, string? status = null, string? reportDate = null);
    Task<IEnumerable<backend.DTOs.ReviewQueueItemDto>> GetReviewQueueAsync(
        string currentUserId,
        string? q = null,
        string? status = null,
        string? reportDate = null,
        string? reportId = null,
        string? department = null,
        string? position = null
    );
    Task<object?> GetReviewReportAsync(int reportId, string currentUserId);
    Task<bool> UpdateAsync(AccomplishmentReport report);
    Task<bool> DeleteAsync(int id, string deletedByUserId);
    Task<object?> GetGroupedReportByIdAsync(int id);
    Task UpdateGroupedReportAsync(int reportId, object updateData, bool isAdminCorrection = false);
    Task UpdateGroupedReportStatusAsync(int reportId, string status, string? returnFeedback = null, string? reviewerId = null);
    Task<backend.DTOs.DashboardDto> GetDashboardStatsAsync(string userId, string? range = null);
    Task<bool> MarkViewedAsync(int reportId, string viewerUserId);
    Task<bool> IsManagementAsync(ApplicationUser user);
    Task<bool> IsApproverAsync(ApplicationUser user);
    Task<AccomplishmentReport?> FindByIdempotencyKeyAsync(Guid idempotencyKey);
    Task<byte[]> ExportToExcelAsync(List<int>? ids = null, string? currentUserId = null, string? status = null, string? reportDate = null, bool isAdmin = false, bool isApprover = false, bool isManagement = false, string? q = null, string? department = null);
}