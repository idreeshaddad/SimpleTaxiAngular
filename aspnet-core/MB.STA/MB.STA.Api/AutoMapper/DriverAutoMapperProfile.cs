using AutoMapper;
using MB.STA.Dtos.Drivers;
using MB.STA.Entities;

namespace MB.STA.Api.AutoMapper
{
    public class DriverAutoMapperProfile : Profile
    {
        public DriverAutoMapperProfile()
        {
            CreateMap<Driver, DriverDto>().ReverseMap();
        }
    }
}
