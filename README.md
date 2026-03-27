# ShopEase Platform Architecture

This repository contains the source code for ShopEase, a comprehensive e-commerce platform built as part of the HCL Hackathon. The application is divided into a robust .NET Web API backend and a responsive Angular frontend, employing modern development practices, secure authentication, and a clear architectural pattern.

## Project Overview

ShopEase provides a centralized ordering system allowing customers to browse product catalogs, manage shopping carts, and place orders securely. The platform includes an administrative interface for managing inventory, viewing order history, and handling user accounts.

### Core Architecture

The system utilizes a decoupled architecture where the client application communicates with the server via RESTful API endpoints.

* Backend Framework: .NET 8 Web API
* Frontend Framework: Angular 21 (Zoneless architecture, Standalone components)
* Database: SQLite (Entity Framework Core)
* Authentication: JSON Web Tokens (JWT)
* Design Pattern: Repository and Service Pattern

## Backend Specifications

The backend infrastructure is housed within the `backend/AuthAPI` directory and uses ASP.NET Core. 

### Key Components

* Controllers: Handle incoming HTTP requests and map them to respective services.
* Services: Encapsulate business logic.
* Repositories: Abstract data access via Entity Framework Core.
* Middleware: Custom exception handling and rate limiting to prevent abuse.
* Setup: The database is automatically migrated and seeded with initial administrative users and product categories upon application startup.

### API Security

All privileged endpoints require a valid JWT passed in the Authorization header. Role-based access control enforces administrative boundaries, preventing customer accounts from accessing inventory or system metrics. Request frequency is throttled via built-in .NET 8 fixed window rate limiting.

## Frontend Specifications

The client application is located in the `Frontend` directory and provides distinct user experiences for customers and administrators.

### Key Components

* Application State: Managed via RxJS BehaviorSubjects.
* Component Architecture: Strictly standalone components removing the need for ngModule.
* Data Fetching: HttpClient with functional interceptors for attaching authentication tokens.
* Change Detection: Optimized zoneless approach utilizing explicit ChangeDetectorRef updates.

## Local Environment Setup

### Prerequisites

* Node.js (v22 or higher)
* .NET SDK (v8.0 or higher)
* Angular CLI (v21)

### Starting the Services

1. Initialize the backend service:
Navigate to `backend/AuthAPI` and execute:
> dotnet run

This action will provision the SQLite database and start the API server on `http://localhost:5000`. Swagger documentation is available at the root URL.

2. Initialize the frontend client:
Navigate to the `Frontend` directory and execute:
> npm install
> npm start

The application will be accessible at `http://localhost:4200`.

## Repository Structure

* `/backend/AuthAPI` Contains all server side logic, database configurations, and API definitions.
* `/Frontend` Contains all client side modules, UI components, HTML templates, and CSS stylesheets.
* `/.gitignore` Specifies untracked files to ignore for Git version control.

## Documentation

For specific data models and payload structures, refer to `API_CONTRACTS.md` located in the backend directory. Detailed file hierarchies are documented passing through the `STRUCTURE.md` reference file.
