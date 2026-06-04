import Link from "next/link";
import styles from './footer.module.css';
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <Link href="/">
        <img
          className={styles.brandLogo}
          alt='Brand logo'
          src='/images/brand-logo.png'
        />
        </Link>
      </div>

      <div className={styles.lingk}>
        <Link href="/home">
        <p>Home</p>
        </Link>
        <Link href="/about">
        <p>About</p>
        </Link>
        <Link href="/contacts">
        <p>Contacts</p>
        </Link>
         <Link href="/legal">
        <p>Legal</p>
        </Link>
      </div>

      <div className={styles.socialMedia}>
        <a href='https://www.facebook.com/?locale=sv_SE'>
          <img
            className={styles.facebookLogo}
            alt='Facebook'
            src='/images/facebook.png'
          />
        </a>
        <a href='https://x.com/?lang=sv'>
          <img
            className={styles.twitterLogo}
            alt='Twitter'
            src='/images/twitter.png'
          />
        </a>
        <a href='https://www.youtube.com/'>
          <img
            className={styles.youtubeLogo}
            alt='YouTube'
            src='/images/youtube.png'
          />
        </a>
        <a href='https://se.linkedin.com/'>
          <img
            className={styles.linkedinLogo}
            alt='LinkedIn'
            src='/images/linkedIn.png'
          />
        </a>
      </div>
      <div className={styles.copyrightString}>
        <p className={styles.copyright}>© 2026 Vesti. All rights reserved.</p>
      </div>
    </footer>
  );
}
