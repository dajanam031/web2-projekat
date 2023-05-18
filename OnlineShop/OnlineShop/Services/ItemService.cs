using AutoMapper;
using OnlineShop.Dto.ItemDTOs;
using OnlineShop.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System;
using OnlineShop.Models;
using OnlineShop.Repositories;

namespace OnlineShop.Services
{
    public class ItemService : IItemService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Item> _repository;

        public ItemService(IMapper mapper, IRepository<Item> repository)
        {
            _mapper = mapper;
            _repository = repository;
        }
        public ItemDto AddItem(ItemDto newItem)
        {
            Item item = _mapper.Map<Item>(newItem);
            _repository.Create(item);
            _repository.SaveChanges();

            return newItem;
        }

        public List<ItemDto> GetItems()
        {
            var items = _repository.GetAll();
            if(items.Any())
                return _mapper.Map<List<ItemDto>>(items);
            throw new ArgumentNullException();
        }
    }
}
