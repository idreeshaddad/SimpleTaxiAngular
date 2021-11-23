using MB.STA.Entities;
using Microsoft.EntityFrameworkCore;

namespace MB.STA.Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

        public DbSet<Car> Cars { get; set; }
        public DbSet<Driver> Drivers { get; set; }
        public DbSet<Passenger> Passengers { get; set; }
        public DbSet<Booking> Bookings { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Car>().Property(c => c.PlateNumber).IsRequired();
            modelBuilder.Entity<Car>().Property(c => c.Name).IsRequired();
        }
    }
}
