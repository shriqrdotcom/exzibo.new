export type Category = 'Starters' | 'Main Course' | 'Drinks';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  createdAt: string;
}

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  specialRequest?: string;
  status: 'Pending' | 'Confirmed';
}

export const INITIAL_MENU: MenuItem[] = [
  // Starters
  {
    id: '1',
    name: 'Paneer Tikka',
    description: 'Marinated cottage cheese cubes grilled in tandoor with spices.',
    price: 349,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Chicken Tandoori',
    description: 'Classic roasted chicken marinated in yogurt and traditional spices.',
    price: 499,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Veg Pakora',
    description: 'Crispy vegetable fritters made with gram flour and spices.',
    price: 249,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1675493532049-72b87748f716?w=800&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'Hara Bhara Kabab',
    description: 'Healthy and delicious green patties made with spinach and peas.',
    price: 299,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800&auto=format&fit=crop'
  },
  // Main Course
  {
    id: '5',
    name: 'Butter Chicken',
    description: 'Tender chicken in a rich, creamy tomato-based gravy.',
    price: 549,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&auto=format&fit=crop'
  },
  {
    id: '6',
    name: 'Paneer Butter Masala',
    description: 'Soft paneer cubes in a creamy and mildly spiced tomato gravy.',
    price: 449,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop'
  },
  {
    id: '7',
    name: 'Dal Makhani',
    description: 'Slow-cooked black lentils with cream and butter.',
    price: 399,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop'
  },
  {
    id: '8',
    name: 'Chicken Biryani',
    description: 'Fragrant basmati rice cooked with succulent chicken and aromatic spices.',
    price: 599,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=800&auto=format&fit=crop'
  },
  {
    id: '9',
    name: 'Veg Biryani',
    description: 'Aromatic rice dish made with mixed vegetables and spices.',
    price: 449,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop'
  },
  {
    id: '10',
    name: 'Butter Naan',
    description: 'Soft and fluffy leavened bread brushed with butter.',
    price: 69,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=800&auto=format&fit=crop'
  },
  // Drinks
  {
    id: '11',
    name: 'Mango Lassi',
    description: 'Refreshing yogurt-based drink with sweet mango pulp.',
    price: 149,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1571006682864-740315ee6481?w=800&auto=format&fit=crop'
  },
  {
    id: '12',
    name: 'Masala Chai',
    description: 'Traditional Indian spiced tea with milk.',
    price: 99,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4586c567?w=800&auto=format&fit=crop'
  },
  {
    id: '13',
    name: 'Sweet Lime Soda',
    description: 'Refreshing and fizzy lime drink with a hint of sweetness.',
    price: 129,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop'
  },
  {
    id: '14',
    name: 'Cold Coffee',
    description: 'Chilled and creamy coffee served with a scoop of vanilla ice cream.',
    price: 179,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&auto=format&fit=crop'
  }
];
