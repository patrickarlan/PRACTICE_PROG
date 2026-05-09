using System.Collections.Generic;

namespace backend.DTOs;

public class DashboardDto
{
    public PersonalStatsDto Personal { get; set; } = new();
    public AdminStatsDto? Admin { get; set; }
    public IEnumerable<RecentActivityDto> RecentActivity { get; set; } = new List<RecentActivityDto>();
}

public class PersonalStatsDto
{
    public int Approved { get; set; }
    public int Pending { get; set; }
    public int Returned { get; set; }
    public int Draft { get; set; }
    public int TotalSubmitted { get; set; }
}

public class AdminStatsDto
{
    public int TotalEmployees { get; set; }
    public int TotalSubmitted { get; set; }
    public int TotalPending { get; set; }
    public int TotalApproved { get; set; }
    public int TotalReturned { get; set; }
    
    // Today's stats for progress bars
    public int TodaySubmitted { get; set; }
    public int TodayPending { get; set; }
    public int TodayApproved { get; set; }
    public int TodayReturned { get; set; }
    
    public IEnumerable<PendingActionDto> PendingActions { get; set; } = new List<PendingActionDto>();
    public IEnumerable<TeamBreakdownDto> TeamBreakdown { get; set; } = new List<TeamBreakdownDto>();
}

public class TeamBreakdownDto
{
    public string TeamName { get; set; } = string.Empty;
    public int Submitted { get; set; }
    public int Pending { get; set; }
    public int Approved { get; set; }
    public int Returned { get; set; }
}

public class PendingActionDto
{
    public int Id { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string Date { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
}

public class RecentActivityDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Date { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string ActionText { get; set; } = string.Empty;
    public string? ApprovedByName { get; set; }
    public string? ReturnedByName { get; set; }
    public string CreatedAt { get; set; } = string.Empty;
    public bool IsModifiedByAdmin { get; set; }
}
