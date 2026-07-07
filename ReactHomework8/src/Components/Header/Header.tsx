import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import banner from '../../assets/images/homeBanner.png'
import trustpilot from '../../assets/images/trustpilotIcon.svg'

const Header = () => {
  return (
    <section id="Header" className={styles.header}>
      <div className={styles.containerFlex}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroH1}>
            Beautiful food &amp; takeaway, <span className={styles.brandSpan}>delivered</span> to your door.
          </h1>

          <p className={styles.heroParagraph}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500.
          </p>

          <div className={styles.buttonWrapper}>
            <Link to="/order" className={styles.button}>
              Place an Order
            </Link>
          </div>

          <div className={styles.reviewWrap}>
            <img src={trustpilot} alt="Trustpilot" className={styles.reviewLogo} />
            <div className={styles.reviewText}>
              <span className={styles.brandSpan}>4.8 out of 5</span> based on 2000+ reviews
            </div>
          </div>
        </div>

        <div className={styles.heroImageWrap}>
          <img src={banner} alt="Food Delivery" className={styles.heroImage} />
        </div>
      </div>
    </section>
  )
}

export default Header
