# ShopEase Platform Architecture

# 🍕 AlphaSquads — Retail Ordering Website

> A full-stack web application enabling customers to browse, order, and receive **Pizza, Cold Drinks, and Breads** seamlessly, with secure and efficient operations.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Routing Overview](#routing-overview)
- [Security & Reliability](#security--reliability)
- [Data Seeding](#data-seeding)
- [Team Contributions](#team-contributions)
- [Status](#status)

---

## Overview

AlphaSquads is a **Use Case 1 — Full-Stack .NET** retail ordering platform. It provides a centralized portal for managing brands, categories, and packaging, while supporting seamless menu browsing, cart management, order placement, and automatic inventory updates.

---

## Features

### ✅ Core Features

- Centralized portal for **brands, categories, and packaging**
- Menu browsing, cart management, and order placement
- Automatic inventory updates on confirmed orders
- Secure APIs with auth, authorization, and rate limiting
- REST endpoints validated via **Postman / Swagger**
- Code and design versioned in **GitHub**

### 🚀 Stretch Features

- Order history and quick reorder for users

---

## Tech Stack

### Frontend — Angular

| Area | Details |
|------|---------|
| Architecture | Single Page Application (SPA) |
| Routing | Guarded customer and admin routes |
| Services | Auth, Cart, Orders, Products, Categories, Admin |

### Backend — ASP.NET Core

| Area | Details |
|------|---------|
| API | REST API with JWT Authentication |
| Security | Rate limiting, CORS, Swagger UI |
| Database | SQLite with EF Core |
| Architecture | Repository + Service layers |
| Authorization | Role-based access (Admin / Customer) |

---

## Project Structure

```
Frontend/
└── src/app/
    ├── components/
    │   ├── cart-item/
    │   ├── navbar/
    │   └── product-card/
    ├── pages/
    │   ├── admin/
    │   ├── cart/
    │   ├── dashboard/
    │   ├── login/
    │   ├── order-confirmation/
    │   ├── order-history/
    │   └── register/
    └── services/
        ├── auth.ts
        ├── cart.service.ts
        ├── category.service.ts
        ├── order.service.ts
        ├── product.service.ts
        └── admin.service.ts

backend/
└── AuthAPI/
    ├── Controllers/
    │   ├── AuthController.cs
    │   ├── ProductsController.cs
    │   ├── CategoriesController.cs
    │   ├── CartController.cs
    │   ├── OrdersController.cs
    │   └── AdminController.cs
    ├── Services/
    │   ├── AuthService.cs
    │   ├── CartService.cs
    │   ├── CategoryService.cs
    │   ├── OrderService.cs
    │   └── ProductService.cs
    ├── Repositories/
    │   └── *Repository.cs + I*Repository.cs
    ├── Models/
    │   └── User.cs, Product.cs, Category.cs, Order.cs, Cart.cs, Inventory.cs
    ├── Auth/
    │   └── JwtTokenGenerator.cs
    ├── Data/
    │   └── AppDbContext.cs
    ├── Middleware/
    │   └── ExceptionMiddleware.cs
    ├── API_CONTRACTS.md
    └── Program.cs
```

---

## API Reference

### 🔐 Authentication

| Method | Endpoint |
|--------|----------|
| `POST` | `/api/auth/register` |
| `POST` | `/api/auth/login` |

### 📦 Products & Categories

| Method | Endpoint |
|--------|----------|
| `GET` | `/api/products` |
| `GET` | `/api/products/{id}` |
| `GET` | `/api/products/category/{categoryId}` |
| `GET` | `/api/categories` |
| `GET` | `/api/categories/{id}` |

### 🛒 Cart (Customer)

| Method | Endpoint |
|--------|----------|
| `GET` | `/api/cart` |
| `POST` | `/api/cart` |
| `PUT` | `/api/cart/{itemId}` |
| `DELETE` | `/api/cart/{itemId}` |
| `DELETE` | `/api/cart/clear` |

### 📋 Orders (Customer)

| Method | Endpoint |
|--------|----------|
| `GET` | `/api/orders` |
| `GET` | `/api/orders/{id}` |
| `POST` | `/api/orders` |

### 🛠️ Admin

| Method | Endpoint |
|--------|----------|
| `POST` | `/api/admin/products` |
| `DELETE` | `/api/admin/products/{id}` |
| `POST` | `/api/admin/categories` |
| `DELETE` | `/api/admin/categories/{id}` |
| `GET` | `/api/admin/inventory` |
| `GET` | `/api/admin/orders` |
| `GET` | `/api/admin/users` |
| `DELETE` | `/api/admin/users/{id}` |

> Full request/response formats are documented in `backend/AuthAPI/API_CONTRACTS.md`.

---

## Routing Overview

### Public Routes

| Path | Page |
|------|------|
| `/login` | Login |
| `/register` | Register |

### Customer Routes *(Auth Guard)*

| Path | Page |
|------|------|
| `/dashboard` | Menu Browsing |
| `/cart` | Shopping Cart |
| `/order-confirmation/:id` | Order Confirmation |
| `/orders` | Order History |

### Admin Routes *(Admin Guard)*

| Path | Page |
|------|------|
| `/admin` | Admin Dashboard |
| `/admin/products` | Product Management |
| `/admin/orders` | Orders Monitoring |
| `/admin/users` | User Management |
| `/admin/inventory` | Inventory View |

---

## Security & Reliability

- **JWT-based authentication** across all protected routes
- **Role-based authorization** — Admin and Customer roles
- **Rate limiting** — stricter limits applied on auth endpoints
- **Centralized exception middleware** for consistent error handling
- **Swagger UI** enabled for API exploration and testing

---

## Data Seeding

On startup, the backend automatically seeds the database with:

- **Users** — one Admin and one Customer
- **Categories** — Pizza, Cold Drinks, Breads
- **Sample products** with associated inventory entries

---

## Team Contributions

### 🔐 Siddharth Sharma — Authentication & Public APIs *(Backend Lead)*

- Designed and implemented the **JWT-based authentication system**
- Created login and registration flows
- Built **DTOs, Services, and Models** for authentication and users
- Implemented the **JWT Token Generator**
- Developed **public endpoints** (auth, product browsing, categories)
- Integrated **Exception Middleware**
- Contributed to **overall backend architecture and clean layering**

---

### 🛒 Rajashree Pal — Customer Features *(Backend)*

- Implemented **Customer Cart APIs**
- Developed the **order placement workflow**
- Built **Order History and Quick Reorder logic**
- Integrated **inventory deduction on order confirmation**
- Designed **CartService and OrderService logic**
- Ensured **customer authorization and input validation**

---

### 🛠️ Rythm — Admin Features *(Backend)*

- Implemented **AdminController endpoints**
- Built **Product and Category management APIs**
- Implemented **User management** (view and delete users)
- Developed **Inventory viewing endpoints**
- Built **Admin order monitoring functionality**
- Ensured **role-based authorization and Admin guard logic**

---

### 🎨 Garv Gambhir — Frontend *(Angular — Customer UI)*

- Developed customer-facing pages: Dashboard, Cart, Order Confirmation, Order History
- Built reusable components: `product-card`, `cart-item`
- Integrated **CartService and OrderService** with backend APIs
- Implemented **Auth Guard** for customer routes

---

### 🎨 Archit Mishra — Frontend *(Angular — Admin UI)*

- Developed admin pages: Dashboard, Product Management, Orders Monitoring, Inventory View, Users Management
- Implemented **Admin Guard routing**
- Integrated **AdminService APIs**
- Handled **SPA routing structure**
- Worked on **Navbar and layout consistency**

---

## 🤝 Team Collaboration

- **GitHub** — code versioning and feature branching
- **Postman & Swagger** — API validation and testing
- **Modular clean architecture** — followed for scalability
- **Continuous frontend ↔ backend integration** throughout development

---

## Status

✅ All **core and stretch requirements** for Full-Stack .NET — Use Case 1 are fully implemented.

