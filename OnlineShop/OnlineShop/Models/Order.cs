using System.Collections.Generic;

namespace OnlineShop.Models
{
    public class Order
    {
        private long id;
        private string comment;
        private string deliveryAddress;
        private List<OrderItem> orderItems;
        //private User user;
        //private long userId;

        public long Id { get => id; set => id = value; }
        public string Comment { get => comment; set => comment = value; }
        public string DeliveryAddress { get => deliveryAddress; set => deliveryAddress = value; }
        public List<OrderItem> OrderItems { get => orderItems; set => orderItems = value; }
        //public User User { get => user; set => user = value; }
        //public long UserId { get => userId; set => userId = value; }
    }
}
