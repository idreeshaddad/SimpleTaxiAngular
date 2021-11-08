using AutoMapper;
using MB.STA.Api.Data;
using MB.STA.Dtos;
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
        public string GetById(int id)
        {
            return "value";
        }

        [HttpPost]
        public void Create([FromBody] string value)
        {
        }

        [HttpPut("{id}")]
        public void Edit(int id, [FromBody] string value)
        {
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        #endregion

        #region Private Methods

        #endregion
    }
}
