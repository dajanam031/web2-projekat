using AutoMapper;
using OnlineShop.Dto;
using OnlineShop.Infrastructure;
using OnlineShop.Interfaces;
using OnlineShop.Models;
using System;
using System.Linq;

namespace OnlineShop.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly ShopDbContext _dbContext;

        public UserService(IMapper mapper, ShopDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }
        public UserDto RegisterUser(UserDto newUser)
        {
            User user = _dbContext.Users.Where(x => x.Email.Equals(newUser.Email)).FirstOrDefault();
            if(user == null)
            {
                if (!user.UserType.Equals(UserType.Seller))
                    user.Verified = true; // posto je default false ako je prodavac ostace false
                _dbContext.Users.Add(user);
                _dbContext.SaveChanges();

                return _mapper.Map<UserDto>(user);
            }
            else
            {
                throw new Exception();
            }
        }

        public UserLoginDto LoginUser(UserLoginDto loginUser)
        {
            User existingUser = _dbContext.Users.Where(x => x.Username.Equals(loginUser.Username) 
            && x.Password.Equals(loginUser.Password)).FirstOrDefault();

            if (existingUser != null)
            {
                return _mapper.Map<UserLoginDto>(existingUser);
            }
            else
            {
                throw new ArgumentNullException(nameof(existingUser));
            }
        }

        public UserProfileDto UpdateProfile(long id, UserProfileDto newProfile)
        {
            User user = _dbContext.Users.Find(id);
            if(user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            else
            {
                // proveriti da li postoji u bazi isti username
                user.Username = newProfile.Username;
                user.Password = newProfile.Password;
                user.FirstName = newProfile.FirstName;
                user.LastName = newProfile.LastName;
                user.Address = newProfile.Address;
                user.BirthDate = newProfile.BirthDate;
                user.ImageUri = newProfile.ImageUri;

                _dbContext.SaveChanges();
                return _mapper.Map<UserProfileDto>(user);
            }
        }
    }
}
