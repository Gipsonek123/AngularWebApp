using AngularWebApp.Server.Constants;
using Microsoft.AspNetCore.Identity;

namespace AngularWebApp.Server.Seeders
{
    public static class RoleSeeder
    {
        public static async Task SeedAsync(RoleManager<IdentityRole<int>> roleManager)
        {
            foreach (var role in UserRole.AllRoles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new IdentityRole<int>(role));
                }
            }
        }
    }
}
