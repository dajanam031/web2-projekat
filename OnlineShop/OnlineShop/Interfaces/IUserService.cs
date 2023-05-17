using OnlineShop.Dto.UserDTOs;
using System.Collections.Generic;

namespace OnlineShop.Interfaces
{
    public interface IUserService
    {
        UserDto RegisterUser(UserDto newUser);
        UserProfileDto UpdateProfile(long id, UserProfileDto newProfile);
        UserLoginDto LoginUser(UserLoginDto loginUser);
        List<UserToVerifyDto> GetAllUsers();
    }
}
