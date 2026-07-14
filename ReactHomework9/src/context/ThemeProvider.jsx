import { useEffect, useState } from 'react'
import { ThemeContext } from './themeContext'

const storageKey = 'preferred-theme'
const colorSchemeMediaQuery = '(prefers-color-scheme: dark)'

const isTheme = (value) => value === 'light' || value === 'dark'

const getSystemTheme = () => {
  if (typeof window === 'undefined') {
    return 'light'
  }

  return window.matchMedia(colorSchemeMediaQuery).matches ? 'dark' : 'light'
}

const getStoredTheme = () => {
  if (typeof window === 'undefined') {
    return null
  }

  const storedTheme = window.localStorage.getItem(storageKey)
  return isTheme(storedTheme) ? storedTheme : null
}

function ThemeProvider({ children }) {
  const [selectedTheme, setSelectedTheme] = useState(() => getStoredTheme())
  const [systemTheme, setSystemTheme] = useState(() => getSystemTheme())
  const theme = selectedTheme ?? systemTheme

  useEffect(() => {
    const mediaQuery = window.matchMedia(colorSchemeMediaQuery)

    const updateSystemTheme = (event) => {
      setSystemTheme(event.matches ? 'dark' : 'light')
    }

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateSystemTheme)

      return () => {
        mediaQuery.removeEventListener('change', updateSystemTheme)
      }
    }

    mediaQuery.addListener(updateSystemTheme)

    return () => {
      mediaQuery.removeListener(updateSystemTheme)
    }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  }, [theme])

  useEffect(() => {
    if (selectedTheme) {
      window.localStorage.setItem(storageKey, selectedTheme)
      return
    }

    window.localStorage.removeItem(storageKey)
  }, [selectedTheme])

  const toggleTheme = () => {
    setSelectedTheme((currentTheme) => {
      const baseTheme = currentTheme ?? theme
      return baseTheme === 'dark' ? 'light' : 'dark'
    })
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        isUsingSystemTheme: selectedTheme === null,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider