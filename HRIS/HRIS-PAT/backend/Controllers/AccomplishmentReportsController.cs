using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using backend.DTOs;
using backend.Services;
using System.Security.Claims;
using System.Text.Json;

namespace backend.Controllers;


[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AccomplishmentReportsController : ControllerBase
{
    private readonly IAccomplishmentReportService _svc;
    private readonly UserManager<ApplicationUser> _userManager;

    public AccomplishmentReportsController(IAccomplishmentReportService svc, UserManager<ApplicationUser> userManager)
    {
        _svc = svc;
        _userManager = userManager;
    }

    private bool TryGetUserId(out string userId)
    {
        userId = User?.FindFirstValue(ClaimTypes.NameIdentifier) ?? string.Empty;
        return !string.IsNullOrEmpty(userId);
    }

    [HttpGet("debug-claims")]
    public IActionResult DebugClaims()
    {
        var claims = User.Claims.Select(c => new { c.Type, c.Value });
        return Ok(claims);
    }

    [HttpGet]
    public async Task<IActionResult> Get(
        [FromQuery] string? q,
        [FromQuery] string? status,
        [FromQuery] string? reportDate,
        [FromQuery(Name = "_sort")] string? sort,
        [FromQuery(Name = "_order")] string? order,
        [FromQuery(Name = "_start")] int? start,
        [FromQuery(Name = "_end")] int? end,
        [FromQuery(Name = "_page")] int? page,
        [FromQuery(Name = "_perPage")] int? perPage
    )
    {
        if (!TryGetUserId(out var userId))
            return Unauthorized(ApiResponse<object>.ErrorResponse("User identification failed."));

        var reports = (await _svc.GetAllReportsAsync(userId, q, status, reportDate)).ToList();
        var total = reports.Count;

        reports = SortObjects(reports, sort, order).ToList();

        int skip = 0;
        int take = total;

        if (start.HasValue || end.HasValue || page.HasValue || perPage.HasValue)
        {
            if (start.HasValue || end.HasValue)
            {
                skip = start.GetValueOrDefault(0);
                take = end.HasValue ? Math.Max(0, end.Value - skip) : total - skip;
            }
            else
            {
                var currentPage = page.GetValueOrDefault(1);
                var currentPerPage = perPage.GetValueOrDefault(10);
                skip = Math.Max(0, (currentPage - 1) * currentPerPage);
                take = currentPerPage;
            }

            reports = reports.Skip(skip).Take(take).ToList();
        }

        Response.Headers["X-Total-Count"] = total.ToString();
        Response.Headers["Access-Control-Expose-Headers"] = "X-Total-Count";

        return Ok(ApiResponse<IEnumerable<object>>.SuccessResponse(reports));
    }

    [HttpGet("export")]
    public async Task<IActionResult> Export(
        [FromQuery] string? ids,
        [FromQuery] string? status,
        [FromQuery] string? reportDate,
        [FromQuery] string? userId,
        [FromQuery] string? q,
        [FromQuery] string? department
    )
    {
        if (!TryGetUserId(out var currentUserId))
            return Unauthorized(ApiResponse<object>.ErrorResponse("User identification failed."));

        List<int>? reportIds = null;
        if (!string.IsNullOrEmpty(ids))
        {
            try
            {
                reportIds = ids.Split(',', StringSplitOptions.RemoveEmptyEntries)
                               .Select(int.Parse)
                               .ToList();
            }
            catch
            {
                return BadRequest(ApiResponse<object>.ErrorResponse("Invalid ID format in export request."));
            }
        }

        var isAdmin = User.IsInRole("SuperAdmin") || User.IsInRole("HR Management");
        var isApprover = User.IsInRole("Approver");
        var isViewer = User.IsInRole("Viewer");

        var fileBytes = await _svc.ExportToExcelAsync(
            reportIds, 
            currentUserId, 
            status, 
            reportDate, 
            isAdmin, 
            isApprover, 
            isViewer,
            q,
            department
        );
        var fileName = $"Accomplishment_Reports_{DateTime.Now:yyyyMMdd_HHmmss}.xlsx";

        return File(fileBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
    }

    private static IEnumerable<T> SortObjects<T>(IEnumerable<T> items, string? sortField, string? sortOrder)
    {
        if (string.IsNullOrWhiteSpace(sortField))
        {
            return items;
        }

        var comparer = Comparer<object?>.Create((a, b) => CompareValues(a, b));
        var sorted = items.OrderBy(item => GetPropertyValue(item, sortField.Trim()), comparer);

        return string.Equals(sortOrder, "DESC", StringComparison.OrdinalIgnoreCase)
            ? sorted.Reverse()
            : sorted;
    }

    private static object? GetPropertyValue<T>(T item, string propertyName)
    {
        var type = item?.GetType();
        if (type == null)
        {
            return null;
        }

        var property = type.GetProperty(propertyName, System.Reflection.BindingFlags.IgnoreCase | System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance);
        if (property != null)
        {
            return property.GetValue(item);
        }

        var field = type.GetField(propertyName, System.Reflection.BindingFlags.IgnoreCase | System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance);
        return field?.GetValue(item);
    }

    private static int CompareValues(object? a, object? b)
    {
        if (ReferenceEquals(a, b)) return 0;
        if (a == null) return b == null ? 0 : -1;
        if (b == null) return 1;

        if (a is IComparable comparableA && b is IComparable)
        {
            try
            {
                return comparableA.CompareTo(b);
            }
            catch
            {
                // Fall back to string comparison if direct compare fails
            }
        }

        return string.Compare(a.ToString(), b.ToString(), StringComparison.InvariantCultureIgnoreCase);
    }


    //API HANDLER FOR id
    [HttpGet("{id}")] //api/accomplishmentreports/{id}
    public async Task<IActionResult> GetById(int id)
    {
        var report = await _svc.GetGroupedReportByIdAsync(id);
        if (report == null)
        {
            return NotFound(ApiResponse<object>.ErrorResponse("Report not found."));
        }

        if (!TryGetUserId(out var currentUserId))
            return Unauthorized(ApiResponse<object>.ErrorResponse("User identification failed."));

        // Use dynamic type to safely access the properties of the anonymous object from GetGroupedReportByIdAsync
        dynamic groupedReport = report;
        string? reportUserId = groupedReport.userId;
        string? reportReceiverId = groupedReport.receiverId;

        if (reportUserId == currentUserId || reportReceiverId == currentUserId)
        {
            return Ok(ApiResponse<object>.SuccessResponse(report));
        }

        if (User.IsInRole("SuperAdmin"))
        {
            return Ok(ApiResponse<object>.SuccessResponse(report));
        }
        if (User.IsInRole("Approver"))
        {
            return Ok(ApiResponse<object>.SuccessResponse(report));
        }
        if (User.IsInRole("Viewer"))
        {
            if (string.IsNullOrEmpty(reportUserId))
                return Forbid();

            var owner = await _userManager.FindByIdAsync(reportUserId);
            var currentUser = await _userManager.FindByIdAsync(currentUserId);
            if (owner == null || currentUser == null)
                return Forbid();

            if (owner.Department == currentUser.Department)
                return Ok(ApiResponse<object>.SuccessResponse(report));
        }

        return Forbid();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] object updateData)
    {
        try
        {
            if (!TryGetUserId(out var userId))
                return Unauthorized(ApiResponse<object>.ErrorResponse("User identification failed."));

            var report = await _svc.GetByIdAsync(id);
            if (report == null) return NotFound(ApiResponse<object>.ErrorResponse("Report not found"));

            // Check if the user is the owner or an admin
            var isAdmin = User.IsInRole("SuperAdmin");
            if (!string.Equals(report.UserId, userId, StringComparison.OrdinalIgnoreCase) && !isAdmin)
            {
                return Forbid();
            }

            // Support owner canceling submitted reports back to draft
            if (TryGetStatusOnlyUpdate(updateData, out var newStatus))
            {
                if (!isAdmin && report.Status != "Pending" && report.Status != "Draft" && report.Status != "Returned" && report.Status != "Returned_Draft")
                {
                    return BadRequest(ApiResponse<object>.ErrorResponse("Only pending, draft, returned, or returned_draft reports can be canceled back to draft."));
                }

                if (!isAdmin && !newStatus.Equals("Draft", StringComparison.OrdinalIgnoreCase))
                {
                    return BadRequest(ApiResponse<object>.ErrorResponse("Invalid status transition."));
                }

                await _svc.UpdateGroupedReportStatusAsync(id, newStatus, null, userId);
                return Ok(ApiResponse<object>.SuccessResponse(new { }, "Report moved back to draft."));
            }

            // Only allow editing if it's Pending, Draft, Returned, Returned_Draft, or for Admins
            if (!isAdmin && report.Status != "Pending" && report.Status != "Draft" && report.Status != "Returned" && report.Status != "Returned_Draft")
            {
                return BadRequest(ApiResponse<object>.ErrorResponse("Only pending, draft, returned, or returned_draft reports can be edited."));
            }

            await _svc.UpdateGroupedReportAsync(id, updateData);
            return Ok(ApiResponse<object>.SuccessResponse(new { }, "Report updated successfully."));
        }
        catch (Exception ex)
        {
            return BadRequest(ApiResponse<object>.ErrorResponse(ex.Message));
        }
    }

    [HttpPut("{id}/correct")]
    [Authorize(Roles = "SuperAdmin")]
    public async Task<IActionResult> AdminCorrectReport(int id, [FromBody] object updateData)
    {
        try
        {
            var report = await _svc.GetByIdAsync(id);
            if (report == null) return NotFound(ApiResponse<object>.ErrorResponse("Report not found"));

            await _svc.UpdateGroupedReportAsync(id, updateData, true);
            return Ok(ApiResponse<object>.SuccessResponse(new { }, "Report corrected successfully by Admin."));
        }
        catch (Exception ex)
        {
            return BadRequest(ApiResponse<object>.ErrorResponse(ex.Message));
        }
    }


    private static bool TryGetStatusOnlyUpdate(object updateData, out string status)
    {
        status = string.Empty;
        try
        {
            JsonElement jsonElement;
            if (updateData is JsonElement element)
            {
                jsonElement = element;
            }
            else
            {
                var json = JsonSerializer.Serialize(updateData);
                using var doc = JsonDocument.Parse(json);
                jsonElement = doc.RootElement.Clone();
            }

            if (jsonElement.ValueKind != JsonValueKind.Object)
            {
                return false;
            }

            var properties = jsonElement.EnumerateObject().ToList();
            if (properties.Count != 1)
            {
                return false;
            }

            var property = properties[0];
            if (!property.NameEquals("status"))
            {
                return false;
            }

            status = property.Value.GetString() ?? string.Empty;
            return !string.IsNullOrWhiteSpace(status);
        }
        catch
        {
            return false;
        }
    }

    [HttpPut("{id}/status")]
    [Authorize(Policy = "CanApproveAR")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateStatusDto dto)
    {
        if (!TryGetUserId(out var currentUserId))
            return Unauthorized(ApiResponse<object>.ErrorResponse("User identification failed."));

        var report = await _svc.GetByIdAsync(id);
        if (report == null)
            return NotFound(ApiResponse<object>.ErrorResponse("Report not found."));

        var isAdmin = User.IsInRole("SuperAdmin");
        if (!isAdmin && report.UserId == currentUserId)
        {
            return Forbid();
        }

        if (!ModelState.IsValid)
            return BadRequest(ApiResponse<object>.ErrorResponse("Invalid model state."));

        await _svc.UpdateGroupedReportStatusAsync(id, dto.Status, dto.ReturnFeedback, currentUserId);
        return Ok(ApiResponse<object>.SuccessResponse(new { }, "Status updated successfully."));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        if (!TryGetUserId(out var currentUserId))
            return Unauthorized(ApiResponse<object>.ErrorResponse("User identification failed."));

        var existing = await _svc.GetByIdAsync(id);
        if (existing == null)
            return NotFound(ApiResponse<object>.ErrorResponse("Report not found."));

        var isOwner = existing.UserId == currentUserId;
        var isAdmin = User.IsInRole("SuperAdmin");

        if (!isOwner && !isAdmin)
            return Forbid();

        // Standard employees can only delete if report is Pending or Draft
        if (!isAdmin && existing.Status != "Pending" && existing.Status != "Draft")
            return BadRequest(ApiResponse<object>.ErrorResponse("Only pending or draft reports can be deleted by employees."));

        var success = await _svc.DeleteAsync(id, currentUserId);

        if (!success)
            return BadRequest(ApiResponse<object>.ErrorResponse("Delete failed."));

        return Ok(ApiResponse<object>.SuccessResponse(new { id }, "Report deleted and archived successfully."));
    }


    [HttpPost]
    public async Task<IActionResult> Create([FromBody] AccomplishmentReportCreateDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ApiResponse<object>.ErrorResponse("Invalid model state."));

        if (!TryGetUserId(out var userId))
            return Unauthorized(ApiResponse<object>.ErrorResponse("User identification failed."));

        if (dto.IdempotencyKey.HasValue)
        {
            var existingReport = await _svc.FindByIdempotencyKeyAsync(dto.IdempotencyKey.Value);
            if (existingReport != null)
            {
                return Ok(ApiResponse<AccomplishmentReport>.SuccessResponse(existingReport, "Request already processed."));
            }
        }

        var model = new AccomplishmentReport
        {
            UserId = userId,
            Date = dto.Date,
            Title = dto.Title,
            Tasks = dto.Accomplishments.Select(t => new ARTask
            {
                Client = t.Client,
                TaskName = t.TaskName,
                Particulars = t.Particulars,
                StartTime = t.StartTime,
                EndTime = t.EndTime
            }).ToList(),
            Status = string.IsNullOrWhiteSpace(dto.Status) ? "Pending" : dto.Status,
            ReceiverId = dto.ReceiverId,
            ViewerId = dto.ViewerId,
            IdempotencyKey = dto.IdempotencyKey,
            BreakStartTime = dto.BreakStartTime,
            BreakEndTime = dto.BreakEndTime,
            BreakDurationMinutes = dto.BreakDurationMinutes
        };

        try
        {
            await _svc.CreateAsync(model);
            return CreatedAtAction(nameof(GetById), new { id = model.ReportId }, ApiResponse<AccomplishmentReport>.SuccessResponse(model, "Report created successfully."));
        }
        catch (DbUpdateException) when (dto.IdempotencyKey.HasValue)
        {
            // Race condition: another request with the same key succeeded just now.
            var existingReport = await _svc.FindByIdempotencyKeyAsync(dto.IdempotencyKey.Value);
            if (existingReport != null)
            {
                return Ok(ApiResponse<AccomplishmentReport>.SuccessResponse(existingReport, "Request already processed (idempotency caught by DB)."));
            }
            throw; // Re-throw if it wasn't an idempotency issue
        }
        catch (Exception ex)
        {
            return BadRequest(ApiResponse<object>.ErrorResponse(ex.Message));
        }
    }

}
