import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/app-routing-module';
import { ReactiveFormsModule } from '@angular/forms';
import { App } from '@app/app';
import { AccountService } from '@account/services/account-service';

export function initAccount(accountService: AccountService) {
  return () => accountService.init();
}

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initAccount,
      deps: [AccountService],
      multi: true
    },
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
