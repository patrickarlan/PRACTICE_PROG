using Microsoft.AspNetCore.Identity;
using backend.Models;

namespace backend.Identity;

/// <summary>
/// Default Identity role assignment for new users (seeded roles: SuperAdmin, HR Management, Creator in Data/SeedDatabase).
/// Call <see cref="EnsureEmployeeRoleAsync"/> after UserManager.CreateAsync for
/// self-service registration or admin-created accounts that should behave as employees unless you assign another role.
/// </summary>
public static class UserCreationDefaults
{
    public const string DefaultRoleName = "Creator";

    public static async Task EnsureEmployeeRoleAsync(
        UserManager<ApplicationUser> userManager,
        ApplicationUser user)
    {
        await userManager.AddToRoleAsync(user, DefaultRoleName);
    }
}
