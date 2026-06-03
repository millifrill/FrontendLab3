'use client';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

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
              <Offcanvas.Title>Filter</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Button variant='primary'>Apply Filter</Button>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
