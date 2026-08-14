'use client';

import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Alert, Button, Modal } from 'react-bootstrap';
import { useWishlist } from '../../context/wishlist.context';
import ProductCard from '../product-card/product-card';
import styles from './wishlist.module.css';

export default function Wishlist() {
  const { items, removeItem } = useWishlist();
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [removeAlert, setRemoveAlert] = useState<string | null>(null);

  function handleConfirmRemove() {
    if (confirmId === null) return;
    const item = items.find((i) => i.id === confirmId);
    removeItem(confirmId);
    setConfirmId(null);
    if (item) setRemoveAlert(item.title);
  }

  useEffect(() => {
    setTimeout(setRemoveAlert, 3000);
  }, [removeAlert]);

  return (
    <>
      <h1>Wishlist</h1>

      {removeAlert && (
        <Alert
          variant='success'
          dismissible
          onClose={() => setRemoveAlert(null)}
          className={styles.alert}>
          <strong>{removeAlert}</strong> was removed from your wishlist.
        </Alert>
      )}

      <Modal
        show={confirmId !== null}
        onHide={() => setConfirmId(null)}
        centered>
        <Modal.Body className={styles.modalBody}>
          Are you sure you want to remove this item from your wishlist?
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
        <p className={styles.empty}>Your wishlist is empty.</p>
      ) : (
        <div className={styles.list}>
          {items.map((item) => (
            <div key={item.id} className={styles.cardWrapper}>
              <button
                className={styles.deleteBtn}
                onClick={() => setConfirmId(item.id)}
                aria-label={`Remove ${item.title}`}>
                <FaTrash size={14} />
              </button>
              <ProductCard product={item} smallestPossibleDiscount={5} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
