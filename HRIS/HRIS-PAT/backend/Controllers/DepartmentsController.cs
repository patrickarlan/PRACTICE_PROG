using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using backend.Data;
using backend.Models;

namespace backend.Controllers;

[Authorize(Roles = "SuperAdmin")]
[Route("api/[controller]")]
[ApiController]
public class DepartmentsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public DepartmentsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Departments
    [HttpGet]
    [AllowAnonymous] // Allow anyone to see department list for dropdowns
    public async Task<ActionResult<IEnumerable<object>>> GetDepartments([FromQuery] bool includeInactive = false)
    {
        var query = _context.Departments.AsQueryable();
        if (!includeInactive)
        {
            query = query.Where(d => d.IsActive);
        }

        var departments = await query.OrderBy(d => d.Name).ToListAsync();
        
        // Include User Counts
        var userCounts = await _context.Users
            .Where(u => u.DepartmentId != null)
            .GroupBy(u => u.DepartmentId)
            .Select(g => new { DepartmentId = g.Key, Count = g.Count() })
            .ToDictionaryAsync(x => x.DepartmentId!.Value, x => x.Count);

        var result = departments.Select(d => new
        {
            d.Id,
            d.Name,
            d.Code,
            d.IsActive,
            d.IsSystem,
            d.CreatedAt,
            d.CreatedBy,
            d.UpdatedAt,
            d.UpdatedBy,
            UserCount = userCounts.GetValueOrDefault(d.Id, 0)
        });

        return Ok(result);
    }

    // GET: api/Departments/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Department>> GetDepartment(int id)
    {
        var department = await _context.Departments.FindAsync(id);

        if (department == null)
        {
            return NotFound();
        }

        return department;
    }

    // PUT: api/Departments/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutDepartment(int id, Department department)
    {
        if (id != department.Id)
        {
            return BadRequest();
        }

        if (department.Name.Length > 25)
        {
            return BadRequest("Department name cannot exceed 25 characters.");
        }

        // Check for duplicate Code or Name (excluding current ID)
        if (await _context.Departments.AnyAsync(d => d.Id != id && (d.Code == department.Code || d.Name == department.Name)))
        {
            return BadRequest("Another department with the same Name or Code already exists.");
        }

        var existing = await _context.Departments.FindAsync(id);
        if (existing == null) return NotFound();

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "SYSTEM";

        // Manual Update to preserve audit info
        existing.Name = department.Name;
        existing.Code = department.Code;
        existing.IsActive = department.IsActive;
        existing.UpdatedAt = DateTime.UtcNow;
        existing.UpdatedBy = userId;

        try
        {
            await _context.SaveChangesAsync();

            // PROPAGATION: Update all users' Department string if the name changed
            if (existing.Name != department.Name)
            {
                await _context.Database.ExecuteSqlRawAsync(
                    @"UPDATE ""AspNetUsers"" SET ""Department"" = {0} WHERE ""DepartmentId"" = {1}",
                    department.Name, id);
            }
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!DepartmentExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // POST: api/Departments
    [HttpPost]
    public async Task<ActionResult<Department>> PostDepartment(Department department)
    {
        if (department.Name.Length > 25)
        {
            return BadRequest("Department name cannot exceed 25 characters.");
        }

        // Check for duplicate Code or Name
        if (await _context.Departments.AnyAsync(d => d.Code == department.Code || d.Name == department.Name))
        {
            return BadRequest("A department with the same Name or Code already exists.");
        }

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "SYSTEM";
        department.CreatedBy = userId;
        department.CreatedAt = DateTime.UtcNow;
        department.IsActive = true;

        _context.Departments.Add(department);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetDepartment", new { id = department.Id }, department);
    }

    // POST: api/Departments/5/archive
    [HttpPost("{id}/archive")]
    public async Task<IActionResult> ArchiveDepartment(int id)
    {
        var department = await _context.Departments.FindAsync(id);
        if (department == null)
        {
            return NotFound();
        }

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "SYSTEM";
        department.IsActive = false;
        department.UpdatedAt = DateTime.UtcNow;
        department.UpdatedBy = userId;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Department archived successfully" });
    }

    // DELETE is not implemented yet as per requirements
    /*
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDepartment(int id)
    {
        var department = await _context.Departments.FindAsync(id);
        if (department == null)
        {
            return NotFound();
        }

        _context.Departments.Remove(department);
        await _context.SaveChangesAsync();

        return NoContent();
    }
    */

    private bool DepartmentExists(int id)
    {
        return _context.Departments.Any(e => e.Id == id);
    }
}
