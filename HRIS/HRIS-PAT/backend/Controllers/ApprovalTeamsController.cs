using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using backend.DTOs;
using Microsoft.AspNetCore.Identity;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(AuthenticationSchemes = "Identity.Bearer,Bearer", Roles = "SuperAdmin")]
public class ApprovalTeamsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;

    public ApprovalTeamsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    /// <summary>
    /// Gets a list of approval teams with React Admin pagination/sort support.
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetApprovalTeams(
        [FromQuery] string? q = null,
        [FromQuery(Name = "_page")] int page = 1,
        [FromQuery(Name = "_perPage")] int perPage = 10,
        [FromQuery(Name = "_sort")] string? sort = null,
        [FromQuery(Name = "_order")] string? order = null)
    {
        var query = _context.ApprovalTeams.AsQueryable();

        // Search filter
        if (!string.IsNullOrEmpty(q))
        {
            query = query.Where(t => t.Name.ToLower().Contains(q.ToLower()));
        }

        // Sorting
        if (!string.IsNullOrEmpty(sort))
        {
            bool descending = order?.ToUpper() == "DESC";
            query = sort.ToLower() switch
            {
                "name" => descending ? query.OrderByDescending(t => t.Name) : query.OrderBy(t => t.Name),
                _ => descending ? query.OrderByDescending(t => t.Id) : query.OrderBy(t => t.Id)
            };
        }
        else
        {
            query = query.OrderBy(t => t.Id);
        }

        var total = await query.CountAsync();
        var teams = await query
            .Include(t => t.Members)
            .Include(t => t.Approvers).ThenInclude(a => a.User)
            .Skip((page - 1) * perPage)
            .Take(perPage)
            .ToListAsync();

        Response.Headers.Append("X-Total-Count", total.ToString());
        Response.Headers.Append("Access-Control-Expose-Headers", "X-Total-Count");

        return Ok(ApiResponse<IEnumerable<ApprovalTeam>>.SuccessResponse(teams));
    }

    /// <summary>
    /// Gets a single approval team by ID.
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetApprovalTeam(int id)
    {
        var team = await _context.ApprovalTeams
            .Include(t => t.Members)
            .Include(t => t.Approvers).ThenInclude(a => a.User)
            .FirstOrDefaultAsync(t => t.Id == id);
        
        if (team == null)
        {
            return NotFound(ApiResponse<object>.ErrorResponse("Approval team not found."));
        }

        return Ok(ApiResponse<ApprovalTeam>.SuccessResponse(team));
    }

    /// <summary>
    /// Creates a new approval team.
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> CreateApprovalTeam([FromBody] ApprovalTeam team)
    {
        // Uniqueness check
        var normalizedName = team.Name.Trim().ToLower();
        if (await _context.ApprovalTeams.AnyAsync(t => t.Name.ToLower() == normalizedName))
        {
            return BadRequest(ApiResponse<object>.ErrorResponse($"A team with the name '{team.Name}' already exists."));
        }

        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
            Console.WriteLine($"[VALIDATION ERROR] {string.Join(", ", errors)}");
            return BadRequest(ApiResponse<object>.ErrorResponse($"Validation failed: {string.Join(", ", errors)}"));
        }

        // PHASE 24/25: Assignment Validations
        if (team.Approvers != null && team.Approvers.Any())
        {
            var approverIds = team.Approvers.Select(a => a.UserId).ToHashSet();
            var memberIds = team.Members?.Select(m => m.UserId).ToHashSet() ?? new HashSet<string>();

            // 1. Self-Approval Check (Cannot be Member and Approver in the same team)
            foreach (var approverId in approverIds)
            {
                if (memberIds.Contains(approverId))
                {
                    var user = await _userManager.FindByIdAsync(approverId);
                    return BadRequest(ApiResponse<object>.ErrorResponse(
                        $"User '{user?.FullName ?? user?.UserName ?? "User"}' cannot be assigned as an Approver because they are already a Creator (Member) of this team. Self-approval is not allowed."));
                }
            }
        }

        _context.ApprovalTeams.Add(team);
        
        // PHASE 23: Sync ApplicationUser.ApprovalTeamId for initial members
        if (team.Members != null && team.Members.Any())
        {
            var memberIds = team.Members.Select(m => m.UserId).ToList();
            var users = await _context.Users.Where(u => memberIds.Contains(u.Id)).ToListAsync();
            foreach(var u in users)
            {
                u.ApprovalTeamId = team.Id;
            }
        }

        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetApprovalTeam), new { id = team.Id }, ApiResponse<ApprovalTeam>.SuccessResponse(team, "Approval team created successfully."));
    }

    /// <summary>
    /// Updates an existing approval team.
    /// </summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateApprovalTeam(int id, [FromBody] ApprovalTeam team)
    {
        if (id != team.Id)
        {
            return BadRequest(ApiResponse<object>.ErrorResponse("ID mismatch."));
        }

        var existingTeam = await _context.ApprovalTeams
            .Include(t => t.Members)
            .Include(t => t.Approvers)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (existingTeam == null)
        {
            return NotFound(ApiResponse<object>.ErrorResponse("Approval team not found."));
        }

        var normalizedName = team.Name.Trim().ToLower();
        if (await _context.ApprovalTeams.AnyAsync(t => t.Name.ToLower() == normalizedName && t.Id != id))
        {
            return BadRequest(ApiResponse<object>.ErrorResponse($"Another team with the name '{team.Name}' already exists."));
        }

        existingTeam.Name = team.Name;
        existingTeam.DepartmentId = team.DepartmentId;

        // PHASE 23: Sync ApplicationUser.ApprovalTeamId for the Employee List
        // 1. Reset old members (those who were in this team but might have been removed)
        var oldMemberIds = await _context.ApprovalTeamMembers
            .Where(m => m.ApprovalTeamId == id)
            .Select(m => m.UserId)
            .ToListAsync();

        if (oldMemberIds.Any())
        {
            var oldUsers = await _context.Users.Where(u => oldMemberIds.Contains(u.Id)).ToListAsync();
            foreach(var u in oldUsers) u.ApprovalTeamId = null;
        }

        // 2. Clear old junction table entries
        _context.ApprovalTeamMembers.RemoveRange(existingTeam.Members);
        existingTeam.Members.Clear();
        
        // Use a set to prevent duplicates from the frontend
        var uniqueMemberIds = team.Members?.Select(m => m.UserId).Where(uid => !string.IsNullOrEmpty(uid)).Distinct() ?? Enumerable.Empty<string>();

        // 3. Add new junction table entries AND sync User field
        var uniqueMemberIdsList = uniqueMemberIds.ToList();
        if (uniqueMemberIdsList.Any())
        {
            var newUsers = await _context.Users.Where(u => uniqueMemberIdsList.Contains(u.Id)).ToListAsync();
            foreach (var userId in uniqueMemberIdsList)
            {
                existingTeam.Members.Add(new ApprovalTeamMember
                {
                    UserId = userId,
                    ApprovalTeamId = id
                });

                var targetUser = newUsers.FirstOrDefault(u => u.Id == userId);
                if (targetUser != null)
                {
                    targetUser.ApprovalTeamId = id;
                }
            }
        }

        // PHASE 24/25: Assignment Validations
        var uniqueApproverIdsFromData = team.Approvers?.Select(a => a.UserId).Where(uid => !string.IsNullOrEmpty(uid)).Distinct().ToList() ?? new List<string>();
        
        if (uniqueApproverIdsFromData.Any())
        {
            var approverIds = new HashSet<string>(uniqueApproverIdsFromData);
            
            // 1. Self-Approval Check (Cannot be Member and Approver in the same team)
            foreach (var approverId in approverIds)
            {
                if (uniqueMemberIds.Contains(approverId))
                {
                    var user = await _userManager.FindByIdAsync(approverId);
                    return BadRequest(ApiResponse<object>.ErrorResponse(
                        $"User '{user?.FullName ?? user?.UserName ?? "User"}' cannot be assigned as an Approver because they are already a Creator (Member) of this team. Self-approval is not allowed."));
                }
            }
        }

        _context.ApprovalTeamApprovers.RemoveRange(existingTeam.Approvers);
        existingTeam.Approvers.Clear();
        
        var approversFromData = team.Approvers?.Select(a => new { a.UserId, a.Order }).Where(x => !string.IsNullOrEmpty(x.UserId)).Distinct().ToList();
        
        if (approversFromData != null)
        {
            foreach (var approver in approversFromData)
            {
                string uid = approver.UserId;
                existingTeam.Approvers.Add(new ApprovalTeamApprover
                {
                    UserId = uid,
                    Order = approver.Order,
                    ApprovalTeamId = id
                });

                // PHASE 24: Auto-Role Sync
                // Ensure the user actually has the "Approver" role in Identity
                var targetUser = await _userManager.FindByIdAsync(uid);
                if (targetUser != null && !await _userManager.IsInRoleAsync(targetUser, "Approver"))
                {
                    await _userManager.AddToRoleAsync(targetUser, "Approver");
                }
            }
        }

        try
        {
            await _context.SaveChangesAsync();
            
            // Re-fetch with all includes to ensure navigation properties (like User) are populated for the UI
            var updatedTeam = await _context.ApprovalTeams
                .Include(t => t.Members)
                .Include(t => t.Approvers).ThenInclude(a => a.User)
                .FirstOrDefaultAsync(t => t.Id == id);

            return Ok(ApiResponse<ApprovalTeam>.SuccessResponse(updatedTeam!, "Approval team updated successfully."));
        }
        catch (DbUpdateException ex)
        {
            var innerMessage = ex.InnerException?.Message ?? ex.Message;
            Console.WriteLine($"[DB ERROR] {innerMessage}");
            return StatusCode(500, ApiResponse<object>.ErrorResponse($"Database Error: {innerMessage}"));
        }
        catch (Exception ex)
        {
            return StatusCode(500, ApiResponse<object>.ErrorResponse($"Failed to update team: {ex.Message}"));
        }
    }

    /// <summary>
    /// Deletes an approval team.
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteApprovalTeam(int id)
    {
        var team = await _context.ApprovalTeams.FindAsync(id);
        if (team == null)
        {
            return NotFound(ApiResponse<object>.ErrorResponse("Approval team not found."));
        }

        _context.ApprovalTeams.Remove(team);
        await _context.SaveChangesAsync();

        return Ok(ApiResponse<object>.SuccessResponse(new { id }, "Approval team deleted successfully."));
    }

    /// <summary>
    /// Adds a member to an approval team.
    /// </summary>
    [HttpPost("{id}/members")]
    public async Task<IActionResult> AddTeamMember(int id, [FromBody] TeamMemberRequest request)
    {
        var team = await _context.ApprovalTeams.FindAsync(id);
        if (team == null) return NotFound(ApiResponse<object>.ErrorResponse("Team not found."));

        var user = await _userManager.FindByIdAsync(request.UserId);
        if (user == null) return NotFound(ApiResponse<object>.ErrorResponse("User not found."));

        // Check if already a member of ANY team (PHASE 23: User belongs to only one team as Member)
        var existingMember = await _context.ApprovalTeamMembers.FirstOrDefaultAsync(m => m.UserId == request.UserId);
        if (existingMember != null)
        {
            if (existingMember.ApprovalTeamId == id)
            {
                return Ok(ApiResponse<object>.SuccessResponse(null, "User is already a member of this team."));
            }
            
            // Reassign if in another team
            _context.ApprovalTeamMembers.Remove(existingMember);
        }

        // Add to junction table
        _context.ApprovalTeamMembers.Add(new ApprovalTeamMember
        {
            ApprovalTeamId = id,
            UserId = request.UserId
        });

        // Sync User field
        user.ApprovalTeamId = id;

        await _context.SaveChangesAsync();
        await _userManager.UpdateAsync(user);

        return Ok(ApiResponse<object>.SuccessResponse(null, "User added to team successfully."));
    }
}
