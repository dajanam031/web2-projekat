﻿namespace OnlineShop.Dto.ItemDTOs
{
    public class ItemDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public string ImageUri { get; set; }
        public long SellerID { get; set; }
    }
}
