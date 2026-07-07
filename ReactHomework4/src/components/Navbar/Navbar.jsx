import { useState } from 'react';
import styles from './Navbar.module.css';
import logo from '../../assets/images/logo.svg';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Order', href: '/order' },
  { label: 'Company', href: '/company' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: 'mailto:hello@website.com?subject=Hi' },
];

const Navbar = ({ cartCount = 0 }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.navbar} role="banner">
      <div className={styles.navigationContainer}>
        <div className={styles.navigationLeft}>
          <a href="/" className={styles.brand}>
            <img src={logo} width="40" alt="Logo" />
          </a>
        </div>

        <div className={styles.navigationRight}>
          <button
            className={styles.menuButton}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <div className={styles.icon} />
          </button>

          <nav
            role="navigation"
            className={`${styles.navMenu} ${menuOpen ? styles.navMenuOpen : ''}`}
          >
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className={styles.cartWrapper}>
            <a
              href="#"
              className={styles.cartButton}
              role="button"
              aria-haspopup="dialog"
              aria-label="Open cart"
            >
              <svg
                className={styles.cartIcon}
                width="17"
                height="17"
                viewBox="0 0 17 17"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <path
                    d="M2.60592789,2 L0,2 L0,0 L4.39407211,0 L4.84288393,4 L16,4 L16,9.93844589 L3.76940945,12.3694378 L2.60592789,2 Z M15.5,17 C14.6715729,17 14,16.3284271 14,15.5 C14,14.6715729 14.6715729,14 15.5,14 C16.3284271,14 17,14.6715729 17,15.5 C17,16.3284271 16.3284271,17 15.5,17 Z M5.5,17 C4.67157288,17 4,16.3284271 4,15.5 C4,14.6715729 4.67157288,14 5.5,14 C6.32842712,14 7,14.6715729 7,15.5 C7,16.3284271 6.32842712,17 5.5,17 Z"
                    fill="currentColor"
                    fillRule="nonzero"
                  />
                </g>
              </svg>
              <div className={styles.cartQuantity}>{cartCount}</div>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
