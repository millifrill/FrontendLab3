'use client';

import { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useWishlist } from '../../context/wishlist.context';
import styles from './wishlist-alert.module.css';

export default function WishlistAlert() {
  const { removeAlert, clearRemoveAlert } = useWishlist();

  useEffect(() => {
    setTimeout(clearRemoveAlert, 3000);
  }, [removeAlert]);

  if (!removeAlert) return null;

  return (
    <Alert
      variant='success'
      dismissible
      onClose={clearRemoveAlert}
      className={styles.alert}>
      <strong>{removeAlert}</strong> was removed from your wishlist.
    </Alert>
  );
}
