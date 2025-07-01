import React, { createContext, useContext, useState } from 'react';

type CartItem = {
  id: string;
  name: string;
  image_url: string;
  price: number;
  quantity: number;
  size: 'Small' | 'Medium' | 'Large';
  shot: 'Single' | 'Double';
  type: 'Hot' | 'Cold';
  ice: 1 | 2 | 3;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
  calculateItemPrice: (item: CartItem) => number;
  PointsAddedPerItem: (item: CartItem) => number;
  totalPoints: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const calculateItemPrice = (item: CartItem) => {
    let price = item.price.toFixed(2) ? parseFloat(item.price.toFixed(2)) : item.price;
    console.log('price before adjustments:', item.price);
    if (item.size === 'Medium') price += 0.5;
    else if (item.size === 'Large') price += 1.0;
    if (item.type === 'Cold') price += 0.3;
    if (item.shot === 'Double') price += 0.7;
    console.log('Calculated price for item:', item.price, 'is', price);
    return price * (item.quantity || 1);
  } 

  const totalPrice = cart.reduce((total, item) => total + calculateItemPrice(item), 0);

  const PointsAddedPerItem = (item: CartItem) => {
    let points = 0;
    points = calculateItemPrice(item);
    console.log('Points added per item:', points);
    return 12 * points;
  }

  const totalPoints = cart.reduce((total, item) => total + PointsAddedPerItem(item), 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, totalPrice, calculateItemPrice, PointsAddedPerItem, totalPoints }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
