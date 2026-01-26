import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminPanel } from '@admin/components/admin-panel/admin-panel';
import { ADMIN_ROUTES } from '@admin/admin-routes';

@NgModule({
  declarations: [AdminPanel],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    RouterModule.forChild(ADMIN_ROUTES)
  ]
})
export class AdminModule { }
