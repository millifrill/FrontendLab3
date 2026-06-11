import { Card, Carousel } from 'react-bootstrap';
import styles from './media-carousel.module.css';
import { IoHeartOutline } from 'react-icons/io5';

export default function MediaCarousel({ product, smallestPossibleDiscount }) {
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
        <IoHeartOutline
          className={`${styles.heart} fs-1 p-1 bg-dark rounded-circle`}
        />
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
