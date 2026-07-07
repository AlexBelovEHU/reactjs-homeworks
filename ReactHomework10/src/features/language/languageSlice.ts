import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { defaultLanguage, type LanguageCode, supportedLanguages } from '../../localization/translations'

const LANGUAGE_STORAGE_KEY = 'react-homework10.language'

interface LanguageState {
  currentLanguage: LanguageCode
}

const readStoredLanguage = (): LanguageCode => {
  const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY)

  if (storedLanguage && supportedLanguages.includes(storedLanguage as LanguageCode)) {
    return storedLanguage as LanguageCode
  }

  return defaultLanguage
}

const initialState: LanguageState = {
  currentLanguage: readStoredLanguage(),
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<LanguageCode>) {
      state.currentLanguage = action.payload
      localStorage.setItem(LANGUAGE_STORAGE_KEY, action.payload)
    },
  },
})

export const { setLanguage } = languageSlice.actions

export default languageSlice.reducer