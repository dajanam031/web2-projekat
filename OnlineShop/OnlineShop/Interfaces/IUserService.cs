using OnlineShop.Dto.UserDTOs;
using System.Collections.Generic;

namespace OnlineShop.Interfaces
{
    public interface IUserService
    {
        UserDto RegisterUser(UserDto newUser);
        UserLoginDto LoginUser(UserLoginDto loginUser);
        UserProfileDto UpdateProfile(UserProfileDto newProfile);
        UserProfileDto MyProfile(long id);
        List<UserInfoDto> GetUnverifiedSellers();
        void VerifyUser(long id);
    }
}
