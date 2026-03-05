using AngularWebApp.Server.Common;
using AngularWebApp.Server.Constants;
using AngularWebApp.Server.Dtos.Requests;
using AngularWebApp.Server.Dtos.Responses;
using AngularWebApp.Server.Models;
using AngularWebApp.Server.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AngularWebApp.Server.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IEmailSender _emailSender;

        public AuthService(UserManager<User> userManager, SignInManager<User> signInManager, IEmailSender emailSender)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _emailSender = emailSender;
        }

        public async Task<Result<LoginResponseDto>> LoginAsync(LoginRequestDto loginRequestDto)
        {
            var user = await _userManager.FindByNameAsync(loginRequestDto.UserName);

            if (user == null)
            {
                return Result<LoginResponseDto>.Failure("Invalid username or password");
            }

            if (!user.EmailConfirmed)
            {
                return Result<LoginResponseDto>.Failure("Email not confirmed. Please check your inbox.");
            }

            var result = await _signInManager.PasswordSignInAsync(
                loginRequestDto.UserName,
                loginRequestDto.Password,
                isPersistent: false,
                lockoutOnFailure: false);

            if (!result.Succeeded)
            {
                return Result<LoginResponseDto>.Failure("Invalid username or password");
            }

            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault();

            return Result<LoginResponseDto>.Success(new LoginResponseDto
            {
                Role = role
            });
        }

        public async Task<Result> RegisterAsync(RegisterRequestDto registerRequestDto)
        {
            var user = new User
            {
                UserName = registerRequestDto.UserName,
                Email = registerRequestDto.Email
            };

            var result = await _userManager.CreateAsync(user, registerRequestDto.Password);

            if (!result.Succeeded)
            {
                return Result.Failure(string.Join(", ", result.Errors.Select(e => e.Description)));
            }

            const string role = UserRole.User;
            await _userManager.AddToRoleAsync(user, role);

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var encodedToken = Uri.EscapeDataString(token);

            // To change
            var confirmationLink =
            $"https://localhost:65488/account/confirm-email?userId={user.Id}&token={encodedToken}";

            await _emailSender.SendEmailAsync(
                user.Email,
                "Confirm email",
                $"Click on the link: <a href='{confirmationLink}'>Confirm</a>");

            return Result.Success();
        }

        public async Task<Result> ConfirmEmailAsync(int userId, string token)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());

            if (user == null)
            {
                return Result.Failure("Invalid user");
            }
            var result = await _userManager.ConfirmEmailAsync(user, token);

            if (!result.Succeeded)
            {
                return Result.Failure("Email confirmation failed");
            }
            return Result.Success();
        }

        public async Task<Result> LogoutAsync()
        {
            await _signInManager.SignOutAsync();
            return Result.Success();
        }

        public CurrentUserResponseDto GetCurrentUser(ClaimsPrincipal user)
        {
            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
            var userName = user.Identity?.Name;
            var role = user.FindFirstValue(ClaimTypes.Role);

            return new CurrentUserResponseDto
            {
                Id = int.Parse(userId),
                UserName = userName,
                Role = role
            };
        }
    }
}
