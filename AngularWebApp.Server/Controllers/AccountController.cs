using AngularWebApp.Server.Constants;
using AngularWebApp.Server.Dtos.Requests;
using AngularWebApp.Server.Dtos.Responses;
using AngularWebApp.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AngularWebApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequestDto registerRequestDto)
        {
            var user = new User
            {
                UserName = registerRequestDto.UserName,
                Email = registerRequestDto.Email
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

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestDto loginRequestDto)
        {
            var result = await _signInManager.PasswordSignInAsync(
                loginRequestDto.UserName,
                loginRequestDto.Password,
                isPersistent: false,
                lockoutOnFailure: false);

            if (!result.Succeeded)
            {
                return Unauthorized("Invalid username or password");
            }

            var user = await _userManager.FindByNameAsync(loginRequestDto.UserName);
            if (user == null)
            {
                return Unauthorized();
            }

            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault();

            return Ok(new LoginResponseDto
            {
                Role = role
            });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }

        [HttpGet("me")]
        public IActionResult Me()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userName = User.Identity?.Name;
            var role = User.FindFirstValue(ClaimTypes.Role);

            return Ok(new
            {
                Id = int.Parse(userId),
                UserName = userName,
                Role = role
            });
        }
    }
}
