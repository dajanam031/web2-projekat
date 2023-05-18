﻿using AutoMapper;
using OnlineShop.Dto.UserDTOs;
using OnlineShop.Interfaces;
using OnlineShop.Models;
using OnlineShop.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace OnlineShop.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<User> _repository;

        public UserService(IMapper mapper, IRepository<User> repository)
        {
            _mapper = mapper;
            _repository = repository;
        }
        public UserDto RegisterUser(UserDto newUser)
        {
            User user = _repository.Find(x => x.Email.Equals(newUser.Email)).FirstOrDefault();
            if(user == null)
            {
                if (!user.UserType.Equals(UserType.Seller))
                    user.Verified = true; // posto je default false ako je prodavac ostace false
                _repository.Create(user);
                _repository.SaveChanges();

                return _mapper.Map<UserDto>(user);
            }
            else
            {
                throw new Exception();
            }
        }

        public UserLoginDto LoginUser(UserLoginDto loginUser)
        {
            User existingUser = _repository.Find(x => x.Username.Equals(loginUser.Username) 
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
            User user = _repository.GetById(id);
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

                _repository.SaveChanges();
                return _mapper.Map<UserProfileDto>(user);
            }
        }

        public List<UserToVerifyDto> GetAllUsers()
        {
            var users = _repository.GetAll();
            if (users.Any())
                return _mapper.Map<List<UserToVerifyDto>>(users);
            
            throw new ArgumentNullException();
            
        }
    }
}