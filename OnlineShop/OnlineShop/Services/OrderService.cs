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
            // proveri jel neka poruzbina od tog kupca u toku
            Order orderInProgress = await _ordersRepository.FindBy(x => x.Status.Equals(OrderStatus.InProgress) && x.PurchaserId == customerId);
            if (orderInProgress == null)
            {
                // kreiram novu 
                orderInProgress = new Order { PurchaserId = customerId, Status = OrderStatus.InProgress };
                await _ordersRepository.Create(orderInProgress);
                await _ordersRepository.SaveChanges();
                orderInProgress = await _ordersRepository.FindBy(x => x.Status.Equals(OrderStatus.InProgress) && x.PurchaserId == customerId);
            }

            // napravi order item od prosledjenih podataka, ako dodajem isti artikal onda cu samo promeniti kolicinu
            // tj dodati da ne bih pravila razlicite order iteme za isti artikal 
            OrderItem existingOrderItem = await _orderItemsRepository.FindBy(x => x.ItemId == itemId && x.OrderId == orderInProgress.Id);
            if(existingOrderItem == null)
            {
                await _orderItemsRepository.Create(new OrderItem { ItemId = itemId, OrderId = orderInProgress.Id, ItemQuantity = itemQuantity });
            }
            else
            {
                existingOrderItem.ItemQuantity += itemQuantity;
            }

            // naci item u bazi i smanjiti mu kolicinu za prosledjenu 
            var item = await _itemsRepository.GetById(itemId);
            item.Quantity -= itemQuantity;
            await _itemsRepository.SaveChanges();
            await _orderItemsRepository.SaveChanges();
        }

        public async Task<List<OrderViewDto>> CurrentOrderView(long customerId)
        {
            var currentOrder = await _ordersRepository.GetOrderView(customerId);
            if (currentOrder != null)
            {
                List<OrderViewDto> orderViewDtos = new List<OrderViewDto>();
                foreach (var orderItem in currentOrder.OrderItems)
                {
                    var totalPrice = orderItem.Item.Price * orderItem.ItemQuantity;
                    orderViewDtos.Add(new OrderViewDto { ItemName = orderItem.Item.Name, ItemPrice = totalPrice,
                        ItemQuantity = orderItem.ItemQuantity, OrderId = orderItem.OrderId, ItemId = orderItem.ItemId });
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

                item.Quantity += orderItem.ItemQuantity; // vracam kolicinu
                await _itemsRepository.SaveChanges();
            }

            _ordersRepository.Delete(order);
            await _ordersRepository.SaveChanges();
        }

        public async Task DeleteOrderItem(long itemId, long orderId)
        {
            var orderItem = await _orderItemsRepository.GetById(orderId, itemId);
            if(orderItem == null)
            {
                throw new ArgumentNullException(nameof(orderItem));
            }
            var item = await _itemsRepository.GetById(itemId);
            item.Quantity += orderItem.ItemQuantity; // vracam kolicinu
            await _itemsRepository.SaveChanges();

            _orderItemsRepository.Delete(orderItem);
            await _orderItemsRepository.SaveChanges();
        }
    }
}