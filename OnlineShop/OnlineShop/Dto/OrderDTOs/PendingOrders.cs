using OnlineShop.Models;
using System;

namespace OnlineShop.Dto.OrderDTOs
{
    public class PendingOrders
    {
        public long Id { get; set; }
        public string Comment { get; set; }
        public string DeliveryAddress { get; set; }
        public DateTime OrderingTime { get; set; }
        public double TotalPrice { get; set; }
        public PaymentType PaymentType { get; set; }
    }
}
