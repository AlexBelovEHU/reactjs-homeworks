import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { LanguageDropdown } from '../LanguageDropdown/LanguageDropdown'
import { translations } from '../../localization/translations'
import styles from './Header.module.css'
import banner from '../../assets/images/homeBanner.png'
import trustpilot from '../../assets/images/trustpilotIcon.svg'

const Header = () => {
  const currentLanguage = useAppSelector((state) => state.language.currentLanguage)
  const copy = translations[currentLanguage]

  return (
    <section id="Header" className={styles.header}>
      <div className={styles.containerFlex}>
        <div className={styles.heroContent}>
          <div className={styles.heroTopRow}>
            <LanguageDropdown />
          </div>

          <h1 className={styles.heroH1}>
            {copy.header.titleLead}{' '}
            <span className={styles.brandSpan}>{copy.header.titleAccent}</span>{' '}
            {copy.header.titleTail}
          </h1>

          <p className={styles.heroParagraph}>
            {copy.header.description}
          </p>

          <div className={styles.buttonWrapper}>
            <Link to="/order" className={styles.button}>
              {copy.header.placeOrder}
            </Link>
          </div>

          <div className={styles.reviewWrap}>
            <img src={trustpilot} alt={copy.header.trustpilotAlt} className={styles.reviewLogo} />
            <div className={styles.reviewText}>
              <span className={styles.brandSpan}>{copy.header.ratingLead}</span>{' '}
              {copy.header.ratingTail}
            </div>
          </div>
        </div>

        <div className={styles.heroImageWrap}>
          <img src={banner} alt={copy.header.heroAlt} className={styles.heroImage} />
        </div>
      </div>
    </section>
  )
}

export default Header
