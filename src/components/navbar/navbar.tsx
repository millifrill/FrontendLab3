'use client';

import Image from 'next/image';
import Navbar from 'react-bootstrap/Navbar';
import { Badge, Container, Nav } from 'react-bootstrap';
import { IoMdMoon } from 'react-icons/io';
import { IoCartSharp, IoHeartSharp, IoPersonSharp } from 'react-icons/io5';
import { RxHamburgerMenu } from 'react-icons/rx';
import styles from './navbar.module.css';
import logo from '../../assets/vesti-logo.svg';
import { useCart } from '../cart/cart.context';

export default function Navigationbar() {
  const { totalCount } = useCart();

  return (
    <Navbar collapseOnSelect expand='md' className={styles.navbar} sticky='top'>
      <Container>
        <Navbar.Brand href='/'>
          <Image
            src={logo}
            width={100}
            height={40}
            alt='vesti-logo'
            className={styles.brandIcon}
          />
        </Navbar.Brand>
        <Navbar.Toggle className={styles.toggler}>
          <RxHamburgerMenu className={styles.menuIcon} />
        </Navbar.Toggle>
        <Navbar.Collapse
          id='responsive-navbar-nav'
          className={styles.navbarItems}>
          <Nav className={styles.navItems}>
            <Nav.Link href='/wishlist' className={styles.navLink}>
              <IoHeartSharp className={styles.icon} />
              <Badge bg='dark' className={styles.wishlistBadge}>
                8
              </Badge>
              Wishlist
            </Nav.Link>
            <Nav.Link href='/cart' className={styles.navLink}>
              <IoCartSharp className={styles.icon} />
              <Badge bg='dark' className={styles.cartBadge}>
                {totalCount}
              </Badge>
              Cart
            </Nav.Link>
            <Nav.Link href='/account' className={styles.navLink}>
              <IoPersonSharp className={styles.icon} />
              Account
            </Nav.Link>
            <Nav.Link>
              <button className={styles.btn}>
                <IoMdMoon className={styles.icon} />
                <span className={styles.navLink}>Dark</span>
              </button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
