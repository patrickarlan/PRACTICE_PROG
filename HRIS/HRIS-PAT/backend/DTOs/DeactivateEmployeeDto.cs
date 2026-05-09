namespace backend.DTOs;

public class DeactivateEmployeeDto
{
    /// <summary>true = deactivate (lock), false = reactivate (unlock).</summary>
    public bool Deactivate { get; set; } = true;
}
