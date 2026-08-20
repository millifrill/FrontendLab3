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
  console.log('products', products);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  console.log('allProducts', allProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  console.log('filteredProducts', filteredProducts);
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const hasSearched = useRef(false);
  const [selectedSortOption, setSelectedSortOption] = useState<string | null>(
    null,
  );
  console.log('selectedSortOption', selectedSortOption);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(
    null,
  );
  console.log('selectedPriceRange', selectedPriceRange);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  console.log('selectedCategory', selectedCategory);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  console.log('selectedRating', selectedRating);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  console.log('selectedBrand', selectedBrand);

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
    if (selectedSortOption === 'most-relevant') {
      return;
    }
    if (selectedSortOption === 'price low-to-high') {
      try {
        const res = await axios.get<ProductRes>(
          'https://dummyjson.com/products?sortBy=price&order=asc&limit=0',
        );
        setFilteredProducts(res.data.products);
        // setPages(Math.floor(res.data.total / limit) + 1);
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
        // setPages(Math.floor(res.data.total / limit) + 1);
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
        // setPages(Math.floor(res.data.total / limit) + 1);
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
    console.log('productsFilteredByPrice', productsFilteredByPrice);
    // setFilteredProducts(productsFilteredByPrice);
    return productsFilteredByPrice;
  }

  // useEffect(() => {
  //   getProductsByPriceFilter(products);
  // }, [active]);

  // async function getProductsByCategoryFilter(selectedCategory): Promise<void> {
  //   if (!selectedCategory) {
  //     return;
  //   }
  //   setLoading(true);
  //   const res = await axios.get<ProductRes>(
  //     `https://dummyjson.com/products/category/${selectedCategory}?skip=${(active - 1) * limit}`,
  //   );
  //   setFilteredProducts(res.data.products);
  //   setPages(Math.floor(res.data.total / limit) + 1);
  //   setLoading(false);
  // }

  // useEffect(() => {
  //   getProductsByCategoryFilter(selectedCategory);
  // }, [active]);

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
    console.log('productsFilteredByRating', productsFilteredByRating);
    // setFilteredProducts(productsFilteredByRating);
    return productsFilteredByRating;
  }

  // useEffect(() => {
  //   getProductsRatingFilter(products);
  // }, [active]);

  function getProductsByBrandFilter(products) {
    if (!selectedBrand) return products;

    const productsFilteredByBrand = products?.filter(
      (product) => product.brand === selectedBrand,
    );
    return productsFilteredByBrand;
  }

  function handleApplyFilters() {
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
          // selectedSortOption={selectedSortOption}
          setSelectedSortOption={setSelectedSortOption}
          // getProductsBySortOption={getProductsBySortOption}
          setSelectedPriceRange={setSelectedPriceRange}
          // selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setSelectedRating={setSelectedRating}
          // getProductsByCategoryFilter={getProductsByCategoryFilter}
          setSelectedBrand={setSelectedBrand}
          // getProductsByPriceFilter={getProductsByPriceFilter}
          // getProductsRatingFilter={getProductsRatingFilter}
          handleApplyFilters={handleApplyFilters}
          handleResetFilter={handleResetFilter}
        />
      </div>
      <div className={styles.list}>
        {loading && <p>Loading...</p>}
        {hasSearched && !loading && products.length === 0 ? (
          <p>No results...</p>
        ) : null}
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
        {products.length > 0 || filteredProducts.length > 0 ? (
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
