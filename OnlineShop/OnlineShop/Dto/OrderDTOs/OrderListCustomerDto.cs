using OnlineShop.Models;
using System.Collections.Generic;
using System;

namespace OnlineShop.Dto.OrderDTOs
{
    public class OrderListCustomerDto
    {
        public long Id { get; set; }
        public string Comment { get; set; }
        public string DeliveryAddress { get; set; }
        public DateTime DeliveryTime { get; set; }
        public DateTime OrderingTime { get; set; }
        public double TotalPrice { get; set; }
        public bool IsDelivered { get; set; }

    }
}
