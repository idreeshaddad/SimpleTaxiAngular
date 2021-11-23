using AutoMapper;
using MB.STA.Dtos.Cars;
using MB.STA.Entities;

namespace MB.STA.Api.AutoMapper
{
    public class CarAutoMapperProfile : Profile
    {
        public CarAutoMapperProfile()
        {
            CreateMap<Car, CarDto>().ReverseMap();
        }
    }
}
