﻿using OnlineShop.Dto.OrderDTOs;
using OnlineShop.Interfaces;
using OnlineShop.Models;
using OnlineShop.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OnlineShop.Services
{
    public class OrderService : IOrderService
    {
        private readonly IRepository<OrderItem> _orderItemsRepository;
        private readonly IOrderRepository _ordersRepository;
        private readonly IRepository<Item> _itemsRepository;

        public OrderService(IRepository<OrderItem> orderItemsRepository, IOrderRepository ordersRepository, IRepository<Item> itemsRepository)
        {
            _orderItemsRepository = orderItemsRepository;
            _ordersRepository = ordersRepository;
            _itemsRepository = itemsRepository;
        }

        public async Task AddItemToCart(long customerId, long itemId, int itemQuantity)
        {
            Order orderInProgress = await _ordersRepository.FindBy(x => x.Status.Equals(OrderStatus.InProgress) && x.PurchaserId == customerId);
            if (orderInProgress == null)
            {
                orderInProgress = new Order { PurchaserId = customerId, Status = OrderStatus.InProgress};
                await _ordersRepository.Create(orderInProgress);
                await _ordersRepository.SaveChanges();
                orderInProgress = await _ordersRepository.FindBy(x => x.Status.Equals(OrderStatus.InProgress) && x.PurchaserId == customerId);
            }

            OrderItem existingOrderItem = await _orderItemsRepository.FindBy(x => x.ItemId == itemId && x.OrderId == orderInProgress.Id);
            if(existingOrderItem == null)
            {
                await _orderItemsRepository.Create(new OrderItem { ItemId = itemId, OrderId = orderInProgress.Id, ItemQuantity = itemQuantity });
            }
            else
            {
                existingOrderItem.ItemQuantity += itemQuantity;
            }

            var item = await _itemsRepository.GetById(itemId);
            item.Quantity -= itemQuantity;
            orderInProgress.TotalPrice += (item.Price * itemQuantity);

            await _itemsRepository.SaveChanges();
            await _orderItemsRepository.SaveChanges();
            await _ordersRepository.SaveChanges();
        }

        public async Task ConfirmOrder(long orderId, ConfirmOrderDto confirmOrderDto)
        {
            var order = await _ordersRepository.GetById(orderId);
            if(order == null)
            {
                throw new ArgumentNullException(nameof(order));
            }

            order.DeliveryAddress = confirmOrderDto.DeliveryAddress;
            order.Comment = confirmOrderDto.Comment;
            order.DeliveryTime = GenerateTime();
            order.OrderingTime = DateTime.Now;
            order.Status = OrderStatus.Finished;

            await _ordersRepository.SaveChanges();
        }

        public async Task<List<OrderViewDto>> CurrentOrderView(long customerId)
        {
            var currentOrder = await _ordersRepository.GetOrderView(customerId);
            if (currentOrder != null)
            {
                List<OrderViewDto> orderViewDtos = new();
                foreach (var orderItem in currentOrder.OrderItems)
                {
                    var totalOrderItemPrice = orderItem.Item.Price * orderItem.ItemQuantity;
                    orderViewDtos.Add(new OrderViewDto { ItemName = orderItem.Item.Name, ItemPrice = totalOrderItemPrice,
                    ItemQuantity = orderItem.ItemQuantity, OrderId = orderItem.OrderId, ItemId = orderItem.ItemId, TotalPrice = currentOrder.TotalPrice });
                }

                return orderViewDtos;
            }

            throw new InvalidOperationException("You don't have any active orders yet. Go to shop and add something to cart!");

        }

        public async Task DeclineOrder(long orderId)
        {
            var order = await _ordersRepository.GetOrderById(orderId);
            if(order == null)
            {
                throw new ArgumentNullException(nameof(order));
            }

            foreach(var orderItem in order.OrderItems)
            {
                var item = await _itemsRepository.GetById(orderItem.ItemId);
                if(item  == null)
                {
                    throw new ArgumentNullException(nameof(item));
                }

                item.Quantity += orderItem.ItemQuantity;
                await _itemsRepository.SaveChanges();
            }

            _ordersRepository.Delete(order);
            await _ordersRepository.SaveChanges();
        }

        public async Task DeleteOrderItem(long itemId, long orderId)
        {
            var orderItem = await _orderItemsRepository.GetById(orderId, itemId);
            var order = await _ordersRepository.GetById(orderId);
            if(orderItem == null)
            {
                throw new ArgumentNullException(nameof(orderItem));
            }

            if (order == null)
            {
                throw new ArgumentNullException(nameof(order));
            }

            var item = await _itemsRepository.GetById(itemId);
            item.Quantity += orderItem.ItemQuantity;
            order.TotalPrice -= (item.Price * orderItem.ItemQuantity);

            await _ordersRepository.SaveChanges();
            await _itemsRepository.SaveChanges();

            _orderItemsRepository.Delete(orderItem);
            await _orderItemsRepository.SaveChanges();
        }

        public static DateTime GenerateTime()
        {
            Random random = new();

            int additionalRandomDays = random.Next(1, 7); 
            int additionalRandomHours = random.Next(24); 

            TimeSpan totalOffset = new(additionalRandomDays, additionalRandomHours, 0, 0);

            DateTime randomTime = DateTime.Now.AddHours(1).Add(totalOffset);

            return randomTime;
        }

    }
}
