using AngularWebApp.Server.Common;
using AngularWebApp.Server.Dtos.Requests;
using AngularWebApp.Server.Dtos.Responses;

namespace AngularWebApp.Server.Services.Interfaces
{
    public interface IAdminService
    {
        Task<Result<List<UserResponseDto>>> GetAllUsersAsync();
        Task<Result> DeleteUserAsync(int id);
        Task<Result> CreateUserAsync(NewUserRequestDto dto);
        Task<Result> UpdateUserAsync(int id, UpdateUserRequestDto dto);
        Task<Result<UserResponseDto>> GetUserByIdAsync(int id);
    }
}
