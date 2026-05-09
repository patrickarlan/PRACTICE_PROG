using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class CreateEmployeeDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string UserName { get; set; } = string.Empty;

    public string? FullName { get; set; }

    [Required]
    public string Password { get; set; } = string.Empty;

    public string? Position { get; set; }

    public string? Department { get; set; }
    public int? DepartmentId { get; set; }

    [Required]
    public string Role { get; set; } = "Creator";

    public List<string> Claims { get; set; } = new();
}
