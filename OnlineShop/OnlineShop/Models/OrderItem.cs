
namespace OnlineShop.Models
{
    public class OrderItem
    {
        public Item Item { get; set; }
        public long ItemId { get; set; }
        public int ItemQuantity { get; set; }
        public Order Order { get; set; }
        public long OrderId { get; set; }
    }
}
