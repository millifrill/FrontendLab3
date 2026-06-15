'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Accordion, Form } from 'react-bootstrap';
import { IoStar, IoStarOutline } from 'react-icons/io5';
import { RiMenuFoldLine } from 'react-icons/ri';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CategoryFiltration from '../category-filtration/category-filtration';
import Brand from '../brand/brand';
import styles from './filter-sidebar.module.css';

export default function FilterSidebar({
  products,
  getProductsByCategory,
  setSortBy,
  setOrder,
}) {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [tempSortBy, setTempSortBy] = useState('');
  const [tempOrder, setTempOrder] = useState('');

  useEffect(() => {
    async function getCategoryList(): Promise<void> {
      const res = await axios.get<string[]>(
        'https://dummyjson.com/products/category-list',
      );
      setCategories(res.data);
    }
    getCategoryList();
  }, []);

  return (
    <>
      <Navbar expand={false} className='bg-body-tertiary mb-3'>
        <Container fluid className={styles.filterContainer}>
          <Navbar.Toggle className={styles.filterToggle}>
            <div className={styles.filterBtn}>
              Filter
              <RiMenuFoldLine className={styles.filterIcon} />
            </div>
          </Navbar.Toggle>
          <Navbar.Offcanvas aria-labelledby='Filter' placement='end'>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Filter & Sort</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Accordion alwaysOpen>
                <Accordion.Item eventKey='0'>
                  <Accordion.Header>Sort</Accordion.Header>
                  <Accordion.Body>
                    <Form>
                      <Form.Check
                        type='radio'
                        name='sort'
                        id='most-relevant'
                        label='Most relevant'
                        onChange={() => {
                          setTempSortBy('');
                          setTempOrder('');
                        }}
                      />
                      <Form.Check
                        type='radio'
                        name='sort'
                        id='best-selling'
                        label='Best selling'
                        onChange={() => {
                          setTempSortBy('stock');
                          setTempOrder('asc');
                        }}
                      />
                      <Form.Check
                        type='radio'
                        name='sort'
                        id='from-cheepest'
                        label='Price: Low to High'
                        onChange={() => {
                          setTempSortBy('price');
                          setTempOrder('asc');
                        }}
                      />
                      <Form.Check
                        type='radio'
                        name='sort'
                        id='high-to-Low'
                        label='Price: High to Low'
                        onChange={() => {
                          setTempSortBy('price');
                          setTempOrder('desc');
                        }}
                      />
                      <Form.Check
                        type='radio'
                        name='sort'
                        id='highest-rated'
                        label='Highest rated'
                        onChange={() => {
                          setTempSortBy('rating');
                          setTempOrder('desc');
                        }}
                      />
                      <Form.Check
                        type='radio'
                        name='sort'
                        id='newest'
                        label='Newest'
                        onChange={() => {
                          setTempSortBy('id');
                          setTempOrder('desc');
                        }}
                      />
                    </Form>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='1'>
                  <Accordion.Header>Price</Accordion.Header>
                  <Accordion.Body>
                    <Form.Label>Sort by price range</Form.Label>
                    <Form.Range />
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey='2'>
                  <Accordion.Header>Category</Accordion.Header>
                  <Accordion.Body>
                    <CategoryFiltration
                      categories={categories}
                      setCategory={setCategories}
                      setSelectedCategory={setSelectedCategory}
                    />
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey='3'>
                  <Accordion.Header>Rating</Accordion.Header>
                  <Accordion.Body>
                    <p>Sort by rating</p>
                    <figure
                      className={`${styles.rating} d-flex gap-1 my-2 fs-5`}>
                      <IoStar />
                      <IoStarOutline />
                      <IoStarOutline />
                      <IoStarOutline />
                      <IoStarOutline />
                    </figure>
                    <figure
                      className={`${styles.rating} d-flex gap-1 my-2 fs-5`}>
                      <IoStar />
                      <IoStar />
                      <IoStarOutline />
                      <IoStarOutline />
                      <IoStarOutline />
                    </figure>
                    <figure
                      className={`${styles.rating} d-flex gap-1 my-2 fs-5`}>
                      <IoStar />
                      <IoStar />
                      <IoStar />
                      <IoStarOutline />
                      <IoStarOutline />
                    </figure>
                    <figure
                      className={`${styles.rating} d-flex gap-1 my-2 fs-5`}>
                      <IoStar />
                      <IoStar />
                      <IoStar />
                      <IoStar />
                      <IoStarOutline />
                    </figure>
                    <figure
                      className={`${styles.rating} d-flex gap-1 my-2 fs-5`}>
                      <IoStar />
                      <IoStar />
                      <IoStar />
                      <IoStar />
                      <IoStar />
                    </figure>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='4'>
                  <Accordion.Header>Brand</Accordion.Header>
                  <Accordion.Body>
                    <p>Sort by brand</p>
                    <Brand products={products} />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Button
                className={`mt-3 mx-auto d-block ${styles.applyFilterBtn}`}
                variant='primary'
                onClick={() => {
                  if (selectedCategory) {
                    getProductsByCategory(selectedCategory);
                  }
                  if (tempSortBy) {
                    setSortBy(tempSortBy);
                    setOrder(tempOrder);
                  }
                }}>
                Apply Filter
              </Button>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
