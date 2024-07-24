import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isLoggedIn = true;

  toggleTheme() {}

  constructor(private router: Router) {}
  sair() {
    this.router.navigate(['/home']);
  }
}
