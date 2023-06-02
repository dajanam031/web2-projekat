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
using System.Threading.Tasks;

namespace OnlineShop.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<User> _repository;
        private readonly IEmailService _emailService;
        private readonly IConfigurationSection _googleCredentials;
        private readonly ITokenService _tokenService;

        public UserService(IMapper mapper, IRepository<User> repository, IConfiguration config, IEmailService emailService, ITokenService tokenService)
        {
            _mapper = mapper;
            _repository = repository;
            _emailService = emailService;
            _googleCredentials = config.GetSection("GoogleClientId");
            _tokenService = tokenService;
        }
        public async Task<TokenDto> RegisterUser(UserDto newUser)
        {
            User user = await _repository.FindBy(x => x.Email.Equals(newUser.Email));
            if(user == null)
            {
                user = _mapper.Map<User>(newUser);
                if (!newUser.UserType.Equals(UserType.Seller))
                    user.Verified = true; 

                user.Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password);
                await _repository.Create(user);
                await _repository.SaveChanges();

                return new TokenDto { Token = _tokenService.GenerateToken(user.Id, user.UserType) };
            }
            else
            {
                throw new Exception();
            }
        }

        public async Task<TokenDto> RegisterWithGoogle(GoogleSignInDto googleSignInDto)
        {
            var payload = await GoogleJsonWebSignature.ValidateAsync(googleSignInDto.GoogleToken);
            if (payload.Audience.ToString() != _googleCredentials.Value)
            {
                throw new InvalidJwtException("Invalid google token.");
            }

            User user = await _repository.FindBy(x => x.Email.Equals(payload.Email));

            if (user == null)
            {
                // napravi novog 
                user = new User
                {
                    Email = payload.Email,
                    Username = payload.GivenName + "_" + payload.FamilyName,
                    FirstName = payload.GivenName,
                    LastName = payload.FamilyName,
                    Password = "google pass",
                    Address = "Google address",
                    ImageUri = payload.Picture,
                    UserType = UserType.Customer,
                    BirthDate = new DateTime(2000, 10, 10),
                    Verified = true
                };

                await _repository.Create(user);
                await _repository.SaveChanges();

                return new TokenDto { Token = _tokenService.GenerateToken(user.Id, user.UserType) };
            }

            // samo token
            return new TokenDto { Token = _tokenService.GenerateToken(user.Id, user.UserType) };
        }

        public async Task<TokenDto> LoginUser(UserLoginDto loginUser)
        {
            User existingUser = await _repository.FindBy(x => x.Email.Equals(loginUser.Email));

            if (existingUser == null)
            {
                throw new InvalidOperationException("User with that email doesn't exist. Try again.");
            }
            else if(!BCrypt.Net.BCrypt.Verify(loginUser.Password, existingUser.Password))
            {
                throw new InvalidOperationException("Incorrect password. Try again.");
            }

            return new TokenDto { Token = _tokenService.GenerateToken(existingUser.Id, existingUser.UserType)};
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

            await _emailService.SendEmail(user.Email, "Welcome to web shop", $"Hello {user.FirstName}." +
                $" Administrator has approved your registration request. You can start adding items!");
        }

        public async Task<UserProfileDto> UsersProfile(long id)
        {
            var user = await _repository.GetById(id);
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            return _mapper.Map<UserProfileDto>(user);
        }
    }
}
