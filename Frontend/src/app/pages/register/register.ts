import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  message = '';
  messageType: 'success' | 'error' = 'error';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      this.message = '';

      this.authService.register(this.registerForm.value as any).subscribe({
        next: (res) => {
          this.loading = false;
          if (res.success) {
            this.message = 'Registration successful! Redirecting to login...';
            this.messageType = 'success';
            setTimeout(() => this.router.navigate(['/login']), 1500);
          } else {
            this.message = res.message || 'Registration failed';
            this.messageType = 'error';
          }
        },
        error: (err) => {
          this.loading = false;
          this.message = err.error?.message || 'Registration failed. Please try again.';
          this.messageType = 'error';
        },
      });
    }
  }
}
