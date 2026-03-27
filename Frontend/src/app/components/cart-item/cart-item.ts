import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItemComponent {
  @Input() item!: CartItem;
  @Output() updateQuantity = new EventEmitter<{ itemId: number; quantity: number }>();
  @Output() removeItem = new EventEmitter<number>();

  increment(): void {
    this.updateQuantity.emit({ itemId: this.item.id, quantity: this.item.quantity + 1 });
  }

  decrement(): void {
    if (this.item.quantity > 1) {
      this.updateQuantity.emit({ itemId: this.item.id, quantity: this.item.quantity - 1 });
    }
  }

  remove(): void {
    this.removeItem.emit(this.item.id);
  }
}
