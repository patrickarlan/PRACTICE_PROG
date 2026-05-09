using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace backend.Models;

public class ApprovalTeamApprover
{
    [Key]
    public int Id { get; set; }

    public int? ApprovalTeamId { get; set; }
    
    [ForeignKey("ApprovalTeamId")]
    [JsonIgnore]
    [ValidateNever]
    public ApprovalTeam? ApprovalTeam { get; set; }

    [Required]
    public string UserId { get; set; } = string.Empty;

    [ForeignKey("UserId")]
    [ValidateNever]
    public ApplicationUser? User { get; set; }

    [Required]
    public int Order { get; set; } // 1, 2, 3...

    public DateTime AssignedAt { get; set; } = DateTime.UtcNow;
}
