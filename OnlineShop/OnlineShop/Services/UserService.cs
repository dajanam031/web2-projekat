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

namespace OnlineShop.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<User> _repository;
        private readonly IConfigurationSection _secretKey;

        public UserService(IMapper mapper, IRepository<User> repository, IConfiguration config)
        {
            _mapper = mapper;
            _repository = repository;
            _secretKey = config.GetSection("SecretKey");
        }
        public string RegisterUser(UserDto newUser)
        {
            User user = _repository.Find(x => x.Email.Equals(newUser.Email)).FirstOrDefault();
            if(user == null)
            {
                user = _mapper.Map<User>(newUser);
                if (!newUser.UserType.Equals(UserType.Seller))
                    user.Verified = true; // posto je default false ako je prodavac ostace false

                user.Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password);
                _repository.Create(user);
                _repository.SaveChanges();

                return GenerateToken(user.UserType);
            }
            else
            {
                throw new Exception();
            }
        }

        public string LoginUser(UserLoginDto loginUser)
        {
            User existingUser = _repository.Find(x => x.Email.Equals(loginUser.Email)).FirstOrDefault();

            if (existingUser == null)
            {
                throw new ArgumentNullException(nameof(existingUser));
            }
            else if(!BCrypt.Net.BCrypt.Verify(loginUser.Password, existingUser.Password))
            {
                throw new ArgumentNullException(nameof(existingUser));
            }

            return GenerateToken(existingUser.UserType);
        }

        public UserProfileDto UpdateProfile(UserProfileDto newProfile)
        {
            User user = _repository.GetById(newProfile.Id);
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

                _repository.SaveChanges();
                return _mapper.Map<UserProfileDto>(user);
            }
        }

        public List<UserInfoDto> GetUnverifiedSellers()
        {
            var users = _repository.Find(x => x.UserType.Equals(UserType.Seller) && !x.Verified);
            if (users.Any())
                return _mapper.Map<List<UserInfoDto>>(users);
            
            throw new ArgumentNullException();
            
        }

        public void VerifyUser(long id)
        {
            var user = _repository.GetById(id);
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            user.Verified = true;
            _repository.SaveChanges();
        }

        public UserProfileDto MyProfile(long id)
        {
            var user = _repository.GetById(id);
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
    }
}
