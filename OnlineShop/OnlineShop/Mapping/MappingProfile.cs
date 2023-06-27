using AutoMapper;
using OnlineShop.Dto.ItemDTOs;
using OnlineShop.Dto.OrderDTOs;
using OnlineShop.Dto.UserDTOs;
using OnlineShop.Models;

namespace OnlineShop.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UserLoginDto>().ReverseMap();
            CreateMap<User, UpdateUserProfile>().ReverseMap();
            CreateMap<User, UserInfoDto>().ReverseMap();
            CreateMap<User, VerificationDto>().ReverseMap();
            CreateMap<User, UserProfileDto>().ReverseMap();

            CreateMap<Item, ItemDto>().ReverseMap();
            CreateMap<Item, AddItemDto>().ReverseMap();
            CreateMap<Item, OrderDetailsDto>().ReverseMap();
            CreateMap<Item, UpdateItemDto>().ReverseMap();

            CreateMap<Order, OrderListCustomerDto>().ReverseMap();
            CreateMap<Order, OrderListDto>().ReverseMap();
            CreateMap<Order, PendingOrders>().ReverseMap();
        }
    }
}
