using OnlineShop.Dto;

namespace OnlineShop.Interfaces
{
    public interface IEmailService
    {
        void SendEmail(string to, string subject, string body);
    }
}
