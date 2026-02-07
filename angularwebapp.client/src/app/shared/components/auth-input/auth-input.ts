import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-auth-input',
  standalone: false,
  templateUrl: './auth-input.html',
  styleUrl: './auth-input.css',
})
export class AuthInput {
  @Input() label = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() control!: FormControl;
  @Input() hintText? = '';
  @Input() showHint = false;
  @Input() submitted = false;
  @Input() errors: string[] = [];
}
