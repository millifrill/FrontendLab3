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

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const hasSearched = useRef(false);
  const [selectedSortOption, setSelectedSortOption] = useState<string>('');
  console.log('selectedSortOption', selectedSortOption);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  console.log('selectedCategory', selectedCategory);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(
    null,
  );
  console.log('selectedPriceRange', selectedPriceRange);
  const [selectedRating, setSelectedRating] = useState<string[]>([]);
  const [pages, setPages] = useState<number>(1);
  const [active, setActive] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const limit = 30;

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

  useEffect(() => {
    if (hasSearched.current) {
      return;
    }
    getProducts();
  }, [active]);

  console.log('products', products);

  function getProductsByPriceFilter(products) {
    let productsFilteredByPrice;
    if (!selectedPriceRange) return products;
    if (selectedPriceRange === '1') {
      productsFilteredByPrice = products?.filter(
        (product) => product.price > 10,
      );
    }
    if (selectedPriceRange === '2') {
      productsFilteredByPrice = products?.filter(
        (product) => product.price > 10 && product.price < 30,
      );
    }
    if (selectedPriceRange === '3') {
      productsFilteredByPrice = products?.filter(
        (product) => product.price > 30 && product.price < 50,
      );
    }
    if (selectedPriceRange === '4') {
      productsFilteredByPrice = products?.filter(
        (product) => product.price > 50 && product.price < 80,
      );
    }
    if (selectedPriceRange === '5') {
      productsFilteredByPrice = products?.filter(
        (product) => product.price > 80 && product.price < 100,
      );
    }
    console.log('productsFilteredByPrice', productsFilteredByPrice);
    console.log('productsFilteredByPrice', productsFilteredByPrice);
    setProducts(productsFilteredByPrice);
    return productsFilteredByPrice;
  }

  useEffect(() => {
    if (!hasSearched.current) {
      return;
    }
    getProductsByPriceFilter(products);
  }, [active]);

  async function getSearchedProducts(): Promise<void> {
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

  useEffect(() => {
    if (!hasSearched.current) {
      return;
    }
    getSearchedProducts();
  }, [searchQuery, active]);

  async function getProductsBySortOption(selectedSortOption): Promise<void> {
    if (!selectedSortOption) {
      return;
    }
    setLoading(true);
    console.log('selectedSortOption', selectedSortOption);

    let sortValue;

    if (selectedSortOption === 'most-relevant') {
      sortValue = '';
    }
    if (selectedSortOption === 'low-to-high') {
      sortValue = 'asc';
    }
    if (selectedSortOption === 'high-to-low') {
      sortValue = 'desc';
    }
    console.log('sortValue', sortValue);

    const res = await axios.get<ProductRes>(
      `https://dummyjson.com/products?sortBy=price&order=${sortValue}`,
    );
    setProducts(res.data.products);
    setPages(Math.floor(res.data.total / limit) + 1);
    setLoading(false);
    setError(null);
    try {
      const res = await axios.get<ProductRes>(
        `https://dummyjson.com/products/category/${selectedCategory}`,
      );
      setProducts(res.data.products);
    } catch (error) {
      console.error('Failed to fetch products by category:', error);
      setError('Failed to load products by category. Please try again.');
    }
  }

  useEffect(() => {
    getProductsBySortOption(selectedSortOption);
  }, [active]);

  async function getProductsByCategory(selectedCategory): Promise<void> {
    if (!selectedCategory) {
      return;
    }
    setLoading(true);
    const res = await axios.get<ProductRes>(
      `https://dummyjson.com/products/category/${selectedCategory}?skip=${(active - 1) * limit}`,
    );
    setProducts(res.data.products);
    setPages(Math.floor(res.data.total / limit) + 1);
    setLoading(false);
  }

  useEffect(() => {
    getProductsByCategory(selectedCategory);
  }, [active]);

  return (
    <div className={styles.container}>
      <div className={styles.searchFilterContainer}>
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
        <FilterSidebar
          products={products}
          getProducts={getProducts}
          selectedSortOption={selectedSortOption}
          setSelectedSortOption={setSelectedSortOption}
          getProductsBySortOption={getProductsBySortOption}
          selectedPriceRange={selectedPriceRange}
          setSelectedPriceRange={setSelectedPriceRange}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setSelectedRating={setSelectedRating}
          getProductsByCategory={getProductsByCategory}
          setSelectedBrands={setSelectedBrands}
          getProductsByPriceFilter={getProductsByPriceFilter}
        />
      </div>
      <div className={styles.list}>
        {hasSearched && !loading && products.length === 0 ? (
          <p>No results...</p>
        ) : null}
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
