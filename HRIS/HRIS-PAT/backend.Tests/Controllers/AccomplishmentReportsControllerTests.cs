using System.Security.Claims;
using backend.Controllers;
using backend.DTOs;
using backend.Models;
using backend.Services;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace backend.Tests.Controllers;

public class AccomplishmentReportsControllerTests
{
    private readonly Mock<IAccomplishmentReportService> _mockSvc;
    private readonly Mock<UserManager<ApplicationUser>> _mockUserManager;
    private readonly AccomplishmentReportsController _controller;
    private readonly string _testUserId = "user-123";

    public AccomplishmentReportsControllerTests()
    {
        _mockSvc = new Mock<IAccomplishmentReportService>();
        
        // Setup UserManager Mock
        var userStore = new Mock<IUserStore<ApplicationUser>>();
        _mockUserManager = new Mock<UserManager<ApplicationUser>>(userStore.Object, null!, null!, null!, null!, null!, null!, null!, null!);

        _controller = new AccomplishmentReportsController(_mockSvc.Object, _mockUserManager.Object);

        // Setup Controller Context with a User
        var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
        {
            new Claim(ClaimTypes.NameIdentifier, _testUserId),
            new Claim(ClaimTypes.Name, "testuser@example.com")
        }, "mock"));

        _controller.ControllerContext = new ControllerContext()
        {
            HttpContext = new DefaultHttpContext() { User = user }
        };
    }

    [Fact]
    public async Task Get_ReturnsOk_WithReports()
    {
        // Arrange
        var reports = new List<AccomplishmentReport>
        {
            new AccomplishmentReport { ReportId = 1, UserId = _testUserId, Title = "Report 1" }
        };
        _mockSvc.Setup(s => s.GetAllReportsAsync(_testUserId, null, null, null))
            .ReturnsAsync(reports);

        // Act
        var result = await _controller.Get(null, null, null, null, null, null, null, null, null);

        // Assert
        var okResult = result.Should().BeOfType<OkObjectResult>().Subject;
        var response = okResult.Value.Should().BeOfType<ApiResponse<IEnumerable<object>>>().Subject;
        response.Success.Should().BeTrue();
        response.Data.Should().HaveCount(1);
    }

    [Fact]
    public async Task GetById_Owner_ReturnsOk()
    {
        // Arrange
        int reportId = 1;
        dynamic report = new System.Dynamic.ExpandoObject();
        report.reportId = reportId;
        report.userId = _testUserId;
        report.title = "My Report";
        report.receiverId = "receiver-123";

        _mockSvc.Setup(s => s.GetGroupedReportByIdAsync(reportId))
            .ReturnsAsync((object)report);

        // Act
        var result = await _controller.GetById(reportId);

        // Assert
        var okResult = result.Should().BeOfType<OkObjectResult>().Subject;
        var response = okResult.Value.Should().BeOfType<ApiResponse<object>>().Subject;
        response.Success.Should().BeTrue();
    }

    [Fact]
    public async Task GetById_NonExistent_ReturnsNotFound()
    {
        // Arrange
        int reportId = 999;
        _mockSvc.Setup(s => s.GetGroupedReportByIdAsync(reportId))
            .ReturnsAsync((object?)null);

        // Act
        var result = await _controller.GetById(reportId);

        // Assert
        result.Should().BeOfType<NotFoundObjectResult>();
    }

    [Fact]
    public async Task Create_ValidDto_ReturnsCreated()
    {
        // Arrange
        var dto = new AccomplishmentReportCreateDto
        {
            Date = DateOnly.FromDateTime(DateTime.Now),
            Title = "New Report",
            Accomplishments = new List<ARTaskDto>
            {
                new ARTaskDto { Client = "Client A", TaskName = "Task 1", StartTime = new TimeOnly(9, 0), EndTime = new TimeOnly(17, 0) }
            }
        };

        // Act
        var result = await _controller.Create(dto);

        // Assert
        var createdResult = result.Should().BeOfType<CreatedAtActionResult>().Subject;
        var response = createdResult.Value.Should().BeOfType<ApiResponse<AccomplishmentReport>>().Subject;
        response.Success.Should().BeTrue();
        response.Message.Should().Be("Report created successfully.");
        _mockSvc.Verify(s => s.CreateAsync(It.IsAny<AccomplishmentReport>()), Times.Once);
    }

    [Fact]
    public async Task Delete_OwnerDraft_ReturnsOk()
    {
        // Arrange
        int reportId = 1;
        var existingReport = new AccomplishmentReport 
        { 
            ReportId = reportId, 
            UserId = _testUserId, 
            Status = "Draft" 
        };

        _mockSvc.Setup(s => s.GetByIdAsync(reportId)).ReturnsAsync(existingReport);
        _mockSvc.Setup(s => s.DeleteAsync(reportId, _testUserId)).ReturnsAsync(true);

        // Act
        var result = await _controller.Delete(reportId);

        // Assert
        var okResult = result.Should().BeOfType<OkObjectResult>().Subject;
        var response = okResult.Value.Should().BeOfType<ApiResponse<object>>().Subject;
        response.Success.Should().BeTrue();
        response.Message.Should().Be("Report deleted and archived successfully.");
    }

    [Fact]
    public async Task Delete_OwnerApproved_ReturnsBadRequest()
    {
        // Arrange
        int reportId = 1;
        var existingReport = new AccomplishmentReport 
        { 
            ReportId = reportId, 
            UserId = _testUserId, 
            Status = "Approved" 
        };

        _mockSvc.Setup(s => s.GetByIdAsync(reportId)).ReturnsAsync(existingReport);

        // Act
        var result = await _controller.Delete(reportId);

        // Assert
        var badRequestResult = result.Should().BeOfType<BadRequestObjectResult>().Subject;
        var response = badRequestResult.Value.Should().BeOfType<ApiResponse<object>>().Subject;
        response.Success.Should().BeFalse();
        response.Message.Should().Contain("Only pending or draft reports can be deleted by employees.");
    }
}
