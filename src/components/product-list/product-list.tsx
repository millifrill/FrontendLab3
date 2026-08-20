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
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const hasSearched = useRef(false);
  const [selectedSortOption, setSelectedSortOption] = useState<string | null>(
    null,
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(
    null,
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [previewProducts, setPreviewProducts] = useState<Product[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const searchAndPreview = useRef<HTMLDivElement>(null);
  const [resultsText, setResultsText] = useState('');
  const [pages, setPages] = useState<number>(1);
  const [active, setActive] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const limit = 30;

  async function getProducts(): Promise<void> {
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

  async function getAllProducts(): Promise<void> {
    setError(null);
    try {
      const res = await axios.get<ProductRes>(
        `https://dummyjson.com/products?limit=0`,
      );
      setAllProducts(res.data.products);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setError('Failed to load products.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  async function getSearchedProducts(): Promise<void> {
    setError(null);
    try {
      const url = searchQuery
        ? `https://dummyjson.com/products/search?q=${searchQuery}&limit=${limit}&skip=${(active - 1) * limit}`
        : `https://dummyjson.com/products?limit=${limit}&skip=${(active - 1) * limit}`;
      const res = await axios.get<ProductRes>(url);
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

  async function getProductsBySortOption(selectedSortOption): Promise<void> {
    if (!selectedSortOption) {
      return;
    }
    setLoading(true);
    if (selectedSortOption === 'price low-to-high') {
      try {
        const res = await axios.get<ProductRes>(
          'https://dummyjson.com/products?sortBy=price&order=asc&limit=0',
        );
        setFilteredProducts(res.data.products);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error(
          'Failed to fetch products by sort option price low-to-high:',
          error,
        );
        setError(
          'Failed to load products by sort option price low-to-high. Please try again.',
        );
      }
    }
    if (selectedSortOption === 'price high-to-low') {
      try {
        const res = await axios.get<ProductRes>(
          'https://dummyjson.com/products?sortBy=price&order=desc&limit=0',
        );
        setFilteredProducts(res.data.products);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error(
          'Failed to fetch products by sort option price high-to-low:',
          error,
        );
        setError(
          'Failed to load products by sort option price high-to-low. Please try again.',
        );
      }
    }
    if (selectedSortOption === 'highest-rated') {
      try {
        const res = await axios.get<ProductRes>(
          'https://dummyjson.com/products?sortBy=rating&order=desc&limit=0',
        );
        setFilteredProducts(res.data.products);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error(
          'Failed to fetch products by sort option highest rated:',
          error,
        );
        setError(
          'Failed to load products by sort option highest rated. Please try again.',
        );
      }
    }
  }

  useEffect(() => {
    getProductsBySortOption(selectedSortOption);
  }, [selectedSortOption]);

  function getProductsByPriceFilter(products) {
    let productsFilteredByPrice = [];
    if (!selectedPriceRange) return products;
    if (selectedPriceRange === '1') {
      productsFilteredByPrice = products?.filter(
        (product) => product.price < 10,
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
    if (selectedPriceRange === '6') {
      productsFilteredByPrice = products?.filter(
        (product) => product.price > 100 && product.price < 1000,
      );
    }
    if (selectedPriceRange === '7') {
      productsFilteredByPrice = products?.filter(
        (product) => product.price > 1000,
      );
    }
    return productsFilteredByPrice;
  }

  function getProductsByCategoryFilter(products) {
    if (!selectedCategory) return products;

    const productsFilteredByCategory = products?.filter(
      (product) => product.category === selectedCategory,
    );
    return productsFilteredByCategory;
  }

  function getProductsRatingFilter(products) {
    let productsFilteredByRating = [];
    if (!selectedRating) return products;
    if (selectedRating === 1) {
      productsFilteredByRating = products?.filter(
        (product) => product.rating <= 1,
      );
    }
    if (selectedRating === 2) {
      productsFilteredByRating = products?.filter(
        (product) => product.rating > 1 && product.rating <= 2,
      );
    }
    if (selectedRating === 3) {
      productsFilteredByRating = products?.filter(
        (product) => product.rating > 2 && product.rating <= 3,
      );
    }
    if (selectedRating === 4) {
      productsFilteredByRating = products?.filter(
        (product) => product.rating > 3 && product.rating <= 4,
      );
    }
    if (selectedRating === 5) {
      productsFilteredByRating = products?.filter(
        (product) => product.rating > 4 && product.rating <= 5,
      );
    }
    return productsFilteredByRating;
  }

  function getProductsByBrandFilter(products) {
    if (!selectedBrand) return products;

    const productsFilteredByBrand = products?.filter(
      (product) => product.brand === selectedBrand,
    );
    return productsFilteredByBrand;
  }

  function handleApplyFilters() {
    setResultsText('');
    let filterProducts = [...allProducts];

    if (selectedSortOption) {
      filterProducts = [...filteredProducts];
    }
    if (selectedPriceRange) {
      filterProducts = getProductsByPriceFilter(filterProducts);
    }
    if (selectedCategory) {
      filterProducts = getProductsByCategoryFilter(filterProducts);
    }
    if (selectedRating) {
      filterProducts = getProductsRatingFilter(filterProducts);
    }
    if (selectedBrand) {
      filterProducts = getProductsByBrandFilter(filterProducts);
    }
    setFilteredProducts(filterProducts);
    setPages(Math.floor(filterProducts.length / limit) + 1);
  }

  function handleResetFilter() {
    getProducts();
    setSearchInput('');
    setSelectedSortOption(null);
    setSelectedPriceRange(null);
    setSelectedCategory(null);
    setSelectedRating(null);
    setSelectedBrand(null);
    setFilteredProducts([]);
  }

  const handleSearchSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    hasSearched.current = true;
    setActive(1);
    setSelectedSortOption(null);
    setSelectedPriceRange(null);
    setSelectedCategory(null);
    setSelectedRating(null);
    setSelectedBrand(null);
    setFilteredProducts([]);
    setSearchQuery(searchInput.trim());
    setResultsText(
      searchInput ? `Search results for "${searchInput.trim()}"` : '',
    );
    setSearchInput('');
  };

  return (
    <>
      <p className={styles.resultText}>{resultsText}</p>
      <div className={styles.searchFilterContainer}>
        <Form className={styles.searchForm} onSubmit={handleSearchSubmit}>
          <InputGroup className='mx-auto w-100' ref={searchAndPreview}>
            <Form.Control
              className={styles.searchFormControl}
              type='text'
              placeholder='Search...'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onFocus={() => setShowPreview(true)}
            />
            {previewProducts.length > 0 && showPreview && (
              <div className={styles.searchPreview}>
                {previewProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product-details/${product.id}`}
                    className={styles.link}>
                    <div className={styles.previewItem}>
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        width={50}
                        height={50}
                      />
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
          setSelectedSortOption={setSelectedSortOption}
          setSelectedPriceRange={setSelectedPriceRange}
          setSelectedCategory={setSelectedCategory}
          setSelectedRating={setSelectedRating}
          setSelectedBrand={setSelectedBrand}
          handleApplyFilters={handleApplyFilters}
          handleResetFilter={handleResetFilter}
        />
      </div>
      <div className={styles.list}>
        {hasSearched && !loading && products.length === 0 ? (
          <p>No results...</p>
        ) : null}
        <div className={styles.grid}>
          {error ? (
            <p>{error}</p>
          ) : products.length > 0 &&
            !selectedSortOption &&
            !selectedPriceRange &&
            !selectedCategory &&
            !selectedRating &&
            !selectedBrand ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                smallestPossibleDiscount={5}
              />
            ))
          ) : !loading && filteredProducts.length === 0 ? (
            <p>No results...</p>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                smallestPossibleDiscount={5}
              />
            ))
          )}
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
    </>
  );
}
