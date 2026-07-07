import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import logo from '../../assets/images/logo.svg'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <Link to="/">
            <img src={logo} alt="Logo" className={styles.footerLogo} />
          </Link>
          <p className={styles.description}>
            Takeaway &amp; Delivery template<br />for small - medium businesses.
          </p>
        </div>

        <div className={styles.col}>
          <div className={styles.heading}>Company</div>
          <Link to="/" className={styles.link}>Home</Link>
          <Link to="/order" className={styles.link}>Order</Link>
          <a href="/faq" className={styles.link}>FAQ</a>
          <a href="mailto:hello@website.com" className={styles.link}>Contact</a>
        </div>

        <div className={styles.col}>
          <div className={styles.heading}>Template</div>
          <a href="/template/styleguide" className={styles.link}>Style Guide</a>
          <a href="/template/changelog" className={styles.link}>Changelog</a>
          <a href="/template/licence" className={styles.link}>Licence</a>
          <a href="https://university.webflow.com/" target="_blank" rel="noreferrer" className={styles.link}>Webflow University</a>
        </div>

        <div className={styles.col}>
          <div className={styles.heading}>Flowbase</div>
          <a href="https://www.flowbase.co" className={styles.link}>More Cloneables</a>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.legal}>
          Built by <a href="https://www.flowbase.co" className={styles.accent}>Flowbase</a> · Powered by <a href="http://webflow.com/" className={styles.accent}>Webflow</a>
        </div>

        <div className={styles.socials}>
          <a href="#" aria-label="Instagram" className={styles.social}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </a>
          <a href="#" aria-label="Twitter" className={styles.social}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 7.5c-.6.3-1.2.5-1.9.6.7-.4 1.2-1 1.5-1.8-.7.5-1.5.8-2.4 1-1.3-1.3-3.5-1.1-4.8.4-1 .9-1.1 2.3-.4 3.3C9.5 11.6 7.3 10.6 5.9 9c-.9 1.5-.4 3.4 1 4.3-.5 0-1-.1-1.4-.4 0 1.5 1 2.8 2.5 3.1-.6.2-1.2.2-1.9.1.6 2 2.5 3.4 4.6 3.4-1.7 1.3-3.8 2-6 2-.4 0-.8 0-1.2-.1C6.9 21.5 9.5 22 12 22c7.3 0 11.3-6 11.3-11.2v-.5c.8-.6 1.5-1.3 2-2.1-.7.3-1.4.5-2.1.6z" stroke="currentColor" strokeWidth="0.6"/>
            </svg>
          </a>
          <a href="#" aria-label="YouTube" className={styles.social}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="6" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="1.2" />
              <path d="M10 9.5v5l4-2.5-4-2.5z" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
