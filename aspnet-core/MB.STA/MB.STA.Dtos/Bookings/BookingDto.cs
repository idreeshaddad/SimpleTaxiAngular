using MB.STA.Dtos.Cars;
using MB.STA.Dtos.Drivers;
using MB.STA.Dtos.Passengers;
using System;
using System.Collections.Generic;

namespace MB.STA.Dtos.Bookings
{
    public class BookingDto
    {
        public BookingDto()
        {
            Passengers = new List<PassengerDto>();
        }

        public int Id { get; set; }
        public DateTime PickUpTime { get; set; }
        public string FromAddress { get; set; }
        public string ToAddress { get; set; }
        public double Price { get; set; }
        public bool IsPaid { get; set; }
        public DateTime? PaymentDate { get; set; }

        public int? CarId { get; set; }
        public CarDto Car { get; set; }

        public int? DriverId { get; set; }
        public DriverDto Driver { get; set; }

        public List<PassengerDto> Passengers { get; set; }
    }
}