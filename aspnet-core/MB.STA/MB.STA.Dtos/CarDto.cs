using MB.STA.Utils.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MB.STA.Dtos
{
    public class CarDto
    {
        public int Id { get; set; }
        public string PlateNumber { get; set; }
        public string Name { get; set; }
        public DateTime MakeYear { get; set; }
        public FuelType FuelType { get; set; }
        public CarType CarType { get; set; }

        public int? DriverId { get; set; }
        public string DriverName { get; set; }
    }
}
