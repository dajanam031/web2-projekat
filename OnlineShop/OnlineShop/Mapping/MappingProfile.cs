using AutoMapper;
using OnlineShop.Dto;
using OnlineShop.Models;

namespace OnlineShop.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();
        }
    }
}
