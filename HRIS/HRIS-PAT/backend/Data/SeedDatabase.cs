using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Services;

namespace backend.Data;

/// <summary>
/// SeedDatabase class handles database initialization with default roles and superadmin user.
/// This is called once at application startup to ensure required data exists.
/// </summary>
public static class SeedDatabase
{
    /// <summary>
    /// Array of default roles to be created in the database.
    /// </summary>
    private static readonly string[] Roles = { "SuperAdmin", "Creator", "Approver", "Viewer" };

    /// <summary>
    /// Main initialization method called at application startup.
    /// Creates all required roles and the superadmin user.
    /// </summary>
    /// <param name="serviceProvider">Service provider for dependency injection</param>
    public static async Task InitializeAsync(IServiceProvider serviceProvider)
    {
        var db = serviceProvider.GetRequiredService<ApplicationDbContext>();
        var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        await SeedRolesAsync(roleManager);
        await SeedDepartmentsAsync(db);

        var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

        // PHASE 6: Data Healing
        var allUsers = await userManager.Users.ToListAsync();
        foreach (var user in allUsers)
        {
            if (!user.IsActive && !user.IsDeleted)
            {
                user.IsActive = true;
                await userManager.UpdateAsync(user);
            }
        }

        await SeedSuperAdminAsync(userManager);
        await SeedSampleAccountsAsync(userManager, db);
        await SeedApprovalTeamsAsync(db, userManager);

        var employeeService = serviceProvider.GetRequiredService<IEmployeeService>();
        await employeeService.AutoPopulateSupervisorsAsync();
    }

    private static async Task SeedSampleAccountsAsync(UserManager<ApplicationUser> userManager, ApplicationDbContext db)
    {
        // Get departments for linking
        var devDept = await db.Departments.FirstOrDefaultAsync(d => d.Code == "DEV");
        var pmDept = await db.Departments.FirstOrDefaultAsync(d => d.Code == "PM");

        // 1. Core Sample Accounts
        var jen = await CreateUserWithRoleAndClaims(userManager, db, "jen@hris.local", "Password123!", "Viewer", "Jen Manager", "Project Manager");
        var joren = await CreateUserWithRoleAndClaims(userManager, db, "joren@hris.local", "Password123!", "Approver", "Joren TeamLead", "Development");
        var ken = await CreateUserWithRoleAndClaims(userManager, db, "ken@hris.local", "Password123!", "Approver", "Ken FunctionalLead", "Functional");
        var marc = await CreateUserWithRoleAndClaims(userManager, db, "marc@hris.local", "Password123!", "Creator", "Marc Employee", "Development");
        var lara = await CreateUserWithRoleAndClaims(userManager, db, "lara@hris.local", "Password123!", "Creator", "Lara Analyst", "Functional");

        /* --- TEST ACCOUNTS FROM ENV DISABLED FOR CLEAN SETUP ---
        var empEmail = Environment.GetEnvironmentVariable("USER_SAMPLE_EMAIL");
        var empPass = Environment.GetEnvironmentVariable("USER_SAMPLE_PASSWORD") ?? "Password123!";
        var appEmail = Environment.GetEnvironmentVariable("APPROVER_EMAIL");
        var appPass = Environment.GetEnvironmentVariable("APPROVER_PASSWORD") ?? "Password123!";
        var viewEmail = Environment.GetEnvironmentVariable("VIEWER_EMAIL");
        var viewPass = Environment.GetEnvironmentVariable("VIEWER_PASSWORD") ?? "Password123!";

        if (!string.IsNullOrEmpty(empEmail))
            await CreateUserWithRoleAndClaims(userManager, db, empEmail, empPass, "Creator", "Employee, Test", "Development");
        
        // Use a fallback for the second test account if env var is reused
        var empEmail2 = Environment.GetEnvironmentVariable("USER_SAMPLE_EMAIL_2") ?? "test2@hris.local";
        await CreateUserWithRoleAndClaims(userManager, db, empEmail2, empPass, "Creator", "Employee, Test 2", "Functional");
        if (!string.IsNullOrEmpty(appEmail))
            await CreateUserWithRoleAndClaims(userManager, db, appEmail, appPass, "Approver", "Approver, Test", "Development");
        if (!string.IsNullOrEmpty(viewEmail))
            await CreateUserWithRoleAndClaims(userManager, db, viewEmail, viewPass, "Viewer", "Viewer, Test", "Project Manager");
        */
    }

