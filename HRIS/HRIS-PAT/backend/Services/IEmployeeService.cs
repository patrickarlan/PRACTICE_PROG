using backend.Models;
using backend.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Services;

public interface IEmployeeService
{
    Task<(IEnumerable<object> Data, int Total)> GetAllEmployeesAsync(string currentUserId, string? query = null, string? role = null, string? status = null, int page = 1, int perPage = 10, string? sort = null, string? order = null, string? department = null, bool? missingDepartment = null, bool? missingTeam = null);
    Task<object?> GetEmployeeByIdAsync(string id);
    Task<(bool Succeeded, string Message)> UpdateEmployeeRoleAsync(string userId, string? role, int? approvalTeamId = null, string? currentOperatorId = null);
    Task<(bool Succeeded, string Message)> CreateEmployeeAsync(ApplicationUser user, string password, string role);
    Task<(bool Succeeded, string Message)> UpdateEmployeeProfileAsync(string id, UpdateEmployeeProfileDto dto);
    Task<bool> UpdateSupervisorAsync(string userId, string supervisorId);
    Task<bool> UpdateViewerAsync(string userId, string viewerId);
    Task<int> AutoPopulateSupervisorsAsync();
    Task<IDictionary<string, IEnumerable<object>>> GetRolesMapAsync();
    Task<(bool Succeeded, string Message)> DeleteEmployeeAsync(string id);
    Task<(bool Succeeded, string Message)> DeactivateEmployeeAsync(string id, bool deactivate);
}
