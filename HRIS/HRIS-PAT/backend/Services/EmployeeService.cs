using backend.Models;
using backend.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Text.Json;
using backend.Data;
using System.Security.Claims;
using backend.Services.utils;

namespace backend.Services;

public class EmployeeService : IEmployeeService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ApplicationDbContext _context;

    public EmployeeService(
        UserManager<ApplicationUser> userManager,
        ApplicationDbContext context)
    {
        _userManager = userManager;
        _context = context;
    }

    public async Task<(IEnumerable<object> Data, int Total)> GetAllEmployeesAsync(string currentUserId, string? query = null, string? role = null, string? status = null, int page = 1, int perPage = 10, string? sort = null, string? order = null, string? department = null, bool? missingDepartment = null, bool? missingTeam = null)
    {
        var currentUser = await _userManager.FindByIdAsync(currentUserId);
        if (currentUser == null) return (new List<object>(), 0);

        var roles = await _userManager.GetRolesAsync(currentUser);

        IQueryable<ApplicationUser> dbQuery = _userManager.Users.Where(u => !u.IsDeleted);

        var isPrivilegedAdmin = roles.Contains("SuperAdmin");
        if (!isPrivilegedAdmin)
        {
            dbQuery = dbQuery.Where(u => u.Department == currentUser!.Department);
        }

        if (missingDepartment == true)
        {
            dbQuery = dbQuery.Where(u => u.DepartmentId == null && u.Email != "admin@hris.local");
        }

        if (missingTeam == true)
        {
            // A user shows in Integrity if they are not assigned to a team as a Creator (Member).
            // This applies to Employees and Approvers, as they both submit reports.
            // We exclude SuperAdmins and Viewers, as they are oversight roles and do not submit reports.
            dbQuery = dbQuery.Where(u => 
                u.ApprovalTeamId == null && 
                u.Email != "admin@hris.local" &&
                !_context.UserRoles.Any(ur => ur.UserId == u.Id && _context.Roles.Any(r => r.Id == ur.RoleId && (r.Name == "SuperAdmin" || r.Name == "Viewer")))
            );
        }

        if (!string.IsNullOrWhiteSpace(query))
        {
            var normalized = query.ToLowerInvariant();
            dbQuery = dbQuery.Where(u =>
                (u.FullName ?? string.Empty).ToLower().Contains(normalized)
                || (u.UserName ?? string.Empty).ToLower().Contains(normalized)
                || (u.Email ?? string.Empty).ToLower().Contains(normalized)
                || (u.Position ?? string.Empty).ToLower().Contains(normalized)
                || (u.Department ?? string.Empty).ToLower().Contains(normalized)
            );
        }

        var users = await dbQuery.ToListAsync();
        var userIds = users.Select(u => u.Id).ToList();

        var allUserRoles = await _context.UserRoles
            .Join(_context.Roles, ur => ur.RoleId, r => r.Id, (ur, r) => new { ur.UserId, r.Name })
            .Where(x => userIds.Contains(x.UserId))
            .ToListAsync();

        var memberAssignments = await _context.ApprovalTeamMembers
            .AsNoTracking()
            .Include(m => m.ApprovalTeam)
            .Where(m => userIds.Contains(m.UserId))
            .ToListAsync();

        var approverAssignments = await _context.ApprovalTeamApprovers
            .AsNoTracking()
            .Include(a => a.ApprovalTeam)
            .Where(a => userIds.Contains(a.UserId))
            .ToListAsync();

        var resultList = new List<object>();
        foreach (var u in users)
        {
            var userRoles = allUserRoles.Where(x => x.UserId == u.Id).Select(x => x.Name!).ToList();

            var isManagement = userRoles.Contains("Viewer");
            var isApprover = userRoles.Contains("Approver");
            var isAdmin = userRoles.Contains("SuperAdmin");
            
            if (!EmployeeServiceUTILS.MatchesRoleFilter(role ?? "", isManagement, isApprover, isAdmin)) continue;

            var targetDept = EmployeeServiceUTILS.ResolveVirtualDepartment(isAdmin, isManagement, u.Department);
            if (!string.IsNullOrWhiteSpace(department) && !string.Equals(targetDept, department, StringComparison.OrdinalIgnoreCase))
            {
                continue;
            }

            var teams = new List<object>();
            int? actualApprovalTeamId = u.ApprovalTeamId;

            var m = memberAssignments.FirstOrDefault(x => x.UserId == u.Id);
            if (m?.ApprovalTeam != null) 
            {
                teams.Add(new { teamId = m.ApprovalTeamId, teamName = m.ApprovalTeam.Name, role = "Member" });
                actualApprovalTeamId = m.ApprovalTeamId;
            }

            var aList = approverAssignments.Where(x => x.UserId == u.Id).ToList();
            foreach(var a in aList)
            {
                if (a.ApprovalTeam != null)
                    teams.Add(new { teamId = a.ApprovalTeamId, teamName = a.ApprovalTeam.Name, role = "Approver" });
            }

            u.ApprovalTeamId = actualApprovalTeamId;
            resultList.Add(EmployeeServiceUTILS.MapToEmployeeListItem(u, userRoles, teams));
        }

        if (!string.IsNullOrWhiteSpace(sort))
        {
            var isDesc = string.Equals(order, "DESC", StringComparison.OrdinalIgnoreCase);
            resultList = sort.ToLowerInvariant() switch
            {
                "username" => isDesc ? resultList.OrderByDescending(x => (x as dynamic).userName).ToList() : resultList.OrderBy(x => (x as dynamic).userName).ToList(),
                "email" => isDesc ? resultList.OrderByDescending(x => (x as dynamic).email).ToList() : resultList.OrderBy(x => (x as dynamic).email).ToList(),
                "position" => isDesc ? resultList.OrderByDescending(x => (x as dynamic).position).ToList() : resultList.OrderBy(x => (x as dynamic).position).ToList(),
                "department" => isDesc ? resultList.OrderByDescending(x => (x as dynamic).department).ToList() : resultList.OrderBy(x => (x as dynamic).department).ToList(),
                "accesslevel" => isDesc ? resultList.OrderByDescending(x => (x as dynamic).accessLevel).ToList() : resultList.OrderBy(x => (x as dynamic).accessLevel).ToList(),
                _ => resultList
            };
        }

        int total = resultList.Count;
        var paginatedData = resultList
            .Skip((page - 1) * perPage)
            .Take(perPage)
            .ToList();

        return (paginatedData, total);
    }

    public async Task<(bool Succeeded, string Message)> UpdateEmployeeRoleAsync(string userId, string? role, int? approvalTeamId = null, string? currentOperatorId = null)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) return (false, "User not found.");

        if (EmployeeServiceUTILS.IsProtectedAdmin(user))
        {
            return (false, "Primary admin cannot be edited."); 
        }

        var currentRoles = await _userManager.GetRolesAsync(user);

        if (!string.IsNullOrEmpty(role))
        {
            if (role == "SuperAdmin" && !currentRoles.Contains("SuperAdmin"))
            {
                var superAdmins = await _userManager.GetUsersInRoleAsync("SuperAdmin");
                if (superAdmins.Count >= 2)
                {
                    return (false, "Maximum limit of 2 SuperAdmin accounts reached.");
                }
            }

            if (userId == currentOperatorId && currentRoles.Contains("SuperAdmin") && role != "SuperAdmin")
            {
                return (false, "You cannot remove your own SuperAdmin role.");
            }

            var validRoles = new[] { "SuperAdmin", "Approver", "Viewer", "Creator" };
            
            foreach (var r in currentRoles)
            {
                if (validRoles.Contains(r))
                {
                    if (r == "SuperAdmin" && userId == currentOperatorId && role != "SuperAdmin")
                        continue;
                    
                    await _userManager.RemoveFromRoleAsync(user, r);
                }
            }

            if (validRoles.Contains(role))
            {
                await _userManager.AddToRoleAsync(user, role);
                user.Position = role;

                // Validation: If demoting to Creator, they MUST NOT be managing any teams
                if (role == "Creator")
                {
                    var managedTeams = await _context.ApprovalTeamApprovers
                        .Include(a => a.ApprovalTeam)
                        .Where(a => a.UserId == userId)
                        .Select(a => a.ApprovalTeam != null ? a.ApprovalTeam.Name : "Unknown Team")
                        .ToListAsync();
                    
                    if (managedTeams.Any())
                    {
                        var teamNames = string.Join(", ", managedTeams);
                        return (false, $"Cannot demote this user to Creator because they are currently an active Approver for: {teamNames}. Please reassign or remove them from these teams first.");
                    }
                }

                if (role == "SuperAdmin" || role == "Viewer")
                {
                    var memberRecord = await _context.ApprovalTeamMembers.FirstOrDefaultAsync(m => m.UserId == userId);
                    if (memberRecord != null)
                    {
                        _context.ApprovalTeamMembers.Remove(memberRecord);
                        user.ApprovalTeamId = null;
                        await _context.SaveChangesAsync();
                    }
                }
            }
        }

        var existingMember = await _context.ApprovalTeamMembers.FirstOrDefaultAsync(m => m.UserId == userId);

        // Determine if we should skip team membership update
        // We only update membership if:
        // 1. A specific team ID was provided (to assign)
        // 2. null was provided BUT we are in a 'fresh start' role transition (Viewer/SuperAdmin)
        // 3. null was provided AND the user is NOT in a 'protected' role transition (Approver)
        
        bool isRoleTransitionReset = (role == "SuperAdmin" || role == "Viewer");
        
        if (isRoleTransitionReset)
        {
            // If it's a Viewer/SuperAdmin transition, we MUST ensure they have no team
            // (They can be Approvers, but not Members/Creators of a team)
            if (existingMember != null)
            {
                _context.ApprovalTeamMembers.Remove(existingMember);
            }
            user.ApprovalTeamId = null;
        }
        else if (approvalTeamId != null)
        {
            if (existingMember == null)
            {
                _context.ApprovalTeamMembers.Add(new ApprovalTeamMember 
                { 
                    UserId = userId, 
                    ApprovalTeamId = approvalTeamId.Value 
                });
            }
            else if (existingMember.ApprovalTeamId != approvalTeamId)
            {
                existingMember.ApprovalTeamId = approvalTeamId.Value;
                _context.ApprovalTeamMembers.Update(existingMember);
            }
            user.ApprovalTeamId = approvalTeamId;
        }
        // If approvalTeamId is null and NOT a transition reset, we DO NOTHING (Preserve current team)

        await _context.SaveChangesAsync();
        await _userManager.UpdateAsync(user);

        await SyncSystemDepartmentAsync(user);
        await AutoPopulateSupervisorsAsync();
        return (true, "Employee updated successfully.");
    }

    public async Task<bool> UpdateSupervisorAsync(string userId, string supervisorId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null || EmployeeServiceUTILS.IsProtectedAdmin(user)) return false;

        user.SupervisorId = supervisorId;
        var result = await _userManager.UpdateAsync(user);

        if (result.Succeeded)
        {
            await ReassignReportsToNewSupervisorAsync(userId, supervisorId);
        }

        return result.Succeeded;
    }

    public async Task<bool> UpdateViewerAsync(string userId, string viewerId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) return false;

        user.ViewerId = viewerId;
        var result = await _userManager.UpdateAsync(user);

        if (result.Succeeded)
        {
            await ReassignReportsToNewViewerAsync(userId, viewerId);
        }

        return result.Succeeded;
    }

    private async Task ReassignReportsToNewSupervisorAsync(string userId, string supervisorId)
    {
        var reports = await _context.AccomplishmentReports
            .Where(r => r.UserId == userId && !r.IsDeleted)
            .ToListAsync();

        foreach (var report in reports)
        {
            report.ReceiverId = supervisorId;
        }

        await _context.SaveChangesAsync();
    }

    private async Task ReassignReportsToNewViewerAsync(string userId, string viewerId)
    {
        var reports = await _context.AccomplishmentReports
            .Where(r => r.UserId == userId && !r.IsDeleted)
            .ToListAsync();

        foreach (var report in reports)
        {
            report.ViewerId = viewerId;
        }

        await _context.SaveChangesAsync();
    }

    public async Task<int> AutoPopulateSupervisorsAsync()
    {
        var currentApprovers = (await _userManager.GetUsersInRoleAsync("Approver"))
            .Select(u => u.Id).ToHashSet();
        var currentViewers = (await _userManager.GetUsersInRoleAsync("Viewer"))
            .Select(u => u.Id).ToHashSet();
        var currentAdmins = (await _userManager.GetUsersInRoleAsync("SuperAdmin"))
            .Select(u => u.Id).ToHashSet();

        var users = await _userManager.Users.ToListAsync();
        var departments = await _context.Departments.ToListAsync();
        int updatedCount = 0;

        foreach (var user in users)
        {
            bool changed = false;

            if (user.DepartmentId.HasValue)
            {
                var deptEntity = departments.FirstOrDefault(d => d.Id == user.DepartmentId.Value);
                if (deptEntity != null && user.Department != deptEntity.Name)
                {
                    user.Department = deptEntity.Name;
                    changed = true;
                }
            }

            bool isAdmin = currentAdmins.Contains(user.Id);
            bool isApprover = currentApprovers.Contains(user.Id);
            bool isManagement = currentViewers.Contains(user.Id);

            if (!isAdmin)
            {
                bool needsSup = string.IsNullOrEmpty(user.SupervisorId);
                if (!needsSup)
                {
                    bool supStillValid = isApprover
                        ? currentAdmins.Contains(user.SupervisorId!)
                        : currentApprovers.Contains(user.SupervisorId!);
                    if (!supStillValid) needsSup = true;
                }

                if (needsSup)
                {
                    var supervisorId = await GetDefaultSupervisorIdAsync(user);
                    if (!string.IsNullOrEmpty(supervisorId) && supervisorId != user.SupervisorId)
                    {
                        user.SupervisorId = supervisorId;
                        changed = true;
                    }
                }

                bool needsViewer = string.IsNullOrEmpty(user.ViewerId);
                if (!needsViewer && !isManagement)
                {
                    bool viewerStillValid = currentViewers.Contains(user.ViewerId!);
                    if (!viewerStillValid) needsViewer = true;
                }

                if (needsViewer && !isManagement)
                {
                    var viewerId = await GetDefaultViewerIdAsync(user);
                    if (!string.IsNullOrEmpty(viewerId) && viewerId != user.ViewerId)
                    {
                        user.ViewerId = viewerId;
                        changed = true;
                    }
                }
            }

            if (changed)
            {
                var result = await _userManager.UpdateAsync(user);
                if (result.Succeeded)
                {
                    if (!string.IsNullOrEmpty(user.SupervisorId))
                        await ReassignReportsToNewSupervisorAsync(user.Id, user.SupervisorId);
                    if (!string.IsNullOrEmpty(user.ViewerId))
                        await ReassignReportsToNewViewerAsync(user.Id, user.ViewerId);
                        
                    updatedCount++;
                }
            }
        }

        return updatedCount;
    }

    private async Task<string?> GetDefaultSupervisorIdAsync(ApplicationUser user)
    {
        var roles = await _userManager.GetRolesAsync(user);
        bool isAdmin = roles.Contains("SuperAdmin");
        bool isApprover = roles.Contains("Approver");

        if (isAdmin) return null;

        var approvers = await _userManager.GetUsersInRoleAsync("Approver");
        
        var deptApprover = approvers.FirstOrDefault(u => 
            u.Id != user.Id && 
            u.Department == user.Department && 
            !_context.UserRoles.Any(ur => ur.UserId == u.Id && _context.Roles.Any(r => r.Id == ur.RoleId && r.Name == "Viewer"))
        );
        
        if (deptApprover != null && !isApprover) return deptApprover.Id;

        var middleMgmt = approvers.FirstOrDefault(u => 
            u.Id != user.Id && 
            _context.UserRoles.Any(ur => ur.UserId == u.Id && _context.Roles.Any(r => r.Id == ur.RoleId && r.Name == "Viewer"))
        );
        if (middleMgmt != null) return middleMgmt.Id;

        var superAdmins = await _userManager.GetUsersInRoleAsync("SuperAdmin");
        var adminMatch = superAdmins.Where(u => u.Id != user.Id)
                                    .OrderBy(u => (u.FullName ?? u.UserName ?? "").ToLower().Contains("admin") ? 1 : 0)
                                    .FirstOrDefault();

        return adminMatch?.Id;
    }

    private async Task<string?> GetDefaultViewerIdAsync(ApplicationUser user)
    {
        var roles = await _userManager.GetRolesAsync(user);
        bool isAdmin = roles.Contains("SuperAdmin");
        bool isViewer = roles.Contains("Viewer");

        if (isAdmin || isViewer) return null;

        var viewers = await _userManager.GetUsersInRoleAsync("Viewer");

        if (!viewers.Any())
        {
            viewers = await _userManager.GetUsersInRoleAsync("SuperAdmin");
        }

        if (!viewers.Any())
        {
            viewers = await _userManager.GetUsersInRoleAsync("Approver");
        }

        if (!viewers.Any()) return null;

        var match = viewers.Where(u => u.Id != user.Id)
                           .OrderBy(u => u.Department == user.Department ? 0 : 1)
                           .FirstOrDefault();

        return match?.Id;
    }

    public async Task<object?> GetEmployeeByIdAsync(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null) return null;

        var userRoles = await _userManager.GetRolesAsync(user);

        var teams = new List<object>();
        int? actualApprovalTeamId = user.ApprovalTeamId;

        var m = await _context.ApprovalTeamMembers
            .AsNoTracking()
            .Include(mt => mt.ApprovalTeam)
            .FirstOrDefaultAsync(mt => mt.UserId == user.Id);
        if (m?.ApprovalTeam != null)
        {
            teams.Add(new { teamId = m.ApprovalTeamId, teamName = m.ApprovalTeam.Name, role = "Member" });
            actualApprovalTeamId = m.ApprovalTeamId;
        }

        var aList = await _context.ApprovalTeamApprovers
            .AsNoTracking()
            .Include(at => at.ApprovalTeam)
            .Where(at => at.UserId == user.Id)
            .ToListAsync();
        foreach(var a in aList)
        {
            if (a.ApprovalTeam != null)
                teams.Add(new { teamId = a.ApprovalTeamId, teamName = a.ApprovalTeam.Name, role = "Approver" });
        }

        user.ApprovalTeamId = actualApprovalTeamId;

        return EmployeeServiceUTILS.MapToEmployeeListItem(user, userRoles, teams);
    }

    public async Task<(bool Succeeded, string Message)> CreateEmployeeAsync(ApplicationUser user, string password, string role)
    {
        string backendRole = role == "Manager" || role == "SuperAdmin" ? "SuperAdmin" : "Creator";
        
        if (backendRole == "SuperAdmin")
        {
            var superAdmins = await _userManager.GetUsersInRoleAsync("SuperAdmin");
            if (superAdmins.Count >= 2)
            {
                return (false, "Maximum limit of 2 SuperAdmin accounts reached.");
            }
            user.Department = "Administration";
        }
        user.Position = backendRole; // Force Position to match Role on creation
        user.IsActive = true;

        var result = await _userManager.CreateAsync(user, password);
        if (result.Succeeded)
        {
            var roleResult = await _userManager.AddToRoleAsync(user, backendRole);
            if (!roleResult.Succeeded)
            {
                await _userManager.DeleteAsync(user); 
                return (false, string.Join(", ", roleResult.Errors.Select(e => e.Description)));
            }

            var supervisorId = await GetDefaultSupervisorIdAsync(user);
            var viewerId = await GetDefaultViewerIdAsync(user);

            if (!string.IsNullOrEmpty(supervisorId) || !string.IsNullOrEmpty(viewerId))
            {
                await _context.Database.ExecuteSqlRawAsync(
                    @"UPDATE ""AspNetUsers"" SET ""SupervisorId"" = {0}, ""ViewerId"" = {1} WHERE ""Id"" = {2}",
                    string.IsNullOrEmpty(supervisorId) ? (object)DBNull.Value : supervisorId,
                    string.IsNullOrEmpty(viewerId) ? (object)DBNull.Value : viewerId,
                    user.Id);
            }

            await SyncSystemDepartmentAsync(user);
            return (true, "Success");

        }
        return (false, string.Join(", ", result.Errors.Select(e => e.Description)));
    }

    private async Task SyncSystemDepartmentAsync(ApplicationUser user)
    {
        var roles = await _userManager.GetRolesAsync(user);
        bool isAdmin = roles.Contains("SuperAdmin");
        bool isViewer = roles.Contains("Viewer");

        if (isAdmin)
        {
            var adminDept = await _context.Departments.FirstOrDefaultAsync(d => d.Code == "ADMIN" && d.IsSystem);
            if (adminDept != null && user.DepartmentId != adminDept.Id)
            {
                user.DepartmentId = adminDept.Id;
                user.Department = adminDept.Name;
            }
        }
        else if (isViewer)
        {
            var pmDept = await _context.Departments.FirstOrDefaultAsync(d => d.Code == "PM" && d.IsSystem);
            if (pmDept != null && user.DepartmentId != pmDept.Id)
            {
                user.DepartmentId = pmDept.Id;
                user.Department = pmDept.Name;
            }
        }
        
        // Only update if changes were made to the user object
        if (_context.Entry(user).State == EntityState.Modified)
        {
            await _userManager.UpdateAsync(user);
        }
    }

    public async Task<IDictionary<string, IEnumerable<object>>> GetRolesMapAsync()
    {
        var approvers = await _userManager.GetUsersInRoleAsync("Approver");
        var viewers = await _userManager.GetUsersInRoleAsync("Viewer");
        var superAdmins = await _userManager.GetUsersInRoleAsync("SuperAdmin");

        var map = new Dictionary<string, IEnumerable<object>>();

        var managementIds = viewers.Select(v => v.Id).ToHashSet();

        map["Approver"] = approvers.Select(u => new {
            id = u.Id,
            userName = u.FullName ?? u.UserName,
            department = EmployeeServiceUTILS.ResolveVirtualDepartment(false, managementIds.Contains(u.Id), u.Department)
        });
        map["Viewer"] = viewers.Select(u => new { id = u.Id, userName = u.FullName ?? u.UserName, department = "Project Manager" });
        map["SuperAdmin"] = superAdmins.Select(u => new { id = u.Id, userName = u.FullName ?? u.UserName, department = "Administration" });

        return map;
    }

    public async Task<(bool Succeeded, string Message)> UpdateEmployeeProfileAsync(string id, UpdateEmployeeProfileDto dto)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null) return (false, "User not found.");

        if (!string.IsNullOrWhiteSpace(dto.FullName)) user.FullName = dto.FullName;
        
        if (dto.DepartmentId.HasValue) 
        {
            user.DepartmentId = dto.DepartmentId.Value;
            var deptEntity = await _context.Departments.FindAsync(dto.DepartmentId.Value);
            if (deptEntity != null)
            {
                user.Department = deptEntity.Name;
            }
        }
        else if (!string.IsNullOrWhiteSpace(dto.Department)) 
        {
            user.Department = dto.Department;
        }

        if (!string.IsNullOrWhiteSpace(dto.Email))
        {
            user.Email = dto.Email;
            user.UserName = dto.Email;
            user.NormalizedEmail = dto.Email.ToUpperInvariant();
            user.NormalizedUserName = dto.Email.ToUpperInvariant();
        }

        await SyncSystemDepartmentAsync(user);
        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
            return (false, string.Join(", ", result.Errors.Select(e => e.Description)));

        if (!string.IsNullOrWhiteSpace(dto.NewPassword))
        {
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var pwResult = await _userManager.ResetPasswordAsync(user, token, dto.NewPassword);
            if (!pwResult.Succeeded)
                return (false, "Profile saved but password update failed: " +
                    string.Join(", ", pwResult.Errors.Select(e => e.Description)));
        }

        return (true, "Employee profile updated successfully.");
    }

    public async Task<(bool Succeeded, string Message)> DeleteEmployeeAsync(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null) return (false, "User not found.");

        user.IsDeleted = true;
        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
            return (false, string.Join(", ", result.Errors.Select(e => e.Description)));

        return (true, "Employee deleted successfully.");
    }

    public async Task<(bool Succeeded, string Message)> DeactivateEmployeeAsync(string id, bool deactivate)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null) return (false, "User not found.");

        user.IsActive = !deactivate;
        user.LockoutEnabled = true;
        user.LockoutEnd = deactivate ? DateTimeOffset.MaxValue : null;

        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
            return (false, string.Join(", ", result.Errors.Select(e => e.Description)));

        return (true, deactivate ? "Account deactivated." : "Account reactivated.");
    }
}
