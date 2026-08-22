'use client';

import { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useWishlist } from '../../context/wishlist.context';
import styles from './wishlist-alert.module.css';

export default function WishlistAlert() {
  const { recentlyAdded, clearRecentlyAdded, removeAlert, clearRemoveAlert } =
    useWishlist();

  useEffect(() => {
    setTimeout(clearRecentlyAdded, 3000);
  }, [recentlyAdded]);

  useEffect(() => {
    setTimeout(clearRemoveAlert, 3000);
  }, [removeAlert]);

  if (recentlyAdded) {
    return (
      <Alert
        variant='success'
        dismissible
        onClose={clearRecentlyAdded}
        className='alert'>
        <strong>{recentlyAdded}</strong> was added to your wishlist.
      </Alert>
    );
  }

  if (removeAlert) {
    return (
      <Alert
        variant='success'
        dismissible
        onClose={clearRemoveAlert}
        className='alert'>
        <strong>{removeAlert}</strong> was removed from your wishlist.
      </Alert>
    );
  }

  return null;
}
