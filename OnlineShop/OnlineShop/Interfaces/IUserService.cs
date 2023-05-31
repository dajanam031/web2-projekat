using OnlineShop.Dto.UserDTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OnlineShop.Interfaces
{
    public interface IUserService
    {
        Task<TokenDto> RegisterUser(UserDto newUser);
        //string RegisterWithGoogle(string token);
        Task<TokenDto> LoginUser(UserLoginDto loginUser);
        Task<UserProfileDto> UpdateProfile(UserProfileDto newProfile);
        Task<UserProfileDto> UsersProfile(string email);
        Task<List<UserInfoDto>> GetUnverifiedSellers();
        Task VerifyUser(long id);
    }
}
