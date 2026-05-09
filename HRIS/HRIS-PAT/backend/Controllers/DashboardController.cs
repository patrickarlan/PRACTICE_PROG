using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly IAccomplishmentReportService _arService;

    public DashboardController(IAccomplishmentReportService arService)
    {
        _arService = arService;
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats([FromQuery] string? range = null)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId))
            return Unauthorized(ApiResponse<object>.ErrorResponse("User identification failed."));

        var stats = await _arService.GetDashboardStatsAsync(userId, range);
        return Ok(ApiResponse<DashboardDto>.SuccessResponse(stats));
    }
}
