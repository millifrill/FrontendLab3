import styles from './card.module.css';
import { IoHeartOutline } from 'react-icons/io5';
import { IoStar } from 'react-icons/io5';
import { IoStarHalf } from 'react-icons/io5';
import { IoStarOutline } from 'react-icons/io5';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { TfiLayoutLineSolid } from 'react-icons/tfi';

function Card(props) {
  return (
    <article className={`${styles.container} border border-2 rounded-4`}>
      <section className={`${styles.media}`}>
        <img
          className={`${styles.image} bg-light`}
          src="https://cdn.dummyjson.com/product-images/groceries/cucumber/1.webp"
          alt="placeholderimg"></img>
        <IoHeartOutline
          className={`${styles.heart} fs-1 p-1 bg-dark bg-opacity-50 rounded-circle`}
        />
        <HiOutlineChevronLeft className="position-absolute fs-3 top-50 start-0 text-dark" />
        <HiOutlineChevronRight className="position-absolute fs-3 top-50 end-0 text-dark" />
        <figure className="position-absolute bottom-0 w-100 d-flex justify-content-center gap-1">
          <TfiLayoutLineSolid />
          <TfiLayoutLineSolid />
          <TfiLayoutLineSolid />
        </figure>
      </section>
      <section className="ms-3 mt-2">
        <h2 className="fs-5 my-0">Cucumber</h2>
        <p className={`${styles.brand} my-0 text-light`}>Lidl</p>
        <figure className={`${styles.rating} d-flex gap-1 my-1 fs-5`}>
          <IoStar />
          <IoStar />
          <IoStar />
          <IoStarHalf />
          <IoStarOutline />
        </figure>
        <p className="fs-5 my-0 fw-semibold">10000$</p>
      </section>
    </article>
  );
}

export default Card;
