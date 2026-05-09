using System.Security.Claims;
using backend.Controllers;
using backend.DTOs;
using backend.Models;
using backend.Services;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace backend.Tests.Controllers;

public class EmployeesControllerTests
{
    private readonly Mock<IEmployeeService> _employeeServiceMock;
    private readonly Mock<IAuditLogService> _auditLogServiceMock;
    private readonly EmployeesController _controller;

    public EmployeesControllerTests()
    {
        _employeeServiceMock = new Mock<IEmployeeService>();
        _auditLogServiceMock = new Mock<IAuditLogService>();
        _controller = new EmployeesController(_employeeServiceMock.Object, _auditLogServiceMock.Object);
    }

    private void SetupUser(string userId)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, userId)
        };
        var identity = new ClaimsIdentity(claims, "TestAuthType");
        var claimsPrincipal = new ClaimsPrincipal(identity);

        _controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = claimsPrincipal }
        };
    }

    [Fact]
    public async Task GetEmployees_ReturnsOk_WithEmployees()
    {
        // Arrange
        var currentUserId = "user-123";
        SetupUser(currentUserId);

        var employees = new List<object> { new { Id = "emp-1", FullName = "John Doe" } };
        _employeeServiceMock.Setup(s => s.GetAllEmployeesAsync(currentUserId, null, null, null, 1, 10, null, null))
            .ReturnsAsync((employees, 1));

        // Act
        var result = await _controller.GetEmployees();

        // Assert
        var okResult = result.Should().BeOfType<OkObjectResult>().Subject;
        var response = okResult.Value.Should().BeOfType<ApiResponse<IEnumerable<object>>>().Subject;
        response.Success.Should().BeTrue();
        response.Data.Should().BeEquivalentTo(employees);
    }

    [Fact]
    public async Task GetEmployee_ReturnsNotFound_WhenEmployeeDoesNotExist()
    {
        // Arrange
        _employeeServiceMock.Setup(s => s.GetEmployeeByIdAsync("non-existent"))
            .ReturnsAsync((object?)null);

        // Act
        var result = await _controller.GetEmployee("non-existent");

        // Assert
        result.Should().BeOfType<NotFoundObjectResult>();
    }

    [Fact]
    public async Task CreateEmployee_ReturnsCreated_WhenSuccessful()
    {
        // Arrange
        SetupUser("admin-user-id");
        var dto = new CreateEmployeeDto
        {
            Email = "test@example.com",
            UserName = "Test User",
            Password = "Password123!",
            Role = "Employee",
            Department = "IT",
            Position = "Dev"
        };

        _employeeServiceMock.Setup(s => s.CreateEmployeeAsync(It.IsAny<ApplicationUser>(), dto.Password, dto.Role, dto.Claims))
            .ReturnsAsync((true, "Success"));

        // Act
        var result = await _controller.CreateEmployee(dto);

        // Assert
        var createdResult = result.Should().BeOfType<CreatedAtActionResult>().Subject;
        var response = createdResult.Value.Should().BeOfType<ApiResponse<object>>().Subject;
        response.Success.Should().BeTrue();
        response.Message.Should().Be("Employee created successfully.");
    }
}
