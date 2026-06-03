'use client';

import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import styles from './cart.module.css';

interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}

const initialItems: CartItem[] = [
  {
    id: 1,
    name: 'Cotton T-shirt',
    brand: 'Gucci',
    price: 19.9,
    image: 'https://dummyjson.com/image/400x400/083a4f/ffffff?text=T-shirt',
    color: 'Black',
    size: 'L',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Black Watch',
    brand: 'Gucci',
    price: 49.8,
    image: 'https://dummyjson.com/image/400x400/083a4f/ffffff?text=Watch',
    color: 'Black',
    size: 'One size',
    quantity: 1,
  },
];

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  function changeQty(id: number, delta: number) {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeItem(id: number) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Shopping cart</h1>

      {items.length === 0 ? (
        <p className={styles.empty}>Your cart is empty.</p>
      ) : (
        <div className={styles.layout}>
          {/* ── Left: item list ── */}
          <ul className={styles.itemList}>
            {items.map((item) => (
              <li key={item.id} className={styles.item}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.itemImage}
                />
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemBrand}>{item.brand}</p>
                  <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                  <p className={styles.itemMeta}>
                    {item.size} · {item.color}
                  </p>
                  <div className={styles.stepper}>
                    <button
                      onClick={() => changeQty(item.id, -1)}
                      aria-label='Decrease quantity'>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => changeQty(item.id, 1)}
                      aria-label='Increase quantity'>
                      +
                    </button>
                  </div>
                </div>
                <button
                  className={styles.deleteBtn}
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name}`}>
                  <FaTrash size={14} />
                </button>
              </li>
            ))}
          </ul>

          {/* ── Right: order summary ── */}
          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Order summary</h2>
            <div className={styles.summaryItems}>
              {items.map((item) => (
                <div key={item.id} className={styles.summaryRow}>
                  <div className={styles.summaryLeft}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className={styles.summaryImage}
                    />
                    <div>
                      <p className={styles.summaryName}>{item.name}</p>
                      <p className={styles.summaryBrand}>{item.brand}</p>
                    </div>
                  </div>
                  <div className={styles.summaryRight}>
                    <p className={styles.summaryPrice}>
                      ${item.price.toFixed(2)}
                    </p>
                    <p className={styles.summaryQty}>Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.totalRow}>
              <strong>Total sum</strong>
              <strong>${total.toFixed(2)}</strong>
            </div>
            <button className={styles.checkoutBtn}>Go to checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}
