'use client';
import { useEffect, useState } from 'react';
import styles from './product-list.module.css';
import axios from 'axios';

export default function ProductList() {
  const [products, setProducts] = useState([]);
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

  return <></>;
}
