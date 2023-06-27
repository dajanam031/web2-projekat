using OnlineShop.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OnlineShop.Repositories.Interfaces
{
    public interface IOrderRepository : IRepository<Order>
    {
        Task<Order> GetOrderView(long customerId);
        Task<Order> GetOrderById(long id);
        Task<Order> OrderDetails(long orderId);
        Task<List<Order>> GetAllOrders();
        Task<List<Order>> GetSellerOrders(long sellerId);
        Task CheckDeliveryStatus(Order order);
    }
}
