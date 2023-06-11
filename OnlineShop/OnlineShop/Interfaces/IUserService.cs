using OnlineShop.Dto.UserDTOs;
using OnlineShop.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OnlineShop.Interfaces
{
    public interface IUserService
    {
        Task<TokenDto> RegisterUser(UserDto newUser);
        Task<TokenDto> RegisterWithGoogle(GoogleSignInDto googleSignInDto);
        Task<TokenDto> LoginUser(UserLoginDto loginUser);
        Task<UserProfileDto> UpdateProfile(long id, UpdateUserProfile newProfile);
        Task<UserProfileDto> UsersProfile(long id);
        Task<PaginationResult<UserInfoDto>> GetUnverifiedSellers(int page, int rowsPerPage);
        Task VerifyUser(long id);
        Task DeclineUser(long id);
        Task ChangePassword(long id, ChangePasswordDto newPassword);
        Task<VerificationDto> GetVerificationStatus(long id);
    }
}
