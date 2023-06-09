using Microsoft.EntityFrameworkCore;
using OnlineShop.Infrastructure;
using OnlineShop.Models;
using OnlineShop.Repositories.Interfaces;
using System.Threading.Tasks;

namespace OnlineShop.Repositories
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {
        public OrderRepository(ShopDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<Order> GetOrderById(long id)
        {
            var order = await _dbContext.Orders
            .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Item)
            .FirstOrDefaultAsync(o => o.Id == id);

            return order;
        }

        public async Task<Order> GetOrderView(long customerId)
        {
            var order = await _dbContext.Orders
            .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Item)
            .FirstOrDefaultAsync(o => o.PurchaserId == customerId && o.Status == OrderStatus.InProgress);

            return order;
        }

        public async Task<Order> OrderDetails(long orderId)
        {
            var order = await _dbContext.Orders.Include(o => o.OrderItems).
                ThenInclude(oi => oi.Item).ThenInclude(i => i.Seller).
                FirstOrDefaultAsync(o => o.Id == orderId);

            return order;
        }
    }
}
