using OnlineShop.Dto.ItemDTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OnlineShop.Interfaces
{
    public interface IItemService
    {
        Task<List<ItemDto>> GetItems();
        Task<ItemDto> AddItem(ItemDto newItem);
        Task DeleteItem(long id);
        Task<UpdateItemDto> UpdateItem(UpdateItemDto item);
        Task<ItemDto> GetItem(long id);
    }
}
