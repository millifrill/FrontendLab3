import { Card, Carousel } from 'react-bootstrap';
import styles from './media-carousel.module.css';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { useWishlist } from '../../context/wishlist.context';

export default function MediaCarousel({ product, smallestPossibleDiscount }) {
  const { isFavorite, toggleFavorite } = useWishlist();
  const favorited = isFavorite(product.id);

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
          className={`${styles.heartBtn} bg-dark rounded-circle p-1`}
          aria-label={
            favorited
              ? `Remove ${product.title} from wishlist`
              : `Add ${product.title} to wishlist`
          }
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(product);
          }}>
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
    </>
  );
}
