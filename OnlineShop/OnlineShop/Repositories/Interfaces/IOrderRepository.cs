using OnlineShop.Models;
using System.Threading.Tasks;

namespace OnlineShop.Repositories.Interfaces
{
    public interface IOrderRepository : IRepository<Order>
    {
        Task<Order> GetOrderView(long customerId);
        Task<Order> GetOrderById(long id);
    }
}
