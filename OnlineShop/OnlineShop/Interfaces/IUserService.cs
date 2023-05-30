using OnlineShop.Dto.UserDTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OnlineShop.Interfaces
{
    public interface IUserService
    {
        string RegisterUser(UserDto newUser);
        string RegisterWithGoogle(string token);
        string LoginUser(UserLoginDto loginUser);
        UserProfileDto UpdateProfile(UserProfileDto newProfile);
        UserProfileDto MyProfile(string email);
        List<UserInfoDto> GetUnverifiedSellers();
        void VerifyUser(long id);
    }
}
