using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "SuperAdmin")]
public class AuditLogsController : ControllerBase
{
    private readonly IAuditLogService _svc;

    public AuditLogsController(IAuditLogService svc)
    {
        _svc = svc;
    }

    [HttpGet]
    public async Task<IActionResult> GetAuditLogs(
        [FromQuery] string? tableName,
        [FromQuery] string? action,
        [FromQuery] string? q,
        [FromQuery(Name = "_page")] int page = 1,
        [FromQuery(Name = "_perPage")] int perPage = 10)
    {
        var (data, total) = await _svc.GetAuditLogsAsync(tableName, action, q, page, perPage);

        Response.Headers.Append("X-Total-Count", total.ToString());
        Response.Headers.Append("Access-Control-Expose-Headers", "X-Total-Count");

        return Ok(ApiResponse<IEnumerable<object>>.SuccessResponse(data));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAuditLog(int id)
    {
        var log = await _svc.GetAuditLogByIdAsync(id);
        if (log == null) return NotFound(ApiResponse<object>.ErrorResponse("Audit log not found."));

        return Ok(ApiResponse<object>.SuccessResponse(log));
    }
}