    private static async Task<ApplicationUser?> CreateUserWithRoleAndClaims(
        UserManager<ApplicationUser> userManager,
        ApplicationDbContext db,
        string email,
        string password,
        string role,
        string fullName,
        string departmentName)
    {
        var existingUser = await userManager.FindByEmailAsync(email);
        if (existingUser != null)
        {
            // Ensure existing user has the required role (healing logic)
            if (!await userManager.IsInRoleAsync(existingUser, role))
            {
                await userManager.AddToRoleAsync(existingUser, role);
                Console.WriteLine($"✓ Fixed role for existing user '{email}' -> '{role}'.");
            }
            return existingUser;
        }

        // Find department by name
        var department = await db.Departments.FirstOrDefaultAsync(d => d.Name == departmentName);

        var user = new ApplicationUser
        {
            UserName = email,
            Email = email,
            EmailConfirmed = true,
            FullName = fullName,
            Department = departmentName, // Legacy field
            DepartmentId = department?.Id, // New entity field
            Position = role,
            IsActive = true
        };

        var result = await userManager.CreateAsync(user, password);
        if (result.Succeeded)
        {
            await userManager.AddToRoleAsync(user, role);
            Console.WriteLine($"✓ Sample User '{email}' created with role '{role}' in department '{departmentName}'.");
            return user;
        }
        return null;
    }



    /// <summary>
    /// Creates default roles in the database if they don't already exist.
    /// Roles created: SuperAdmin, Manager, Employee.
    /// </summary>
    /// <param name="roleManager">Role manager for handling role operations</param>
    private static async Task SeedRolesAsync(RoleManager<IdentityRole> roleManager)
    {
        foreach (var roleName in Roles)
        {
            // Check if role already exists to avoid duplicates
            if (!await roleManager.RoleExistsAsync(roleName))
            {
                var result = await roleManager.CreateAsync(new IdentityRole(roleName));
                if (result.Succeeded)
                {
                    Console.WriteLine($"✓ Role '{roleName}' created successfully.");
                }
                else
                {
                    Console.WriteLine($"✗ Failed to create role '{roleName}': {string.Join(", ", result.Errors.Select(e => e.Description))}");
                }
            }
        }
    }

    /// <summary>
    /// Creates the superadmin user and assigns the SuperAdmin role.
    /// Only creates if the user doesn't already exist (checked by email).
    /// Configuration is loaded from environment variables.
    /// </summary>
    /// <param name="userManager">User manager for handling user operations</param>
    public static async Task SeedSuperAdminAsync(UserManager<ApplicationUser> userManager)
    {
        // Load superadmin configuration from environment variables
        var superAdminUsername = Environment.GetEnvironmentVariable("SUPERADMIN_USERNAME") ?? "superadmin";
        var superAdminEmail = Environment.GetEnvironmentVariable("SUPERADMIN_EMAIL") ?? "admin@hris.local";
        var superAdminPassword = Environment.GetEnvironmentVariable("SUPERADMIN_PASSWORD") ?? "SuperAdmin@123";

        // Check if superadmin user already exists to avoid creating duplicates
        var existingUser = await userManager.FindByEmailAsync(superAdminEmail);
        if (existingUser != null)
        {
            Console.WriteLine($"✓ SuperAdmin user with email '{superAdminEmail}' already exists. Skipping creation.");
            return;
        }

        // Create new superadmin user with custom fields (Position, Department)
        var superAdminUser = new ApplicationUser
        {
            UserName = superAdminEmail,
            Email = superAdminEmail,
            EmailConfirmed = true,
            FullName = "Administrator, System",
            Position = "System Administrator",
            Department = "Administration",
            IsActive = true
        };

        // Create the user with the provided password (will be hashed by Identity)
        var createResult = await userManager.CreateAsync(superAdminUser, superAdminPassword);
        if (!createResult.Succeeded)
        {
            Console.WriteLine($"✗ Failed to create SuperAdmin user: {string.Join(", ", createResult.Errors.Select(e => e.Description))}");
            return;
        }

        // Assign the SuperAdmin role to the newly created user
        var roleResult = await userManager.AddToRoleAsync(superAdminUser, "SuperAdmin");
        if (!roleResult.Succeeded)
        {
            Console.WriteLine($"✗ Failed to assign SuperAdmin role: {string.Join(", ", roleResult.Errors.Select(e => e.Description))}");
            return;
        }

        // Log success with masked password
        Console.WriteLine($"✓ SuperAdmin user '{superAdminUsername}' created successfully");
        Console.WriteLine($"  Email: {superAdminEmail}");
        Console.WriteLine($"  Password: {new string('*', superAdminPassword.Length)}");
    }

