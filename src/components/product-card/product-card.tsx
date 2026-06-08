import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { IoHeartOutline } from 'react-icons/io5';
import { IoStar } from 'react-icons/io5';
import { IoStarHalf } from 'react-icons/io5';
import { IoStarOutline } from 'react-icons/io5';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { TfiLayoutLineSolid } from 'react-icons/tfi';
import styles from './product-card.module.css';

export default function ProductCard({ product }) {
  console.log('product', product);
  const smallestPossibleDiscount = 5;

  return (
    <>
      <Card className='shadow'>
        <section className={`${styles.media}`}>
          <Card.Img
            className={`${styles.image}`}
            src={product.images[0]}
            alt={`${product.title} image`}
          />
          <IoHeartOutline
            className={`${styles.heart} fs-1 p-1 bg-dark rounded-circle`}
          />
          <HiOutlineChevronLeft className='position-absolute fs-3 top-50 start-0 text-dark' />
          <HiOutlineChevronRight className='position-absolute fs-3 top-50 end-0 text-dark' />
          <figure className='position-absolute bottom-0 w-100 d-flex justify-content-center gap-1 mb-1'>
            <TfiLayoutLineSolid />
            <TfiLayoutLineSolid />
            <TfiLayoutLineSolid />
          </figure>
          {product.discountPercentage > smallestPossibleDiscount ? (
            <span
              className={`${styles.deal} bg-danger badge rounded-1 ms-1 mb-5 fw-normal`}>
              Deal {Math.round(product.discountPercentage)}%
            </span>
          ) : null}
        </section>

        <Card.Body className='pb-0'>
          <section className={`${styles.titles}`}>
            <Link
              href={`/product-details/${product.id}`}
              className={styles.link}>
              <Card.Title className='fs-6'>{product.title}</Card.Title>
            </Link>
            <Card.Subtitle className={`${styles.brand}`}>
              {product.brand || '\u00A0'}
            </Card.Subtitle>
          </section>
          <figure className={`${styles.rating} d-flex gap-1 fs-5 my-1`}>
            <IoStar />
            <IoStar />
            <IoStar />
            <IoStarHalf />
            <IoStarOutline />
          </figure>
          <section className={`${styles.prices} fs-5 fw-semibold`}>
            {product.discountPercentage > smallestPossibleDiscount ? (
              <>
                <Card.Text className='text-danger'>
                  {(
                    product.price *
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}
                  $
                </Card.Text>
                <Card.Text className='text-decoration-line-through'>
                  {product.price}$
                </Card.Text>
              </>
            ) : (
              <Card.Text>{product.price}$</Card.Text>
            )}
          </section>
        </Card.Body>
      </Card>
    </>
  );
}
