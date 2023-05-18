
namespace OnlineShop.Models
{
    public class OrderItem
    {
        private long id;
        private Item item;
        private int itemQuantity;
        private Order order;
        private long orderId;
        private long itemId;

        public long Id { get => id; set => id = value; }
        public Item Item { get => item; set => item = value; }
        public int ItemQuantity { get => itemQuantity; set => itemQuantity = value; }
        public Order Order { get => order; set => order = value; }
        public long OrderId { get => orderId; set => orderId = value; }
        public long ItemId { get => itemId; set => itemId = value; }
    }
}
