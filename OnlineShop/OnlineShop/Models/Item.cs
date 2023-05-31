using System.Collections.Generic;

namespace OnlineShop.Models
{
    public class Item
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public string ImageUri { get; set; }
        public User Seller { get; set; }
        public long SellerId { get; set; }
        public List<OrderItem> OrderItems { get; set; } 
    }
}
