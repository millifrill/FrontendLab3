'use client';
import { Accordion, Form } from 'react-bootstrap';
import { IoStar } from 'react-icons/io5';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styles from './filter-sidebar.module.css';

export default function FilterSidebar() {
  return (
    <>
      <Navbar expand={false} className='bg-body-tertiary mb-3'>
        <Container fluid>
          <Navbar.Toggle>
            <Navbar.Brand href='#'>Filter</Navbar.Brand>
          </Navbar.Toggle>
          <Navbar.Offcanvas aria-labelledby='Filter' placement='end'>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Filter & Sort</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Accordion alwaysOpen>
                <Accordion.Item eventKey='0'>
                  <Accordion.Header>Size</Accordion.Header>
                  <Accordion.Body>
                    <p>Sort by size</p>
                    <Form>
                      <div className='mb-3'>
                        <Form.Check type='checkbox' id='XXS' label='XXS' />
                        <Form.Check type='checkbox' id='XS' label='XS' />
                        <Form.Check type='checkbox' id='S' label='S' />
                        <Form.Check type='checkbox' id='M' label='M' />
                        <Form.Check type='checkbox' id='L' label='L' />
                        <Form.Check type='checkbox' id='XL' label='XL' />
                        <Form.Check type='checkbox' id='XXL' label='XXL' />
                      </div>
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
                    <p>Sort by category</p>
                    <Form>
                      <div className='mb-3'>
                        <Form.Check
                          type='checkbox'
                          id='category'
                          label='Category'
                        />
                      </div>
                    </Form>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='3'>
                  <Accordion.Header>Color</Accordion.Header>
                  <Accordion.Body>
                    <p>Sort by color</p>
                    <div className='mb-3'>
                      <button className={styles.black}></button>
                      <button className={styles.white}></button>
                      <button className={styles.yellow}></button>
                      <button className={styles.green}></button>
                      <button className={styles.blue}></button>
                      <button className={styles.purple}></button>
                      <button className={styles.pink}></button>
                      <button className={styles.brown}></button>
                      <button className={styles.beige}></button>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='4'>
                  <Accordion.Header>Rating</Accordion.Header>
                  <Accordion.Body>
                    <p>Sort by rating</p>
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
              </Accordion>
              <Button
                className={`mt-3 mx-auto d-block ${styles.applyFilterBtn}`}
                variant='primary'>
                Apply Filter
              </Button>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
