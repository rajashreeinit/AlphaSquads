import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service';
import { ProductService } from '../../../services/product.service';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  stats = {
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  };
  loading = true;

  private completedCalls = 0;

  constructor(
    private adminService: AdminService,
    private productService: ProductService,
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.completedCalls = 0;

    this.productService.getAll().subscribe({
      next: (products) => {
        this.stats.totalProducts = products.length;
        this.cdr.markForCheck();
        this.markCallComplete();
      },
      error: () => this.markCallComplete(),
    });

    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        this.stats.totalOrders = orders.length;
        this.stats.totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
        this.cdr.markForCheck();
        this.markCallComplete();
      },
      error: () => this.markCallComplete(),
    });

    this.adminService.getUsers().subscribe({
      next: (users) => {
        this.stats.totalUsers = users.length;
        this.cdr.markForCheck();
        this.markCallComplete();
      },
      error: () => this.markCallComplete(),
    });
  }

  private markCallComplete(): void {
    this.completedCalls++;
    if (this.completedCalls >= 3) {
      this.loading = false;
      this.cdr.markForCheck();
    }
  }
}
