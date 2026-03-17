using AngularWebApp.Server.Services.Interfaces;
using System.Security.Claims;

namespace AngularWebApp.Server.Services.Implementations
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public int? UserId
        {
            get
            {
                var idStr = _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
                return int.TryParse(idStr, out var id) ? id : null;
            }
        }

        public string UserName => _httpContextAccessor.HttpContext?.User?.Identity?.Name;

        public string Role => _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.Role);
    }
}

