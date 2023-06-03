namespace OnlineShop.Dto.ItemDTOs
{
    public class AddItemDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public string ImageUri { get; set; }
    }
}
