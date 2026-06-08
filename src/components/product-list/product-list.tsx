'use client';
import { useEffect, useState } from 'react';
import styles from './product-list.module.css';
import axios from 'axios';
import ProductCard from '../product-card/product-card';
import { Product, ProductRes } from '../../app/types/product';
import Pagination from 'react-bootstrap/Pagination';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pages, setPages] = useState<number>(1);
  const [active, setActive] = useState<number>(1);
  const limit = 30;

  useEffect(() => {
    async function getProducts(): Promise<void> {
      const res = await axios.get<ProductRes>(
        `https://dummyjson.com/products?limit=${limit}&skip=${(active - 1) * limit}`,
      );
      setProducts(res.data.products);
      setPages(Math.floor(res.data.total / limit) + 1);
    }
    getProducts();
  }, [active]);

  return (
    <div className={styles.list}>
      {products.length > 0
        ? products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        : null}

      <Pagination className={`${styles.pagination} flex-fill`}>
        <Pagination.Prev
          className={styles.paginationItem}
          onClick={() => setActive(active - 1)}
          disabled={active === 1}
        />
        {Array.from({ length: pages }, (_, i) => {
          const num = i + 1;
          return (
            <Pagination.Item
              className={styles.paginationItem}
              key={num}
              active={num === active}
              onClick={() => setActive(num)}>
              {num}
            </Pagination.Item>
          );
        })}
        <Pagination.Next
          className={styles.paginationItem}
          onClick={() => setActive(active + 1)}
          disabled={active === pages}
        />
      </Pagination>
    </div>
  );
}
