import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = `${environment.apiUrl}/orders`;
  private adminUrl = `${environment.apiUrl}/admin/orders`;

  constructor(private http: HttpClient) {}

  getUserOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }

  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${id}`);
  }

  createOrder(): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, {});
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.adminUrl);
  }
}
