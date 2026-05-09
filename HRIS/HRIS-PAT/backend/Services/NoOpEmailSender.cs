using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace backend.Services;

public class NoOpEmailSender<TUser> : IExtendedEmailSender<TUser> where TUser : class
{
    public Task SendEmailAsync(TUser user, string subject, string htmlMessage, CancellationToken cancellationToken = default)
    {
        // No-op for development/testing. Replace with a real email sender in production.
        return Task.CompletedTask;
    }

    public Task SendEmailAsync(string email, string subject, string htmlMessage)
    {
        // No-op for development/testing.
        return Task.CompletedTask;
    }

    public Task SendConfirmationLinkAsync(TUser user, string code, string callbackUrl)
    {
        return Task.CompletedTask;
    }

    public Task SendPasswordResetLinkAsync(TUser user, string code, string callbackUrl)
    {
        return Task.CompletedTask;
    }

    public Task SendPasswordResetCodeAsync(TUser user, string code, string callbackUrl)
    {
        return Task.CompletedTask;
    }
}
