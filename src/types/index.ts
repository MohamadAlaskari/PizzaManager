export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee' | 'customer';
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  ingredients: string[];
  imageUrl?: string;
  category?: string; // e.g., Vegetarian, Non-Veg, Special
}

export interface Order {
  id: string;
  customerName: string; // Simplified, could be userId
  items: { productId: string; productName: string; quantity: number; price: number }[];
  totalAmount: number;
  status: 'Pending' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  orderDate: string;
  deliveryAddress?: string;
}

export type ChartData = {
  name: string;
  value: number;
}[];

export type SalesData = {
  month: string;
  sales: number;
  profit: number;
};

export type UserTrendData = {
  date: string;
  newUsers: number;
};

export type ProductPerformanceData = {
  name: string;
  sales: number;
};
