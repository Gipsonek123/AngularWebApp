import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Welcome } from '@home/components/welcome/welcome';
import { HOME_ROUTES } from '@home/home-routes';

@NgModule({
  declarations: [Welcome],
  imports: [
    CommonModule,
    RouterModule.forChild(HOME_ROUTES)
  ]
})
export class HomeModule { }
