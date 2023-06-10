using Microsoft.AspNetCore.Http;

namespace OnlineShop.Dto.ItemDTOs
{
    public class UpdateItemDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public IFormFile ImageUri { get; set; }
    }
}
