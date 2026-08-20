import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import { IoGitCompareOutline } from 'react-icons/io5';
import ProductInfo from '../product-info/product-info';
import MediaCarousel from '../media-carousel/media-carousel';
import { useCompare } from '../../context/compare.context';
import styles from './product-card.module.css';

export default function ProductCard({ product, smallestPossibleDiscount }) {
  const { isComparing, toggleCompare } = useCompare();
  const comparing = isComparing(product.id);

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
      <button
        type='button'
        className={`${styles.compareBtn} ${comparing ? styles.compareBtnActive : ''}`}
        onClick={() => toggleCompare(product)}>
        <IoGitCompareOutline className={styles.compareIcon} />
        {comparing ? 'Comparing' : 'Compare'}
      </button>
    </Card>
  );
}
