import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@account/services/account-service';
import { AppPath } from '@core/enums/app-path.enum';

@Component({
  selector: 'app-confirm-email',
  standalone: false,
  template: ''
})

export class ConfirmEmail {
  success = false;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit() {
    const userId = this.route.snapshot.queryParamMap.get('userId');
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!userId || !token) {
      this.error = true;
      return;
    }

    this.accountService.confirmEmail(+userId, token).subscribe({
      next: () => {
        this.router.navigate([AppPath.Login], {
          queryParams: { confirmed: 'true' }
        });
      },
      // To delete ??
      error: () => {
        this.router.navigate([AppPath.Login], {
          queryParams: { confirmed: 'error' }
        });
      }
    });
  }
}
