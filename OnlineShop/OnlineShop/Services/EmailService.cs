using MailKit.Security;
using MimeKit.Text;
using MimeKit;
using OnlineShop.Dto;
using OnlineShop.Interfaces;
using System;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;

namespace OnlineShop.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;
        public EmailService(IConfiguration config) {

            _config = config;
        }
        public void SendEmail(string to, string subject, string body)
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
             smtp.Connect(_config.GetSection("EmailHost").Value, 587, SecureSocketOptions.StartTls);
             smtp.Authenticate(_config.GetSection("EmailUsername").Value, _config.GetSection("EmailPassword").Value);
             smtp.Send(message);
             smtp.Disconnect(true);
        }

    }
}
