namespace OnlineShop.Models
{
    public class Item
    {
        private string name;
        private string description;
        private int quantity;
        private double price;
        private string imageUri;

        public string Name { get => name; set => name = value; }
        public string Description { get => description; set => description = value; }
        public int Quantity { get => quantity; set => quantity = value; }
        public double Price { get => price; set => price = value; }
        public string ImageUri { get => imageUri; set => imageUri = value; }
    }
}
