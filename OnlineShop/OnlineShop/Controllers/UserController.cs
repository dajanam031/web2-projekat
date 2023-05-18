using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Dto.UserDTOs;
using OnlineShop.Interfaces;
using System;
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
        public IActionResult CreateUser([FromBody] UserDto user)
        {
            try
            {
                return Ok(_userService.RegisterUser(user));

            }
            catch (Exception)
            {
                return BadRequest("User with that email already exists.");
            }
        }

        [HttpPut]
        public IActionResult UpdateUser([FromBody] long id, UserProfileDto user)
        {
            try
            {
                return Ok(_userService.UpdateProfile(id, user));

            }catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost("login")]
        public IActionResult LoginUser([FromBody] UserLoginDto user)
        {
            try
            {
                return Ok(_userService.LoginUser(user));
            }
            catch (Exception)
            {
                return NotFound("Username or password are incorrect. Try again.");
            }
        }

        // TO DO: zastititi da samo admin sme
        [HttpGet("unverified-users")]
        public IActionResult GetUnverifiedUsers()
        {
            try
            {
                return Ok(_userService.GetAllUsers());
            }
            catch (Exception)
            {
                return NotFound("No users.");
            }
        }

        // odbijanje i prihvatanje kupca od strane admina
        // ovde cu isto ako admin odobri da pozovem email servis i posaljem mejl
    }
}
