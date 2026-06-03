import styles from './card.module.css';
import { IoHeartOutline } from 'react-icons/io5';
import { IoStar } from 'react-icons/io5';
import { IoStarHalf } from 'react-icons/io5';
import { IoStarOutline } from 'react-icons/io5';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { TfiLayoutLineSolid } from 'react-icons/tfi';

export default function Card(props) {
  return (
    <article className={`${styles.container} border rounded-4 shadow`}>
      <section className={`${styles.media}`}>
        <img
          className={`${styles.image}`}
          src='https://cdn.dummyjson.com/product-images/groceries/cucumber/1.webp'
          alt='placeholderimg'></img>
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
        <span
          className={`${styles.deal} bg-danger badge rounded-1 ms-1 fw-normal`}>
          Deal 10%
        </span>
      </section>
      <section className='ms-3 mt-2'>
        <h2 className='fs-5 my-0'>Cucumber</h2>
        <p className={`${styles.brand} my-0`}>Lidl</p>
        <figure className={`${styles.rating} d-flex gap-1 my-2 fs-5`}>
          <IoStar />
          <IoStar />
          <IoStar />
          <IoStarHalf />
          <IoStarOutline />
        </figure>
        <section className='fs-5 my-0 fw-semibold'>
          <p className='text-danger'>9000$</p>
          <p className='text-decoration-line-through'>10000$</p>
          <p>10000$</p>
        </section>
      </section>
    </article>
  );
}
