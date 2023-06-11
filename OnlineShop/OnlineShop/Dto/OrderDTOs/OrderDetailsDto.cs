namespace OnlineShop.Dto.OrderDTOs
{
    public class OrderDetailsDto
    {
        //public string ItemImage { get; set; }
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int ItemQuantity { get; set; }
        public double Price { get; set; }
        public string SellerName { get; set; }
        public string ImageUri { get; set; }
    }
}
