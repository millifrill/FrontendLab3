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
import Spinner from 'react-bootstrap/Spinner';
import FilterSidebar from '../filter-sidebar/filter-sidebar';

export default function ProductList() {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const hasSearched = useRef(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [pages, setPages] = useState<number>(1);
  const [active, setActive] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const limit = 30;

  useEffect(() => {
    if (hasSearched.current) {
      return;
    }
    async function getProducts(): Promise<void> {
      setLoading(true);
      const res = await axios.get<ProductRes>(
        `https://dummyjson.com/products?limit=${limit}&skip=${(active - 1) * limit}`,
      );
      setProducts(res.data.products);
      setPages(Math.floor(res.data.total / limit) + 1);
      setLoading(false);
    }
    getProducts();
  }, [active]);

  useEffect(() => {
    if (!hasSearched.current) {
      return;
    }

    async function getSearchedProducts(): Promise<void> {
      setLoading(true);
      const res = await axios.get<ProductRes>(
        `https://dummyjson.com/products/search?q=${searchQuery}&skip=${(active - 1) * limit}`,
      );
      setProducts(res.data.products);
      setPages(Math.floor(res.data.total / limit) + 1);
      setLoading(false);
    }
    getSearchedProducts();
  }, [searchQuery, active]);

  return (
    <div className={styles.container}>
      <FilterSidebar products={products} />
      <div className={styles.list}>
        <Form
          className={styles.searchForm}
          onSubmit={(e) => {
            e.preventDefault();
            hasSearched.current = true;
            setActive(1);
            setSearchQuery(searchInput);
          }}>
          <InputGroup className='mx-auto w-100'>
            <Form.Control
              className={styles.searchFormControl}
              type='text'
              placeholder='Search...'
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <InputGroup.Text as='button' type='submit' className='bg-dark'>
              {loading ? (
                <Spinner
                  className={`${styles.loadingIcon} text-light`}
                  animation='border'
                  role='status'></Spinner>
              ) : (
                <GoSearch className={`${styles.searchIcon} text-light`} />
              )}
            </InputGroup.Text>
          </InputGroup>
        </Form>
        <FilterSidebar />
      </div>
      <div className={styles.list}>
        {hasSearched && !loading && products.length === 0 ? (
          <p>No results...</p>
        ) : null}
        {products.length > 0
          ? products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                smallestPossibleDiscount={5}
              />
            ))
          : null}
        {products.length > 0 ? (
          <Pagination className={`${styles.pagination} flex-fill`}>
            <Pagination.Prev
              className={styles.paginationItem}
              onClick={() => {
                setActive(active - 1);
                window.scrollTo({ top: 0 });
              }}
              disabled={active === 1}
            />
            {Array.from({ length: pages }, (_, i) => {
              const num = i + 1;
              return (
                <Pagination.Item
                  className={styles.paginationItem}
                  key={num}
                  active={num === active}
                  onClick={() => {
                    setActive(num);
                    window.scrollTo({ top: 0 });
                  }}>
                  {num}
                </Pagination.Item>
              );
            })}
            <Pagination.Next
              className={styles.paginationItem}
              onClick={() => {
                setActive(active + 1);
                window.scrollTo({ top: 0 });
              }}
              disabled={active === pages}
            />
          </Pagination>
        ) : null}
      </div>
    </div>
  );
}
