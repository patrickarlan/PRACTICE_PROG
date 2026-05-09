using System;

namespace backend.Models;

public class Notification
{
    public int Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public string? LinkTo { get; set; }
    public string EventType { get; set; } = string.Empty; // Submitted | Approved | Returned | Viewed
    public int? ReportId { get; set; }
    public bool IsRead { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Optional navigation property for the user who receives the notification
    public virtual ApplicationUser? User { get; set; }
}
