using backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Services;

public interface INotificationService
{
    Task CreateAndPushAsync(string userId, string title, string body, string eventType, string? linkTo = null, int? reportId = null);
    Task<IEnumerable<Notification>> GetUserNotificationsAsync(string userId);
    Task MarkAsReadAsync(int notificationId, string userId);
    Task MarkAllAsReadAsync(string userId);
}
