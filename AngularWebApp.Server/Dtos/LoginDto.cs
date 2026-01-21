using System.ComponentModel.DataAnnotations;

namespace AngularWebApp.Server.Dtos
{
    public class LoginDto
    {
        [Required(ErrorMessage = "Username is required")]
        [StringLength(20, MinimumLength = 5, ErrorMessage = "Min 5 or max 20 characters allowed")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [StringLength(20, MinimumLength = 5, ErrorMessage = "Min 5 or max 20 characters allowed")]
        public string Password { get; set; }
    }
}
