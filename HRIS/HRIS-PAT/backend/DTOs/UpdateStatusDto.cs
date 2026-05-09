namespace backend.DTOs;

public class UpdateStatusDto
{
    // "APPROVED", "REJECTED", "PENDING", "RETURNED"
    public string Status { get; set; } = string.Empty;
    public string? ReturnFeedback { get; set; }
}