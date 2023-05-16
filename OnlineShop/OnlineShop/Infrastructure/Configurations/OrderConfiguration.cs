using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineShop.Models;

namespace OnlineShop.Infrastructure.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.Quantity).IsRequired();
            builder.Property(x => x.DeliveryAddress).IsRequired().HasMaxLength(30);
            builder.Property(x => x.Comment).IsRequired().HasMaxLength(40);

            //builder.HasOne(x => x.ItemToOrder);
        }
    }
}
