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
        Task DeclineOrder(long orderId);
        Task ConfirmOrder(long orderId, ConfirmOrderDto confirmOrderDto);
    }
}
