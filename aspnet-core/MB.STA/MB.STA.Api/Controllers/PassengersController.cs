using AutoMapper;
using MB.STA.Api.Data;
using MB.STA.Dtos.Passengers;
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
    public class PassengersController : ControllerBase
    {
        #region Data and Constructor

        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public PassengersController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        #endregion

        #region Actions

        [HttpGet]
        public async Task<List<PassengerDto>> GetPassengers()
        {
            var passengers = await _context
                                        .Passengers
                                        .Include(p => p.Bookings)
                                        .ToListAsync();

            var passengerDtos = _mapper.Map<List<Passenger>, List<PassengerDto>>(passengers);

            return passengerDtos;
        }

        [HttpGet("{id}")]
        public async Task<PassengerDto> GetPassengerById(int id)
        {
            var passenger = await _context
                                        .Passengers
                                        .Include(p => p.Bookings)
                                        .Where(p => p.Id == id)
                                        .SingleOrDefaultAsync();
            
            var passengerDto = _mapper.Map<PassengerDto>(passenger);

            return passengerDto;
        }

        [HttpPost]
        public async Task<PassengerDto> CreatePassenger([FromBody] PassengerDto passengerDto)
        {
            var passenger = _mapper.Map<Passenger>(passengerDto);

            await _context.AddAsync(passenger);
            await _context.SaveChangesAsync();

            passengerDto.Id = passenger.Id;
            return passengerDto;
        }

        [HttpPut("{id}")]
        public async Task EditPassenger(int id, [FromBody] PassengerDto passengerDto)
        {
            var passenger = await _context
                                .Passengers
                                .Include(p => p.Bookings)
                                .Where(p => p.Id == id)
                                .SingleOrDefaultAsync();


            _mapper.Map(passengerDto, passenger);

            _context.Update(passenger);
            await _context.SaveChangesAsync();            
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            var passenger = await _context.Passengers.FindAsync(id);

            _context.Remove(passenger);
            await _context.SaveChangesAsync();
        } 

        #endregion
    }
}
