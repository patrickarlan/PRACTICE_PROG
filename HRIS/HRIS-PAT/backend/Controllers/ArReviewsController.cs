using System.Security.Claims;
using backend.DTOs;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Authorize(AuthenticationSchemes = "Identity.Bearer,Bearer", Policy = "CanViewARReview")]
[ApiController]
[Route("api/ar-reviews")]
public class ArReviewsController : ControllerBase
{
    private readonly IAccomplishmentReportService _svc;
    private readonly UserManager<ApplicationUser> _userManager;

    public ArReviewsController(IAccomplishmentReportService svc, UserManager<ApplicationUser> userManager)
    {
        _svc = svc;
        _userManager = userManager;
    }

    [HttpGet("debug")]
    [AllowAnonymous]
    public async Task<IActionResult> Debug()
    {
        var user = User;
        var claims = user.Claims.Select(c => new { c.Type, c.Value }).ToList();
        var roles = user.FindAll(ClaimTypes.Role).Select(c => c.Value).ToList();
        var name = user.FindFirstValue(ClaimTypes.NameIdentifier);
        
        return Ok(new { 
            IsAuthenticated = user.Identity?.IsAuthenticated,
            AuthenticationType = user.Identity?.AuthenticationType,
            UserId = name,
            Roles = roles,
            Claims = claims 
        });
    }

    private bool TryGetUserId(out string userId)
    {
        userId = User?.FindFirstValue(ClaimTypes.NameIdentifier) ?? string.Empty;
        return !string.IsNullOrEmpty(userId);
    }

    [HttpGet]
    public async Task<IActionResult> Get(
        [FromQuery] string? q,
        [FromQuery] string? status,
        [FromQuery] string? reportDate,
        [FromQuery] string? reportId,
        [FromQuery] string? department,
        [FromQuery] string? position,
        [FromQuery(Name = "_sort")] string? sort,
        [FromQuery(Name = "_order")] string? order,
        [FromQuery(Name = "_start")] int? start,
        [FromQuery(Name = "_end")] int? end,
        [FromQuery(Name = "_page")] int? page,
        [FromQuery(Name = "_perPage")] int? perPage
    )
    {
        if (!TryGetUserId(out var currentUserId))
            return Unauthorized(ApiResponse<object>.ErrorResponse("User identification failed."));

        // Map 'pending' filter value (from UI) to 'Submitted' (in DB)
        var searchStatus = status;
        if (status?.ToLowerInvariant() == "submitted" || status?.ToLowerInvariant() == "pending")
        {
            searchStatus = "Pending";
        }
        else if (status?.ToLowerInvariant() == "approved")
        {
            searchStatus = "Approved";
        }
        else if (status?.ToLowerInvariant() == "rejected" || status?.ToLowerInvariant() == "returned")
        {
            searchStatus = "Returned";
        }
        else if (status?.ToLowerInvariant() == "draft")
        {
            searchStatus = "Draft";
        }

        var queue = (await _svc.GetReviewQueueAsync(currentUserId, q, searchStatus, reportDate, reportId, department, position)).ToList();
        var total = queue.Count;

        queue = SortObjects(queue, sort, order).ToList();

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
            queue = queue.Skip(skip).Take(take).ToList();
        }

        Response.Headers["X-Total-Count"] = total.ToString();
        Response.Headers["Access-Control-Expose-Headers"] = "X-Total-Count";

        return Ok(ApiResponse<IEnumerable<object>>.SuccessResponse(queue));
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

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        if (!TryGetUserId(out var currentUserId))
            return Unauthorized(ApiResponse<object>.ErrorResponse("User identification failed."));

        var review = await _svc.GetReviewReportAsync(id, currentUserId);
        if (review == null)
        {
            return Forbid();
        }

        return Ok(ApiResponse<object>.SuccessResponse(review));
    }

    [HttpPatch("{id}/mark-viewed")]
    public async Task<IActionResult> MarkViewed(int id)
    {
        if (!TryGetUserId(out var currentUserId))
            return Unauthorized(ApiResponse<object>.ErrorResponse("User identification failed."));

        var user = await _userManager.FindByIdAsync(currentUserId);
        if (user == null)
            return Unauthorized(ApiResponse<object>.ErrorResponse("User not found."));

        var roles = await _userManager.GetRolesAsync(user);
        var isViewer = roles.Contains("Viewer") || roles.Contains("SuperAdmin");
        if (!isViewer)
            return Ok(ApiResponse<object>.SuccessResponse(new { stamped = false, reason = "not-viewer" }));

        var stamped = await _svc.MarkViewedAsync(id, currentUserId);
        return Ok(ApiResponse<object>.SuccessResponse(new { stamped }));
    }
}
