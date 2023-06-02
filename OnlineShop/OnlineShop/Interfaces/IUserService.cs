using OnlineShop.Dto.UserDTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OnlineShop.Interfaces
{
    public interface IUserService
    {
        Task<TokenDto> RegisterUser(UserDto newUser);
        Task<TokenDto> RegisterWithGoogle(GoogleSignInDto googleSignInDto);
        Task<TokenDto> LoginUser(UserLoginDto loginUser);
        Task<UserProfileDto> UpdateProfile(long id, UserProfileDto newProfile);
        Task<UserProfileDto> UsersProfile(long id);
        Task<List<UserInfoDto>> GetUnverifiedSellers();
        Task VerifyUser(long id);
        Task ChangePassword(long id, ChangePasswordDto newPassword);
    }
}
