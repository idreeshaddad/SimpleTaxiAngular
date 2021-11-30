using AutoMapper;
using MB.STA.Api.Data;
using MB.STA.Dtos.Bookings;
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
    public class BookingsController : ControllerBase
    {
        #region Data and Constructor

        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public BookingsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        #endregion

        #region Actions

        [HttpGet]
        public async Task<List<BookingDto>> GetBookings()
        {
            var bookings = await _context
                                .Bookings
                                .Include(b => b.Passengers)
                                .Include(b => b.Driver)
                                .Include(b => b.Car)
                                .ToListAsync();

            var bookingDtos = _mapper.Map<List<BookingDto>>(bookings);

            return bookingDtos;
        }

        [HttpGet("{id}")]
        public async Task<BookingDto> GetBookingById(int id)
        {
            var booking = await _context
                                    .Bookings
                                    .Include(b => b.Passengers)
                                    .Include(b => b.Driver)
                                    .Include(b => b.Car)
                                    .Where(b => b.Id == id)
                                    .SingleOrDefaultAsync();

            var bookingDto = _mapper.Map<BookingDto>(booking);

            return bookingDto;
        }

        [HttpPost]
        public async Task CreateBooking([FromBody] BookingDto bookingDto)
        {
            var booking = _mapper.Map<Booking>(bookingDto);

            await _context.AddAsync(booking);
            await _context.SaveChangesAsync();
        }

        [HttpPut("{id}")]
        public async Task EditBooking(int id, [FromBody] BookingDto bookingDto)
        {
            var booking = await _context
                            .Bookings
                            .Include(b => b.Passengers)
                            .Include(b => b.Driver)
                            .Include(b => b.Car)
                            .Where(b => b.Id == id)
                            .SingleOrDefaultAsync();

            _mapper.Map(bookingDto, booking);

            _context.Update(booking);
            await _context.SaveChangesAsync();
        }

        [HttpDelete("{id}")]
        public async Task DeleteBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);

            _context.Remove(booking);
            await _context.SaveChangesAsync();
        } 

        #endregion
    }
}
