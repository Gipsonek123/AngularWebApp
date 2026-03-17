using Microsoft.AspNetCore.Identity.UI.Services;
using MimeKit;
using MailKit.Net.Smtp;

namespace AngularWebApp.Server.Services.Implementations
{
    public class SmtpEmailService : IEmailSender
    {
        private readonly IConfiguration _configuration;

        public SmtpEmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            var message = new MimeMessage();
            message.From.Add(MailboxAddress.Parse(_configuration["Email:From"]));
            message.To.Add(MailboxAddress.Parse(email));
            message.Subject = subject;

            message.Body = new TextPart("html")
            {
                Text = htmlMessage
            };

            using var client = new SmtpClient();
            await client.ConnectAsync(
                _configuration["Email:SmtpHost"],
                int.Parse(_configuration["Email:Port"]),
                true);

            await client.AuthenticateAsync(
                _configuration["Email:Username"],
                _configuration["Email:Password"]);

            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }
    }
}
