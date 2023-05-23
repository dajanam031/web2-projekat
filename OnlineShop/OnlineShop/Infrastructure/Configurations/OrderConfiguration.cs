using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineShop.Models;
using System.Reflection.Emit;

namespace OnlineShop.Infrastructure.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.DeliveryAddress).IsRequired().HasMaxLength(30);
            builder.Property(x => x.Comment).IsRequired().HasMaxLength(40);

            builder.HasMany(o => o.OrderItems)
            .WithOne(oi => oi.Order)
            .HasForeignKey(oi => oi.OrderId);

            builder.HasOne(x => x.User) //Kazemo da porudzbina ima jednog korisnika (promenice se na vise)
                   .WithMany(x => x.Orders) // A jedan korisnik vise porudzbina
                   .HasForeignKey(x => x.UserId) // Strani kljuc  je userId
                   .OnDelete(DeleteBehavior.Cascade);// Ako se obrise korisnik kaskadno se brisu sve njegove porudzbine (zavisi jel korisnik kupac ili prodavac ???)
        }
    }
}
