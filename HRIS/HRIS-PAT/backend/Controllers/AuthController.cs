using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Models;
using backend.Data;
using backend.DTOs;
using Microsoft.EntityFrameworkCore;
using backend.Services;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IConfiguration _configuration;
    private readonly ApplicationDbContext _context;
    private readonly IExtendedEmailSender<ApplicationUser> _emailSender;

    public AuthController(
        UserManager<ApplicationUser> userManager, 
        IConfiguration configuration,
        ApplicationDbContext context,
        IExtendedEmailSender<ApplicationUser> emailSender)
    {
        _userManager = userManager;
        _configuration = configuration;
        _context = context;
        _emailSender = emailSender;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        var user = await _userManager.FindByEmailAsync(loginDto.Email);
        if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
        {
            return Unauthorized("Invalid email or password");
        }

        // Check if 2FA is enabled
        if (await _userManager.GetTwoFactorEnabledAsync(user))
        {
            var providers = await _userManager.GetValidTwoFactorProvidersAsync(user);
            if (providers.Contains("Email"))
            {
                var token = await _userManager.GenerateTwoFactorTokenAsync(user, "Email");
                await _emailSender.SendEmailAsync(user, "Your Verification Code", $"Your security code is: {token}");
            }
            return Ok(new { requiresTwoFactor = true, email = user.Email });
        }

        return await GenerateTokenResponse(user);
    }

    [HttpPost("verify-2fa")]
    public async Task<IActionResult> Verify2fa([FromBody] VerifyMfaDto dto)
    {
        var user = await _userManager.FindByEmailAsync(dto.Email);
        if (user == null) return Unauthorized("Invalid request");

        // Try verifying using Email provider first, then Authenticator (TOTP)
        var providers = await _userManager.GetValidTwoFactorProvidersAsync(user);
        bool isValid = false;

        if (providers.Contains("Email") && await _userManager.VerifyTwoFactorTokenAsync(user, "Email", dto.Code))
        {
            isValid = true;
        }
        else if (providers.Contains("Authenticator") && await _userManager.VerifyTwoFactorTokenAsync(user, "Authenticator", dto.Code))
        {
            isValid = true;
        }

        if (!isValid) return BadRequest("Invalid verification code");

        return await GenerateTokenResponse(user);
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh([FromBody] RefreshTokenDto dto)
    {
        var refreshToken = await _context.RefreshTokens
            .Include(x => x.User)
            .FirstOrDefaultAsync(x => x.Token == dto.Token && !x.IsRevoked);

        if (refreshToken == null || refreshToken.ExpiryDate < DateTime.UtcNow)
        {
            return Unauthorized("Invalid or expired refresh token");
        }

        // Revoke old token and generate new pair
        refreshToken.IsRevoked = true;
        await _context.SaveChangesAsync();

        return await GenerateTokenResponse(refreshToken.User);
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto dto)
    {
        var user = await _userManager.FindByEmailAsync(dto.Email);
        if (user == null) return Ok(); // Don't reveal if user exists

        var token = await _userManager.GeneratePasswordResetTokenAsync(user);
        // In a real app, you'd send a link to your frontend reset page:
        // var resetLink = $"https://your-app.com/reset-password?token={WebUtility.UrlEncode(token)}&email={dto.Email}";
        await _emailSender.SendPasswordResetCodeAsync(user, user.Email!, token);

        return Ok(new { message = "If an account exists with this email, a reset code has been sent." });
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto)
    {
        var user = await _userManager.FindByEmailAsync(dto.Email);
        if (user == null) return BadRequest("Invalid request");

        var result = await _userManager.ResetPasswordAsync(user, dto.Token, dto.NewPassword);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return Ok(new { message = "Password reset successfully" });
    }

    [HttpGet("mfa/setup-totp")]
    [Authorize]
    public async Task<IActionResult> SetupTotp()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        var key = await _userManager.GetAuthenticatorKeyAsync(user);
        if (string.IsNullOrEmpty(key))
        {
            await _userManager.ResetAuthenticatorKeyAsync(user);
            key = await _userManager.GetAuthenticatorKeyAsync(user);
        }

        var qrCodeUri = $"otpauth://totp/HRIS:{user.Email}?secret={key}&issuer=HRIS";
        return Ok(new { sharedKey = key, qrCodeUri });
    }

    [HttpPost("mfa/enable-totp")]
    [Authorize]
    public async Task<IActionResult> EnableTotp([FromBody] SetupTotpDto dto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        var isValid = await _userManager.VerifyTwoFactorTokenAsync(user, "Authenticator", dto.Code);
        if (!isValid) return BadRequest("Invalid code");

        await _userManager.SetTwoFactorEnabledAsync(user, true);
        return Ok(new { message = "MFA with Authenticator App enabled successfully" });
    }

    private async Task<IActionResult> GenerateTokenResponse(ApplicationUser user)
    {
        var roles = await _userManager.GetRolesAsync(user);
        var authClaims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.UserName ?? ""),
            new Claim(ClaimTypes.Email, user.Email ?? ""),
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

        foreach (var role in roles)
        {
            authClaims.Add(new Claim(ClaimTypes.Role, role));
        }

        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            Environment.GetEnvironmentVariable("JWT_SECRET") ?? "fallback_secret_key_at_least_32_chars"));

        var token = new JwtSecurityToken(
            issuer: Environment.GetEnvironmentVariable("JWT_ISSUER"),
            audience: Environment.GetEnvironmentVariable("JWT_AUDIENCE"),
            expires: DateTime.UtcNow.AddMinutes(60), // Set to 60 minutes for a better balance between security and UX
            claims: authClaims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
        );

        // Generate Refresh Token
        var refreshTokenStr = Guid.NewGuid().ToString();
        var refreshToken = new RefreshToken
        {
            Token = refreshTokenStr,
            ExpiryDate = DateTime.UtcNow.AddDays(7),
            UserId = user.Id
        };

        _context.RefreshTokens.Add(refreshToken);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            accessToken = new JwtSecurityTokenHandler().WriteToken(token),
            refreshToken = refreshTokenStr,
            expiration = token.ValidTo
        });
    }

    public class LoginDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    [HttpGet("profile")]
    [Authorize]
    public async Task<IActionResult> GetProfile()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return NotFound("User not found");
        }

        var supervisor = !string.IsNullOrEmpty(user.SupervisorId) 
            ? await _userManager.FindByIdAsync(user.SupervisorId) 
            : null;

        var viewer = !string.IsNullOrEmpty(user.ViewerId)
            ? await _userManager.FindByIdAsync(user.ViewerId)
            : null;

        var hasAssignedTeams = await _context.ApprovalTeamApprovers.AnyAsync(a => a.UserId == user.Id);

        // Fetch team name for the badge (Member of team OR Approver/Viewer of team)
        var memberTeamName = await _context.ApprovalTeamMembers
            .Where(m => m.UserId == user.Id)
            .Select(m => m.ApprovalTeam != null ? m.ApprovalTeam.Name : null)
            .FirstOrDefaultAsync();

        var managedTeams = await _context.ApprovalTeamApprovers
            .Where(a => a.UserId == user.Id)
            .Include(a => a.ApprovalTeam)
            .Select(a => a.ApprovalTeam != null ? a.ApprovalTeam.Name : null)
            .Where(name => name != null)
            .Distinct()
            .ToListAsync();

        var teamName = memberTeamName ?? managedTeams.FirstOrDefault();

        return Ok(new
        {
            id = user.Id,
            email = user.Email,
            fullName = user.FullName,
            userName = user.UserName,
            phoneNumber = user.PhoneNumber,
            position = user.Position,
            department = user.Department,
            employeeId = user.EmployeeID,
            supervisorId = user.SupervisorId,
            supervisorName = supervisor?.FullName ?? supervisor?.UserName ?? (string.IsNullOrEmpty(user.SupervisorId) ? null : "Unknown Supervisor"),
            viewerId = user.ViewerId,
            viewerName = viewer?.FullName ?? viewer?.UserName ?? (string.IsNullOrEmpty(user.ViewerId) ? null : "Unknown Viewer"),
            roles = await _userManager.GetRolesAsync(user),
            mfaEnabled = await _userManager.GetTwoFactorEnabledAsync(user),
            hasAssignedTeams,
            teamName,
            managedTeams
        });

    }

    [HttpGet("system-contacts")]
    [Authorize]
    public async Task<IActionResult> GetSystemContacts()
    {
        var approvers  = await _userManager.GetUsersInRoleAsync("Approver");
        var viewers    = await _userManager.GetUsersInRoleAsync("Viewer");
        var hrManagers = await _userManager.GetUsersInRoleAsync("HR Management");
        var superAdmins = await _userManager.GetUsersInRoleAsync("SuperAdmin");

        var approver  = approvers.FirstOrDefault();
        var viewer    = viewers.FirstOrDefault();
        var hrManager = hrManagers.FirstOrDefault() ?? superAdmins.FirstOrDefault();

        return Ok(new
        {
            approver = approver == null ? null : new
            {
                id       = approver.Id,
                fullName = approver.FullName ?? approver.UserName
            },
            viewer = viewer == null ? null : new
            {
                id       = viewer.Id,
                fullName = viewer.FullName ?? viewer.UserName
            },
            hrManager = hrManager == null ? null : new
            {
                id       = hrManager.Id,
                fullName = hrManager.FullName ?? hrManager.UserName
            }
        });
    }


    [HttpPut("profile")]
    [Authorize]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto dto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        if (!string.IsNullOrWhiteSpace(dto.FullName))
            user.FullName = dto.FullName.Trim();
        if (!string.IsNullOrWhiteSpace(dto.Department))
            user.Department = dto.Department.Trim();

        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
            return BadRequest(result.Errors.Select(e => e.Description));

        return Ok(new { message = "Profile updated successfully" });
    }

    [HttpPut("change-password")]
    [Authorize]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        var result = await _userManager.ChangePasswordAsync(user, dto.CurrentPassword, dto.NewPassword);
        if (!result.Succeeded)
        {
            var error = result.Errors.FirstOrDefault();
            return BadRequest(new { message = error?.Description ?? "Failed to change password" });
        }

        return Ok(new { message = "Password changed successfully" });
    }
}
