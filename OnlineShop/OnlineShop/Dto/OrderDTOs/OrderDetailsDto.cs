namespace OnlineShop.Dto.OrderDTOs
{
    public class OrderDetailsDto
    {
        //public string ItemImage { get; set; }
        public long ItemId { get; set; }
        public string ItemName { get; set; }
        public string ItemDescription { get; set; }
        public int ItemQuantity { get; set; }
        public double ItemPrice { get; set; }
        public string SellerName { get; set; }
    }
}
