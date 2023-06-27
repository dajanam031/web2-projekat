using OnlineShop.Dto.OrderDTOs;
using OnlineShop.Helpers;
using OnlineShop.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OnlineShop.Interfaces
{
    public interface IOrderService
    {
        Task AddItemToCart(long customerId, long itemId, int itemQuantity);
        Task<List<OrderViewDto>> CurrentOrderView(long customerId);
        Task DeleteOrderItem(long itemId, long orderId);
        Task DeleteOrder(long orderId);
        Task ConfirmOrder(long orderId, ConfirmOrderDto confirmOrderDto);
        Task<List<OrderListCustomerDto>> CustomersOrders (long customerId);
        Task<List<OrderDetailsDto>> GetOrderDetails(long orderId);
        Task<List<OrderDetailsDto>> GetOrderDetails(long orderId, long sellerId);
        Task CancelOrder(long orderId);
        Task<List<OrderListDto>> AllOrders();
        Task<List<OrderListDto>> GetSellerOrders(long id, bool isNew);
        Task<List<PendingOrders>> GetUsersPendingOrders(long id);
        Task<List<PendingOrders>> GetOrdersOnMap(long id);
        Task AcceptOrder(long orderId);
    }
}
