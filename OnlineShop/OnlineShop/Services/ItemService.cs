using AutoMapper;
using OnlineShop.Dto.ItemDTOs;
using OnlineShop.Infrastructure;
using OnlineShop.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System;
using OnlineShop.Models;

namespace OnlineShop.Services
{
    public class ItemService : IItemService
    {
        private readonly IMapper _mapper;
        private readonly ShopDbContext _dbContext;

        public ItemService(IMapper mapper, ShopDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }
        public ItemDto AddItem(ItemDto newItem)
        {
            Item item = _mapper.Map<Item>(newItem);
            _dbContext.Add(item);
            _dbContext.SaveChanges();

            return newItem;
        }

        public List<ItemDto> GetItems()
        {
            var items = _dbContext.Items;
            if(items.Any())
                return _mapper.Map<List<ItemDto>>(items);
            throw new ArgumentNullException();
        }
    }
}
