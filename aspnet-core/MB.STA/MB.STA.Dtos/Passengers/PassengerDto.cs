using MB.STA.Dtos.Bookings;
using MB.STA.Utils.Enums;
using System.Collections.Generic;

namespace MB.STA.Dtos.Passengers
{
    public class PassengerDto
    {
        public PassengerDto()
        {
            Bookings = new List<BookingDto>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public Gender Gender { get; set; }

        public List<BookingDto> Bookings { get; set; }
    }
}
