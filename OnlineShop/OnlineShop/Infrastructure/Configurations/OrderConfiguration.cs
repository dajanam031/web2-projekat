using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineShop.Models;
using System;
using System.Reflection.Emit;

namespace OnlineShop.Infrastructure.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.DeliveryAddress).HasMaxLength(50);
            builder.Property(x => x.Comment).HasMaxLength(100);

            builder.Property(x => x.Status)
                  .HasConversion(
                      x => x.ToString(),
                      x => Enum.Parse<OrderStatus>(x)
                  );

            builder.HasOne(x => x.Purchaser) // jedna porudzbina ima jednog korisnika (kupca)
                   .WithMany(x => x.Orders) // A jedan kupac vise porudzbina
                   .HasForeignKey(x => x.PurchaserId) // Strani kljuc  je userId
                   .OnDelete(DeleteBehavior.Cascade);// Ako se obrise korisnik kaskadno se brisu sve njegove porudzbine (zavisi jel korisnik kupac ili prodavac ???)
        }
    }
}
