import ProductList from '../components/product-list/product-list';
import { useState } from 'react';

export default function Page() {
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('');
  return (
    <>
      <ProductList />
    </>
  );
}
