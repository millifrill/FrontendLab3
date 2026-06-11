import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import ProductInfo from '../product-info/product-info';
import MediaCarousel from '../media-carousel';
import styles from './product-card.module.css';

export default function ProductCard({ product, smallestPossibleDiscount }) {
  return (
    <Card className={`${styles.card} shadow`}>
      <MediaCarousel
        product={product}
        smallestPossibleDiscount={smallestPossibleDiscount}
      />
      <Link href={`/product-details/${product.id}`} className={styles.link}>
        <Card.Body className=''>
          <ProductInfo product={product} smallestPossibleDiscount={5} />
        </Card.Body>
      </Link>
    </Card>
  );
}
