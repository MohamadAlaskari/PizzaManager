
export interface User {
  id: string;
  role: 'admin' | 'employee' | 'customer';
  email: string;
  passwordHash?: string; // Optional as it won't be directly managed in UI
  fullName: string;
  status: 'active' | 'inactive' | 'suspended' | 'pending_verification'; // Added more status options
  createdAt?: string; // Made optional to align with new data that might not always have it
  permissions?: string[]; // Admin only
  position?: 'driver' | 'baker' | 'cashier' | string; // Employee only, added string for flexibility
  vehicleType?: 'car' | 'scooter' | 'bike' | string; // Driver only
  workingHours?: Record<string, string>; // Driver only
  speciality?: string[]; // Baker only
  languageSkills?: string[]; // Cashier only
  phone?: string; // Customer only
  address?: { // Customer only
    street: string;
    postalCode: string;
    city: string;
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number | Record<string, number>; // Updated: number for single price, object for size-based prices
  ingredients: string[];
  imageUrl?: string;
  category?: string; // e.g., Vegetarian, Non-Veg, Special, Pizza, Burger
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

