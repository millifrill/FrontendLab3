'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from 'react-bootstrap/Navbar';
import { Badge, Container, Nav } from 'react-bootstrap';
import { IoMdMoon } from 'react-icons/io';
import { IoCartSharp, IoHeartSharp, IoPersonSharp } from 'react-icons/io5';
import { RxHamburgerMenu } from 'react-icons/rx';
import styles from './navbar.module.css';
import logo from '../../assets/vesti-logo.svg';
import { useCart } from '../../context/cart.context';

export default function Navigationbar() {
  const { totalCount } = useCart();

  return (
    <Navbar collapseOnSelect expand='md' className={styles.navbar} sticky='top'>
      <Container>
        <Link href='/'>
          <Image
            src={logo}
            width={100}
            height={40}
            alt='vesti-logo'
            className={styles.brandIcon}
          />
        </Link>
        <Navbar.Toggle className={styles.toggler}>
          <RxHamburgerMenu className={styles.menuIcon} />
        </Navbar.Toggle>
        <Navbar.Collapse
          id='responsive-navbar-nav'
          className={styles.navbarItems}>
          <Nav className={styles.navItems}>
            <Link href='/wishlist' className={styles.navLink}>
              <IoHeartSharp className={styles.icon} />
              <Badge bg='dark' className={styles.wishlistBadge}>
                8
              </Badge>
              Wishlist
            </Link>
            <Link href='/cart' className={styles.navLink}>
              <IoCartSharp className={styles.icon} />
              <Badge bg='dark' className={styles.cartBadge}>
                {totalCount}
              </Badge>
              Cart
            </Link>
            <Link href='/account' className={styles.navLink}>
              <IoPersonSharp className={styles.icon} />
              Account
            </Link>
            <Nav.Link className={styles.navLink}>
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
