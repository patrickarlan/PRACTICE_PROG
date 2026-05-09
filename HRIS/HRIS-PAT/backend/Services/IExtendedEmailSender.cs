using Microsoft.AspNetCore.Identity;

namespace backend.Services;

public interface IExtendedEmailSender<TUser> : IEmailSender<TUser> where TUser : class
{
    Task SendEmailAsync(TUser user, string subject, string htmlMessage, CancellationToken cancellationToken = default);
    Task SendEmailAsync(string email, string subject, string htmlMessage);
}
