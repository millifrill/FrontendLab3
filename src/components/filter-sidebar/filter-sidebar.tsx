'use client';

import { Accordion, Form } from 'react-bootstrap';
import { IoStar, IoStarOutline } from 'react-icons/io5';
import { RiMenuFoldLine } from 'react-icons/ri';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import SortProducts from '../sort-products/sort-products';
import CategoryFiltration from '../category-filtration/category-filtration';
import Brand from '../brand/brand';
import styles from './filter-sidebar.module.css';

export default function FilterSidebar({
  products,
  getProducts,
  selectedSortOption,
  setSelectedSortOption,
  getProductsBySortOption,
  selectedCategory,
  getProductsByCategory,
  setSelectedBrands,
  setSelectedCategory,
}) {
  return (
    <>
      <Navbar expand={false} className='bg-body-tertiary mb-3'>
        <Container fluid className={styles.filterContainer}>
          <Navbar.Toggle
            aria-label='Open filter'
            className={styles.filterToggle}>
            <div className={styles.filterBtn}>
              Filter
              <RiMenuFoldLine className={styles.filterIcon} />
            </div>
          </Navbar.Toggle>
          <Navbar.Offcanvas aria-labelledby='Filter' placement='end'>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <h2>Filter & Sort</h2>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Accordion alwaysOpen>
                <Accordion.Item eventKey='0' className={styles.accordionItem}>
                  <Accordion.Header as='h3'>Sort</Accordion.Header>
                  <Accordion.Body>
                    <SortProducts
                      setSelectedSortOption={setSelectedSortOption}
                    />
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey='1' className={styles.accordionItem}>
                  <Accordion.Header as='h3'>Price</Accordion.Header>
                  <Accordion.Body>
                    <Form.Label>Filter by price range</Form.Label>
                    <Form.Range />
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey='2' className={styles.accordionItem}>
                  <Accordion.Header as='h3' color='#562189'>
                    Category
                  </Accordion.Header>
                  <Accordion.Body>
                    <CategoryFiltration
                      setSelectedCategory={setSelectedCategory}
                    />
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey='3' className={styles.accordionItem}>
                  <Accordion.Header as='h3'>Rating</Accordion.Header>
                  <Accordion.Body>
                    <p>Filter by rating</p>
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

                <Accordion.Item eventKey='4' className={styles.accordionItem}>
                  <Accordion.Header as='h3'>Brand</Accordion.Header>
                  <Accordion.Body>
                    <p>Filter by brand</p>
                    <Brand
                      products={products}
                      setSelectedBrands={setSelectedBrands}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <div className={styles.buttons}>
                <Button
                  className={`mt-3 mx-auto d-block ${styles.resetFilterBtn}`}
                  variant='primary'
                  onClick={() => getProducts()}>
                  Reset Filter
                </Button>
                <Button
                  className={`mt-3 mx-auto d-block ${styles.applyFilterBtn}`}
                  variant='primary'
                  // onClick={() => getProductsByCategory(selectedCategory)}>
                  onClick={() => {
                    (getProductsByCategory(selectedCategory),
                      getProductsBySortOption(selectedSortOption));
                  }}>
                  Apply Filter
                </Button>
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
