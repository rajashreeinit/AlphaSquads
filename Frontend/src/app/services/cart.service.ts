import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Cart, AddToCart, UpdateCartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = `${environment.apiUrl}/cart`;
  private cartCountSubject = new BehaviorSubject<number>(0);

  cartCount$ = this.cartCountSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(this.baseUrl).pipe(
      tap((cart) => {
        const count = cart.items ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0;
        this.cartCountSubject.next(count);
      })
    );
  }

  addToCart(dto: AddToCart): Observable<Cart> {
    return this.http.post<Cart>(this.baseUrl, dto).pipe(
      tap((cart) => {
        const count = cart.items ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0;
        this.cartCountSubject.next(count);
      })
    );
  }

  updateCartItem(itemId: number, dto: UpdateCartItem): Observable<Cart> {
    return this.http.put<Cart>(`${this.baseUrl}/${itemId}`, dto).pipe(
      tap((cart) => {
        const count = cart.items ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0;
        this.cartCountSubject.next(count);
      })
    );
  }

  removeFromCart(itemId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${itemId}`);
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/clear`).pipe(
      tap(() => this.cartCountSubject.next(0))
    );
  }

  resetCount(): void {
    this.cartCountSubject.next(0);
  }
}
