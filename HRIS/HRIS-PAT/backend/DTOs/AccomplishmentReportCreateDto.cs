using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.DTOs;

public class AccomplishmentReportCreateDto
{
    [Required]
    public DateOnly Date { get; set; }

    public string? Title { get; set; }

    [Required]
    public List<ARTaskDto> Accomplishments { get; set; } = new();


    public string Status { get; set; } = "Pending";
    public string? ReceiverId { get; set; }
    public string? ViewerId { get; set; }
    public Guid? IdempotencyKey { get; set; }

    public TimeOnly? BreakStartTime { get; set; }
    public TimeOnly? BreakEndTime { get; set; }
    public int BreakDurationMinutes { get; set; }
}

public class ARTaskDto
{
    public string Client { get; set; } = string.Empty;
    public string TaskName { get; set; } = string.Empty;
    public string Particulars { get; set; } = string.Empty;
    public TimeOnly? StartTime { get; set; }
    public TimeOnly? EndTime { get; set; }
}
