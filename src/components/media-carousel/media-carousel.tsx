import { useState } from 'react';
import { Button, Card, Carousel, Modal } from 'react-bootstrap';
import styles from './media-carousel.module.css';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { useWishlist } from '../../context/wishlist.context';

export default function MediaCarousel({ product, smallestPossibleDiscount }) {
  const { isFavorite, toggleFavorite } = useWishlist();
  const favorited = isFavorite(product.id);
  const [showConfirm, setShowConfirm] = useState(false);

  function handleHeartClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (favorited) {
      setShowConfirm(true);
    } else {
      toggleFavorite(product);
    }
  }

  function handleConfirmRemove() {
    toggleFavorite(product);
    setShowConfirm(false);
  }

  return (
    <>
      <section className={`${styles.media}`}>
        {product.images.length > 1 ? (
          <Carousel interval={null} variant='dark'>
            {product.images.map((image: string, i: number) => (
              <Carousel.Item key={`carousel#${i}`}>
                <Card.Img
                  className={`${styles.image}`}
                  src={image}
                  alt={`${product.title} #${i + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <Card.Img
            className={`${styles.image}`}
            src={product.images[0]}
            alt={`${product.title}`}
          />
        )}
        <button
          type='button'
          className={`${styles.heartBtn} ${favorited ? styles.heartBtnActive : ''} rounded-circle p-1`}
          aria-label={
            favorited
              ? `Remove ${product.title} from wishlist`
              : `Add ${product.title} to wishlist`
          }
          onClick={handleHeartClick}>
          {favorited ? (
            <IoHeart className='fs-1' />
          ) : (
            <IoHeartOutline className='fs-1' />
          )}
        </button>
        <figure className='position-absolute bottom-0 w-100 d-flex justify-content-center gap-1 mb-1'></figure>
        {product.discountPercentage > smallestPossibleDiscount ? (
          <span
            className={`${styles.deal} bg-danger badge rounded-1 ms-1 mb-5 fw-normal`}>
            Deal {Math.round(product.discountPercentage)}%
          </span>
        ) : null}
      </section>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Body className={styles.modalBody}>
          Are you sure you want to remove this item from your wishlist?
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <Button
            variant='outline-primary'
            className='vesti-btn-outline'
            onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button
            variant='primary'
            className='vesti-btn'
            onClick={handleConfirmRemove}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
