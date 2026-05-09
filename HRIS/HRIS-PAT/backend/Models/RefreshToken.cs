using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class RefreshToken
{
    [Key]
    public int Id { get; set; }
    
    public string Token { get; set; } = string.Empty;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime ExpiryDate { get; set; }
    
    public bool IsRevoked { get; set; } = false;
    
    public string UserId { get; set; } = string.Empty;
    
    [ForeignKey("UserId")]
    public ApplicationUser User { get; set; } = null!;
}
