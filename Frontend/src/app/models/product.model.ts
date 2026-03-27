export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  stockQuantity: number;
}

export interface CreateProduct {
  name: string;
  description: string;
  price: number;
  categoryId: number;
  stockQuantity: number;
}
