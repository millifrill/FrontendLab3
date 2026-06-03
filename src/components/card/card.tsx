import styles from './card.module.css';
import { IoHeartOutline } from 'react-icons/io5';
import { IoStar } from 'react-icons/io5';
import { IoStarHalf } from 'react-icons/io5';
import { IoStarOutline } from 'react-icons/io5';

function Card(props) {
  return (
    <article className={`${styles.container} border border-2 rounded-4`}>
      <section className="">
        <IoHeartOutline />
        <img
          className={`${styles.image} border-bottom`}
          src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
          alt="placeholderimg"></img>
      </section>
      <section className="ms-3 mt-2">
        <h2 className="fs-6 my-0">Mascara</h2>
        <p className={`${styles.brand} my-0 text-light`}>Gucci</p>
        <figure className={`${styles.rating} d-flex gap-1 mb-0`}>
          <IoStar />
          <IoStar />
          <IoStar />
          <IoStarHalf />
          <IoStarOutline />
        </figure>

        <p className="fs-6 my-0 fw-semibold">19,9$</p>
      </section>
    </article>
  );
}

export default Card;
