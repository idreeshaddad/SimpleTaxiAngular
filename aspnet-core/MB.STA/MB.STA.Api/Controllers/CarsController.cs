using AutoMapper;
using MB.STA.Api.Data;
using MB.STA.Dtos.Cars;
using MB.STA.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MB.STA.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class CarsController : ControllerBase
    {
        #region Data and Constructor

        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CarsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        #endregion

        #region Services

        [HttpGet]
        public async Task<List<CarDto>> GetList()
        {
            var cars = await _context.Cars.ToListAsync();

            var carDtos = _mapper.Map<List<Car>, List<CarDto>>(cars);

            return carDtos;
        }

        [HttpGet("{id}")]
        public async Task<CarDto> GetByIdAsync(int id)
        {
            var car = await _context.Cars.FindAsync(id);

            var carDto = _mapper.Map<CarDto>(car);

            return carDto;
        }

        [HttpPost]
        public async Task Create([FromBody] CarDto carDto)
        {
            var car = _mapper.Map<CarDto, Car>(carDto);
            await _context.AddAsync(car);
            await _context.SaveChangesAsync();
        }

        [HttpPut("{id}")]
        public async Task Edit(int id, [FromBody] CarDto carDto)
        {
            var car = _mapper.Map<CarDto, Car>(carDto);
            _context.Update(car);
            await _context.SaveChangesAsync();
        }

        [HttpDelete("{id}")]
        public async Task DeleteAsync(int id)
        {
            var car = await _context.Cars.FindAsync(id);
            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();
        }


        #endregion

        #region Private Methods

        #endregion
    }
}
