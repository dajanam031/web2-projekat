namespace OnlineShop.Models
{
    public class Item
    {
        private long id;
        private string name;
        private string description;
        private int quantity;
        private double price;
        private string imageUri;

        public long Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Description { get => description; set => description = value; }
        public int Quantity { get => quantity; set => quantity = value; }
        public double Price { get => price; set => price = value; }
        public string ImageUri { get => imageUri; set => imageUri = value; }
    }
}
