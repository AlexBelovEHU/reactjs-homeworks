import { type ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setLanguage } from '../../features/language/languageSlice'
import { supportedLanguages, translations, type LanguageCode } from '../../localization/translations'
import styles from './LanguageDropdown.module.css'

export const LanguageDropdown = () => {
  const dispatch = useAppDispatch()
  const currentLanguage = useAppSelector((state) => state.language.currentLanguage)
  const copy = translations[currentLanguage]

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLanguage(event.target.value as LanguageCode))
  }

  return (
    <label className={styles.wrapper}>
      <span className={styles.label}>{copy.language.label}</span>
      <select
        className={styles.select}
        value={currentLanguage}
        onChange={handleLanguageChange}
      >
        {supportedLanguages.map((languageCode) => (
          <option key={languageCode} value={languageCode}>
            {copy.language.options[languageCode]}
          </option>
        ))}
      </select>
    </label>
  )
}