using AngularWebApp.Server.Constants;
using AngularWebApp.Server.Dtos.Requests;
using AngularWebApp.Server.Dtos.Responses;
using AngularWebApp.Server.Models;
using AngularWebApp.Server.Services.Interfaces;
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
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            var result = await _adminService.GetAllUsersAsync();

            if (!result.IsSuccess)
            {
                return BadRequest(new ApiErrorResponseDto { Errors = result.Errors });
            }

            return Ok(result.Value);
        }

        [HttpDelete("users/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _adminService.DeleteUserAsync(id);

            if (!result.IsSuccess)
            {
                return BadRequest(new ApiErrorResponseDto { Errors = result.Errors });
            }

            return NoContent();
        }

        [HttpPost("users")]
        public async Task<IActionResult> CreateUser(NewUserRequestDto dto)
        {
            var result = await _adminService.CreateUserAsync(dto);

            if (!result.IsSuccess)
            {
                return BadRequest(new ApiErrorResponseDto { Errors = result.Errors });
            }

            return Ok();
        }

        [HttpGet("users/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var result = await _adminService.GetUserByIdAsync(id);

            if (!result.IsSuccess)
            {
                return NotFound(new ApiErrorResponseDto { Errors = result.Errors });
            }

            return Ok(result.Value);
        }

        [HttpPut("users/{id}")]
        public async Task<IActionResult> UpdateUser(int id, UpdateUserRequestDto dto)
        {
            var result = await _adminService.UpdateUserAsync(id, dto);

            if (!result.IsSuccess)
            {
                return BadRequest(new ApiErrorResponseDto { Errors = result.Errors });
            }

            return Ok();
        }
    }
}
