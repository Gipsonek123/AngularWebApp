import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Login } from '@account/components/login/login';
import { Register } from '@account/components/register/register';
import { ACCOUNT_ROUTES } from '@account/account-routes';

@NgModule({
  declarations: [Login, Register],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ACCOUNT_ROUTES)
  ]
})
export class AccountModule { }
