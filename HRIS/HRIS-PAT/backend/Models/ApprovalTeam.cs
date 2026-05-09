using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class ApprovalTeam
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    public int? DepartmentId { get; set; }
    public Department? Department { get; set; }

    // Phase 18: Associative Relationships
    public ICollection<ApprovalTeamMember> Members { get; set; } = new List<ApprovalTeamMember>();
    public ICollection<ApprovalTeamApprover> Approvers { get; set; } = new List<ApprovalTeamApprover>();
}

public class ApproverConfig
{
    public string UserId { get; set; } = string.Empty;
    public string? UserName { get; set; }
    public int Order { get; set; } // Sequential order (1, 2, 3...)
}
