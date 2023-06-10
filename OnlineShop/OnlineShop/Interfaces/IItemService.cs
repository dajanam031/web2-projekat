using OnlineShop.Dto.ItemDTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OnlineShop.Interfaces
{
    public interface IItemService
    {
        Task<List<ItemDto>> GetItems();
        Task<ItemDto> AddItem(long id, AddItemDto newItem);
        Task DeleteItem(long id);
        Task<ItemDto> UpdateItem(UpdateItemDto item);
        Task<ItemDto> GetItem(long id);
        Task<List<ItemDto>> GetSellerItems(long sellerId);
    }
}
