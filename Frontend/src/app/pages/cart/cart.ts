import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { CartItemComponent } from '../../components/cart-item/cart-item';
import { Cart } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, CartItemComponent],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartPage implements OnInit {
  cart: Cart | null = null;
  loading = true;
  error = '';
  placing = false;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.loading = true;
    this.error = '';

    this.cartService.getCart().subscribe({
      next: (cart) => {
        this.cart = cart;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'Failed to load cart';
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  onUpdateQuantity(event: { itemId: number; quantity: number }): void {
    this.cartService.updateCartItem(event.itemId, { quantity: event.quantity }).subscribe({
      next: (cart) => {
        this.cart = cart;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to update item';
        this.cdr.markForCheck();
      },
    });
  }

  onRemoveItem(itemId: number): void {
    this.cartService.removeFromCart(itemId).subscribe({
      next: () => this.loadCart(),
      error: (err) => {
        this.error = err.error?.message || 'Failed to remove item';
        this.cdr.markForCheck();
      },
    });
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe({
      next: () => {
        this.cart = { id: 0, items: [], totalAmount: 0 };
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'Failed to clear cart';
        this.cdr.markForCheck();
      },
    });
  }

  placeOrder(): void {
    this.placing = true;
    this.error = '';

    this.orderService.createOrder().subscribe({
      next: (order) => {
        this.placing = false;
        this.cartService.resetCount();
        this.router.navigate(['/order-confirmation', order.id]);
      },
      error: (err) => {
        this.placing = false;
        this.error = err.error?.message || 'Failed to place order';
        this.cdr.markForCheck();
      },
    });
  }

  get hasItems(): boolean {
    return !!this.cart?.items && this.cart.items.length > 0;
  }
}
