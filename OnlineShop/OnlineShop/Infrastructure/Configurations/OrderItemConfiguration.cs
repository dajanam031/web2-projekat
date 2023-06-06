using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineShop.Models;

namespace OnlineShop.Infrastructure.Configurations
{
    public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
    {
        public void Configure(EntityTypeBuilder<OrderItem> builder)
        {
            builder.HasKey(x => new { x.OrderId, x.ItemId }); // formiran kljuc na osnovu porudzbine i artikla

            builder.Property(x => x.ItemQuantity).IsRequired();

            builder.HasOne(x => x.Order)
               .WithMany(x => x.OrderItems)
               .HasForeignKey(x => x.OrderId)
               .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.Item)
               .WithMany(x => x.OrderItems)
               .HasForeignKey(x => x.ItemId)
               .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
