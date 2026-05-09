using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using MailKit.Net.Smtp;
using MimeKit;
using Microsoft.Extensions.Configuration;

namespace backend.Services;

public class SmtpEmailSender<TUser> : IExtendedEmailSender<TUser> where TUser : class
{
    private readonly IConfiguration _configuration;

    public SmtpEmailSender(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendEmailAsync(TUser user, string subject, string htmlMessage, CancellationToken cancellationToken = default)
    {
        var email = await GetEmailAsync(user);
        if (string.IsNullOrEmpty(email)) return;

        await SendEmailInternalAsync(email, subject, htmlMessage);
    }

    public async Task SendEmailAsync(string email, string subject, string htmlMessage)
    {
        await SendEmailInternalAsync(email, subject, htmlMessage);
    }

    public async Task SendConfirmationLinkAsync(TUser user, string email, string confirmationLink)
    {
        await SendEmailInternalAsync(email, "Confirm your email", $"Please confirm your account by <a href='{confirmationLink}'>clicking here</a>.");
    }

    public async Task SendPasswordResetLinkAsync(TUser user, string email, string resetLink)
    {
        await SendEmailInternalAsync(email, "Reset your password", $"Please reset your password by <a href='{resetLink}'>clicking here</a>.");
    }

    public async Task SendPasswordResetCodeAsync(TUser user, string email, string resetCode)
    {
        var frontendUrl = Environment.GetEnvironmentVariable("FRONTEND_URL") ?? "http://localhost:3000";
        var resetLink = $"{frontendUrl}/reset-password?token={Uri.EscapeDataString(resetCode)}&email={Uri.EscapeDataString(email)}";

        await SendEmailInternalAsync(email, "Reset your password", 
            $"Please reset your password by <a href='{resetLink}'>clicking here</a> or use the following link: <br/><br/> {resetLink}");
    }

    private async Task SendEmailInternalAsync(string email, string subject, string htmlMessage)
    {
        var host = Environment.GetEnvironmentVariable("SMTP_HOST");
        var portStr = Environment.GetEnvironmentVariable("SMTP_PORT");
        var user = Environment.GetEnvironmentVariable("SMTP_USER");
        var pass = Environment.GetEnvironmentVariable("SMTP_PASS");
        var from = Environment.GetEnvironmentVariable("SMTP_FROM") ?? user;

        if (string.IsNullOrEmpty(host) || string.IsNullOrEmpty(portStr))
        {
            // Fallback to console for dev if not configured
            Console.WriteLine($"[SMTP MOCK] To: {email}, Subject: {subject}, Body: {htmlMessage}");
            return;
        }

        var message = new MimeMessage();
        if (string.IsNullOrEmpty(from) || string.IsNullOrEmpty(email))
        {
            Console.WriteLine($"[SMTP ERROR] Missing address. From: {from ?? "NULL"}, To: {email ?? "NULL"}, Subject: {subject}");
            return;
        }
        message.From.Add(new MailboxAddress("HRIS System", from));
        message.To.Add(new MailboxAddress("", email));
        message.Subject = subject;

        var bodyBuilder = new BodyBuilder { HtmlBody = htmlMessage };
        message.Body = bodyBuilder.ToMessageBody();

        using var client = new SmtpClient();
        await client.ConnectAsync(host, int.Parse(portStr), MailKit.Security.SecureSocketOptions.Auto);
        if (!string.IsNullOrEmpty(user) && !string.IsNullOrEmpty(pass))
        {
            await client.AuthenticateAsync(user, pass);
        }
        await client.SendAsync(message);
        await client.DisconnectAsync(true);
    }

    private Task<string?> GetEmailAsync(TUser user)
    {
        // Use reflection or dynamic to get Email property since TUser is generic
        var emailProp = user.GetType().GetProperty("Email");
        return Task.FromResult(emailProp?.GetValue(user) as string);
    }
}
