using System.ComponentModel.DataAnnotations;

namespace AngularWebApp.Server.Dtos.Requests
{
    public class UpdateUserRequestDto : IValidatableObject
    {
        [Required(ErrorMessage = "Username is required")]
        [StringLength(20, MinimumLength = 4, ErrorMessage = "Min 4 or max 20 characters allowed")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [MaxLength(50, ErrorMessage = "Max 50 characters allowed")]
        [EmailAddress(ErrorMessage = "Please enter a vaild email")]
        public string Email { get; set; }

        [Required]
        public string Role { get; set; }

        public string? Password { get; set; }
        public string? ConfirmPassword { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext context)
        {
            if (!string.IsNullOrWhiteSpace(Password))
            {
                if (Password.Length < 6 || Password.Length > 20)
                {
                    yield return new ValidationResult(
                        "Min 6 or max 20 characters allowed",
                        new[] { nameof(Password) });
                }

                if (Password != ConfirmPassword)
                {
                    yield return new ValidationResult(
                        "Passwords do not match",
                        new[] { nameof(ConfirmPassword) });
                }
            }
        }
    }
}
