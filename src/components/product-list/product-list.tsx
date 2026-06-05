'use client';
import { useEffect, useState } from 'react';
import styles from './product-list.module.css';
import axios from 'axios';
import ProductCard from '../product-card/product-card';
import { Product, ProductRes } from '../../app/types/product';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    async function getProducts(): Promise<void> {
      const res = await axios.get<ProductRes>('https://dummyjson.com/products');
      setProducts(res.data.products);
    }
    getProducts();
  }, []);

  return (
    <div className={styles.list}>
      {products.length > 0
        ? products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        : null}
    </div>
  );
}
