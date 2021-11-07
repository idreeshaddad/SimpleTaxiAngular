using MB.STA.Utils.Enums;
using System.Collections.Generic;

namespace MB.STA.Entities
{
    public class Passenger
    {
        public Passenger()
        {
            Bookings = new List<Booking>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public Gender Gender { get; set; }

        public List<Booking> Bookings { get; set; }
    }
}
