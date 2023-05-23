using System.Collections.Generic;

namespace OnlineShop.Models
{
    public class Order
    {
        public long Id { get; set; }
        public string Comment { get; set; }
        public string DeliveryAddress { get; set; }
        public List<OrderItem> OrderItems { get; set; }
        public User User { get; set; }
        public long UserId { get; set; }
    }
}
