using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Dto.UserDTOs;
using OnlineShop.Helpers;
using OnlineShop.Interfaces;
using System;
using System.Data;
using System.Threading.Tasks;

namespace OnlineShop.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> CreateUser([FromBody] UserDto user)
        {
            try
            {
                return Ok(await _userService.RegisterUser(user));

            }
            catch (Exception)
            {
                return BadRequest("User with that email already exists.");
            }
        }


        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] UserLoginDto user)
        {
            try
            {
                return Ok(await _userService.LoginUser(user));
            }
            catch(InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }


        [HttpPost("google-signin")]
        public async Task<IActionResult> GoogleSignIn([FromBody] GoogleSignInDto googleSignInDto)
        {
            try
            {
                return Ok(await _userService.RegisterWithGoogle(googleSignInDto));
            }
            catch (InvalidJwtException jwtEx)
            {
                return Unauthorized(jwtEx.Message);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut("update-profile")]
        [Authorize]
        public async Task<IActionResult> UpdateUser([FromBody] UserProfileDto user)
        {
            long id = long.Parse(User.GetId());
            try
            {
                return Ok(await _userService.UpdateProfile(id, user));

            }catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("profile")]
        [Authorize]
        public async Task<IActionResult> MyProfile()
        {
            long id = long.Parse(User.GetId());
            try
            {
                return Ok(await _userService.UsersProfile(id));
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut("change-password")]
        [Authorize]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto changePasswordDto)
        {
            long id = long.Parse(User.GetId());
            try
            {
                await _userService.ChangePassword(id, changePasswordDto);
                return Ok("Successfully changed password");
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("unverified-users")]
        [Authorize(/*Roles = "administrator"*/)]
        public async Task<IActionResult> GetUnverifiedUsers()
        {
            try
            {
                return Ok(await _userService.GetUnverifiedSellers());
            }
            catch (Exception)
            {
                return NotFound("No users.");
            }
        }

        [HttpPut("verify/{userId}")]
        //[Authorize(/*Roles = "administrator"*/)]
        public async Task<IActionResult> VerifyUser([FromRoute] string userId)
        {
            try
            {
                long id = long.Parse(userId);
                await _userService.VerifyUser(id);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
