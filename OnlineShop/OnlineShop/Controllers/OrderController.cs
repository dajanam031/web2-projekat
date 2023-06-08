using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Dto.UserDTOs;
using System.IO;
using System.Threading.Tasks;
using System;
using OnlineShop.Interfaces;
using OnlineShop.Helpers;
using Microsoft.AspNetCore.Authorization;
using OnlineShop.Models;
using OnlineShop.Services;
using OnlineShop.Dto.OrderDTOs;

namespace OnlineShop.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("add-to-cart/{itemId}/{quantity}")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> AddToCart([FromRoute] long itemId, [FromRoute] int quantity)
        {
            long userId = long.Parse(User.GetId());
            try
            {
                await _orderService.AddItemToCart(userId, itemId, quantity);
                return Ok("Item successfully added to cart. Go to cart to check your order!");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("order-view")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> GetOrderView()
        {
            long userId = long.Parse(User.GetId());
            try
            {
                return Ok(await _orderService.CurrentOrderView(userId));

            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{itemId}/{orderId}")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> DeleteOrderItem([FromRoute] long itemId, [FromRoute] long orderId)
        {
            try
            {
                await _orderService.DeleteOrderItem(itemId, orderId);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest("Failed to delete order item.");
            }
        }

        [HttpDelete("{orderId}")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> DeclineOrder([FromRoute] long orderId)
        {
            try
            {
                await _orderService.DeclineOrder(orderId);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest("Failed to delete order.");
            }
        }

        [HttpPut("confirm-order/{orderId}")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> ConfirmOrder([FromRoute] long orderId, [FromBody] ConfirmOrderDto confirmOrderDto)
        {
            try
            {
                return Ok(await _orderService.ConfirmOrder(orderId, confirmOrderDto));

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("previous-orders")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> PreviousOrders()
        {
            long userId = long.Parse(User.GetId());
            try
            {
                return Ok(await _orderService.CustomersOrders(userId));

            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
