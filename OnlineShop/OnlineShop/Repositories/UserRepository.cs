using OnlineShop.Infrastructure;
using OnlineShop.Models;

namespace OnlineShop.Repositories
{
    public class UserRepository : GenericRepository<User>
    {
        public UserRepository(ShopDbContext dbContext) : base(dbContext)
        {
        }

        // dodatne
    }
}
