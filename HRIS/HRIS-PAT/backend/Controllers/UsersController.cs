using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.DTOs;
using System.Security.Claims;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UsersController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;

    public UsersController(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers([FromQuery] string? q)
    {
        var adminUsers = await _userManager.GetUsersInRoleAsync("HR Management");
        var superAdmins = await _userManager.GetUsersInRoleAsync("SuperAdmin");
        var viewers = await _userManager.GetUsersInRoleAsync("Viewer");

        var users = adminUsers
            .Concat(superAdmins)
            .Concat(viewers)
            .GroupBy(u => u.Id)
            .Select(g => g.First())
            .ToList();

        if (!string.IsNullOrWhiteSpace(q))
        {
            users = users.Where(u =>
                (u.FullName ?? u.UserName ?? string.Empty).Contains(q, StringComparison.OrdinalIgnoreCase)
                || (u.Email ?? string.Empty).Contains(q, StringComparison.OrdinalIgnoreCase)
                || (u.Department ?? string.Empty).Contains(q, StringComparison.OrdinalIgnoreCase)
            ).ToList();
        }

        var result = new List<object>();

        foreach (var u in users)
        {
            var claims = await _userManager.GetClaimsAsync(u);
            result.Add(new
            {
                id = u.Id,
                name = u.FullName ?? u.UserName,
                email = u.Email,
                department = u.Department,
                position = u.Position,

                claims = claims.Select(c => new { c.Type, c.Value }),
                isActive = u.IsActive,
                isDeactivated = !u.IsActive,
                status = u.IsActive ? "Active" : "Inactive"
            });
        }
        return Ok(ApiResponse<IEnumerable<object>>.SuccessResponse(result));
    }

    [HttpGet("discovery")]
    public async Task<IActionResult> GetDiscoveryList([FromQuery] string? q)
    {
        var query = _userManager.Users.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(q))
        {
            query = query.Where(u =>
                (u.FullName ?? string.Empty).Contains(q, StringComparison.OrdinalIgnoreCase) ||
                (u.Email ?? string.Empty).Contains(q, StringComparison.OrdinalIgnoreCase)
            );
        }

        var users = await query
            .OrderBy(u => u.FullName ?? u.UserName)
            .Select(u => new
            {
                id = u.Id,
                name = u.FullName ?? u.UserName ?? "Unknown",
                email = u.Email,
                department = u.Department,
                position = u.Position
            })
            .ToListAsync();

        return Ok(ApiResponse<IEnumerable<object>>.SuccessResponse(users));
    }
}
