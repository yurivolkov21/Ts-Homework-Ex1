export interface Product {
    id: number;
    name: string;
    price: number;
    category?: string;
}

let nextId: number = 1;

export const getNextId = (): number => {
    return nextId++;
}

export const products: Product[] = [
    { id: getNextId(), name: 'Laptop', price: 999.99, category: 'Electronics' },
    { id: getNextId(), name: 'Smartphone', price: 699.99, category: 'Electronics' },
    { id: getNextId(), name: 'Desk Chair', price: 89.99, category: 'Furniture' },
    { id: getNextId(), name: 'Book', price: 14.99, category: 'Literature' },
    { id: getNextId(), name: 'Headphones', price: 199.99, category: 'Electronics' },
    { id: getNextId(), name: 'Coffee Maker', price: 49.99, category: 'Appliances' },
    { id: getNextId(), name: 'Running Shoes', price: 79.99, category: 'Footwear' },
    { id: getNextId(), name: 'Backpack', price: 59.99, category: 'Accessories' },
    { id: getNextId(), name: 'Wristwatch', price: 149.99, category: 'Accessories' },
    { id: getNextId(), name: 'Sunglasses', price: 129.99, category: 'Accessories' },
    { id: getNextId(), name: 'Electric Kettle', price: 39.99, category: 'Appliances' },
    { id: getNextId(), name: 'Yoga Mat', price: 29.99, category: 'Fitness' },
    { id: getNextId(), name: 'Bluetooth Speaker', price: 89.99, category: 'Electronics' },
    { id: getNextId(), name: 'Gaming Console', price: 399.99, category: 'Electronics' },
    { id: getNextId(), name: 'Action Camera', price: 249.99, category: 'Electronics' },
];