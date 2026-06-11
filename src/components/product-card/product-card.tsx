import Card from 'react-bootstrap/Card';
import ProductInfo from '../product-info/product-info';
import { IoHeartOutline } from 'react-icons/io5';
import { Carousel } from 'react-bootstrap';
import MediaCarousel from '../media-carousel';
import styles from '../media-carousel.module.css';

export default function ProductCard({ product, smallestPossibleDiscount }) {
  return (
    <>
      <Card className='shadow'>
        <MediaCarousel
          product={product}
          smallestPossibleDiscount={smallestPossibleDiscount}
        />
        <Card.Body className=''>
          <ProductInfo product={product} smallestPossibleDiscount={5} />
        </Card.Body>
      </Card>
    </>
  );
}
