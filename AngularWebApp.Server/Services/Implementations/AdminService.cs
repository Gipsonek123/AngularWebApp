using AngularWebApp.Server.Common;
using AngularWebApp.Server.Constants;
using AngularWebApp.Server.Dtos.Requests;
using AngularWebApp.Server.Dtos.Responses;
using AngularWebApp.Server.Models;
using AngularWebApp.Server.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AngularWebApp.Server.Services.Implementations
{
    public class AdminService : IAdminService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ICurrentUserService _currentUser;

        public AdminService(UserManager<User> userManager, SignInManager<User> signInManager, ICurrentUserService currentUser)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _currentUser = currentUser;
        }

        public async Task<Result<List<UserResponseDto>>> GetAllUsersAsync()
        {
            var users = await _userManager.Users
                .Where(u => u.UserName.ToLower() != "admin")
                .ToListAsync();

            var userlist = new List<UserResponseDto>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);

                userlist.Add(new UserResponseDto
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    Role = roles.FirstOrDefault()
                });
            }

            return Result<List<UserResponseDto>>.Success(userlist);
        }

        public async Task<Result> DeleteUserAsync(int id)
        {
            if (_currentUser.UserId == id)
            {
                return Result.Failure("You can't delete your own account!");
            }

            var user = await _userManager.FindByIdAsync(id.ToString());

            if (user == null)
            {
                return Result.Failure("User not found.");
            }

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
            {
                return Result.Failure(result.Errors.Select(e => e.Description).ToArray());
            }

            return Result.Success();
        }

        public async Task<Result> CreateUserAsync(NewUserRequestDto dto)
        {
            var user = new User
            {
                UserName = dto.UserName,
                Email = dto.Email
            };

            var result = await _userManager.CreateAsync(user, dto.Password);

            if (!result.Succeeded)
            {
                return Result.Failure(result.Errors.Select(e => e.Description).ToArray());
            }

            await _userManager.AddToRoleAsync(user, UserRole.User);

            return Result.Success();
        }

        public async Task<Result> UpdateUserAsync(int id, UpdateUserRequestDto dto)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());

            if (user == null)
            {
                return Result.Failure("User not found.");
            }

            var existingByUsername = await _userManager.FindByNameAsync(dto.UserName);

            if (existingByUsername != null && existingByUsername.Id != user.Id)
            {
                return Result.Failure($"Username '{dto.UserName}' is already taken.");
            }

            var existingByEmail = await _userManager.FindByEmailAsync(dto.Email);

            if (existingByEmail != null && existingByEmail.Id != user.Id)
            {
                return Result.Failure($"Email '{dto.Email}' is already taken.");
            }

            await _userManager.SetUserNameAsync(user, dto.UserName);
            await _userManager.SetEmailAsync(user, dto.Email);

            if (!string.IsNullOrEmpty(dto.Password))
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                var result = await _userManager.ResetPasswordAsync(user, token, dto.Password);

                if (!result.Succeeded)
                {
                    return Result.Failure(result.Errors.Select(e => e.Description).ToArray());
                }
            }

            var roles = await _userManager.GetRolesAsync(user);
            await _userManager.RemoveFromRolesAsync(user, roles);

            await _userManager.AddToRoleAsync(user, dto.Role);

            await _userManager.UpdateAsync(user);
            await _signInManager.RefreshSignInAsync(user);

            return Result.Success();
        }

        public async Task<Result<UserResponseDto>> GetUserByIdAsync(int id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());

            if (user == null)
            {
                return Result<UserResponseDto>.Failure("User not found.");
            }

            var roles = await _userManager.GetRolesAsync(user);

            return Result<UserResponseDto>.Success(new UserResponseDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                Role = roles.FirstOrDefault()
            });
        }
    }
}
