using MB.STA.Dtos.Drivers;
using MB.STA.Utils.Enums;
using System;

namespace MB.STA.Dtos.Cars
{
    public class CarDto
    {
        public int Id { get; set; }
        public string PlateNumber { get; set; }
        public string Name { get; set; }
        public string Model { get; set; }

        public DateTime MakeYear { get; set; }
        public FuelType FuelType { get; set; }
        public CarType CarType { get; set; }

        public int? DriverId { get; set; }
        public DriverDto Driver { get; set; }
    }
}