    private static async Task SeedDepartmentsAsync(ApplicationDbContext db)
    {
        if (await db.Departments.AnyAsync(d => d.IsSystem)) return;

        // Ensure system departments exist
        var systemDepts = new List<Department>
        {
            new Department { Name = "Administration", Code = "ADMIN", IsSystem = true },
        };

        foreach (var sd in systemDepts)
        {
            var existing = await db.Departments.FirstOrDefaultAsync(d => d.Code == sd.Code);
            if (existing == null)
            {
                db.Departments.Add(sd);
            }
            else if (!existing.IsSystem)
            {
                existing.IsSystem = true;
                db.Entry(existing).State = EntityState.Modified;
            }
        }

        // Add regular departments if none exist
        if (!await db.Departments.AnyAsync(d => !d.IsSystem))
        {
            db.Departments.AddRange(
                new Department { Name = "Development", Code = "DEV" },
                new Department { Name = "Project Manager", Code = "PM" },
                new Department { Name = "Functional", Code = "FUNC" }
            );
        }

        await db.SaveChangesAsync();
        Console.WriteLine("✓ Departments seeded successfully.");
    }

    private static async Task SeedApprovalTeamsAsync(ApplicationDbContext db, UserManager<ApplicationUser> userManager)
    {
        if (await db.ApprovalTeams.AnyAsync()) return;

        // 1. Find Users for teams
        var joren = await userManager.FindByEmailAsync("joren@hris.local");
        var ken = await userManager.FindByEmailAsync("ken@hris.local");
        var marc = await userManager.FindByEmailAsync("marc@hris.local");
        var lara = await userManager.FindByEmailAsync("lara@hris.local");

        if (joren == null || ken == null || marc == null || lara == null) return;

        // 2. Create Dev Team
        var devTeam = new ApprovalTeam { Name = "Dev Team" };
        db.ApprovalTeams.Add(devTeam);
        await db.SaveChangesAsync();

        db.ApprovalTeamApprovers.Add(new ApprovalTeamApprover { ApprovalTeamId = devTeam.Id, UserId = joren.Id, Order = 1 });
        db.ApprovalTeamMembers.Add(new ApprovalTeamMember { ApprovalTeamId = devTeam.Id, UserId = marc.Id });

        // 3. Create Functional Team
        var funcTeam = new ApprovalTeam { Name = "Functional Team" };
        db.ApprovalTeams.Add(funcTeam);
        await db.SaveChangesAsync();

        db.ApprovalTeamApprovers.Add(new ApprovalTeamApprover { ApprovalTeamId = funcTeam.Id, UserId = ken.Id, Order = 1 });
        db.ApprovalTeamMembers.Add(new ApprovalTeamMember { ApprovalTeamId = funcTeam.Id, UserId = lara.Id });

        await db.SaveChangesAsync();
        Console.WriteLine("✓ Approval Teams seeded (Dev Team & Functional Team).");
    }
}
