using AngularWebApp.Server.Common;
using AngularWebApp.Server.Dtos.Requests;
using AngularWebApp.Server.Dtos.Responses;
using System.Security.Claims;

namespace AngularWebApp.Server.Services.Interfaces
{
    public interface IAuthService
    {
        Task<Result> RegisterAsync(RegisterRequestDto registerRequestDto);
        Task<Result<LoginResponseDto>> LoginAsync(LoginRequestDto loginRequestDto);
        Task<Result> ConfirmEmailAsync(int userId, string token);
        Task<Result> LogoutAsync();
        CurrentUserResponseDto GetCurrentUser(ClaimsPrincipal user);
    }
}
