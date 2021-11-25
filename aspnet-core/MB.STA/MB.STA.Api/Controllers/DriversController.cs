using AutoMapper;
using MB.STA.Api.Data;
using MB.STA.Dtos.Drivers;
using MB.STA.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MB.STA.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DriversController : ControllerBase
    {
        #region Data and Constructor

        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public DriversController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        #endregion

        #region Services

        [HttpGet]
        public async Task<List<DriverDto>> GetList()
        {
            var drivers = await _context.Drivers.ToListAsync();
            var driverDtos = _mapper.Map<List<DriverDto>>(drivers);
            return driverDtos;

            //return await _context
            //                  .Drivers
            //                  .Select(d => _mapper.Map<DriverDto>(d))
            //                  .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<DriverDto> GetDriverById(int id)
        {
            var driver = await _context
                                .Drivers
                                .Include(d => d.Cars)
                                .Where(d => d.Id == id)
                                .SingleOrDefaultAsync();

            var driverDto = _mapper.Map<DriverDto>(driver);

            return driverDto;
        }

        [HttpPost]
        public async Task CreateDriver([FromBody] DriverDto driverDto)
        {
            var driver = _mapper.Map<Driver>(driverDto);
            await _context.Drivers.AddAsync(driver);
            await _context.SaveChangesAsync();
        }

        [HttpPut("{id}")]
        public async Task EditDriver(int id, [FromBody] DriverDto driverDto)
        {
            var driver = await _context.Drivers.FindAsync(id);
            _mapper.Map(driverDto, driver);

            _context.Drivers.Update(driver);
            await _context.SaveChangesAsync();
        }

        [HttpDelete("{id}")]
        public async Task DeleteDriver(int id)
        {
            var driver = await _context.Drivers.FindAsync(id);
            _context.Drivers.Remove(driver);
            await _context.SaveChangesAsync();
        } 

        #endregion
    }
}
