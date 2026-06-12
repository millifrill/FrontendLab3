'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}

export interface PlacedOrder {
  id: string;
  date: string;
  expectedDelivery: string;
  tracking: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  shippingMethod: string;
  shippingCost: number;
  paymentMethod: string;
  cardLast4: string;
  items: CartItem[];
  subtotal: number;
  taxes: number;
  total: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  changeQty: (id: number, delta: number) => void;
  totalCount: number;
  recentlyAdded: string | null;
  clearRecentlyAdded: () => void;
  lastOrder: PlacedOrder | null;
  placeOrder: (order: PlacedOrder) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const initialItems: CartItem[] = [
  {
    id: 1,
    name: 'Cotton T-shirt',
    brand: 'Gucci',
    price: 19.9,
    image: 'https://dummyjson.com/image/400x400/083a4f/ffffff?text=T-shirt',
    color: 'Black',
    size: 'L',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Black Watch',
    brand: 'Gucci',
    price: 49.8,
    image: 'https://dummyjson.com/image/400x400/083a4f/ffffff?text=Watch',
    color: 'Black',
    size: 'One size',
    quantity: 1,
  },
];

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [recentlyAdded, setRecentlyAdded] = useState<string | null>(null);
  const [lastOrder, setLastOrder] = useState<PlacedOrder | null>(null);

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
    setRecentlyAdded(product.name);
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

  function placeOrder(order: PlacedOrder) {
    setLastOrder(order);
    setItems([]);
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
        lastOrder,
        placeOrder,
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
