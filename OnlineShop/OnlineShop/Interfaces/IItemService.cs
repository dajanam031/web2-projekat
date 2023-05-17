using OnlineShop.Dto.ItemDTOs;
using System.Collections.Generic;

namespace OnlineShop.Interfaces
{
    public interface IItemService
    {
        List<ItemDto> GetItems();
        ItemDto AddItem(ItemDto newItem);
    }
}
