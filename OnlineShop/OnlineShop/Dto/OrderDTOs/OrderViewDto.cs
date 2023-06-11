namespace OnlineShop.Dto.OrderDTOs
{
    public class OrderViewDto
    {
        public long OrderId { get; set; }
        public long ItemId { get; set; }
        public string ItemImage { get; set; }
        public string ItemName { get; set; }
        public int ItemQuantity { get; set; }
        public double ItemPrice { get; set; }
        public double TotalPrice { get; set; }
        public double Fee { get; set; }
    }
}
