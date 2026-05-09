using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace backend.Models;

public class ApprovalTeamMember
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

    public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
}
