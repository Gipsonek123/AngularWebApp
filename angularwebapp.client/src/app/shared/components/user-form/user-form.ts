import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserRole } from '@shared/enums/user-role.enum';

@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {
  @Input() form!: FormGroup;
  @Input() roles: UserRole[] = [];
  @Input() submitted = false;
  @Input() title = '';
  @Input() footerText = '';
  @Input() footerLinkText = '';
  @Input() footerLink = '';
  @Input() errors: string[] = [];
  @Input() usernameError = '';
  @Input() passwordError = '';
  @Input() backendErrors: string[] = [];
  @Input() submitText = '';
  @Input() showPasswordHint = false;
  @Input() passwordHintText = 'Leave empty to keep current password';
  @Input() showEmail = false;
  @Input() showRole = false;
  @Input() showConfirmPassword = false;
  @Output() submitForm = new EventEmitter<void>();


  get userName(): FormControl {
    return this.form.get('userName') as FormControl;
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.form.get('confirmPassword') as FormControl;
  }

  get role(): FormControl {
    return this.form.get('role') as FormControl;
  }

  onSubmit() {
    this.submitForm.emit();
  }

}
