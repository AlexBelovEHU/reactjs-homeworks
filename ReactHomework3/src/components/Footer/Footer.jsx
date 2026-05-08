import styles from './Footer.module.css';
import logo from '../../assets/images/logo.svg';
import instagramIcon from '../../assets/images/social-instagram.png';
import twitterIcon from '../../assets/images/social-twitter.png';
import youtubeIcon from '../../assets/images/social-youtube.png';
import { FOOTER_COLUMNS, FOOTER_SOCIALS, FOOTER_LEGAL } from '../../config/footer';

const SOCIAL_ICONS = {
  instagram: instagramIcon,
  twitter: twitterIcon,
  youtube: youtubeIcon,
};

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <img src={logo} alt="Logo" className={styles.footerLogo} />
          <p className={styles.description}>
            Takeaway &amp; Delivery template
            <br />
            for small - medium businesses.
          </p>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title} className={styles.col}>
            <div className={styles.heading}>{column.title}</div>
            {column.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={styles.link}
                {...(link.external
                  ? { target: '_blank', rel: 'noreferrer' }
                  : {})}
              >
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.legal}>
          Built by{' '}
          <a
            href={FOOTER_LEGAL.builtBy.href}
            target="_blank"
            rel="noreferrer"
            className={styles.accent}
          >
            {FOOTER_LEGAL.builtBy.label}
          </a>{' '}
          &middot; Powered by{' '}
          <a
            href={FOOTER_LEGAL.poweredBy.href}
            target="_blank"
            rel="noreferrer"
            className={styles.accent}
          >
            {FOOTER_LEGAL.poweredBy.label}
          </a>
        </div>

        <div className={styles.socials}>
          {FOOTER_SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className={styles.social}
            >
              <img
                src={SOCIAL_ICONS[social.icon]}
                alt={social.label}
                className={styles.socialIcon}
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
