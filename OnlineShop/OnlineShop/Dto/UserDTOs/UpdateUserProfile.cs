using Microsoft.AspNetCore.Http;
using OnlineShop.Models;
using System;

namespace OnlineShop.Dto.UserDTOs
{
    public class UpdateUserProfile
    {
        public string Email { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDate { get; set; }
        public string Address { get; set; }
        public IFormFile ImageUri { get; set; }
    }
}
