using BananaNumbers.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BananaNumbers.Data
{
    public class ApplicationDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<GameDetail> GameDetails { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.HasDefaultSchema("dbo");

            builder.Entity<User>(entity =>
            {
                entity.ToTable("User");
            });

            builder.Entity<IdentityRole<Guid>>(entity =>
            {
                entity.ToTable("Role");
            });

            builder.Entity<IdentityUserRole<Guid>>(entity =>
            {
                entity.ToTable("UserRole");
            });

            builder.Entity<IdentityUserClaim<Guid>>(entity =>
            {
                entity.ToTable("UserClaim");
            });

            builder.Entity<IdentityUserLogin<Guid>>(entity =>
            {
                entity.ToTable("UserLogin");
            });

            builder.Entity<IdentityRoleClaim<Guid>>(entity =>
            {
                entity.ToTable("RoleClaim");
            });

            builder.Entity<IdentityUserToken<Guid>>(entity =>
            {
                entity.ToTable("UserToken");
            });
        }
    }
}
