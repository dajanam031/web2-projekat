using OnlineShop.Infrastructure;
using OnlineShop.Models;

namespace OnlineShop.Repositories
{
    public class ItemRepository : GenericRepository<Item>
    {
        public ItemRepository(ShopDbContext dbContext) : base(dbContext)
        {
        }
        
        // dodatne
    }
}
