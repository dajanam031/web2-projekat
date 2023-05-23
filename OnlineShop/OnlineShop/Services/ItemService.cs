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
        private readonly IRepository<Item> _itemsRepository;
        private readonly IRepository<User> _usersRepository;

        public ItemService(IMapper mapper, IRepository<Item> itemsRepository, IRepository<User> usersRepository)
        {
            _mapper = mapper;
            _itemsRepository = itemsRepository;
            _usersRepository = usersRepository;
        }

        public ItemDto AddItem(ItemDto newItem)
        {
            var seller = _usersRepository.GetById(newItem.SellerID);
            if (seller == null)
                throw new ArgumentNullException(nameof(seller));

            Item item = _mapper.Map<Item>(newItem);
            _itemsRepository.Create(item);
            _itemsRepository.SaveChanges();

            return newItem;

        }

        public List<ItemDto> GetItems()
        {
            var items = _itemsRepository.GetAll();
            if(items.Any())
                return _mapper.Map<List<ItemDto>>(items);
            throw new ArgumentNullException();
        }
    }
}
