import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CartService } from '../../services/cart.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent implements OnInit {
  user: User | null = null;
  cartCount = 0;
  menuOpen = false;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
      this.cdr.markForCheck();
    });
    this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
      this.cdr.markForCheck();
    });

    if (this.authService.isLoggedIn() && !this.authService.isAdmin()) {
      this.cartService.getCart().subscribe({
        error: () => {}
      });
    }
  }

  get isAdmin(): boolean {
    return this.user?.role === 'Admin';
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.cartService.resetCount();
    this.router.navigate(['/login']);
  }
}
