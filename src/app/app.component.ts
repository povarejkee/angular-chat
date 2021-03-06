import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './features/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public auth: AuthService, private router: Router) {}

  public signOut(): void {
    this.auth
      .signOut()
      .subscribe({ next: () => this.router.navigate(['signin']) });
  }
}
