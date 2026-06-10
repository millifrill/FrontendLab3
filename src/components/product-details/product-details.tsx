'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  IoHeartOutline,
  IoStar,
  IoStarHalf,
  IoStarOutline,
} from 'react-icons/io5';
import styles from './product-details.module.css';
import { Alert, Button, Tab, Tabs } from 'react-bootstrap';
import { useCart } from '@/context/cart.context';
import ProductInfo from '../product-info/product-info';

interface Product {
  id: number;
  images: string[];
  title: string;
  brand: string;
  price: number;
  rating: number;
  discountPercentage: number;
  color: string;
  size: string;
  weight: string;
  description: string;
  dimensions: { width: number; height: number; depth: number };
  warrantyInformation: string;
  reviews: {
    comment: string;
    date: string;
    rating: number;
    reviewerEmail: string;
    reviewerName: string;
  }[];
}

export default function ProductDetails({ id }) {
  console.log('id', id);
  const { addItem, recentlyAdded, clearRecentlyAdded } = useCart();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    async function getProductById(): Promise<void> {
      const res = await axios.get<Product>(
        `https://dummyjson.com/products/${id}`,
      );
      console.log('res', res);
      setProduct(res.data);
      console.log('Product', product);
    }
    getProductById();
  }, [id]);

  useEffect(() => {
    setTimeout(clearRecentlyAdded, 3000);
  }, [recentlyAdded]);

  return (
    <>
      {product && (
        <article className={styles.mainContainer}>
          <section className={styles.firstSection}>
            <section className={styles.media}>
              <img
                className={styles.image}
                src={product.images[0]}
                alt='placeholderimg'
              />
              <IoHeartOutline
                className={`${styles.heart} fs-1 p-1 bg-dark rounded-circle`}
              />
              <span
                className={`${styles.deal} bg-danger badge rounded-1 ms-1 fw-normal`}>
                Deal 10%
              </span>
            </section>
            <section className={`${styles.secondSection} ms-3 mt-2`}>
              <div>
                {/* <h2 className='fs-5 my-0'>{product.title}</h2>
                <p className={`${styles.brand} my-0`}>
                  {product.brand || '\u00A0'}
                </p>
                <figure className={`${styles.rating} d-flex gap-1 my-2 fs-5`}>
                  <IoStar />
                  <IoStar />
                  <IoStar />
                  <IoStarHalf />
                  <IoStarOutline />
                </figure>
                <section className={`${styles.prices} fs-5 my-0 fw-semibold`}>
                  <p className='text-danger'>
                    {(
                      product.price *
                      (1 - product.discountPercentage / 100)
                    ).toFixed(2)}
                    $
                  </p>
                  <p className='text-decoration-line-through'>
                    {product.price}$
                  </p>
                  <p>{product.price}$</p>
                </section> */}
                <ProductInfo product={product} smallestPossibleDiscount={5} />
              </div>
              <div className={styles.btns}>
                <Button
                  variant='primary'
                  onClick={() => {
                    addItem(product);
                  }}>
                  Add to cart
                </Button>
                <Button variant='success'>Buy now</Button>
                {recentlyAdded && (
                  <Alert
                    variant='success'
                    dismissible
                    onClose={clearRecentlyAdded}
                    className={styles.alert}>
                    <strong>{recentlyAdded}</strong> was added to your cart.
                  </Alert>
                )}
              </div>
            </section>
          </section>
          <section>
            <Tabs defaultActiveKey='description' className='my-3 text-dark'>
              <Tab
                eventKey='description'
                title='Description'
                className='text-dark m-4'>
                <p className={styles.description}>{product.description}</p>
              </Tab>
              <Tab
                eventKey='specifications'
                title='Specifications'
                className='text-dark m-4'>
                <p>
                  <strong>Width: </strong>
                  {product.dimensions.width} cm
                </p>
                <p>
                  <strong>Height: </strong>
                  {product.dimensions.height} cm
                </p>
                <p>
                  <strong>Depth: </strong>
                  {product.dimensions.depth} cm
                </p>
                <p>
                  <strong>Weight: </strong>
                  {product.weight} g
                </p>
                <p>
                  <strong>WarrantyInformation: </strong>
                  {product.warrantyInformation}
                </p>
              </Tab>
              <Tab eventKey='contact' title='Reviews' className='text-dark m-4'>
                {product.reviews.map((review) => (
                  <div
                    key={`${review.date}-${review.reviewerName}-${review.comment}`}
                    className={styles.review}>
                    <p>
                      <strong>Date:</strong> {review.date}
                    </p>
                    <div className={styles.reviewRating}>
                      <p>
                        <strong>Rating: </strong>
                      </p>
                      <figure
                        className={`${styles.rating} d-flex gap-1 m-1 fs-5`}>
                        {Array.from({ length: review.rating }, (_, i) => (
                          <IoStar key={i} />
                        ))}
                      </figure>
                    </div>
                    <p>
                      <strong>Comment:</strong> {review.comment}
                    </p>
                    <p>
                      <strong>Reviewer:</strong> {review.reviewerName}
                    </p>
                  </div>
                ))}
              </Tab>
            </Tabs>
          </section>
        </article>
      )}
    </>
  );
}
