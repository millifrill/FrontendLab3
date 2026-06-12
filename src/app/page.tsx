('use client');
import FilterSidebar from '@/components/filter-sidebar/filter-sidebar';
import ProductList from '../components/product-list/product-list';
import { useState } from 'react';

export default function Page() {
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('');
  return (
    <>
      <h1 style={{ margin: '30px auto' }}>Welcome!</h1>
      <FilterSidebar products={products} setSortBy={setSortBy} setOrder={setOrder} />

      <ProductList sortBy={sortBy} order={order} />
    </>
  );
}
