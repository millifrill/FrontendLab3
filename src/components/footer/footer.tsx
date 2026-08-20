import Link from 'next/link';
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoYoutube,
  IoLogoLinkedin,
} from 'react-icons/io5';
import styles from './footer.module.css';
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.firstRow}>
        <div className={styles.brand}>
          <Link href='/'>
            <img
              className={styles.brandLogo}
              alt='Brand logo'
              src='/images/brand-logo.png'
            />
          </Link>
        </div>

        <div className={styles.link}>
          <Link href='/home'>Home</Link>
          <Link href='/about'>About</Link>
          <Link href='/contacts'>Contacts</Link>
          <Link href='/legal'>Legal</Link>
        </div>

        <div className={styles.socialMedia}>
          <a
            href='https://www.facebook.com/?locale=sv_SE'
            aria-label='Facebook'>
            <IoLogoFacebook className={styles.socialIcon} />
          </a>
          <a href='https://x.com/?lang=sv' aria-label='Twitter'>
            <IoLogoTwitter className={styles.socialIcon} />
          </a>
          <a href='https://www.youtube.com/' aria-label='YouTube'>
            <IoLogoYoutube className={styles.socialIcon} />
          </a>
          <a href='https://se.linkedin.com/' aria-label='LinkedIn'>
            <IoLogoLinkedin className={styles.socialIcon} />
          </a>
        </div>
        <p className={styles.copyright}>© 2026 Vesti. All rights reserved.</p>
      </div>
    </footer>
  );
}
