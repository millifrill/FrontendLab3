'use client';

<<<<<<< HEAD
import { useState } from 'react';
import Link from 'next/link';
=======
import { useEffect, useState } from 'react';
>>>>>>> 0533de61c33ab0331e8d5cf675d055ba6f436b5c
import { FaTrash } from 'react-icons/fa';
import { Alert, Button, Modal } from 'react-bootstrap';
import { useCart } from '../../context/cart.context';
import styles from './cart.module.css';

export default function Cart() {
  const { items, removeItem, changeQty, recentlyAdded, clearRecentlyAdded } =
    useCart();

  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [removeAlert, setRemoveAlert] = useState<string | null>(null);

  function handleConfirmRemove() {
    if (confirmId === null) return;
    const item = items.find((i) => i.id === confirmId);
    removeItem(confirmId);
    setConfirmId(null);
    if (item) setRemoveAlert(item.title);
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  useEffect(() => {
    setTimeout(setRemoveAlert, 3000);
  }, [removeAlert]);

  return (
    <>
      <h1 className={styles.title}>Shopping cart</h1>

      {recentlyAdded && (
        <Alert
          variant='success'
          dismissible
          onClose={clearRecentlyAdded}
          className={styles.alert}>
          <strong>{recentlyAdded}</strong> was added to your cart.
        </Alert>
      )}

      {removeAlert && (
        <Alert
          variant='success'
          dismissible
          onClose={() => setRemoveAlert(null)}
          className={styles.alert}>
          <strong>{removeAlert}</strong> was removed from your cart.
        </Alert>
      )}

      <Modal
        show={confirmId !== null}
        onHide={() => setConfirmId(null)}
        centered>
        <Modal.Body className={styles.modalBody}>
          Are you sure you want to remove this item from your cart?
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <Button
            variant='primary'
            className={styles.btnPrimary}
            onClick={() => setConfirmId(null)}>
            Cancel
          </Button>
          <Button
            variant='outline-primary'
            className={styles.btnOutline}
            onClick={handleConfirmRemove}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {items.length === 0 ? (
        <p className={styles.empty}>Your cart is empty.</p>
      ) : (
        <div className={styles.layout}>
          <ul className={styles.itemList}>
            {items.map((item) => (
              <li key={item.id} className={styles.item}>
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className={styles.itemImage}
                />
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>{item.title}</p>
                  <p className={styles.itemBrand}>{item.brand}</p>
                  <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                  <p className={styles.itemMeta}>
                    {item.size} · {item.color}
                  </p>
                  <div className={styles.stepper}>
                    <button
                      onClick={() => changeQty(item.id, -1)}
                      aria-label='Decrease quantity'
                      disabled={item.quantity === 1}
                      className={
                        item.quantity === 1 ? styles.stepperDisabled : ''
                      }>
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
                  onClick={() => setConfirmId(item.id)}
                  aria-label={`Remove ${item.title}`}>
                  <FaTrash size={14} />
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Order summary</h2>
            <div className={styles.summaryItems}>
              {items.map((item) => (
                <div key={item.id} className={styles.summaryRow}>
                  <div className={styles.summaryLeft}>
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className={styles.summaryImage}
                    />
                    <div>
                      <p className={styles.summaryName}>{item.title}</p>
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
            <Link href='/checkout' className={styles.checkoutBtn}>
              Go to checkout
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
