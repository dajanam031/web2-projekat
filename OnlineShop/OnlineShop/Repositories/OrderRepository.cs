using OnlineShop.Infrastructure;
using OnlineShop.Models;

namespace OnlineShop.Repositories
{
    public class OrderRepository : GenericRepository<Order>
    {
        public OrderRepository(ShopDbContext dbContext) : base(dbContext)
        {
        }

        // override metoda ako treba
    }
}
