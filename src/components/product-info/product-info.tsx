import styles from './product-info.module.css';
import { IoStar } from 'react-icons/io5';
import { IoStarHalf } from 'react-icons/io5';
import { IoStarOutline } from 'react-icons/io5';

export default function ProductInfo({ product, smallestPossibleDiscount }) {
  const roundedRatingHalf: number = Math.round(product.rating * 2) / 2;
  const emptyStars: number = 5 - Math.ceil(roundedRatingHalf);

  return (
    <>
      <section className={`${styles.titles}`}>
        <h2 className={`${styles.title}`}>{product.title}</h2>
        <h3 className={`${styles.subtitle}`}>{product.brand}</h3>
      </section>
      <figure className={`${styles.rating} d-flex gap-1 fs-5 my-1`}>
        {Array.from({ length: Math.floor(roundedRatingHalf) }, (_, i) => (
          <IoStar />
        ))}
        {roundedRatingHalf % 1 === 0.5 ? <IoStarHalf /> : null}
        {Array.from({ length: emptyStars }, (_, i) => (
          <IoStarOutline />
        ))}
      </figure>
      <section className={`${styles.prices} fs-5 fw-semibold`}>
        {product.discountPercentage > smallestPossibleDiscount ? (
          <>
            <span className='text-danger'>
              {(product.price * (1 - product.discountPercentage / 100)).toFixed(
                2,
              )}
              $
            </span>
            <span className='text-decoration-line-through'>
              {product.price}$
            </span>
          </>
        ) : (
          <span>{product.price}$</span>
        )}
      </section>
    </>
  );
}
