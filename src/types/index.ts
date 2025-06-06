
export interface User {
  id: string;
  role: 'admin' | 'employee' | 'customer';
  email: string;
  passwordHash?: string;
  fullName: string;
  status: 'active' | 'inactive' | 'suspended' | 'pending_verification';
  createdAt?: string;
  // Admin specific
  permissions?: string[];
  // Employee specific
  position?: 'driver' | 'baker' | 'cashier' | string;
  contractType?: 'full-time' | 'part-time' | 'mini-job' | string;
  salary?: {
    type: 'hourly' | 'monthly' | string;
    amount: number;
    currency: string;
  };
  workingHours?: Record<string, string>;
  vehicleType?: 'car' | 'scooter' | 'bike' | string; // Primarily for driver
  notes?: string; // General notes for employee
  speciality?: string[]; // Primarily for baker
  languageSkills?: string[]; // Primarily for cashier
  // Customer specific
  phone?: string;
  address?: {
    street: string;
    postalCode: string;
    city: string;
  };
  orderHistory?: {
    orderId: string;
    date: string;
    total: number;
  }[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number | Record<string, number>; 
  ingredients: string[];
  imageUrl?: string;
  category?: string; 
}

export interface Order {
  id: string;
  customerName: string; 
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
