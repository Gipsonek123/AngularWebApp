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
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            await _userManager.DeleteAsync(user);
            return NoContent();
        }

        [HttpPost("users")]
        public async Task<IActionResult> CreateUser(RegisterRequestDto registerRequestDto)
        {
            var user = new User
            {
                UserName = registerRequestDto.UserName,
                Email = registerRequestDto.Email,
            };

            var result = await _userManager.CreateAsync(user, registerRequestDto.Password);
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
        public async Task<IActionResult> UpdateUser(int id, NewUserRequestDto newUserRequestDto)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null)
            {
                return NotFound();
            }

            var existingUserByUserName = _userManager.FindByNameAsync(newUserRequestDto.UserName);
            if (existingUserByUserName != null && existingUserByUserName.Id != newUserRequestDto.Id)
            {
                return BadRequest(new ApiErrorResponseDto
                {
                    Errors = { "Username is already taken." }
                });
            }

            var existingUserByEmail = _userManager.FindByEmailAsync(newUserRequestDto.Email);
            if (existingUserByEmail != null && existingUserByEmail.Id != newUserRequestDto.Id)
            {
                return BadRequest(new ApiErrorResponseDto
                {
                    Errors = { "Email already used." }
                });
            }

            await _userManager.SetUserNameAsync(user, newUserRequestDto.UserName);
            await _userManager.SetEmailAsync(user, newUserRequestDto.Email);

            if (!string.IsNullOrEmpty(newUserRequestDto.Password))
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                var result = await _userManager.ResetPasswordAsync(user, token, newUserRequestDto.Password);
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

            var newRole = newUserRequestDto.Role;
            await _userManager.AddToRoleAsync(user, newRole);

            await _userManager.UpdateAsync(user);
            await _signInManager.RefreshSignInAsync(user);

            return Ok();
        }
    }
}
