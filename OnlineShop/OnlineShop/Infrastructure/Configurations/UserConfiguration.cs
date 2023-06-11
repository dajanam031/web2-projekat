using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineShop.Models;
using System;

namespace OnlineShop.Infrastructure.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id); // primarni kljuc
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.FirstName).IsRequired();
            builder.Property(x => x.LastName).IsRequired();
            builder.Property(x => x.Username).IsRequired();
            builder.Property(x => x.Address).IsRequired();

            builder.Property(x => x.Email).IsRequired();

            builder.Property(x => x.UserType)
                   .HasConversion(
                       x => x.ToString(),
                       x => Enum.Parse<UserType>(x)
                   );

            builder.Property(x => x.RegistrationType)
                   .HasConversion(
                       x => x.ToString(),
                       x => Enum.Parse<RegistrationType>(x)
                   );

            builder.Property(x => x.ImageUri).IsRequired();
            builder.Property(x => x.BirthDate).IsRequired();
            builder.Property(x => x.Verified).IsRequired();
            builder.Property(x => x.VerificationStatus).IsRequired();

            builder.HasIndex(x => x.Email).IsUnique();
        }
    }
}
