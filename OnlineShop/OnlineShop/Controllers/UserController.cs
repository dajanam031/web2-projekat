using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Dto;
using OnlineShop.Interfaces;
using System;

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

        [HttpPost]
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

    }
}
