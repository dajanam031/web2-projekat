using OnlineShop.Dto.OrderDTOs;
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
        Task<DeliveryTimeDto> ConfirmOrder(long orderId, ConfirmOrderDto confirmOrderDto);
        Task<List<OrderListDto>> CustomersOrders (long customerId);
        Task<List<OrderDetailsDto>> GetOrderDetails(long orderId);
        Task CancelOrder(long orderId);
        Task<List<OrderListAdminDto>> AllOrders();
    }
}
