using System.Security.Claims;
using System;
using System.Linq;

namespace OnlineShop.Helpers
{
    public static class UserExtentions
    {
        public static string GetId(this ClaimsPrincipal user)
        {
            var result = user.Claims.FirstOrDefault(claim => claim.Type == "id")?.Value;
            if (string.IsNullOrEmpty(result))
            {
                throw new InvalidOperationException();
            }
            return result;
        }
    }
}
