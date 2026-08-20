'use client';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { Product, ProductRes } from '../../app/types/product';
import { GoSearch } from 'react-icons/go';
import { InputGroup } from 'react-bootstrap';
import ProductCard from '../product-card/product-card';
import FilterSidebar from '../filter-sidebar/filter-sidebar';
import Pagination from 'react-bootstrap/Pagination';
import styles from './product-list.module.css';
import Link from 'next/link';

export default function ProductList() {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const hasSearched = useRef(false);
  const [previewProducts, setPreviewProducts] = useState<Product[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const searchAndPreview = useRef<HTMLDivElement>(null);
  const [resultsText, setResultsText] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [pages, setPages] = useState<number>(1);
  const [active, setActive] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const limit = 30;

  useEffect(() => {
    if (hasSearched.current) {
      return;
    }
    async function getProducts(): Promise<void> {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get<ProductRes>(
          `https://dummyjson.com/products?limit=${limit}&skip=${(active - 1) * limit}`,
        );
        setProducts(res.data.products);
        setPages(Math.floor(res.data.total / limit) + 1);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, [active]);

  useEffect(() => {
    if (!searchInput.trim()) {
      setPreviewProducts([]);
      return;
    }

    const previewTimer = setTimeout(async () => {
      try {
        const res = await axios.get<ProductRes>(
          `https://dummyjson.com/products/search?q=${searchInput}&limit=5`,
        );
        setPreviewProducts(res.data.products);
      } catch (error) {
        console.error('Failed to fetch preview products:', error);
        setPreviewProducts([]);
      }
    }, 500);
    return () => clearTimeout(previewTimer);
  }, [searchInput]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchAndPreview.current &&
        !searchAndPreview.current.contains(e.target as Node)
      ) {
        setShowPreview(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!hasSearched.current) {
      return;
    }

    async function getSearchedProducts(): Promise<void> {
      if (!searchQuery.trim()) {
        return;
      }
      setSearchQuery(searchQuery.trim());
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get<ProductRes>(
          `https://dummyjson.com/products/search?q=${searchQuery}&skip=${(active - 1) * limit}`,
        );
        setProducts(res.data.products);
        setPages(Math.floor(res.data.total / limit) + 1);
      } catch (error) {
        console.error('Failed to fetch products by search:', error);
        setError('Failed to load products by search. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    getSearchedProducts();
  }, [searchQuery, active]);

  async function getProductsByCategory(category): Promise<void> {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get<ProductRes>(
        `https://dummyjson.com/products/category/${category}`,
      );
      setProducts(res.data.products);
    } catch (error) {
      console.error('Failed to fetch products by category:', error);
      setError('Failed to load products by category. Please try again.');
    }
  }

  return (
    <div>
      <p className={styles.resultText}>{resultsText}</p>
      <div className={styles.searchFilterContainer}>
        <Form
          className={styles.searchForm}
          onSubmit={(e) => {
            e.preventDefault();
            hasSearched.current = true;
            setActive(1);
            setSearchQuery(searchInput);
            setResultsText(
              searchInput
                ? `Search results for "${searchInput.trim()}"`
                : resultsText,
            );
            setSearchInput('');
          }}>
          <InputGroup className='mx-auto w-100' ref={searchAndPreview}>
            <Form.Control
              className={styles.searchFormControl}
              type='text'
              placeholder='Search...'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onFocus={() => setShowPreview(true)}
            />
            {previewProducts.length >= 0 && showPreview && (
              <div className={styles.searchPreview}>
                {previewProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product-details/${product.id}`}
                    className={styles.link}>
                    <div className={styles.previewItem}>
                      <img src={product.thumbnail} width={50} height={50} />
                      <strong>{product.title}</strong>
                    </div>
                  </Link>
                ))}
              </div>
            )}
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
        <FilterSidebar
          products={products}
          getProductsByCategory={getProductsByCategory}
        />
      </div>
      <div className={styles.grid}>
        {error ? (
          <p>{error}</p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              smallestPossibleDiscount={5}
            />
          ))
        ) : null}
        {pages !== 1 ? (
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
