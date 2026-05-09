using Microsoft.AspNetCore.Identity;

namespace backend.Models;

public class ApplicationUser : IdentityUser
{
    public string? FullName { get; set; }
    public string? Position { get; set; }
    public string? Department { get; set; }
    public int? EmployeeID { get; set; }
    public string? SupervisorId { get; set; }
    public string? ViewerId { get; set; }
    
    public int? ApprovalTeamId { get; set; }
    
    [System.Text.Json.Serialization.JsonIgnore]
    public ApprovalTeam? ApprovalTeam { get; set; }
    
    public int? DepartmentId { get; set; }
    public Department? DepartmentEntity { get; set; }

    public string? SubstituteId { get; set; }

    public bool IsActive { get; set; } = true;
    public bool IsDeleted { get; set; } = false;
}