import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export class CustomValidators {
  static readonly PASSWORD_PATTERN = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])/;
  static readonly PASSWORD_CONTROL = 'password';
  static readonly CONFIRM_PASSWORD_CONTROL = 'confirmPassword';

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
    Validators.pattern(CustomValidators.PASSWORD_PATTERN)
  ];

  static passwordsMatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(this.PASSWORD_CONTROL)?.value;
    const confirmPassword = control.get(this.CONFIRM_PASSWORD_CONTROL)?.value;
    return password === confirmPassword ? null : { mismatch: true };
  };
}
