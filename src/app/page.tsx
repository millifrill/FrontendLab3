'use client';
import ProductList from '../components/product-list/product-list';
import { useState } from 'react';

export default function Page() {
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('');
  return (
    <>
      <ProductList
        sortBy={sortBy}
        order={order}
        setSortBy={setSortBy}
        setOrder={setOrder}
      />
    </>
  );
}
