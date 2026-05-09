using backend.Models;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace backend.Services.utils;

/// <summary>
/// EmployeeServiceUTILS.cs
/// 
/// Centralized logic and transformation helpers for EmployeeService.
/// Offloads complex role-to-access-level mapping and department virtualization.
/// </summary>
public static class EmployeeServiceUTILS
{
    /// <summary>
    /// Checks if a user is the primary root administrator who should be protected from deletion or modification.
    /// </summary>
    public static bool IsProtectedAdmin(ApplicationUser user)
    {
        var adminEmail = Environment.GetEnvironmentVariable("SUPERADMIN_EMAIL") ?? "admin@hris.local";
        return user?.Email?.Equals(adminEmail, StringComparison.OrdinalIgnoreCase) ?? false;
    }

    /// <summary>
    /// Resolves the virtual department based on the user's highest role/claim.
    /// Admins display as "Administration", Management as "Management", and others keep their DB department.
    /// </summary>
    public static string ResolveVirtualDepartment(bool isAdmin, bool isManagement, string? dbDepartment)
    {
        if (!string.IsNullOrEmpty(dbDepartment)) return dbDepartment;
        if (isAdmin) return "Administration";
        if (isManagement) return "Project Manager";
        return string.Empty;
    }

    /// <summary>
    /// Resolves a human-readable access level string based on a combination of roles and claims.
    /// </summary>
    public static string ResolveAccessLevel(bool isAdmin, bool isApprover, bool isManagement)
    {
        if (isAdmin) return "SUPERADMIN";
        if (isManagement) return "VIEWER";
        if (isApprover) return "APPROVER";
        return "CREATOR";
    }

    /// <summary>
    /// Maps a raw ApplicationUser and their associated roles/claims into a standardized employee object for the frontend.
    /// </summary>
    public static object MapToEmployeeListItem(
        ApplicationUser user, 
        IEnumerable<string> roles,
        IEnumerable<object>? approvalTeams = null)
    {
        var isManagement = roles.Contains("Viewer");
        var isApprover = roles.Contains("Approver");
        var isAdmin = roles.Contains("SuperAdmin");

        var targetDept = ResolveVirtualDepartment(isAdmin, isManagement, user.Department);
        var accessLevel = ResolveAccessLevel(isAdmin, isApprover, isManagement);
        var isDeactivated = !user.IsActive;

        return new
        {
            id = user.Id,
            email = user.Email,
            userName = user.FullName ?? user.UserName,
            fullName = user.FullName,
            position = user.Position,
            department = targetDept,
            employeeId = user.EmployeeID,
            roles = roles,
            isManagement,
            isApprover,
            isAdmin,
            accessLevel,
            supervisorId = user.SupervisorId,
            viewerId = user.ViewerId,
            departmentId = user.DepartmentId,
            approvalTeamId = user.ApprovalTeamId,
            isDeactivated,
            status = isDeactivated ? "Inactive" : "Active",
            approvalTeams = approvalTeams ?? new List<object>()
        };
    }
    
    /// <summary>
    /// Checks if a user matches a specific role filter (Management, Approver, SuperAdmin, or Creator).
    /// </summary>
    public static bool MatchesRoleFilter(string roleFilter, bool isManagement, bool isApprover, bool isAdmin)
    {
        if (string.IsNullOrWhiteSpace(roleFilter)) return true;

        return roleFilter switch
        {
            "Management" => isManagement,
            "Approver" => isApprover,
            "SuperAdmin" => isAdmin,
            "Creator" => !(isManagement || isApprover || isAdmin),
            "Submitters" => !isManagement && !isAdmin,
            _ => true
        };
    }
}
