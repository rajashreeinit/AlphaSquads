import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CartService } from '../../services/cart.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-history.html',
  styleUrl: './order-history.css',
})
export class OrderHistoryPage implements OnInit {
  orders: Order[] = [];
  loading = true;
  error = '';
  reorderingId: number | null = null;
  successMessage = '';

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.error = '';

    this.orderService.getUserOrders().subscribe({
      next: (orders) => {
        this.orders = orders.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'Failed to load order history';
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  reorder(order: Order): void {
    this.reorderingId = order.id;
    this.successMessage = '';

    let added = 0;
    const total = order.items.length;

    order.items.forEach((item) => {
      this.cartService
        .addToCart({ productId: item.productId, quantity: item.quantity })
        .subscribe({
          next: () => {
            added++;
            if (added === total) {
              this.reorderingId = null;
              this.successMessage = 'Items added to cart!';
              this.cdr.markForCheck();
              setTimeout(() => {
                this.router.navigate(['/cart']);
              }, 800);
            }
          },
          error: () => {
            added++;
            if (added === total) {
              this.reorderingId = null;
              this.error = 'Some items could not be added to cart';
              this.cdr.markForCheck();
              setTimeout(() => {
                this.error = '';
                this.cdr.markForCheck();
              }, 3000);
            }
          },
        });
    });
  }

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }
}
