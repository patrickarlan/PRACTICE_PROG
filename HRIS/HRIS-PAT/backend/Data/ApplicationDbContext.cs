using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<AccomplishmentReport> AccomplishmentReports { get; set; }
    public DbSet<ApprovalTeam> ApprovalTeams { get; set; }
    public DbSet<ApprovalTeamMember> ApprovalTeamMembers { get; set; }
    public DbSet<ApprovalTeamApprover> ApprovalTeamApprovers { get; set; }
    public DbSet<Department> Departments { get; set; }

    public DbSet<RefreshToken> RefreshTokens { get; set; }
    public DbSet<Notification> Notifications { get; set; }
    public DbSet<AuditLog> AuditLogs { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        
        // AccomplishmentReport JSONB mapping with explicit conversion


        builder.Entity<AccomplishmentReport>().ToTable("AccomplishmentReportEXP");

        var tasksProperty = builder.Entity<AccomplishmentReport>()
            .Property(b => b.Tasks)
            .HasConversion(
                v => System.Text.Json.JsonSerializer.Serialize(v, (System.Text.Json.JsonSerializerOptions)null!),
                v => System.Text.Json.JsonSerializer.Deserialize<List<ARTask>>(v, (System.Text.Json.JsonSerializerOptions)null!) ?? new List<ARTask>())
            .HasColumnType("jsonb");
            
        tasksProperty.Metadata.SetValueComparer(new Microsoft.EntityFrameworkCore.ChangeTracking.ValueComparer<List<ARTask>>(
            (c1, c2) => c1 != null && c2 != null ? c1.SequenceEqual(c2) : c1 == c2,
            c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
            c => c.ToList()));

        var feedbackProperty = builder.Entity<AccomplishmentReport>()
            .Property(b => b.FeedbackHistory)
            .HasConversion(
                v => System.Text.Json.JsonSerializer.Serialize(v, (System.Text.Json.JsonSerializerOptions)null!),
                v => System.Text.Json.JsonSerializer.Deserialize<List<ARFeedback>>(v, (System.Text.Json.JsonSerializerOptions)null!) ?? new List<ARFeedback>())
            .HasColumnType("jsonb");

        feedbackProperty.Metadata.SetValueComparer(new Microsoft.EntityFrameworkCore.ChangeTracking.ValueComparer<List<ARFeedback>>(
            (c1, c2) => c1 != null && c2 != null ? c1.SequenceEqual(c2) : c1 == c2,
            c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
            c => c.ToList()));
            
        var flowSnapshotProperty = builder.Entity<AccomplishmentReport>()
            .Property(b => b.ApprovalFlowSnapshot)
            .HasConversion(
                v => System.Text.Json.JsonSerializer.Serialize(v, (System.Text.Json.JsonSerializerOptions)null!),
                v => System.Text.Json.JsonSerializer.Deserialize<List<ApproverConfig>>(v, (System.Text.Json.JsonSerializerOptions)null!) ?? new List<ApproverConfig>())
            .HasColumnType("jsonb");

        flowSnapshotProperty.Metadata.SetValueComparer(new Microsoft.EntityFrameworkCore.ChangeTracking.ValueComparer<List<ApproverConfig>>(
            (c1, c2) => c1 != null && c2 != null ? c1.SequenceEqual(c2) : c1 == c2,
            c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
            c => c.ToList()));

        // Phase 18: Approval Team Relational Configuration
        builder.Entity<ApprovalTeamMember>()
            .HasOne(m => m.ApprovalTeam)
            .WithMany(t => t.Members)
            .HasForeignKey(m => m.ApprovalTeamId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<ApprovalTeamMember>()
            .HasOne(m => m.User)
            .WithMany()
            .HasForeignKey(m => m.UserId)
            .OnDelete(DeleteBehavior.Cascade);
            
        builder.Entity<ApprovalTeamMember>()
            .HasIndex(m => m.UserId)
            .IsUnique();

        builder.Entity<ApprovalTeamApprover>()
            .HasOne(a => a.ApprovalTeam)
            .WithMany(t => t.Approvers)
            .HasForeignKey(a => a.ApprovalTeamId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<ApprovalTeamApprover>()
            .HasOne(a => a.User)
            .WithMany()
            .HasForeignKey(a => a.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<ApprovalTeamApprover>()
            .HasIndex(a => new { a.UserId, a.ApprovalTeamId })
            .IsUnique();



        builder.Entity<AuditLog>()
            .ToTable("AuditLogs")
            .Property(a => a.OldData)
            .HasColumnType("jsonb");

        builder.Entity<AuditLog>()
            .ToTable("AuditLogs")
            .Property(a => a.NewData)
            .HasColumnType("jsonb");

        // Custom configurations
        builder.Entity<RefreshToken>()
            .HasOne(rt => rt.User)
            .WithMany()
            .HasForeignKey(rt => rt.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Notification>()
            .HasOne(n => n.User)
            .WithMany()
            .HasForeignKey(n => n.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // Department Constraints
        builder.Entity<Department>()
            .HasIndex(d => d.Name)
            .IsUnique();

        builder.Entity<Department>()
            .HasIndex(d => d.Code)
            .IsUnique();

        builder.Entity<ApplicationUser>()
            .HasOne(u => u.DepartmentEntity)
            .WithMany()
            .HasForeignKey(u => u.DepartmentId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.Entity<ApplicationUser>()
            .HasOne(u => u.ApprovalTeam)
            .WithMany()
            .HasForeignKey(u => u.ApprovalTeamId)
            .OnDelete(DeleteBehavior.SetNull);
    }

}
