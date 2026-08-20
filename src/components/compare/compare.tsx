'use client';

import Link from 'next/link';
import { IoClose } from 'react-icons/io5';
import { useCompare } from '../../context/compare.context';
import ProductInfo from '../product-info/product-info';
import styles from './compare.module.css';

export default function Compare() {
  const { items, removeItem } = useCompare();

  return (
    <>
      <h1>Compare</h1>

      {items.length === 0 ? (
        <p className={styles.empty}>
          Select up to two products to compare using the Compare button on a
          product card.
        </p>
      ) : (
        <div className={styles.layout}>
          {items.map((item) => (
            <div key={item.id} className={styles.column}>
              <button
                className={styles.deleteBtn}
                onClick={() => removeItem(item.id)}
                aria-label={`Remove ${item.title}`}>
                <IoClose size={18} />
              </button>
              <Link
                href={`/product-details/${item.id}`}
                className={styles.columnLink}>
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className={styles.image}
                />
                <ProductInfo product={item} smallestPossibleDiscount={5} />
                <p className={styles.description}>{item.description}</p>
                <div className={styles.specs}>
                  <p>
                    <strong>Width: </strong>
                    {item.dimensions?.width} cm
                  </p>
                  <p>
                    <strong>Height: </strong>
                    {item.dimensions?.height} cm
                  </p>
                  <p>
                    <strong>Depth: </strong>
                    {item.dimensions?.depth} cm
                  </p>
                  <p>
                    <strong>Weight: </strong>
                    {item.weight} g
                  </p>
                  <p>
                    <strong>Warranty: </strong>
                    {item.warrantyInformation}
                  </p>
                </div>
              </Link>
            </div>
          ))}
          {items.length === 1 && (
            <div className={styles.column}>
              <p className={styles.placeholder}>
                Select one more product to compare.
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
