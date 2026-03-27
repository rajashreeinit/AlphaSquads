export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Cart {
  id: number;
  items: CartItem[];
  totalAmount: number;
}

export interface AddToCart {
  productId: number;
  quantity: number;
}

export interface UpdateCartItem {
  quantity: number;
}
