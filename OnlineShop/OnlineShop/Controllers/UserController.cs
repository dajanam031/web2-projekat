using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Dto.UserDTOs;
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

        [HttpPut("update-profile")]
        public async Task<IActionResult> UpdateUser([FromBody] UserProfileDto user)
        {
            try
            {
                return Ok(await _userService.UpdateProfile(user));

            }catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("profile/{email}")]
        public async Task<IActionResult> MyProfile([FromRoute] string email)
        {
            try
            {
                return Ok(await _userService.UsersProfile(email));
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] UserLoginDto user)
        {
            try
            {
                return Ok(await _userService.LoginUser(user));
            }
            catch (Exception)
            {
                return NotFound("Username or password are incorrect. Try again.");
            }
        }

        [HttpGet("unverified-users")]
        //[Authorize(Roles = "administrator")]
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

        [HttpPut("verify/{id}")]
        //[Authorize(Roles = "administrator")]
        public async Task<IActionResult> VerifyUser([FromRoute] long id)
        {
            try
            {
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
