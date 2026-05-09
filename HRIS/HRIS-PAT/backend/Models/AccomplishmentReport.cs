// using System;
// using System.ComponentModel.DataAnnotations;
// using System.ComponentModel.DataAnnotations.Schema;

// namespace backend.Models;

// public class AccomplishmentReport
// {
//     [Key]
//     public int ReportId { get; set; }

//     [Required]
//     public int EmployeeId { get; set; }

//     [ForeignKey("EmployeeId")]
//     public Employee? Employee { get; set; }

//     [Required]
//     public DateOnly Date { get; set; }

//     [Required]
//     public string Client { get; set; } = string.Empty;

//     [Required]
//     public string TaskName { get; set; } = string.Empty;

//     public string Particulars { get; set; } = string.Empty;

//     [Required]
//     public TimeOnly StartTime { get; set; }

//     [Required]
//     public TimeOnly EndTime { get; set; }
// }

// to be discussed with the team

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace backend.Models;

[Index(nameof(IdempotencyKey), IsUnique = true)]
public class AccomplishmentReport
{
    [Key]
    public int ReportId { get; set; }

    public string? UserId { get; set; }
    public string? ReceiverId { get; set; }
    public string? ViewerId { get; set; }

    // Sequential Approval Fields
    public int CurrentApprovalStage { get; set; } = 0;
    public string? CurrentApproverId { get; set; }
    
    [Column(TypeName = "jsonb")]
    public List<ApproverConfig> ApprovalFlowSnapshot { get; set; } = new();

    // Phase 2: Viewer "Viewed" tracking
    public DateTime? ViewedAt { get; set; }
    public string? ViewedById { get; set; }
    public string? ViewedByName { get; set; }

    [Required]
    public DateOnly Date { get; set; }

    // Phase 9: Break Tracking
    public TimeOnly? BreakStartTime { get; set; }
    public TimeOnly? BreakEndTime { get; set; }
    public int BreakDurationMinutes { get; set; } = 0;

    [StringLength(64)] // Increased from 50 to 64 to allow longer descriptive titles
    public string? Title { get; set; }

    [Column(TypeName = "jsonb")]
    public List<ARTask> Tasks { get; set; } = new();

    [Column(TypeName = "jsonb")]
    public List<ARFeedback> FeedbackHistory { get; set; } = new();

    public string? Status { get; set; } = "Pending";
    public string? ReturnedById { get; set; }
    public string? ReturnedByName { get; set; }
    public string? ApprovedById { get; set; }
    public string? ApprovedByName { get; set; }
    public Guid? IdempotencyKey { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public bool IsDeleted { get; set; } = false;
    public bool IsModifiedByAdmin { get; set; } = false;
    
    [NotMapped]
    public string? ApproverTeam { get; set; }
}

public class ARTask
{
    [StringLength(64)] // Increased from 50 to 64 to allow longer project names
    public string Client { get; set; } = string.Empty;

    [StringLength(250)]
    public string TaskName { get; set; } = string.Empty;

    public string Particulars { get; set; } = string.Empty;
    public TimeOnly? StartTime { get; set; }
    public TimeOnly? EndTime { get; set; }
}

public class ARFeedback
{
    [StringLength(500)]
    public string Message { get; set; } = string.Empty;

    public string? AuthorId { get; set; }
    public string? AuthorName { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    public string Action { get; set; } = "Returned"; // e.g., Returned, Resubmitted, Approved
}

