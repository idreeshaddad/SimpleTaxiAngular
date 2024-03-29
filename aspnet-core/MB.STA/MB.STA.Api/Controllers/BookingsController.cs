﻿using AutoMapper;
using MB.STA.Api.Data;
using MB.STA.Dtos.Bookings;
using MB.STA.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
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

            await UpdateBookingPassengers(bookingDto, booking);

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
            
            await UpdateBookingPassengers(bookingDto, booking);

            // Load car from db and add to booking entity
            if (bookingDto.CarId.HasValue)
            {
                var car = await _context.Cars.FindAsync(bookingDto.CarId);
                booking.Car = car;
            }
            // Load driver from db and add to booking entity
            if (bookingDto.DriverId.HasValue)
            {
                var driver = await _context.Drivers.FindAsync(bookingDto.DriverId);
                booking.Driver = driver;
            }

            if (booking.IsPaid == false)
                booking.PaymentDate = null;

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

        [HttpPost("{id}")]
        public async Task PayBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            booking.IsPaid = true;
            booking.PaymentDate = DateTime.Now;

            _context.Update(booking);
            await _context.SaveChangesAsync();
        }

        #endregion

        #region Private Methods

        private async Task UpdateBookingPassengers(BookingDto bookingDto, Booking booking)
        {
            var passengerIds = GetPassengerIdsFromDto(bookingDto);

            var passengers = await _context
                                    .Passengers
                                    .Where(p => passengerIds.Contains(p.Id))
                                    .ToListAsync();

            booking.Passengers.Clear();
            booking.Passengers.AddRange(passengers);
        }

        private List<int> GetPassengerIdsFromDto(BookingDto bookingDto)
        {
            var passengerIds = new List<int>();

            foreach (var pngr in bookingDto.Passengers)
            {
                passengerIds.Add(pngr.Id);
            }

            return passengerIds;
        }

        #endregion
    }
}
