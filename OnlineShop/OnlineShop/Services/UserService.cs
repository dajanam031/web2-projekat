using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using OnlineShop.Dto.UserDTOs;
using OnlineShop.Interfaces;
using OnlineShop.Models;
using OnlineShop.Repositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Google.Apis.Auth;
using System.IO;
using System.Net;
using MailKit.Security;
using MimeKit;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MimeKit.Text;

namespace OnlineShop.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<User> _repository;
        private readonly IConfigurationSection _secretKey;
        private readonly IEmailService _emailService;

        public UserService(IMapper mapper, IRepository<User> repository, IConfiguration config, IEmailService emailService)
        {
            _mapper = mapper;
            _repository = repository;
            _secretKey = config.GetSection("SecretKey");
            _emailService = emailService;
        }
        public async Task<TokenDto> RegisterUser(UserDto newUser)
        {
            User user = await _repository.FindBy(x => x.Email.Equals(newUser.Email));
            if(user == null)
            {
                user = _mapper.Map<User>(newUser);
                if (!newUser.UserType.Equals(UserType.Seller))
                    user.Verified = true; // posto je default false ako je prodavac ostace false

                user.Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password);
                await _repository.Create(user);
                await _repository.SaveChanges();

                await _emailService.SendEmail(user.Email, "Welcome to web shop", $"Hello {user.FirstName}." +
                    $" Your registration request is being processed," +
                    $" and we will notify you when the administrator approves/rejects your request!");

                return new TokenDto { Token = GenerateToken(user.UserType) };
            }
            else
            {
                throw new Exception();
            }
        }

        public async Task<TokenDto> LoginUser(UserLoginDto loginUser)
        {
            User existingUser = await _repository.FindBy(x => x.Email.Equals(loginUser.Email));

            if (existingUser == null)
            {
                throw new ArgumentNullException(nameof(existingUser));
            }
            else if(!BCrypt.Net.BCrypt.Verify(loginUser.Password, existingUser.Password))
            {
                throw new ArgumentNullException(nameof(existingUser));
            }

            return new TokenDto { Token = GenerateToken(existingUser.UserType) };
        }

        public async Task<UserProfileDto> UpdateProfile(UserProfileDto newProfile)
        {
            User user = await _repository.FindBy(x => x.Email.Equals(newProfile.Email));
            if(user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            else
            {
                user.Username = newProfile.Username;
                user.Password = newProfile.Password;
                user.FirstName = newProfile.FirstName;
                user.LastName = newProfile.LastName;
                user.Address = newProfile.Address;
                user.BirthDate = newProfile.BirthDate;
                user.ImageUri = newProfile.ImageUri;

                await _repository.SaveChanges();
                return _mapper.Map<UserProfileDto>(user);
            }
        }

        public async Task<List<UserInfoDto>> GetUnverifiedSellers()
        {
            var users = await _repository.FindAllBy(x => x.UserType.Equals(UserType.Seller) && !x.Verified);
            if (users.Any())
                return _mapper.Map<List<UserInfoDto>>(users);
            
            throw new ArgumentNullException();
            
        }

        public async Task VerifyUser(long id)
        {
            var user = await _repository.GetById(id);
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            user.Verified = true;
            await _repository.SaveChanges();
        }

        public async Task<UserProfileDto> UsersProfile(string email)
        {
            var user = await _repository.FindBy(x => x.Email.Equals(email));
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            return _mapper.Map<UserProfileDto>(user);
        }

        private string GenerateToken(UserType type)
        {
            List<Claim> claims = new();

            if (type.Equals(UserType.Administrator))
                claims.Add(new Claim(ClaimTypes.Role, "administrator"));
            if (type.Equals(UserType.Seller))
                claims.Add(new Claim(ClaimTypes.Role, "seller"));
            if (type.Equals(UserType.Customer))
                claims.Add(new Claim(ClaimTypes.Role, "customer"));

            SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokenOptions = new JwtSecurityToken(
                issuer: "https://localhost:5001",
                claims: claims,
                expires: DateTime.Now.AddMinutes(20),
                signingCredentials: signinCredentials
            );

            string tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return tokenString;
        }



        //public string RegisterWithGoogle(string token)
        //{
        //    //var validationSettings = new GoogleJsonWebSignature.ValidationSettings
        //    //{
        //    //    Audience = new[] { "Your_Client_Id" }
        //    //};

        //    //var payload = GoogleJsonWebSignature.ValidateAsync(token, validationSettings); // await
        //    //var userEmail = payload.FindFirst("email")?.Value;
        //    //var userName = payload.FindFirst("name")?.Value;
        //    return "";
        //}

    }
}
