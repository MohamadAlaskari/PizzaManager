import type { User, Product, Order, SalesData, UserTrendData, ProductPerformanceData } from '@/types';

export const placeholderUsers: User[] = [
  { id: '1', name: 'Alice Admin', email: 'alice@example.com', role: 'admin', createdAt: '2023-01-15' },
  { id: '2', name: 'Bob Employee', email: 'bob@example.com', role: 'employee', createdAt: '2023-02-20' },
  { id: '3', name: 'Charlie Customer', email: 'charlie@example.com', role: 'customer', createdAt: '2023-03-10' },
  { id: '4', name: 'Diana Driver', email: 'diana@example.com', role: 'employee', createdAt: '2023-04-05' },
];

export const placeholderProducts: Product[] = [
  { 
    id: 'p1', 
    name: 'Margherita Classic', 
    description: 'Classic delight with 100% real mozzarella cheese', 
    price: 12.99, 
    ingredients: ['Dough', 'Tomato Sauce', 'Mozzarella', 'Basil'], 
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Vegetarian',
    stock: 50,
  },
  { 
    id: 'p2', 
    name: 'Pepperoni Feast', 
    description: 'A meat lover’s dream with spicy pepperoni', 
    price: 15.99, 
    ingredients: ['Dough', 'Tomato Sauce', 'Mozzarella', 'Pepperoni'], 
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Non-Veg',
    stock: 30,
  },
  { 
    id: 'p3', 
    name: 'Veggie Supreme', 
    description: 'Loaded with fresh vegetables and mozzarella', 
    price: 14.99, 
    ingredients: ['Dough', 'Tomato Sauce', 'Mozzarella', 'Onions', 'Peppers', 'Olives', 'Mushrooms'], 
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Vegetarian',
    stock: 40,
  },
];

export const placeholderOrders: Order[] = [
  { 
    id: 'o1', 
    customerName: 'Charlie Customer', 
    items: [{ productId: 'p1', productName: 'Margherita Classic', quantity: 1, price: 12.99 }], 
    totalAmount: 12.99, 
    status: 'Delivered', 
    orderDate: '2023-05-01',
    deliveryAddress: '123 Main St, Anytown, USA'
  },
  { 
    id: 'o2', 
    customerName: 'Anonymous Guest', 
    items: [
      { productId: 'p2', productName: 'Pepperoni Feast', quantity: 1, price: 15.99 },
      { productId: 'p3', productName: 'Veggie Supreme', quantity: 1, price: 14.99 }
    ], 
    totalAmount: 30.98, 
    status: 'Preparing', 
    orderDate: '2023-05-05',
    deliveryAddress: '456 Oak Ave, Anytown, USA'
  },
  { 
    id: 'o3', 
    customerName: 'Alice Admin', 
    items: [{ productId: 'p1', productName: 'Margherita Classic', quantity: 2, price: 12.99 }], 
    totalAmount: 25.98, 
    status: 'Pending', 
    orderDate: '2023-05-06',
    deliveryAddress: '789 Pine Ln, Anytown, USA'
  },
];

export const placeholderSalesData: SalesData[] = [
  { month: 'Jan', sales: 4000, profit: 1500 },
  { month: 'Feb', sales: 3000, profit: 1200 },
  { month: 'Mar', sales: 5000, profit: 2000 },
  { month: 'Apr', sales: 4500, profit: 1800 },
  { month: 'May', sales: 6000, profit: 2500 },
  { month: 'Jun', sales: 5500, profit: 2200 },
];

export const placeholderUserTrendData: UserTrendData[] = [
  { date: '2023-01-01', newUsers: 10 },
  { date: '2023-02-01', newUsers: 15 },
  { date: '2023-03-01', newUsers: 12 },
  { date: '2023-04-01', newUsers: 20 },
  { date: '2023-05-01', newUsers: 18 },
  { date: '2023-06-01', newUsers: 25 },
];

export const placeholderProductPerformanceData: ProductPerformanceData[] = [
  { name: 'Margherita', sales: 120 },
  { name: 'Pepperoni', sales: 95 },
  { name: 'Veggie', sales: 80 },
  { name: 'BBQ Chicken', sales: 60 },
  { name: 'Hawaiian', sales: 40 },
];

export const placeholderInventoryData = [
  { ingredient: "Dough Balls", currentStock: 200, idealStock: 300, unit: "pieces" },
  { ingredient: "Tomato Sauce", currentStock: 50, idealStock: 80, unit: "liters" },
  { ingredient: "Mozzarella Cheese", currentStock: 80, idealStock: 100, unit: "kg" },
  { ingredient: "Pepperoni", currentStock: 30, idealStock: 50, unit: "kg" },
  { ingredient: "Mushrooms", currentStock: 20, idealStock: 30, unit: "kg" },
  { ingredient: "Onions", currentStock: 25, idealStock: 40, unit: "kg" },
  { ingredient: "Bell Peppers", currentStock: 22, idealStock: 35, unit: "kg" },
];

export const pastSalesJsonExample = JSON.stringify([
  {"date": "2024-07-01", "pizzaType": "Margherita", "ingredientsUsed": {"Dough": 1, "Tomato Sauce": 0.2, "Mozzarella": 0.15, "Basil": 0.01}},
  {"date": "2024-07-01", "pizzaType": "Pepperoni", "ingredientsUsed": {"Dough": 1, "Tomato Sauce": 0.2, "Mozzarella": 0.15, "Pepperoni": 0.1}},
  {"date": "2024-07-02", "pizzaType": "Margherita", "ingredientsUsed": {"Dough": 1, "Tomato Sauce": 0.2, "Mozzarella": 0.15, "Basil": 0.01}},
], null, 2);

export const currentInventoryJsonExample = JSON.stringify({
  "Dough": 100, "Tomato Sauce": 20, "Mozzarella": 30, "Basil": 5, "Pepperoni": 15
}, null, 2);
