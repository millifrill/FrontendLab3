import styles from './footer.module.css';
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <img
        className={styles.brandLogo}
        alt="Brand logo"
        src="/images/brand-logo.png"
      />
      <p className={styles.p}>Home</p>
      <p className={styles.p}>About</p>
      <p className={styles.p}>Contacts</p>
      <p className={styles.p}>Legal</p>
      <p className={styles.copyright}>© 2026 Vesti. All rights reserved.</p>
      <img
        className={styles.facebookLogo}
        alt="Facebook"
        src="/images/facebook.png"
      />
      <img
        className={styles.twitterLogo}
        alt="Twitter"
        src="/images/twitter.png"
      />
      <img
        className={styles.youtubeLogo}
        alt="YouTube"
        src="/images/youtube.png"
      />
      <img
        className={styles.linkedinLogo}
        alt="LinkedIn"
        src="/images/linkedIn.png"
      />
    </footer>
  );
}
