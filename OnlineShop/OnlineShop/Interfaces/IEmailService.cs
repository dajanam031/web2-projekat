using OnlineShop.Dto;
using System.Threading.Tasks;

namespace OnlineShop.Interfaces
{
    public interface IEmailService
    {
        Task SendEmail(string to, string subject, string body);
    }
}
