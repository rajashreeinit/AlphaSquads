import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Inventory } from '../../../models/inventory.model';

@Component({
  selector: 'app-manage-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-inventory.html',
  styleUrl: './manage-inventory.css',
})
export class ManageInventory implements OnInit {
  inventory: Inventory[] = [];
  filteredInventory: Inventory[] = [];
  searchTerm = '';
  loading = true;
  error = '';

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void { this.loadInventory(); }

  loadInventory(): void {
    this.loading = true;
    this.adminService.getInventory().subscribe({
      next: (inventory) => {
        this.inventory = inventory;
        this.filteredInventory = inventory;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'Failed to load inventory';
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  applyFilter(): void {
    if (!this.searchTerm.trim()) {
      this.filteredInventory = [...this.inventory];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredInventory = this.inventory.filter((i) =>
        i.productName.toLowerCase().includes(term)
      );
    }
  }
}
