import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-users.html',
  styleUrl: './manage-users.css',
})
export class ManageUsers implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm = '';
  loading = true;
  error = '';
  successMessage = '';

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void { this.loadUsers(); }

  loadUsers(): void {
    this.loading = true;
    this.adminService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'Failed to load users';
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  applyFilter(): void {
    if (!this.searchTerm.trim()) {
      this.filteredUsers = [...this.users];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredUsers = this.users.filter(
        (u) => u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term) || (u.role || '').toLowerCase().includes(term)
      );
    }
  }

  deleteUser(id: number): void {
    if (!confirm('Delete this user?')) return;
    this.adminService.deleteUser(id).subscribe({
      next: () => {
        this.successMessage = 'User deleted';
        this.loadUsers();
        this.cdr.markForCheck();
        setTimeout(() => { this.successMessage = ''; this.cdr.markForCheck(); }, 3000);
      },
      error: () => { this.error = 'Failed to delete user'; this.cdr.markForCheck(); },
    });
  }
}
