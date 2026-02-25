import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MenuItem, CartItem, Order, Reservation, INITIAL_MENU } from '../types';

interface AppContextType {
  menu: MenuItem[];
  cart: CartItem[];
  orders: Order[];
  reservations: Reservation[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  placeOrder: () => void;
  addReservation: (res: Omit<Reservation, 'id' | 'status'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  deleteOrder: (id: string) => void;
  updateReservationStatus: (id: string, status: Reservation['status']) => void;
  deleteReservation: (id: string) => void;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menu, setMenu] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('restaurant_menu_v9');
    return saved ? JSON.parse(saved) : INITIAL_MENU;
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('restaurant_orders_v9');
    return saved ? JSON.parse(saved) : [];
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('restaurant_reservations_v9');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    localStorage.setItem('restaurant_menu_v9', JSON.stringify(menu));
  }, [menu]);

  useEffect(() => {
    localStorage.setItem('restaurant_orders_v9', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('restaurant_reservations_v9', JSON.stringify(reservations));
  }, [reservations]);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const clearCart = () => setCart([]);

  const placeOrder = () => {
    if (cart.length === 0) return;
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      items: [...cart],
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
  };

  const addReservation = (res: Omit<Reservation, 'id' | 'status'>) => {
    const newRes: Reservation = {
      ...res,
      id: Math.random().toString(36).substr(2, 9),
      status: 'Pending'
    };
    setReservations(prev => [newRes, ...prev]);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  const updateReservationStatus = (id: string, status: Reservation['status']) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const deleteReservation = (id: string) => {
    setReservations(prev => prev.filter(r => r.id !== id));
  };

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = { ...item, id: Math.random().toString(36).substr(2, 9) };
    setMenu(prev => [...prev, newItem]);
  };

  const updateMenuItem = (item: MenuItem) => {
    setMenu(prev => prev.map(m => m.id === item.id ? item : m));
  };

  const deleteMenuItem = (id: string) => {
    setMenu(prev => prev.filter(m => m.id !== id));
  };

  return (
    <AppContext.Provider value={{
      menu, cart, orders, reservations,
      addToCart, removeFromCart, updateCartQuantity, clearCart, placeOrder,
      addReservation, updateOrderStatus, deleteOrder, updateReservationStatus,
      deleteReservation, addMenuItem, updateMenuItem, deleteMenuItem,
      isAdmin, setIsAdmin
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
