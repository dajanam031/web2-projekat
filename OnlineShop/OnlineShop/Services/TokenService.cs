using Microsoft.IdentityModel.Tokens;
using OnlineShop.Interfaces;
using OnlineShop.Models;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System;
using Microsoft.Extensions.Configuration;

namespace OnlineShop.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfigurationSection _secretKey;

        public TokenService(IConfiguration config)
        {
            _secretKey = config.GetSection("SecretKey");
        }
        public string GenerateToken(long id, UserType userType, bool verified)
        {
            List<Claim> claims = new()
            {
                new Claim(ClaimTypes.Role, userType.ToString()),
                new Claim("id", id.ToString()),
                new Claim("verified", verified.ToString())
            };

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
