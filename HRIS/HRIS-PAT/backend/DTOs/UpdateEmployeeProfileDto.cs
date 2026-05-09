namespace backend.DTOs;

public class UpdateEmployeeProfileDto
{
    public string? FullName    { get; set; }
    public string? Email       { get; set; }
    public string? Department  { get; set; }
    public int? DepartmentId   { get; set; }
    /// <summary>Leave blank / null to keep the existing password unchanged.</summary>
    public string? NewPassword { get; set; }
}
