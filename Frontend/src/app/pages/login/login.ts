import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  message = '';
  messageType: 'success' | 'error' = 'error';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.message = '';

      this.authService.login(this.loginForm.value as any).subscribe({
        next: (res) => {
          this.loading = false;
          if (res.success) {
            this.message = 'Login successful! Redirecting...';
            this.messageType = 'success';
            const user = res.user;
            if (user?.role === 'Admin') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/dashboard']);
            }
          } else {
            this.message = res.message || 'Login failed';
            this.messageType = 'error';
          }
        },
        error: (err) => {
          this.loading = false;
          this.message = err.error?.message || 'Login failed. Please try again.';
          this.messageType = 'error';
        },
      });
    }
  }
}