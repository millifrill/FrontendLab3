import styles from './product-card.module.css';
import Card from 'react-bootstrap/Card';
import ProductInfo from '../product-info/product-info';
import { IoHeartOutline } from 'react-icons/io5';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { TfiLayoutLineSolid } from 'react-icons/tfi';

export default function ProductCard({ product, smallestPossibleDiscount }) {
  return (
    <>
      <Card className='shadow'>
        <section className={`${styles.media}`}>
          <Card.Img
            className={`${styles.image}`}
            src={product.images[0]}
            alt={product.title}
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
        <Card.Body className=''>
          <ProductInfo product={product} smallestPossibleDiscount={5} />
        </Card.Body>
      </Card>
    </>
  );
}
