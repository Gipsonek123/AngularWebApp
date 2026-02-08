using AngularWebApp.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace AngularWebApp.Server.EntityFramework
{
    public class AngularWebAppDbContext : IdentityDbContext<User, IdentityRole<int>, int>
    {
        public AngularWebAppDbContext(
            DbContextOptions<AngularWebAppDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
        }
    }
}
