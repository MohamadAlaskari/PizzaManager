
import type { User, Product, Order, SalesData, UserTrendData, ProductPerformanceData } from '@/types';

export const placeholderUsers: User[] = [
  { id: '1', name: 'Alice Admin', email: 'alice@example.com', role: 'admin', createdAt: '2023-01-15' },
  { id: '2', name: 'Bob Employee', email: 'bob@example.com', role: 'employee', createdAt: '2023-02-20' },
  { id: '3', name: 'Charlie Customer', email: 'charlie@example.com', role: 'customer', createdAt: '2023-03-10' },
  { id: '4', name: 'Diana Driver', email: 'diana@example.com', role: 'employee', createdAt: '2023-04-05' },
];

export const placeholderProducts: Product[] = [
  // Pizzas
  {
    id: 'p1',
    name: 'Margherita 24cm',
    description: 'Klassischer Genuss mit 100% echtem Mozzarella Käse.',
    price: 8.99,
    ingredients: ['Pizzateig', 'Tomatensauce', 'Mozzarella', 'Basilikum'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
    stock: 50,
  },
  {
    id: 'p2',
    name: 'Margherita 30cm',
    description: 'Klassischer Genuss mit 100% echtem Mozzarella Käse.',
    price: 10.99,
    ingredients: ['Pizzateig', 'Tomatensauce', 'Mozzarella', 'Basilikum'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
    stock: 60,
  },
  {
    id: 'p3',
    name: 'Margherita 40cm',
    description: 'Klassischer Genuss mit 100% echtem Mozzarella Käse.',
    price: 14.99,
    ingredients: ['Pizzateig', 'Tomatensauce', 'Mozzarella', 'Basilikum'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
    stock: 40,
  },
  {
    id: 'p4',
    name: 'Salami Pizza 24cm',
    description: 'Ein Traum für Fleischliebhaber mit würziger Salami.',
    price: 9.99,
    ingredients: ['Pizzateig', 'Tomatensauce', 'Mozzarella', 'Salami'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
    stock: 45,
  },
  {
    id: 'p5',
    name: 'Salami Pizza 30cm',
    description: 'Ein Traum für Fleischliebhaber mit würziger Salami.',
    price: 12.99,
    ingredients: ['Pizzateig', 'Tomatensauce', 'Mozzarella', 'Salami'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
    stock: 55,
  },
  {
    id: 'p6',
    name: 'Salami Pizza 40cm',
    description: 'Ein Traum für Fleischliebhaber mit würziger Salami.',
    price: 16.99,
    ingredients: ['Pizzateig', 'Tomatensauce', 'Mozzarella', 'Salami'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
    stock: 35,
  },
  {
    id: 'p7',
    name: 'Veggie Supreme 24cm',
    description: 'Beladen mit frischem Gemüse und Mozzarella.',
    price: 9.49,
    ingredients: ['Pizzateig', 'Tomatensauce', 'Mozzarella', 'Zwiebeln', 'Paprika', 'Oliven', 'Pilze'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
    stock: 30,
  },
  // Burgers
  {
    id: 'b1',
    name: 'Classic Burger',
    description: 'Saftiger Rindfleisch-Patty mit Salat, Tomate und Spezialsauce.',
    price: 7.99,
    ingredients: ['Brötchen', 'Rindfleisch-Patty', 'Salat', 'Tomate', 'Zwiebel', 'Spezialsauce'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Burger',
    stock: 40,
  },
  {
    id: 'b2',
    name: 'Cheeseburger',
    description: 'Der Klassiker mit geschmolzenem Cheddar-Käse.',
    price: 8.49,
    ingredients: ['Brötchen', 'Rindfleisch-Patty', 'Cheddar-Käse', 'Salat', 'Tomate', 'Zwiebel', 'Spezialsauce'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Burger',
    stock: 35,
  },
  // Salads
  {
    id: 's1',
    name: 'Caesar Salad',
    description: 'Römersalat mit Croutons, Parmesan und Caesar-Dressing.',
    price: 6.99,
    ingredients: ['Römersalat', 'Croutons', 'Parmesan', 'Caesar-Dressing'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Salad',
    stock: 25,
  },
  // Drinks
  {
    id: 'd1',
    name: 'Cola',
    description: 'Erfrischende Coca-Cola.',
    price: 2.49,
    ingredients: ['Wasser', 'Zucker', 'Kohlensäure', 'Farbstoff', 'Aromen'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Getränke',
    stock: 100,
  },
  {
    id: 'd2',
    name: 'Wasser Still',
    description: 'Natürliches Mineralwasser ohne Kohlensäure.',
    price: 1.99,
    ingredients: ['Mineralwasser'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Getränke',
    stock: 100,
  },
];

export const placeholderOrders: Order[] = [
  {
    id: 'o1',
    customerName: 'Charlie Customer',
    items: [{ productId: 'p2', productName: 'Margherita 30cm', quantity: 1, price: 10.99 }],
    totalAmount: 10.99,
    status: 'Delivered',
    orderDate: '2023-05-01',
    deliveryAddress: '123 Main St, Anytown, USA'
  },
  {
    id: 'o2',
    customerName: 'Anonymous Guest',
    items: [
      { productId: 'p5', productName: 'Salami Pizza 30cm', quantity: 1, price: 12.99 },
      { productId: 'd1', productName: 'Cola', quantity: 2, price: 2.49 }
    ],
    totalAmount: 12.99 + (2 * 2.49),
    status: 'Preparing',
    orderDate: '2023-05-05',
    deliveryAddress: '456 Oak Ave, Anytown, USA'
  },
  {
    id: 'o3',
    customerName: 'Alice Admin',
    items: [{ productId: 'b1', productName: 'Classic Burger', quantity: 2, price: 7.99 }],
    totalAmount: 15.98,
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
  { name: 'Margherita 30cm', sales: 120 },
  { name: 'Salami Pizza 30cm', sales: 95 },
  { name: 'Classic Burger', sales: 80 },
  { name: 'Veggie Supreme 24cm', sales: 60 },
  { name: 'Cola', sales: 150 },
];

export const placeholderInventoryData = [
  { ingredient: "Pizzateiglinge", currentStock: 200, idealStock: 300, unit: "Stück" },
  { ingredient: "Tomatensauce", currentStock: 50, idealStock: 80, unit: "Liter" },
  { ingredient: "Mozzarella", currentStock: 80, idealStock: 100, unit: "kg" },
  { ingredient: "Salami", currentStock: 30, idealStock: 50, unit: "kg" },
  { ingredient: "Pilze", currentStock: 20, idealStock: 30, unit: "kg" },
  { ingredient: "Zwiebeln", currentStock: 25, idealStock: 40, unit: "kg" },
  { ingredient: "Paprika", currentStock: 22, idealStock: 35, unit: "kg" },
  { ingredient: "Burger Buns", currentStock: 50, idealStock: 70, unit: "Stück" },
  { ingredient: "Rindfleisch Patties", currentStock: 40, idealStock: 60, unit: "Stück" },
  { ingredient: "Salatköpfe", currentStock: 10, idealStock: 20, unit: "Stück" },
];

export const pastSalesJsonExample = JSON.stringify([
  {"date": "2024-07-01", "pizzaType": "Margherita 30cm", "ingredientsUsed": {"Pizzateig": 1, "Tomatensauce": 0.2, "Mozzarella": 0.15, "Basilikum": 0.01}},
  {"date": "2024-07-01", "pizzaType": "Salami Pizza 30cm", "ingredientsUsed": {"Pizzateig": 1, "Tomatensauce": 0.2, "Mozzarella": 0.15, "Salami": 0.1}},
  {"date": "2024-07-02", "pizzaType": "Margherita 24cm", "ingredientsUsed": {"Pizzateig": 0.7, "Tomatensauce": 0.15, "Mozzarella": 0.1, "Basilikum": 0.007}},
], null, 2);

export const currentInventoryJsonExample = JSON.stringify({
  "Pizzateig": 100, "Tomatensauce": 20, "Mozzarella": 30, "Basilikum": 5, "Salami": 15, "Burger Buns": 30, "Rindfleisch Patties": 25
}, null, 2);


    