import Card from 'react-bootstrap/Card';
import ProductInfo from '../product-info/product-info';
import MediaCarousel from '../media-carousel';

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
