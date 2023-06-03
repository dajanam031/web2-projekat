using AutoMapper;
using OnlineShop.Dto.ItemDTOs;
using OnlineShop.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System;
using OnlineShop.Models;
using OnlineShop.Repositories;
using System.Threading.Tasks;

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

        public async Task AddItem(long id, AddItemDto newItem)
        {
            var seller = await _usersRepository.GetById(id);
            if (seller != null && seller.Verified)
            {
                Item item = _mapper.Map<Item>(newItem);
                item.SellerId = id;
                await _itemsRepository.Create(item);
                await _itemsRepository.SaveChanges();
            }
            else
            {

                throw new ArgumentNullException(nameof(seller));
            }


        }

        public async Task DeleteItem(long id)
        {
            var item = await _itemsRepository.GetById(id);
            if (item == null)
                throw new ArgumentNullException(nameof(item));
             _itemsRepository.Delete(item);
            await _itemsRepository.SaveChanges();
        }

        public async Task<ItemDto> GetItem(long id)
        {
            var item = await _itemsRepository.GetById(id);
            if (item == null)
                throw new ArgumentNullException(nameof(item));

            return _mapper.Map<ItemDto>(item);

        }

        public async Task<List<ItemDto>> GetItems()
        {
            var items = await _itemsRepository.GetAll();
            if(items.Any())
                return _mapper.Map<List<ItemDto>>(items);
            throw new ArgumentNullException();
        }

        public async Task<List<ItemDto>> GetSellerItems(long id)
        {
            var items = await _itemsRepository.FindAllBy(x => x.SellerId == id);
            if (items.Any())
                return _mapper.Map<List<ItemDto>>(items);
            throw new ArgumentNullException();
        }

        public async Task<ItemDto> UpdateItem(ItemDto item)
        {
            var itemToUpdate = await _itemsRepository.GetById(item.Id);
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

                await _itemsRepository.SaveChanges();

                return _mapper.Map<ItemDto>(itemToUpdate);
            }
        }
    }
}
