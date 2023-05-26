using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Dto.ItemDTOs;
using OnlineShop.Dto.UserDTOs;
using OnlineShop.Interfaces;
using OnlineShop.Models;
using OnlineShop.Services;
using System;
using System.Data;

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
        public IActionResult GetAllItems()
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
        [Authorize(Roles = "seller")]
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


        [HttpDelete("{id}")]
        [Authorize(Roles = "seller")]
        public IActionResult DeleteItem([FromRoute] long id)
        {
            try
            {
                _itemService.DeleteItem(id);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest("Failed to delete item.");
            }
        }

        [HttpPut("update-item")]
        [Authorize(Roles = "seller")]
        public IActionResult UpdateItem([FromBody] UpdateItemDto item)
        {
            try
            {
                return Ok(_itemService.UpdateItem(item));

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetItem([FromRoute] long id)
        {
            try
            {
                return Ok(_itemService.GetItem(id));
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
