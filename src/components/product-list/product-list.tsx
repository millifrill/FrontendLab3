'use client';
import { useEffect, useState } from 'react';
import styles from './product-list.module.css';
import axios from 'axios';
import ProductCard from '../product-card/product-card';
import { Product, ProductRes } from '../../app/types/product';
import Pagination from 'react-bootstrap/Pagination';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    async function getProducts(): Promise<void> {
      const res = await axios.get<ProductRes>(
        'https://dummyjson.com/products?limit=6',
      );
      setProducts(res.data.products);
    }
    getProducts();
  }, []);

  const [active, setActive] = useState<Number>(1);

  return (
    <>
      <div className={styles.list}>
        {products.length > 0
          ? products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          : null}
      </div>
      <Pagination className={styles.pagination}>
        {Array.from({ length: 5 }, (_, i) => {
          const num = i + 1;
          return (
            <Pagination.Item
              key={num}
              active={num === active}
              onClick={() => setActive(num)}>
              {num}
            </Pagination.Item>
          );
        })}
      </Pagination>
    </>
  );
}
