using AutoMapper;
using MB.STA.Dtos.Passengers;
using MB.STA.Entities;

namespace MB.STA.Api.AutoMapper
{
    public class PassengerAutoMapperProfile : Profile
    {
        public PassengerAutoMapperProfile()
        {
            CreateMap<Passenger, PassengerDto>().ReverseMap();
        }
    }
}
