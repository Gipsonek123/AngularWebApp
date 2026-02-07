import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminPanel } from '@admin/components/admin-panel/admin-panel';
import { EditUser } from '@admin/components/edit-user/edit-user';
import { CreateUser } from '@admin/components/create-user/create-user';
import { ADMIN_ROUTES } from '@admin/admin-routes';
import { SharedModule } from '@shared/shared-module'

@NgModule({
  declarations: [AdminPanel, EditUser, CreateUser],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(ADMIN_ROUTES)
  ]
})
export class AdminModule { }
