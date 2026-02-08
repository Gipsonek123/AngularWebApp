import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export class AccountValidator {
  static readonly PASSWORD_PATTERN = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])/;
  static readonly PASSWORD_CONTROL = 'password';
  static readonly CONFIRM_PASSWORD_CONTROL = 'confirmPassword';

  static readonly usernameRules: ValidatorFn[] = [
    Validators.required,
    Validators.minLength(4)
  ];

  static readonly emailRules: ValidatorFn[] = [
    Validators.required,
    Validators.email
  ];

  static readonly passwordRules: ValidatorFn[] = [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern(this.PASSWORD_PATTERN)
  ];

  private static getPasswordValues(control: AbstractControl): { password: string; confirmPassword: string } {
    const password = control.get(this.PASSWORD_CONTROL)?.value ?? '';
    const confirmPassword = control.get(this.CONFIRM_PASSWORD_CONTROL)?.value ?? '';
    return { password, confirmPassword };
  }

  static passwordsMatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const parent = control.parent;
    if (!parent) {
      return null;
    }

    const { password, confirmPassword } = this.getPasswordValues(parent);

    if (password.length > 0 || confirmPassword.length > 0) {
      return password === confirmPassword ? null : { passwordsMismatch: true };
    }

    return null;
  };

  static passwordRulesEditUser: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const parent = control.parent;
    if (!parent) {
      return null;
    }

    const { password, confirmPassword } = this.getPasswordValues(parent);

    if (password.length === 0) {
      return null;
    }

    const composedValidator = Validators.compose(this.passwordRules);

    if (composedValidator) {
      const errors = composedValidator({ value: password } as AbstractControl);

      if (errors) {
        control.get(this.PASSWORD_CONTROL)?.setErrors(errors);
        return { passwordInvalid: true };
      }
    }

    return null;
  }
}
