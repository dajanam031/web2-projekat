using OnlineShop.Infrastructure;
using OnlineShop.Models;
using System.Threading.Tasks;

namespace OnlineShop.Repositories
{
    public class OrderItemRepository : GenericRepository<OrderItem>
    {
        public OrderItemRepository(ShopDbContext dbContext) : base(dbContext)
        {
        }
    }
}
