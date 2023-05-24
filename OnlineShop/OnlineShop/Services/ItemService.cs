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
            if (seller != null && seller.Verified)
            {
                Item item = _mapper.Map<Item>(newItem);
                _itemsRepository.Create(item);
                _itemsRepository.SaveChanges();

                return newItem;
            }

            throw new ArgumentNullException(nameof(seller));

        }

        public void DeleteItem(long id)
        {
            var item = _itemsRepository.GetById(id);
            if (item == null)
                throw new ArgumentNullException(nameof(item));
            _itemsRepository.Delete(item);
            _itemsRepository.SaveChanges();
        }

        public ItemDto GetItem(long id)
        {
            var item = _itemsRepository.GetById(id);
            if (item == null)
                throw new ArgumentNullException(nameof(item));

            return _mapper.Map<ItemDto>(item);

        }

        public List<ItemDto> GetItems()
        {
            var items = _itemsRepository.GetAll();
            if(items.Any())
                return _mapper.Map<List<ItemDto>>(items);
            throw new ArgumentNullException();
        }

        public UpdateItemDto UpdateItem(UpdateItemDto item)
        {
            var itemToUpdate = _itemsRepository.GetById(item.Id);
            if(itemToUpdate == null)
            {
                throw new ArgumentNullException(nameof(itemToUpdate));
            }
            else
            {
                itemToUpdate.Name = item.Name;
                itemToUpdate.Description = item.Description;
                itemToUpdate.Price = item.Price;
                itemToUpdate.ImageUri = item.ImageUri;
                itemToUpdate.Quantity = item.Quantity;

                _itemsRepository.SaveChanges();

                return _mapper.Map<UpdateItemDto>(itemToUpdate);
            }
        }
    }
}
