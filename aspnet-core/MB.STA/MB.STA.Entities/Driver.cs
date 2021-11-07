using MB.STA.Utils.Enums;
using System.Collections.Generic;

namespace MB.STA.Entities
{
    public class Driver
    {
        public Driver()
        {
            Cars = new List<Car>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int Rating { get; set; }
        public Gender Gender { get; set; }

        public List<Car> Cars { get; set; }
    }
}
