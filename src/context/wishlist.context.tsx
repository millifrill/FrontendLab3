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
  recentlyAdded: string | null;
  clearRecentlyAdded: () => void;
  removeAlert: string | null;
  clearRemoveAlert: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [recentlyAdded, setRecentlyAdded] = useState<string | null>(null);
  const [removeAlert, setRemoveAlert] = useState<string | null>(null);

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
    setItems((prev) => {
      if (prev.some((i) => i.id === product.id)) {
        setRemoveAlert(product.title);
        return prev.filter((i) => i.id !== product.id);
      }
      setRecentlyAdded(product.title);
      return [...prev, product];
    });
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
        recentlyAdded,
        clearRecentlyAdded: () => setRecentlyAdded(null),
        removeAlert,
        clearRemoveAlert: () => setRemoveAlert(null),
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
