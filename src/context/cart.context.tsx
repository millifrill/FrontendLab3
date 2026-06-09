'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: number;
  title: string;
  brand: string;
  price: number;
  images: string[];
  color: string;
  size: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  changeQty: (id: number, delta: number) => void;
  totalCount: number;
  recentlyAdded: string | null;
  clearRecentlyAdded: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const initialItems: CartItem[] = [
  {
    id: 1,
    title: 'Cotton T-shirt',
    brand: 'Gucci',
    price: 19.9,
    images: ['https://dummyjson.com/image/400x400/083a4f/ffffff?text=T-shirt'],
    color: 'Black',
    size: 'L',
    quantity: 1,
  },
  {
    id: 2,
    title: 'Black Watch',
    brand: 'Gucci',
    price: 49.8,
    images: ['https://dummyjson.com/image/400x400/083a4f/ffffff?text=Watch'],
    color: 'Black',
    size: 'One size',
    quantity: 1,
  },
];

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [recentlyAdded, setRecentlyAdded] = useState<string | null>(null);

  function addItem(product: Omit<CartItem, 'quantity'>) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setRecentlyAdded(product.title);
  }

  function removeItem(id: number) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function changeQty(id: number, delta: number) {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0),
    );
  }

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        changeQty,
        totalCount,
        recentlyAdded,
        clearRecentlyAdded: () => setRecentlyAdded(null),
      }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
