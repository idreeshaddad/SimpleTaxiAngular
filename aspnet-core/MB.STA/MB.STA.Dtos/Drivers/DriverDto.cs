using MB.STA.Dtos.Cars;
using MB.STA.Utils.Enums;
using System.Collections.Generic;

namespace MB.STA.Dtos.Drivers
{
    public class DriverDto
    {
        public DriverDto()
        {
            Cars = new List<CarDto>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int Rating { get; set; }
        public Gender Gender { get; set; }

        public List<CarDto> Cars { get; set; }
    }
}
