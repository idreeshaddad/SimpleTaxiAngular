using AutoMapper;
using MB.STA.Dtos.Bookings;
using MB.STA.Entities;

namespace MB.STA.Api.AutoMapper
{
    public class BookingAutoMapperProfile : Profile
    {
        public BookingAutoMapperProfile()
        {
            CreateMap<Booking, BookingDto>().ReverseMap();
        }
    }
}
