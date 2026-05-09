using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;
using backend.DTOs;
using System.Security.Claims;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(AuthenticationSchemes = "Identity.Bearer,Bearer", Roles = "HR Management,SuperAdmin")]
public class EmployeesController : ControllerBase
{
    private readonly IEmployeeService _employeeService;

    public EmployeesController(IEmployeeService employeeService)
    {
        _employeeService = employeeService;
    }

    /// <summary>
    /// Gets a list of employees.
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetEmployees(
        [FromQuery] string? q = null, 
        [FromQuery] string? role = null, 
        [FromQuery] string? status = null,
        [FromQuery] string? department = null,
        [FromQuery] bool? missingDepartment = null,
        [FromQuery] bool? missingTeam = null,
        [FromQuery(Name = "_page")] int page = 1,
        [FromQuery(Name = "_perPage")] int perPage = 10,
        [FromQuery(Name = "_sort")] string? sort = null,
        [FromQuery(Name = "_order")] string? order = null)
    {
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(currentUserId))
        {
            return Unauthorized(ApiResponse<object>.ErrorResponse("User identification not found."));
        }

        var (employees, total) = await _employeeService.GetAllEmployeesAsync(currentUserId, q, role, status, page, perPage, sort, order, department, missingDepartment, missingTeam);

        Response.Headers.Append("X-Total-Count", total.ToString());
        Response.Headers.Append("Access-Control-Expose-Headers", "X-Total-Count");

        return Ok(ApiResponse<IEnumerable<object>>.SuccessResponse(employees));
    }

    /// <summary>
    /// Gets a single employee by ID.
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetEmployee(string id)
    {
        var employee = await _employeeService.GetEmployeeByIdAsync(id);
        if (employee == null)
        {
            return NotFound(ApiResponse<object>.ErrorResponse("Employee not found."));
        }

        return Ok(ApiResponse<object>.SuccessResponse(employee));
    }

    /// <summary>
    /// Creates a new employee/user.
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> CreateEmployee([FromBody] CreateEmployeeDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ApiResponse<object>.ErrorResponse("Invalid model state."));
        }

        // SuperAdmin Cap and role protection is now handled in the Service layer

        var user = new ApplicationUser
        {
            UserName = dto.Email,
            Email = dto.Email,
            FullName = dto.FullName ?? dto.UserName,
            Department = dto.Department,
            DepartmentId = dto.DepartmentId,
            Position = dto.Position
        };

        var result = await _employeeService.CreateEmployeeAsync(user, dto.Password, dto.Role ?? "Employee");

        if (!result.Succeeded)
        {
            return BadRequest(ApiResponse<object>.ErrorResponse($"Failed to create employee: {result.Message}"));
        }

        // Audit logging is now automatic via DB triggers

        return CreatedAtAction(nameof(GetEmployee), new { id = user.Id }, ApiResponse<object>.SuccessResponse(user, "Employee created successfully."));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEmployeeRole(string id, [FromBody] UpdateEmployeeDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ApiResponse<object>.ErrorResponse("Invalid model state."));
        }



        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var result = await _employeeService.UpdateEmployeeRoleAsync(id, dto.Role, dto.ApprovalTeamId, currentUserId);
        if (!result.Succeeded)
        {
            return BadRequest(ApiResponse<object>.ErrorResponse(result.Message));
        }

        // Audit logging is now automatic via DB triggers

        return Ok(ApiResponse<object>.SuccessResponse(new { id, role = dto.Role, approvalTeamId = dto.ApprovalTeamId }, "Employee updated successfully."));
    }

    [HttpPut("{id}/supervisor")]
    public async Task<IActionResult> UpdateSupervisor(string id, [FromBody] UpdateSupervisorDto dto)
    {
        var success = await _employeeService.UpdateSupervisorAsync(id, dto.SupervisorId);
        if (!success)
            return BadRequest(ApiResponse<object>.ErrorResponse("Unable to update supervisor."));

        return Ok(ApiResponse<object>.SuccessResponse(new { id, supervisorId = dto.SupervisorId }, "Supervisor updated successfully."));
    }

    [HttpPut("{id}/viewer")]
    public async Task<IActionResult> UpdateViewer(string id, [FromBody] UpdateViewerDto dto)
    {
        var success = await _employeeService.UpdateViewerAsync(id, dto.ViewerId);
        if (!success)
            return BadRequest(ApiResponse<object>.ErrorResponse("Unable to update viewer."));

        return Ok(ApiResponse<object>.SuccessResponse(new { id, viewerId = dto.ViewerId }, "Viewer updated successfully."));
    }

    [HttpPut("{id}/profile")]
    public async Task<IActionResult> UpdateEmployeeProfile(string id, [FromBody] UpdateEmployeeProfileDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ApiResponse<object>.ErrorResponse("Invalid model state."));

        var result = await _employeeService.UpdateEmployeeProfileAsync(id, dto);
        if (!result.Succeeded)
            return BadRequest(ApiResponse<object>.ErrorResponse(result.Message));

        return Ok(ApiResponse<object>.SuccessResponse(new { id }, result.Message));
    }

    [HttpGet("roles-map")]
    [Authorize(AuthenticationSchemes = "Identity.Bearer,Bearer")] // Any authenticated user can look up the approver chain
    public async Task<IActionResult> GetRolesMap()
    {
        var map = await _employeeService.GetRolesMapAsync();
        return Ok(ApiResponse<object>.SuccessResponse(map));
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEmployee(string id)
    {
        var result = await _employeeService.DeleteEmployeeAsync(id);
        if (!result.Succeeded)
            return BadRequest(ApiResponse<object>.ErrorResponse(result.Message));

        // Audit logging is now automatic via DB triggers

        return Ok(ApiResponse<object>.SuccessResponse(new { id }, result.Message));
    }

    [HttpPut("{id}/deactivate")]
    public async Task<IActionResult> DeactivateEmployee(string id, [FromBody] DeactivateEmployeeDto dto)
    {
        var result = await _employeeService.DeactivateEmployeeAsync(id, dto.Deactivate);
        if (!result.Succeeded)
            return BadRequest(ApiResponse<object>.ErrorResponse(result.Message));

        return Ok(ApiResponse<object>.SuccessResponse(new { id, deactivated = dto.Deactivate }, result.Message));
    }

    /// <summary>
    /// Triggers a full re-population of supervisor and viewer columns for all employees.
    /// Fixes stale assignments when a new Approver/Viewer is promoted.
    /// </summary>
    [HttpPost("populate-all")]
    public async Task<IActionResult> PopulateAll()
    {
        var count = await _employeeService.AutoPopulateSupervisorsAsync();
        return Ok(ApiResponse<object>.SuccessResponse(new { updatedCount = count },
            $"Successfully populated assignments for {count} employee(s)."));
    }
}
