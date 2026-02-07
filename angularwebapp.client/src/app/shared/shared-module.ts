import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInput } from '@shared/components/auth-input/auth-input';
import { UserForm } from '@shared/components/user-form/user-form';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AuthInput,
    UserForm
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    AuthInput,
    UserForm
  ]
})
export class SharedModule { }
