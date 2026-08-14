'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { Product } from '../app/types/product';

const STORAGE_KEY = 'vesti-wishlist';

interface WishlistContextValue {
  items: Product[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (product: Product) => void;
  removeItem: (id: number) => void;
  totalCount: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setItems(JSON.parse(stored));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  function isFavorite(id: number) {
    return items.some((i) => i.id === id);
  }

  function toggleFavorite(product: Product) {
    setItems((prev) =>
      prev.some((i) => i.id === product.id)
        ? prev.filter((i) => i.id !== product.id)
        : [...prev, product],
    );
  }

  function removeItem(id: number) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <WishlistContext.Provider
      value={{
        items,
        isFavorite,
        toggleFavorite,
        removeItem,
        totalCount: items.length,
      }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx)
    throw new Error('useWishlist must be used inside <WishlistProvider>');
  return ctx;
}
