using AngularWebApp.Server.Common;
using AngularWebApp.Server.Constants;
using AngularWebApp.Server.Dtos.Requests;
using AngularWebApp.Server.Dtos.Responses;
using AngularWebApp.Server.Models;
using AngularWebApp.Server.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AngularWebApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AccountController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequestDto registerRequestDto)
        {
            var result = await _authService.RegisterAsync(registerRequestDto);

            if (!result.IsSuccess)
            {
                return BadRequest(new ApiErrorResponseDto
                {
                    Errors = result.Errors
                });
            }

            return Ok();
        }

        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(int userId, string token)
        {
            var result = await _authService.ConfirmEmailAsync(userId, token);

            if (!result.IsSuccess)
            {
                return BadRequest(new ApiErrorResponseDto
                {
                    Errors = result.Errors
                });
            }

            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestDto loginRequestDto)
        {
            var result = await _authService.LoginAsync(loginRequestDto);

            if (!result.IsSuccess)
            {
                return Unauthorized(new ApiErrorResponseDto
                {
                    Errors = result.Errors
                });
            }

            return Ok(result.Value);
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            var result = await _authService.LogoutAsync();

            if (!result.IsSuccess)
            {
                return BadRequest(new ApiErrorResponseDto
                {
                    Errors = result.Errors
                });
            }

            return Ok();
        }

        [Authorize]
        [HttpGet("me")]
        public IActionResult Me()
        {
            var user = _authService.GetCurrentUser(User);
            return Ok(user);
        }
    }
}
