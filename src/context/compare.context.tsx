'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../app/types/product';

const MAX_COMPARE = 2;

export interface CompareProduct extends Product {
  description?: string;
  weight?: number;
  dimensions?: { width: number; height: number; depth: number };
  warrantyInformation?: string;
}

interface CompareContextValue {
  items: CompareProduct[];
  isComparing: (id: number) => boolean;
  toggleCompare: (product: CompareProduct) => void;
  removeItem: (id: number) => void;
  totalCount: number;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CompareProduct[]>([]);

  function isComparing(id: number) {
    return items.some((i) => i.id === id);
  }

  function toggleCompare(product: Product) {
    setItems((prev) => {
      if (prev.some((i) => i.id === product.id)) {
        return prev.filter((i) => i.id !== product.id);
      }
      const next = [...prev, product];
      return next.length > MAX_COMPARE ? next.slice(1) : next;
    });
  }

  function removeItem(id: number) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <CompareContext.Provider
      value={{
        items,
        isComparing,
        toggleCompare,
        removeItem,
        totalCount: items.length,
      }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used inside <CompareProvider>');
  return ctx;
}
