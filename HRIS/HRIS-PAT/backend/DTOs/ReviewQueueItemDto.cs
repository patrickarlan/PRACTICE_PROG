namespace backend.DTOs;

public record ReviewQueueItemDto
{
    public int ReportId { get; init; }
    public string Employee { get; init; } = string.Empty;
    public string Role { get; init; } = string.Empty;
    public string Date { get; init; } = string.Empty;
    public string ReportDate { get; init; } = string.Empty;
    public string Items { get; init; } = string.Empty;
    public string Title { get; init; } = string.Empty;
    public string Submitted { get; init; } = string.Empty;
    public string Status { get; init; } = string.Empty;
    public string Department { get; init; } = string.Empty;
    public string Position { get; init; } = string.Empty;
    public string ApproverTeam { get; init; } = string.Empty;
    public string? ApprovedByName { get; init; }
    public string? ReturnedByName { get; init; }
}