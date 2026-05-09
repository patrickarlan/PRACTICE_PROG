using Microsoft.AspNetCore.Mvc;
using backend.Services;
using backend.Models;
using backend.DTOs;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SupportController : ControllerBase
{
    private readonly IExtendedEmailSender<ApplicationUser> _emailSender;

    public SupportController(IExtendedEmailSender<ApplicationUser> emailSender)
    {
        _emailSender = emailSender;
    }

    [HttpPost]
    public async Task<IActionResult> ContactSupport([FromBody] SupportRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ApiResponse<object>.ErrorResponse("Invalid request data."));

        var adminEmail = Environment.GetEnvironmentVariable("SUPPORT_EMAIL") 
                         ?? Environment.GetEnvironmentVariable("SMTP_USER") 
                         ?? "admin@hris.test";
                         
        var subject = $"[Support Inquiry] {request.IssueType.ToUpper()}: {request.Subject}";
        var body = $@"
            <div style='font-family: sans-serif; padding: 20px; color: #333;'>
                <h2 style='color: #2563eb;'>New Support Inquiry</h2>
                <p>A new support request has been submitted through the public form.</p>
                
                <table style='width: 100%; border-collapse: collapse; margin-top: 20px;'>
                    <tr>
                        <td style='padding: 10px; border: 1px solid #ddd; background: #f9f9f9; width: 150px;'><strong>Name:</strong></td>
                        <td style='padding: 10px; border: 1px solid #ddd;'>{request.Name}</td>
                    </tr>
                    <tr>
                        <td style='padding: 10px; border: 1px solid #ddd; background: #f9f9f9;'><strong>Email:</strong></td>
                        <td style='padding: 10px; border: 1px solid #ddd;'>{request.Email}</td>
                    </tr>
                    <tr>
                        <td style='padding: 10px; border: 1px solid #ddd; background: #f9f9f9;'><strong>Issue Type:</strong></td>
                        <td style='padding: 10px; border: 1px solid #ddd;'>{request.IssueType}</td>
                    </tr>
                    <tr>
                        <td style='padding: 10px; border: 1px solid #ddd; background: #f9f9f9;'><strong>Subject:</strong></td>
                        <td style='padding: 10px; border: 1px solid #ddd;'>{request.Subject}</td>
                    </tr>
                </table>
                
                <div style='margin-top: 20px; padding: 15px; border: 1px solid #ddd; background: #fff;'>
                    <h3 style='margin-top: 0;'>Message:</h3>
                    <p style='white-space: pre-wrap;'>{request.Message}</p>
                </div>
                
                <p style='margin-top: 30px; font-size: 12px; color: #666;'>
                    Sent from HRIS Platform Support Form at {DateTime.Now:f}
                </p>
            </div>
        ";

        try {
            await _emailSender.SendEmailAsync(adminEmail, subject, body);
            return Ok(ApiResponse<string>.SuccessResponse("Support message sent successfully. Our team will contact you soon."));
        } catch (Exception ex) {
            // Log error here if logging is set up
            return StatusCode(500, ApiResponse<object>.ErrorResponse($"Failed to send support email: {ex.Message}"));
        }
    }
}

public class SupportRequest
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string IssueType { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
}
