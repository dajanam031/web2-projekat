using OnlineShop.Dto;

namespace OnlineShop.Interfaces
{
    public interface IUserService
    {
        UserDto RegisterUser(UserDto newUser);
        UserProfileDto UpdateProfile(long id, UserProfileDto newProfile);
        UserLoginDto LoginUser(UserLoginDto loginUser);
    }
}
