import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { Product, CreateProduct } from '../../../models/product.model';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-products.html',
  styleUrl: './manage-products.css',
})
export class ManageProducts implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  filteredProducts: Product[] = [];
  searchTerm = '';
  loading = true;
  error = '';
  successMessage = '';
  showForm = false;
  submitting = false;
  newProduct: CreateProduct = { name: '', description: '', price: 0, categoryId: 0, stockQuantity: 0 };
  showCategoryForm = false;
  newCategoryName = '';
  newCategoryDesc = '';
  submittingCategory = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: (products) => {
        this.products = products;
        this.applyFilter();
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'Failed to load products';
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (cats) => {
        this.categories = cats;
        this.cdr.markForCheck();
      },
    });
  }

  applyFilter(): void {
    if (!this.searchTerm.trim()) {
      this.filteredProducts = [...this.products];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredProducts = this.products.filter(
        (p) => p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)
      );
    }
  }

  getCategoryName(categoryId: number): string {
    return this.categories.find((c) => c.id === categoryId)?.name || 'N/A';
  }

  createProduct(): void {
    if (!this.newProduct.name || !this.newProduct.categoryId) return;
    this.submitting = true;
    this.error = '';
    this.productService.create(this.newProduct).subscribe({
      next: () => {
        this.submitting = false;
        this.successMessage = 'Product created successfully!';
        this.showForm = false;
        this.resetForm();
        this.loadProducts();
        this.cdr.markForCheck();
        setTimeout(() => { this.successMessage = ''; this.cdr.markForCheck(); }, 3000);
      },
      error: (err) => {
        this.submitting = false;
        this.error = err.error?.message || 'Failed to create product';
        this.cdr.markForCheck();
      },
    });
  }

  deleteProduct(id: number): void {
    if (!confirm('Delete this product?')) return;
    this.productService.delete(id).subscribe({
      next: () => {
        this.successMessage = 'Product deleted';
        this.loadProducts();
        this.cdr.markForCheck();
        setTimeout(() => { this.successMessage = ''; this.cdr.markForCheck(); }, 3000);
      },
      error: () => { this.error = 'Failed to delete product'; this.cdr.markForCheck(); },
    });
  }

  createCategory(): void {
    if (!this.newCategoryName.trim()) return;
    this.submittingCategory = true;
    this.categoryService.create({ name: this.newCategoryName, description: this.newCategoryDesc }).subscribe({
      next: () => {
        this.submittingCategory = false;
        this.showCategoryForm = false;
        this.newCategoryName = '';
        this.newCategoryDesc = '';
        this.loadCategories();
        this.successMessage = 'Category created!';
        this.cdr.markForCheck();
        setTimeout(() => { this.successMessage = ''; this.cdr.markForCheck(); }, 3000);
      },
      error: (err) => {
        this.submittingCategory = false;
        this.error = err.error?.message || 'Failed to create category';
        this.cdr.markForCheck();
      },
    });
  }

  resetForm(): void {
    this.newProduct = { name: '', description: '', price: 0, categoryId: 0, stockQuantity: 0 };
  }
}
