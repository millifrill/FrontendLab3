'use client';
import { useEffect, useState } from 'react';
import styles from './product-list.module.css';
import axios from 'axios';
import ProductCard from '../product-card/product-card';
import { Product } from '../../app/types/product';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    async function getProducts() {
      const res = await axios.get('https://dummyjson.com/products');
      setProducts(res.data.products);
    }
    getProducts();
  }, []);
  useEffect(() => {
    console.log(products);
  }, [products]);

  return products.length > 0 ? <ProductCard product={products[0]} /> : null;
}
