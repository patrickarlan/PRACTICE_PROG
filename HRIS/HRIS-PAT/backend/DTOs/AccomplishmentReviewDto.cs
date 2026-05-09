namespace backend.DTOs;

public class AccomplishmentReviewTaskDto
{
    public string Project { get; set; } = string.Empty;
    public string Task { get; set; } = string.Empty;
    public string Notes { get; set; } = string.Empty;
    public string Start { get; set; } = string.Empty;
    public string End { get; set; } = string.Empty;
    public double Hours { get; set; }
}

public class AccomplishmentReviewDto
{
    public int ReportId { get; set; }
    public string Employee { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string ReportDate { get; set; } = string.Empty;
    public string Items { get; set; } = string.Empty;
    public string Submitted { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public IEnumerable<AccomplishmentReviewTaskDto> Accomplishments { get; set; } = Array.Empty<AccomplishmentReviewTaskDto>();
}
