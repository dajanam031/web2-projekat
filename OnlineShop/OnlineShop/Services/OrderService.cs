using AutoMapper;
using OnlineShop.Dto.OrderDTOs;
using OnlineShop.Dto.UserDTOs;
using OnlineShop.Interfaces;
using OnlineShop.Models;
using OnlineShop.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.Services
{
    public class OrderService : IOrderService
    {
        private readonly IRepository<OrderItem> _orderItemsRepository;
        private readonly IOrderRepository _ordersRepository;
        private readonly IRepository<Item> _itemsRepository;
        private readonly IMapper _mapper;

        public OrderService(IRepository<OrderItem> orderItemsRepository, IOrderRepository ordersRepository, IRepository<Item> itemsRepository, IMapper mapper)
        {
            _orderItemsRepository = orderItemsRepository;
            _ordersRepository = ordersRepository;
            _itemsRepository = itemsRepository;
            _mapper = mapper;
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

        public async Task<DeliveryTimeDto> ConfirmOrder(long orderId, ConfirmOrderDto confirmOrderDto)
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

            return new DeliveryTimeDto { DeliveryTime = order.DeliveryTime };
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

        public async Task DeleteOrder(long orderId)
        {
            var order = await _ordersRepository.GetOrderById(orderId);
            if(order == null)
            {
                throw new ArgumentNullException(nameof(order));
            }

            foreach(var orderItem in order.OrderItems)
            {
                var item = await _itemsRepository.GetById(orderItem.ItemId);
                if (item == null)
                {
                    throw new ArgumentNullException(nameof(item));
                }

                item.Quantity += orderItem.ItemQuantity;
            }

            await _itemsRepository.SaveChanges();
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

            var remaining = await _orderItemsRepository.FindAllBy(x => x.OrderId == orderId);
            if(!remaining.Any())
            {
                _ordersRepository.Delete(order);
                await _ordersRepository.SaveChanges();
            }
        }

        public async Task<List<OrderListDto>> CustomersOrders(long customerId)
        {
            var orders = await _ordersRepository.FindAllBy(x => x.PurchaserId == customerId && x.Status.Equals(OrderStatus.Finished));
            if (orders.Any())
            {
                foreach (var order in orders)
                {
                    if (order.DeliveryTime < DateTime.Now)
                    {
                        order.IsDelivered = true;
                    }
                }

                await _ordersRepository.SaveChanges();
                return _mapper.Map<List<OrderListDto>>(orders);
            }

            throw new InvalidOperationException("No orders yet.");
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

        public async Task<List<OrderDetailsDto>> GetOrderDetails(long orderId)
        {
            var order = await _ordersRepository.OrderDetails(orderId);
            if(order == null)
            {
                throw new ArgumentNullException(nameof(order));
            }

            List<OrderDetailsDto> orderDetailsDtos = new();

            foreach(var orderItem in order.OrderItems)
            {
                var item = _mapper.Map<OrderDetailsDto>(orderItem.Item);
                item.ItemQuantity = orderItem.ItemQuantity;
                item.SellerName = orderItem.Item.Seller.FirstName + " " + orderItem.Item.Seller.LastName;
                orderDetailsDtos.Add(item);
            }

            return orderDetailsDtos;
        }

        public async Task CancelOrder(long orderId)
        {
            var order = await _ordersRepository.GetById(orderId);
            if(order == null)
            {
                throw new ArgumentNullException(nameof(order));
            }

            TimeSpan timeDifference = DateTime.Now.Subtract(order.OrderingTime);

            if (timeDifference.TotalMinutes > 60)
            {
                throw new InvalidOperationException("You cannot cancel the order. The order can be canceled within the first hour of placing the order.");
            }

            order.Status = OrderStatus.Canceled;
            await _ordersRepository.SaveChanges();
        }

        public async Task<List<OrderListAdminDto>> AllOrders()
        {
            var orders = await _ordersRepository.GetAllOrders();
            if (orders.Any())
            {
                List<OrderListAdminDto> orderListAdminDtos = new();
                foreach(var or in orders)
                {
                    var order = _mapper.Map<OrderListAdminDto>(or);
                    order.Customer = or.Purchaser.FirstName + " " + or.Purchaser.LastName;
                    orderListAdminDtos.Add(order);
                }

                return orderListAdminDtos;
            }

            throw new InvalidOperationException("No orders.");
        }
    }
}
