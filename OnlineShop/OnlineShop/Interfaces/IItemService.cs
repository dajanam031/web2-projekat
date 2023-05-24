using OnlineShop.Dto.ItemDTOs;
using System.Collections.Generic;

namespace OnlineShop.Interfaces
{
    public interface IItemService
    {
        List<ItemDto> GetItems();
        ItemDto AddItem(ItemDto newItem);
        void DeleteItem(long id);
        UpdateItemDto UpdateItem(UpdateItemDto item);
        ItemDto GetItem(long id);
    }
}
