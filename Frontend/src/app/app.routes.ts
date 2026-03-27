import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './guards/auth.guard';

import { LoginComponent } from './pages/login/login';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { CartPage } from './pages/cart/cart';
import { OrderConfirmationPage } from './pages/order-confirmation/order-confirmation';
import { OrderHistoryPage } from './pages/order-history/order-history';
import { AdminDashboard } from './pages/admin/admin-dashboard/admin-dashboard';
import { ManageProducts } from './pages/admin/manage-products/manage-products';
import { ManageOrders } from './pages/admin/manage-orders/manage-orders';
import { ManageUsers } from './pages/admin/manage-users/manage-users';
import { ManageInventory } from './pages/admin/manage-inventory/manage-inventory';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: Register },

  // Customer routes
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'cart', component: CartPage, canActivate: [authGuard] },
  { path: 'order-confirmation/:id', component: OrderConfirmationPage, canActivate: [authGuard] },
  { path: 'orders', component: OrderHistoryPage, canActivate: [authGuard] },

  // Admin routes
  { path: 'admin', component: AdminDashboard, canActivate: [adminGuard] },
  { path: 'admin/products', component: ManageProducts, canActivate: [adminGuard] },
  { path: 'admin/orders', component: ManageOrders, canActivate: [adminGuard] },
  { path: 'admin/users', component: ManageUsers, canActivate: [adminGuard] },
  { path: 'admin/inventory', component: ManageInventory, canActivate: [adminGuard] },

  // Fallback
  { path: '**', redirectTo: 'login' },
];
