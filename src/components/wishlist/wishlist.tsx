'use client';

import { useWishlist } from '../../context/wishlist.context';
import ProductCard from '../product-card/product-card';
import styles from './wishlist.module.css';

export default function Wishlist() {
  const { items } = useWishlist();

  return (
    <>
      <h1>Wishlist</h1>

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
