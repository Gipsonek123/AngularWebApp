using AngularWebApp.Server.Models;
using AngularWebApp.Server.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;

namespace AngularWebApp.Server.Services.Implementations
{
    public class EmailService : IEmailService
    {
        private readonly IEmailSender _emailSender;
        private readonly UserManager<User> _userManager;

        public EmailService(IEmailSender emailSender, UserManager<User> userManager)
        {
            _emailSender = emailSender;
            _userManager = userManager;
        }

        public async Task SendConfirmationEmail(User user)
        {
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var encodedToken = Uri.EscapeDataString(token);

            var confirmationLink = $"https://localhost:65488/account/confirm-email?userId={user.Id}&token={encodedToken}";

            await _emailSender.SendEmailAsync(
                user.Email,
                "Confirm email",
                $"Click on the link: <a href='{confirmationLink}'>Confirm</a>");
        }
    }
}
