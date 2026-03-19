using AngularWebApp.Server.Models;

namespace AngularWebApp.Server.Services.Interfaces
{
    public interface IEmailService
    {
        Task SendConfirmationEmail(User user);
    }
}
