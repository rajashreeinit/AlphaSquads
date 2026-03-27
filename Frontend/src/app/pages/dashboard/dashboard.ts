import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth';
import { ProductCardComponent } from '../../components/product-card/product-card';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  searchTerm = '';
  selectedCategoryId: number | null = null;
  loading = true;
  error = '';
  addingProductId: number | null = null;
  successMessage = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.cdr.markForCheck();
      },
      error: () => {},
    });
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';

    this.productService.getAll().subscribe({
      next: (products) => {
        this.products = products;
        this.applyFilters();
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.error = 'Failed to load products. Please try again.';
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  applyFilters(): void {
    let result = [...this.products];

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    }

    if (this.selectedCategoryId) {
      result = result.filter((p) => p.categoryId === this.selectedCategoryId);
    }

    this.filteredProducts = result;
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onCategoryChange(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
    this.applyFilters();
  }

  onAddToCart(product: Product): void {
    this.addingProductId = product.id;
    this.successMessage = '';

    this.cartService.addToCart({ productId: product.id, quantity: 1 }).subscribe({
      next: () => {
        this.addingProductId = null;
        this.successMessage = `${product.name} added to cart!`;
        this.cdr.markForCheck();
        setTimeout(() => {
          this.successMessage = '';
          this.cdr.markForCheck();
        }, 3000);
      },
      error: (err) => {
        this.addingProductId = null;
        this.error = err.error?.message || 'Failed to add to cart';
        this.cdr.markForCheck();
        setTimeout(() => {
          this.error = '';
          this.cdr.markForCheck();
        }, 3000);
      },
    });
  }
}
