using System.Collections.Generic;

namespace OnlineShop.Models
{
    public class Order
    {
        public long Id { get; set; }
        public string Comment { get; set; }
        public string DeliveryAddress { get; set; }
        public List<OrderItem> OrderItems { get; set; }
        public User Purchaser { get; set; }
        public long PurchaserId { get; set; }
        public OrderStatus Status { get; set; }
    }
}
