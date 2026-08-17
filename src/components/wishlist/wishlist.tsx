'use client';

import { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useWishlist } from '../../context/wishlist.context';
import ProductCard from '../product-card/product-card';
import styles from './wishlist.module.css';

export default function Wishlist() {
  const { items, removeAlert, clearRemoveAlert } = useWishlist();

  useEffect(() => {
    setTimeout(clearRemoveAlert, 3000);
  }, [removeAlert]);

  return (
    <>
      <h1>Wishlist</h1>

      {removeAlert && (
        <Alert
          variant='success'
          dismissible
          onClose={clearRemoveAlert}
          className={styles.alert}>
          <strong>{removeAlert}</strong> was removed from your wishlist.
        </Alert>
      )}

      {items.length === 0 ? (
        <p className={styles.empty}>Your wishlist is empty.</p>
      ) : (
        <div className={styles.list}>
          {items.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              smallestPossibleDiscount={5}
            />
          ))}
        </div>
      )}
    </>
  );
}
