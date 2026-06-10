'use client';
import { useEffect, useState, useRef } from 'react';
import styles from './product-list.module.css';
import axios from 'axios';
import ProductCard from '../product-card/product-card';
import { Product, ProductRes } from '../../app/types/product';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import { GoSearch } from 'react-icons/go';
import { InputGroup } from 'react-bootstrap';

export default function ProductList() {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const hasSearched = useRef(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [pages, setPages] = useState<number>(1);
  const [active, setActive] = useState<number>(1);
  const limit = 30;

  useEffect(() => {
    if (hasSearched.current) {
      return;
    }
    async function getProducts(): Promise<void> {
      const res = await axios.get<ProductRes>(
        `https://dummyjson.com/products?limit=${limit}&skip=${(active - 1) * limit}`,
      );
      setProducts(res.data.products);
      setPages(Math.floor(res.data.total / limit) + 1);
    }
    getProducts();
  }, [active]);

  useEffect(() => {
    if (!hasSearched.current) {
      return;
    }

    async function getSearchedProducts(): Promise<void> {
      const res = await axios.get<ProductRes>(
        `https://dummyjson.com/products/search?q=${searchQuery}`,
      );
      setProducts(res.data.products);
      setPages(Math.floor(res.data.total / limit) + 1);
    }
    getSearchedProducts();
  }, [searchQuery]);

  return (
    <>
      <Form
        className={`{styles.search} m-3`}
        onSubmit={(e) => {
          e.preventDefault();
          setSearchQuery(searchInput);
          hasSearched.current = true;
        }}>
        <InputGroup>
          <Form.Control
            type=''
            placeholder='Search...'
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <InputGroup.Text as='button' type='submit' className='bg-dark'>
            <GoSearch className='text-light' />
          </InputGroup.Text>
        </InputGroup>
      </Form>
      <div className={styles.list}>
        {products.length > 0
          ? products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                smallestPossibleDiscount={5}
              />
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
    </>
  );
}
