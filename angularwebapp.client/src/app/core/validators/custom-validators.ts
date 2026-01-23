import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export class CustomValidators {
  static readonly passwordPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])/;

  static readonly usernameRules = [
    Validators.required,
    Validators.minLength(4)
  ];

  static readonly emailRules = [
    Validators.required,
    Validators.email
  ];

  static readonly passwordRules = [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern(CustomValidators.passwordPattern)
  ];

  static passwordsMatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  };
}
