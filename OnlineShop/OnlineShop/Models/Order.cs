﻿namespace OnlineShop.Models
{
    public class Order
    {
        private long id;
        //private Item itemToOrder;
        private string comment;
        private int quantity;
        private string deliveryAddress;

        public long Id { get => id; set => id = value; }
        //public Item ItemToOrder { get => itemToOrder; set => itemToOrder = value; }
        public string Comment { get => comment; set => comment = value; }
        public int Quantity { get => quantity; set => quantity = value; }
        public string DeliveryAddress { get => deliveryAddress; set => deliveryAddress = value; }
    }
}
