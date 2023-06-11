
using OnlineShop.Models;

namespace OnlineShop.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(long id, UserType userType, bool verified);
    }
}
