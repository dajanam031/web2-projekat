using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Dto.ItemDTOs;
using OnlineShop.Dto.UserDTOs;
using OnlineShop.Interfaces;
using OnlineShop.Models;
using System;

namespace OnlineShop.Controllers
{
    [Route("api/items")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly IItemService _itemService;

        public ItemsController(IItemService itemService)
        {
            _itemService = itemService;
        }

        [HttpGet]
        public IActionResult GetAllIems()
        {
            try
            {
                return Ok(_itemService.GetItems());
            }
            catch (Exception)
            {
                return NotFound("No available items.");
            }
        }

        [HttpPost]
        public IActionResult AddItem([FromBody] ItemDto item)
        {
            try
            {
                return Ok(_itemService.AddItem(item));
            }
            catch (Exception)
            {
                return BadRequest("Failed to add new item");
            }
        }


    }
}
