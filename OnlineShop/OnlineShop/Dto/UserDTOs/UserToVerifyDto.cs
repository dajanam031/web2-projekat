﻿using System;

namespace OnlineShop.Dto.UserDTOs
{
    public class UserToVerifyDto
    {
        public string Email { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ImageUri { get; set; }
    }
}
