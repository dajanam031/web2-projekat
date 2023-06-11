using OnlineShop.Models;
using System;

namespace OnlineShop.Dto.UserDTOs
{
    public class UserInfoDto
    {
        public long Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ImageUri { get; set; }
        public bool Verified { get; set; }
        public bool VerificationStatus { get; set; }
        public UserType UserType { get; set; }
    }
}
