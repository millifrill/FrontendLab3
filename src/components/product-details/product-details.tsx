'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { IoStar, IoStarOutline } from 'react-icons/io5';
import styles from './product-details.module.css';
import { Accordion, Alert, Button } from 'react-bootstrap';
import { useCart } from '@/context/cart.context';
import ProductInfo from '../product-info/product-info';
import MediaCarousel from '../media-carousel/media-carousel';

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
  const { addItem, recentlyAdded, clearRecentlyAdded } = useCart();
  const [product, setProduct] = useState<Product>();
  const smallestPossibleDiscount = 5;

  useEffect(() => {
    async function getProductById(): Promise<void> {
      const res = await axios.get<Product>(
        `https://dummyjson.com/products/${id}`,
      );
      setProduct(res.data);
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
            <MediaCarousel
              product={product}
              smallestPossibleDiscount={smallestPossibleDiscount}
            />
            <section className={`${styles.secondSection} ms-3 mt-2`}>
              <div>
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
          <section className={styles.thirdSection}>
            <Accordion alwaysOpen className={styles.accordion}>
              <Accordion.Item eventKey='0'>
                <Accordion.Header>Description</Accordion.Header>
                <Accordion.Body>
                  {' '}
                  <p className={styles.description}>{product.description}</p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey='1'>
                <Accordion.Header>Specifications</Accordion.Header>
                <Accordion.Body>
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
                    <strong>Warranty: </strong>
                    {product.warrantyInformation}
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey='2'>
                <Accordion.Header>Reviews</Accordion.Header>
                <Accordion.Body>
                  {product.reviews.map((review) => {
                    const emptyStars: number = 5 - review.rating;
                    const reviewDate = review.date.split('T');
                    return (
                      <div
                        key={`${review.date}-${review.reviewerName}-${review.comment}`}
                        className={styles.review}>
                        <p>
                          <strong>Date:</strong> {reviewDate[0]}
                        </p>
                        <p>
                          <strong>Reviewer:</strong> {review.reviewerName}
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
                            {Array.from({ length: emptyStars }, (_, i) => (
                              <IoStarOutline key={i} />
                            ))}
                          </figure>
                        </div>
                        <p>
                          <strong>Comment:</strong> {review.comment}
                        </p>
                      </div>
                    );
                  })}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </section>
        </article>
      )}
    </>
  );
}
