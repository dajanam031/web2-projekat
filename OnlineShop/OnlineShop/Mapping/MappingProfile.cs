using AutoMapper;
using OnlineShop.Dto.ItemDTOs;
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
            CreateMap<User, UserProfileDto>().ReverseMap();
            CreateMap<User, UserInfoDto>().ReverseMap();

            CreateMap<Item, ItemDto>().ReverseMap();
            CreateMap<Item, UpdateItemDto>().ReverseMap();
        }
    }
}
