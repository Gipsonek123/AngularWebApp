using System.ComponentModel.DataAnnotations;

namespace AngularWebApp.Server.Dtos.Requests
{
    public class LoginDto
    {
        [Required(ErrorMessage = "Username is required")]
        [StringLength(20, MinimumLength = 4, ErrorMessage = "Min 4 or max 20 characters allowed")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [StringLength(20, MinimumLength = 6, ErrorMessage = "Min 6 or max 20 characters allowed")]
        public string Password { get; set; }
    }
}
