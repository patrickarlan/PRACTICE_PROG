using backend.Data;
using backend.Models;
using backend.Services;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

namespace backend.Tests.Services;

public class AccomplishmentReportServiceTests
{
    private readonly ApplicationDbContext _db;
    private readonly Mock<UserManager<ApplicationUser>> _mockUserManager;
    private readonly Mock<INotificationService> _mockNotificationService;
    private readonly AccomplishmentReportService _service;

    public AccomplishmentReportServiceTests()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        _db = new ApplicationDbContext(options);

        var userStore = new Mock<IUserStore<ApplicationUser>>();
        _mockUserManager = new Mock<UserManager<ApplicationUser>>(userStore.Object, null!, null!, null!, null!, null!, null!, null!, null!);

        _mockNotificationService = new Mock<INotificationService>();

        _service = new AccomplishmentReportService(_db, _mockUserManager.Object, _mockNotificationService.Object);
    }

    [Fact]
    public async Task GetReviewQueueAsync_WhenSupervisorChanges_ShouldIncludeOldReports()
    {
        // Arrange
        var employee = new ApplicationUser { Id = "emp-1", FullName = "Employee One", SupervisorId = "supervisor-2", UserName = "emp1", Department = "IT", Position = "Dev" };
        var oldSupervisor = new ApplicationUser { Id = "supervisor-1", FullName = "Supervisor One", UserName = "sup1", Department = "IT" };
        var newSupervisor = new ApplicationUser { Id = "supervisor-2", FullName = "Supervisor Two", UserName = "sup2", Department = "IT" };

        _db.Users.AddRange(employee, oldSupervisor, newSupervisor);
        
        var oldReport = new AccomplishmentReport 
        { 
            ReportId = 1, 
            UserId = employee.Id, 
            ReceiverId = oldSupervisor.Id, // Stored as old supervisor
            Status = "Pending", 
            Date = DateOnly.FromDateTime(DateTime.Now) 
        };
        _db.AccomplishmentReports.Add(oldReport);
        await _db.SaveChangesAsync();

        _mockUserManager.Setup(m => m.FindByIdAsync(newSupervisor.Id)).ReturnsAsync(newSupervisor);
        _mockUserManager.Setup(m => m.GetRolesAsync(newSupervisor)).ReturnsAsync(new List<string>());
        _mockUserManager.Setup(m => m.GetClaimsAsync(newSupervisor)).ReturnsAsync(new List<System.Security.Claims.Claim> 
        { 
            new System.Security.Claims.Claim("Permission", "Approver") 
        });

        // Act
        var queue = (await _service.GetReviewQueueAsync(newSupervisor.Id)).ToList();

        // Assert
        queue.Should().Contain(q => q.ReportId == oldReport.ReportId, "New supervisor should be able to see old reports of their employee due to current supervisor assignment");
    }
}
