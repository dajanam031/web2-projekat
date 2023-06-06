﻿using Microsoft.EntityFrameworkCore;
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

        public async Task<Order> GetOrderView(long customerId)
        {
            var order = await _dbContext.Orders
            .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Item)
            .FirstOrDefaultAsync(o => o.PurchaserId == customerId && o.Status == OrderStatus.InProgress);

            return order;
        }
    }
}
