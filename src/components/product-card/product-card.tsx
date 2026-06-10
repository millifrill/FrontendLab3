import styles from './product-card.module.css';
import Card from 'react-bootstrap/Card';
import ProductInfo from '../product-info/product-info';
import Carousel from 'react-bootstrap/Carousel';
import { IoHeartOutline } from 'react-icons/io5';

export default function ProductCard({ product, smallestPossibleDiscount }) {
  return (
    <>
      <Card className='shadow'>
        <section className={`${styles.media}`}>
          {product.images.length > 1 ? (
            <Carousel interval={null} variant='dark'>
              {product.images.map((image: string, index: number) => (
                <Carousel.Item>
                  <Card.Img
                    className={`${styles.image}`}
                    src={image}
                    alt={`${product.title} #${index + 1}`}
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
        <Card.Body className=''>
          <ProductInfo product={product} smallestPossibleDiscount={5} />
        </Card.Body>
      </Card>
    </>
  );
}
