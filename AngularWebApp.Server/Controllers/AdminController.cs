using AngularWebApp.Server.Constants;
using AngularWebApp.Server.Dtos.Requests;
using AngularWebApp.Server.Dtos.Responses;
using AngularWebApp.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NpgsqlTypes;

namespace AngularWebApp.Server.Controllers
{
    [Authorize(Roles = UserRole.Admin)]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AdminController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userManager.Users
                .Where(u => u.UserName.ToLower() != "admin")
                .ToListAsync();

            var usersList = new List<UserResponseDto>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                var role = roles.FirstOrDefault();

                usersList.Add(new UserResponseDto
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    Role = role
                });
            }

            return Ok(usersList);
        }

        [HttpDelete("users/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var currentUserId = _userManager.GetUserId(User);

            if (currentUserId == id)
            {
                return Forbid("You can't delete your own account!");
            }

            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(new ApiErrorResponseDto
                {
                    Errors = result.Errors.Select(e => e.Description).ToList()
                });
            }

            return NoContent();
        }

        [HttpPost("users")]
        public async Task<IActionResult> CreateUser(NewUserRequestDto newUserRequestDto)
        {
            var user = new User
            {
                UserName = newUserRequestDto.UserName,
                Email = newUserRequestDto.Email,
            };

            var result = await _userManager.CreateAsync(user, newUserRequestDto.Password);
            if (!result.Succeeded)
            {
                return BadRequest(new ApiErrorResponseDto
                {
                    Errors = result.Errors.Select(e => e.Description).ToList()
                });
            }

            const string role = UserRole.User;
            await _userManager.AddToRoleAsync(user, role);

            return Ok();
        }

        [HttpGet("users/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null)
            {
                return NotFound();
            }

            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault();

            return Ok(new UserResponseDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                Role = role
            });
        }

        [HttpPut("users/{id}")]
        public async Task<IActionResult> UpdateUser(int id, UpdateUserRequestDto updateUserRequestDto)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null)
            {
                return NotFound();
            }

            var existingUserByUserName = await _userManager.FindByNameAsync(updateUserRequestDto.UserName);
            if (existingUserByUserName != null && existingUserByUserName.Id != user.Id)
            {
                return BadRequest(new ApiErrorResponseDto
                {
                    Errors = { $"Username '{existingUserByUserName.UserName}' is already taken." }
                });
            }

            var existingUserByEmail = await _userManager.FindByEmailAsync(updateUserRequestDto.Email);
            if (existingUserByEmail != null && existingUserByEmail.Id != user.Id)
            {
                return BadRequest(new ApiErrorResponseDto
                {
                    Errors = { $"Email '{existingUserByEmail.Email}' already used." }
                });
            }

            await _userManager.SetUserNameAsync(user, updateUserRequestDto.UserName);
            await _userManager.SetEmailAsync(user, updateUserRequestDto.Email);

            if (!string.IsNullOrEmpty(updateUserRequestDto.Password))
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                var result = await _userManager.ResetPasswordAsync(user, token, updateUserRequestDto.Password);
                if (!result.Succeeded)
                {
                    return BadRequest(new ApiErrorResponseDto
                    {
                        Errors = result.Errors.Select(e => e.Description).ToList()
                    });
                }
            }

            var roles = await _userManager.GetRolesAsync(user);
            await _userManager.RemoveFromRolesAsync(user, roles);

            var newRole = updateUserRequestDto.Role;
            await _userManager.AddToRoleAsync(user, newRole);

            await _userManager.UpdateAsync(user);
            await _signInManager.RefreshSignInAsync(user);

            return Ok();
        }
    }
}
