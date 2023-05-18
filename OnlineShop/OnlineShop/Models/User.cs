using System;
using System.Collections.Generic;

namespace OnlineShop.Models
{
    public class User
    {
        private long id;
        private string username;
        private string password;
        private string email;
        private string firstName;
        private string lastName;
        private DateTime birthDate;
        private string address;
        private string imageUri;
        private UserType userType;
        private bool verified;
        //private List<Order> orders;


        public long Id { get => id; set => id = value; }
        public string Username { get => username; set => username = value; }
        public string Password { get => password; set => password = value; }
        public string Email { get => email; set => email = value; }
        public string FirstName { get => firstName; set => firstName = value; }
        public string LastName { get => lastName; set => lastName = value; }
        public DateTime BirthDate { get => birthDate; set => birthDate = value; }
        public string Address { get => address; set => address = value; }
        public string ImageUri { get => imageUri; set => imageUri = value; }
        public UserType UserType { get => userType; set => userType = value; }
        public bool Verified { get => verified; set => verified = value; }
        //public List<Order> Orders { get => orders; set => orders = value; }
    }
}
