export interface Pizza {
  id: number;
  name: string;
  rating: number;
  basePrice: number;
  imageUrl: string;
}

export interface Topping {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export type PizzaSize = 'S' | 'M' | 'L';

export interface CartItem {
  id: string; // To uniquely identify each item in the cart, e.g., using timestamp or uuid
  pizza: Pizza;
  size: PizzaSize;
  toppings: Topping[];
  totalPrice: number;
}

export interface CompletedTransaction {
  order: CartItem[];
  total: number;
  amountReceived: number;
  change: number;
  date: string;
  ticketNumber: number;
}