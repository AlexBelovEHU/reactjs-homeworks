import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logoutUser } from '../../features/auth/authSlice';
import styles from './Navbar.module.css';

const getNavLinkClassName = ({ isActive }) =>
  isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink;

const Navbar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const cartItems = useSelector((state) => state.order.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className={styles.navbar} id="Navigation" role="banner" data-animation="default" data-duration="400">
      <div className={styles.navigationContainer}>
        <div className={styles.navigationLeft}>
          <Link to="/" className={styles.brand}>
            <img
              src="https://cdn.prod.website-files.com/5e865e09d8efa3310676b585/5e865e09d8efa341ab76b5e7_Logo.svg"
              width="40"
              alt="Logo"
            />
          </Link>
        </div>

        <div className={styles.navigationRight}>
          <button className={styles.menuButton} aria-label="Toggle menu">
            <div className={styles.icon} />
          </button>

          <nav role="navigation" className={styles.navMenu}>
            <NavLink to="/" end className={getNavLinkClassName}>
              Home
            </NavLink>
            <NavLink to="/order" className={getNavLinkClassName}>
              Order
            </NavLink>
            <a href="/company" className={styles.navLink}>
              Company
            </a>
            <a href="/faq" className={styles.navLink}>
              FAQ
            </a>
            <a href="mailto:hello@website.com?subject=Hi" className={styles.navLink}>
              Contact
            </a>
          </nav>

          <div className={styles.authPanel}>
            {currentUser ? (
              <>
                <span className={styles.userLabel}>{currentUser.username}</span>
                <button
                  type="button"
                  className={styles.logoutButton}
                  onClick={() => dispatch(logoutUser())}
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" className={getNavLinkClassName}>
                Login
              </NavLink>
            )}
          </div>

          <div className={styles.cartWrapper}>
            <Link to="/order" className={styles.cartButton} role="button" aria-haspopup="dialog" aria-label="Open cart">
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
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
