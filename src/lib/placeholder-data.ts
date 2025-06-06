
import type { User, Product, Order, SalesData, UserTrendData, ProductPerformanceData } from '@/types';

export const placeholderUsers: User[] = [
  { id: '1', name: 'Alice Admin', email: 'alice@example.com', role: 'admin', createdAt: '2023-01-15' },
  { id: '2', name: 'Bob Employee', email: 'bob@example.com', role: 'employee', createdAt: '2023-02-20' },
  { id: '3', name: 'Charlie Customer', email: 'charlie@example.com', role: 'customer', createdAt: '2023-03-10' },
  { id: '4', name: 'Diana Driver', email: 'diana@example.com', role: 'employee', createdAt: '2023-04-05' },
];

const newPizzas: Product[] = [
  {
    id: 'p1',
    name: 'Margarita',
    description: 'Klassische Pizza Margherita.',
    price: { "24cm": 7.00, "30cm": 9.00, "40cm": 12.50 },
    ingredients: ['Pizzateig', 'Tomatensauce', 'Mozzarella', 'Basilikum'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
  },
  {
    id: 'p2',
    name: 'Chicken',
    description: 'mit Hähnchenfleisch, Zwiebel',
    price: { "24cm": 10.50, "30cm": 14.20, "40cm": 16.90 },
    ingredients: ['Hähnchenfleisch', 'Zwiebel'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
  },
  {
    id: 'p3',
    name: 'Big Beef',
    description: 'mit Putenschinken, Jalapeños, Rindhackfleisch, Sauce Hollandaise',
    price: { "24cm": 10.00, "30cm": 13.50, "40cm": 18.00 },
    ingredients: ['Putenschinken', 'Jalapeños', 'Rindhackfleisch', 'Sauce Hollandaise'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
  },
  {
    id: 'p4',
    name: 'Kentucky',
    description: 'mit Hähnchenfleisch, Broccoli, Knoblauch, Creme Fraîche',
    price: { "24cm": 10.50, "30cm": 14.50, "40cm": 18.00 },
    ingredients: ['Hähnchenfleisch', 'Broccoli', 'Knoblauch', 'Creme Fraîche'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
  },
  {
    id: 'p5',
    name: 'Chicken Delux',
    description: 'mit Hähnchenfleisch, Broccoli, Tomaten, Sauce',
    price: { "24cm": 10.50, "30cm": 14.50, "40cm": 18.50 },
    ingredients: ['Hähnchenfleisch', 'Broccoli', 'Tomaten', 'Sauce'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
  },
  {
    id: 'p6',
    name: 'Mediterrane',
    description: 'mit Paprika, Oliven, Hirtenkäse',
    price: { "24cm": 10.50, "30cm": 14.50, "40cm": 17.50 },
    ingredients: ['Paprika', 'Oliven', 'Hirtenkäse'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
  },
  {
    id: 'p7',
    name: 'Time',
    description: 'mit Salami, Schinken, Champignon, Mozzarella',
    price: { "24cm": 13.00, "30cm": 16.50, "40cm": 21.00 },
    ingredients: ['Salami', 'Schinken', 'Champignon', 'Mozzarella'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
  },
  {
    id: 'p8',
    name: 'Beef Delux',
    description: 'mit Rindfleisch, Mais, Hirtenkäse, BBQ-Sauce',
    price: { "24cm": 12.00, "30cm": 15.00, "40cm": 19.00 },
    ingredients: ['Rindfleisch', 'Mais', 'Hirtenkäse', 'BBQ-Sauce'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
  },
  {
    id: 'p9',
    name: 'Salami & Champignons',
    description: 'mit Rindfleisch, Zwiebeln',
    price: { "24cm": 10.00, "30cm": 15.00, "40cm": 17.00 },
    ingredients: ['Rindfleisch', 'Zwiebeln'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
  },
  {
    id: 'p10',
    name: 'Hawai',
    description: 'mit Putenschinken, Ananas',
    price: { "24cm": 10.00, "30cm": 13.00, "40cm": 17.00 },
    ingredients: ['Putenschinken', 'Ananas'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
  },
  {
    id: 'p11',
    name: 'Napoli',
    description: 'mit Oliven, Mozzarella, Tomaten',
    price: { "24cm": 10.00, "30cm": 13.50, "40cm": 18.00 },
    ingredients: ['Oliven', 'Mozzarella', 'Tomaten'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
  },
  {
    id: 'p12',
    name: 'Tonno',
    description: 'mit Thunfisch, Peperoni, Zwiebeln',
    price: { "24cm": 10.50, "30cm": 15.50, "40cm": 17.50 },
    ingredients: ['Thunfisch', 'Peperoni', 'Zwiebeln'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
  },
  {
    id: 'p13',
    name: 'Spinaci',
    description: 'mit Knoblauch, Spinat, Weißkäse, Zwiebeln',
    price: { "24cm": 10.00, "30cm": 13.00, "40cm": 17.00 },
    ingredients: ['Knoblauch', 'Spinat', 'Weißkäse', 'Zwiebeln'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
  },
  {
    id: 'p14',
    name: 'Salami',
    description: 'mit Rindfleischsalami',
    price: { "24cm": 9.50, "30cm": 12.50, "40cm": 16.00 },
    ingredients: ['Rindfleischsalami'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
  },
  {
    id: 'p15',
    name: 'Garnelen',
    description: 'mit Garnelen, Knoblauch, Tomaten, Zwiebeln',
    price: { "24cm": 10.00, "30cm": 13.00, "40cm": 17.50 },
    ingredients: ['Garnelen', 'Knoblauch', 'Tomaten', 'Zwiebeln'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
  },
  {
    id: 'p16',
    name: 'Pute',
    description: 'mit Putenbrust, Mais, Paprika',
    price: { "24cm": 10.00, "30cm": 13.50, "40cm": 17.00 },
    ingredients: ['Putenbrust', 'Mais', 'Paprika'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
  },
  {
    id: 'p17',
    name: 'Belami',
    description: 'mit Knoblauchwurst, Spinat, Weißkäse, Zwiebeln',
    price: { "24cm": 10.50, "30cm": 13.50, "40cm": 17.50 },
    ingredients: ['Knoblauchwurst', 'Spinat', 'Weißkäse', 'Zwiebeln'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
  },
  {
    id: 'p18',
    name: 'Gerate',
    description: 'mit Hähnchenbrust, Broccoli, Sauce Hollandaise',
    price: { "24cm": 10.50, "30cm": 15.50, "40cm": 17.50 },
    ingredients: ['Hähnchenbrust', 'Broccoli', 'Sauce Hollandaise'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
  },
  {
    id: 'p19',
    name: 'Frutti di Mare',
    description: 'mit Meeresfrüchten, Knoblauch, Spinat',
    price: { "24cm": 10.00, "30cm": 15.00, "40cm": 18.00 },
    ingredients: ['Meeresfrüchten', 'Knoblauch', 'Spinat'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
  },
  {
    id: 'p20',
    name: 'Vegetarisch',
    description: 'mit Broccoli, Paprika, Champignons',
    price: { "24cm": 7.00, "30cm": 13.50, "40cm": 17.50 },
    ingredients: ['Broccoli', 'Paprika', 'Champignons'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
  },
  {
    id: 'p21',
    name: 'Hähnchen-Curry',
    description: 'mit Hähnchenbrust, Currysoße',
    price: { "24cm": 10.50, "30cm": 13.50, "40cm": 18.00 },
    ingredients: ['Hähnchenbrust', 'Currysoße'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
  },
  {
    id: 'p22',
    name: 'Hollandaise',
    description: 'mit Hähnchenbrust, Broccoli, Sauce Hollandaise',
    price: { "24cm": 11.00, "30cm": 14.50, "40cm": 20.00 },
    ingredients: ['Hähnchenbrust', 'Broccoli', 'Sauce Hollandaise'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
  },
  {
    id: 'p23',
    name: 'Mozzarella',
    description: 'mit Mozzarella, Tomaten',
    price: { "24cm": 10.00, "30cm": 13.50, "40cm": 17.50 },
    ingredients: ['Mozzarella', 'Tomaten'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
  },
  {
    id: 'p24',
    name: 'Dodo',
    description: 'mit Knoblauchwurst, Sauce Hollandaise, Zwiebeln, Spargel',
    price: { "24cm": 10.50, "30cm": 15.50, "40cm": 18.00 },
    ingredients: ['Knoblauchwurst', 'Sauce Hollandaise', 'Zwiebeln', 'Spargel'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
  },
  {
    id: 'p25',
    name: 'Funghi',
    description: 'mit Champignons',
    price: { "24cm": 9.50, "30cm": 12.50, "40cm": 16.50 },
    ingredients: ['Champignons'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
  },
  {
    id: 'p26',
    name: 'Mix',
    description: 'mit Hähnchenfleisch, Knoblauchwurst, Gemüse',
    price: { "24cm": 11.50, "30cm": 15.00, "40cm": 19.50 },
    ingredients: ['Hähnchenfleisch', 'Knoblauchwurst', 'Gemüse'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
  },
  {
    id: 'p27',
    name: 'Schinken',
    description: 'mit Putenschinken',
    price: { "24cm": 9.50, "30cm": 12.50, "40cm": 17.00 },
    ingredients: ['Putenschinken'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
  },
  {
    id: 'p28',
    name: 'Kebab',
    description: 'mit Kebabfleisch, Zwiebeln, Peperoni',
    price: { "24cm": 9.50, "30cm": 12.50, "40cm": 17.00 },
    ingredients: ['Kebabfleisch', 'Zwiebeln', 'Peperoni'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Pizza',
  },
];

const specialPizzas: Product[] = [
  {
    id: 'sp1',
    name: 'Vier Käse Spezial',
    description: 'Eine luxuriöse Mischung aus Mozzarella, Gorgonzola, Parmesan und Feta.',
    price: { "24cm": 12.00, "30cm": 15.50, "40cm": 20.00 },
    ingredients: ['Pizzateig', 'Tomatensauce', 'Mozzarella', 'Gorgonzola', 'Parmesan', 'Feta'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'spacial pizza',
  },
];

const pizzaBroetchen: Product[] = [
  {
    id: 'pb1',
    name: 'Pizzabrötchen mit Kräuterbutter',
    description: '6 Stück hausgemachte Pizzabrötchen mit Kräuterbutter.',
    price: 4.50,
    ingredients: ['Pizzateig', 'Kräuterbutter'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'pizza brötchen',
  },
];


const newBurgers: Product[] = [
  {
    id: 'b1',
    name: 'Hamburger',
    description: '100g Patty, Eisbergsalat, Tomaten, Gurken, Zwiebeln, Sauce',
    price: { "1 Patty": 5.90, "2 Patty": 7.70 },
    ingredients: ["100g Patty", "Eisbergsalat", "Tomaten", "Gurken", "Zwiebeln", "Sauce"],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Burger',
  },
  {
    id: 'b2',
    name: 'Cheeseburger',
    description: '100g Patty, Eisbergsalat, Tomaten, Gurken, Zwiebeln, Sauce, Käse',
    price: { "1 Patty": 6.90, "2 Patty": 8.90 },
    ingredients: ["100g Patty", "Eisbergsalat", "Tomaten", "Gurken", "Zwiebeln", "Sauce", "Käse"],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Burger',
  },
  {
    id: 'b3',
    name: 'Chickenburger',
    description: 'Eisbergsalat, Tomate, Gurken, Zwiebeln, Sauce',
    price: { "1 Patty": 5.90, "2 Patty": 7.70 },
    ingredients: ["Chicken Patty", "Eisbergsalat", "Tomaten", "Gurken", "Zwiebeln", "Sauce"],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Burger',
  },
  {
    id: 'b4',
    name: 'Veggie Burger',
    description: 'Champignons',
    price: { "1 Patty": 5.50, "2 Patty": 7.50 },
    ingredients: ["Gemüse Patty", "Champignons", "Eisbergsalat", "Tomaten", "Sauce"],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Burger',
  },
  {
    id: 'b5',
    name: 'Spezial Cheeseburger',
    description: '100g Patty, Eisbergsalat, Tomaten, Gurke, Zwiebeln, Jalapenos, Soße, Käse',
    price: { "1 Patty": 7.50, "2 Patty": 9.50 },
    ingredients: ["100g Patty", "Eisbergsalat", "Tomaten", "Gurke", "Zwiebeln", "Jalapenos", "Soße", "Käse"],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Burger',
  },
];

const fingerFoods: Product[] = [
  {
    id: 'ff1',
    name: 'Chicken Wings',
    description: '6 Stück knusprige Chicken Wings mit Dip.',
    price: 6.50,
    ingredients: ['Hähnchenflügel', 'Gewürze', 'Dip'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'finger food',
  },
];

const newCalzones: Product[] = [
  {
    id: 'cz1',
    name: 'Hawai Calzone',
    description: 'Putenschinken, Ananas, Goudakäse',
    price: 10.00,
    ingredients: ['Putenschinken', 'Ananas', 'Goudakäse'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Calzone',
  },
  {
    id: 'cz2',
    name: 'Tonno Calzone',
    description: 'Thunfisch, Zwiebeln, Goudakäse',
    price: 10.50,
    ingredients: ['Thunfisch', 'Zwiebeln', 'Goudakäse'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Calzone',
  },
  {
    id: 'cz3',
    name: 'Belami Calzone',
    description: 'Knoblauchwurst, Peperoni, Oliven',
    price: 11.00,
    ingredients: ['Knoblauchwurst', 'Peperoni', 'Oliven'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Calzone',
  },
  {
    id: 'cz4',
    name: 'Vegetarisch Calzone',
    description: 'Weißkäse, Oliven, Peperoni, Goudakäse',
    price: 10.50,
    ingredients: ['Weißkäse', 'Oliven', 'Peperoni', 'Goudakäse'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Calzone',
  },
  {
    id: 'cz5',
    name: 'Kebab Calzone',
    description: 'Kebabfleisch, Zwiebeln, Goudakäse',
    price: 11.00,
    ingredients: ['Kebabfleisch', 'Zwiebeln', 'Goudakäse'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Calzone',
  },
  {
    id: 'cz6',
    name: 'Hähnchen Calzone',
    description: 'Hähnchenbrust, Zwiebeln, Goudakäse',
    price: 11.00,
    ingredients: ['Hähnchenbrust', 'Zwiebeln', 'Goudakäse'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Calzone',
  },
  {
    id: 'cz7',
    name: 'Mix Calzone',
    description: 'Kebabfleisch, Hähnchenbrust, Goudakäse',
    price: 11.50,
    ingredients: ['Kebabfleisch', 'Hähnchenbrust', 'Goudakäse'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Calzone',
  },
];

const rollos: Product[] = [
  {
    id: 'rl1',
    name: 'Döner Rollo',
    description: 'Gefüllt mit Dönerfleisch, Salat und Sauce.',
    price: 7.00,
    ingredients: ['Fladenbrot', 'Dönerfleisch', 'Salatmix', 'Sauce'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Rollo',
  },
];

const baguettes: Product[] = [
  {
    id: 'bg1',
    name: 'Salami Baguette',
    description: 'Frisches Baguette mit Salami, Käse und Salat.',
    price: 6.00,
    ingredients: ['Baguettebrot', 'Salami', 'Käse', 'Salat'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Baguette',
  },
];

const snacks: Product[] = [
  {
    id: 'sn1',
    name: 'Pommes Frites',
    description: 'Klassische Pommes mit Ketchup oder Mayo.',
    price: 3.50,
    ingredients: ['Kartoffeln', 'Pflanzenöl', 'Salz'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Snacks',
  },
];

const salate: Product[] = [
 {
    id: 's1',
    name: 'Caesar Salat',
    description: 'Römersalat mit Croutons, Parmesan und Caesar-Dressing.',
    price: 6.99,
    ingredients: ['Römersalat', 'Croutons', 'Parmesan', 'Caesar-Dressing'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Salat',
  },
  {
    id: 's2',
    name: 'Gemischter Salat',
    description: 'Frischer gemischter Salat der Saison.',
    price: 5.50,
    ingredients: ['Kopfsalat', 'Tomaten', 'Gurken', 'Mais', 'Dressing'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Salat',
  },
];

const getraenke: Product[] = [
  {
    id: 'd1',
    name: 'Cola',
    description: 'Erfrischende Coca-Cola 0,33l.',
    price: 2.49,
    ingredients: ['Wasser', 'Zucker', 'Kohlensäure', 'Farbstoff', 'Aromen'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Getränke',
  },
  {
    id: 'd2',
    name: 'Wasser Still',
    description: 'Natürliches Mineralwasser ohne Kohlensäure 0,5l.',
    price: 1.99,
    ingredients: ['Mineralwasser'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Getränke',
  },
];

const eis: Product[] = [
  {
    id: 'e1',
    name: 'Schokoladeneis',
    description: 'Kugel Schokoladeneis.',
    price: 1.80,
    ingredients: ['Milch', 'Zucker', 'Kakao'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Eis',
  },
];

const menues: Product[] = [
  {
    id: 'm1',
    name: 'Pizza Menü',
    description: 'Eine Pizza (30cm) nach Wahl + 1 Getränk.',
    price: 13.00,
    ingredients: ['Pizza nach Wahl', 'Getränk nach Wahl'],
    imageUrl: 'https://placehold.co/300x200.png',
    category: 'Menu',
  },
];


export const placeholderProducts: Product[] = [
    ...newPizzas, 
    ...specialPizzas,
    ...pizzaBroetchen,
    ...newBurgers, 
    ...fingerFoods,
    ...newCalzones, 
    ...rollos,
    ...baguettes,
    ...snacks,
    ...salate, 
    ...getraenke,
    ...eis,
    ...menues
];

export const placeholderOrders: Order[] = [
  {
    id: 'o1',
    customerName: 'Charlie Customer',
    items: [{ productId: 'p1', productName: 'Margarita 30cm', quantity: 1, price: 9.00 }], 
    totalAmount: 9.00,
    status: 'Delivered',
    orderDate: '2023-05-01',
    deliveryAddress: '123 Main St, Anytown, USA'
  },
  {
    id: 'o2',
    customerName: 'Anonymous Guest',
    items: [
      { productId: 'p14', productName: 'Salami 30cm', quantity: 1, price: 12.50 }, 
      { productId: 'd1', productName: 'Cola', quantity: 2, price: 2.49 }
    ],
    totalAmount: 12.50 + (2 * 2.49),
    status: 'Preparing',
    orderDate: '2023-05-05',
    deliveryAddress: '456 Oak Ave, Anytown, USA'
  },
  {
    id: 'o3',
    customerName: 'Alice Admin',
    items: [{ productId: 'b1', productName: 'Hamburger (1 Patty)', quantity: 2, price: 5.90 }], // Example using new burger price
    totalAmount: 11.80,
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
  { name: 'Margarita', sales: 120 }, 
  { name: 'Salami', sales: 95 }, 
  { name: 'Hamburger', sales: 80 }, 
  { name: 'Chicken', sales: 60 }, 
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
  {"date": "2024-07-01", "pizzaType": "Margarita", "size": "30cm", "ingredientsUsed": {"Pizzateig": 1, "Tomatensauce": 0.2, "Mozzarella": 0.15, "Basilikum": 0.01}},
  {"date": "2024-07-01", "pizzaType": "Salami","size": "30cm", "ingredientsUsed": {"Pizzateig": 1, "Tomatensauce": 0.2, "Mozzarella": 0.15, "Salami": 0.1}},
  {"date": "2024-07-02", "pizzaType": "Margarita", "size": "24cm", "ingredientsUsed": {"Pizzateig": 0.7, "Tomatensauce": 0.15, "Mozzarella": 0.1, "Basilikum": 0.007}},
], null, 2);

export const currentInventoryJsonExample = JSON.stringify({
  "Pizzateig": 100, "Tomatensauce": 20, "Mozzarella": 30, "Basilikum": 5, "Salami": 15, "Burger Buns": 30, "Rindfleisch Patties": 25
}, null, 2);

