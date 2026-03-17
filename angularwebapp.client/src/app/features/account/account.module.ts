import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Login } from '@account/components/login/login';
import { Register } from '@account/components/register/register';
import { ACCOUNT_ROUTES } from '@account/account-routes';
import { ConfirmEmail } from '@account/components/confirm-email/confirm-email';
import { SharedModule } from '@shared/shared-module'

@NgModule({
  declarations: [Login, Register, ConfirmEmail],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(ACCOUNT_ROUTES)
  ]
})
export class AccountModule { }
