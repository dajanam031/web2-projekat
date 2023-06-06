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
        [Authorize]
        public async Task<IActionResult> CreateUser([FromRoute] long itemId, [FromRoute] int quantity)
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
        [Authorize]
        public async Task<IActionResult> GetOrderView()
        {
            long userId = long.Parse(User.GetId());
            try
            {
                return Ok(await _orderService.CurrentOrderView(userId));

            }
            catch (ArgumentNullException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
