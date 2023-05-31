using MailKit.Security;
using MimeKit.Text;
using MimeKit;
using OnlineShop.Dto;
using OnlineShop.Interfaces;
using System;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace OnlineShop.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;
        public EmailService(IConfiguration config) {

            _config = config;
        }
        public async Task SendEmail(string to, string subject, string body)
        {
             var message = new MimeMessage();
             message.From.Add(MailboxAddress.Parse(_config.GetSection("EmailUsername").Value));
             message.To.Add(MailboxAddress.Parse(to));
             message.Subject = subject;

             message.Body = new TextPart(TextFormat.Plain)
             {
                 Text = body
             };

             using var smtp = new SmtpClient();
             await smtp.ConnectAsync(_config.GetSection("EmailHost").Value, 587, SecureSocketOptions.StartTls);
             await smtp.AuthenticateAsync(_config.GetSection("EmailUsername").Value, _config.GetSection("EmailPassword").Value);
             await smtp.SendAsync(message);
             await smtp.DisconnectAsync(true);
        }

    }
}
