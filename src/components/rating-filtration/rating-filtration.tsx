import { Form } from 'react-bootstrap';
import { IoStar, IoStarOutline } from 'react-icons/io5';
import styles from '../filter-sidebar/filter-sidebar.module.css';

export default function RatingFiltration({ setSelectedRating }) {
  return (
    <>
      <p>Filter by rating</p>
      <Form>
        <div className='mb-3'>
          <Form.Check
            type='radio'
            name='rating'
            value='1'
            id='rating-1'
            label={
              <figure className={`${styles.rating} d-flex gap-1 my-2 fs-5`}>
                <IoStar />
                <IoStarOutline />
                <IoStarOutline />
                <IoStarOutline />
                <IoStarOutline />
              </figure>
            }
            onChange={(e) => setSelectedRating(Number(e.target.value))}
          />
          <Form.Check
            type='radio'
            name='rating'
            value='2'
            id='rating-2'
            label={
              <figure className={`${styles.rating} d-flex gap-1 my-2 fs-5`}>
                <IoStar />
                <IoStar />
                <IoStarOutline />
                <IoStarOutline />
                <IoStarOutline />
              </figure>
            }
            onChange={(e) => setSelectedRating(Number(e.target.value))}
          />
          <Form.Check
            type='radio'
            name='rating'
            value='3'
            id='rating-3'
            label={
              <figure className={`${styles.rating} d-flex gap-1 my-2 fs-5`}>
                <IoStar />
                <IoStar />
                <IoStar />
                <IoStarOutline />
                <IoStarOutline />
              </figure>
            }
            onChange={(e) => setSelectedRating(Number(e.target.value))}
          />
          <Form.Check
            type='radio'
            name='rating'
            value='4'
            id='rating-4'
            label={
              <figure className={`${styles.rating} d-flex gap-1 my-2 fs-5`}>
                <IoStar />
                <IoStar />
                <IoStar />
                <IoStar />
                <IoStarOutline />
              </figure>
            }
            onChange={(e) => setSelectedRating(Number(e.target.value))}
          />
          <Form.Check
            type='radio'
            name='rating'
            value='5'
            id='rating-5'
            label={
              <figure className={`${styles.rating} d-flex gap-1 my-2 fs-5`}>
                <IoStar />
                <IoStar />
                <IoStar />
                <IoStar />
                <IoStar />
              </figure>
            }
            onChange={(e) => setSelectedRating(Number(e.target.value))}
          />
        </div>
      </Form>
    </>
  );
}
