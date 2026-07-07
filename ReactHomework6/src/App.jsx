import React, { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import LoginForm from './Components/LoginForm/LoginForm'
import ProtectedRoute from './Components/ProtectedRoute'
import OrderPage from './Components/OrderPage/OrderPage'
import { saveLoggedUserToFirebase } from './firebase/saveLoggedUserToFirebase'
import './App.css'

const AUTH_STORAGE_KEY = 'react-homework6.auth-user'

const readStoredUser = () => {
  try {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY)
    return storedUser ? JSON.parse(storedUser) : null
  } catch {
    return null
  }
}

function App() {
  const [currentUser, setCurrentUser] = useState(readStoredUser)

  const handleLogin = async ({ username, password }) => {
    const normalizedUserName = username.trim()
    const normalizedPassword = password.trim()

    if (!normalizedUserName || !normalizedPassword) {
      return {
        ok: false,
        message: 'User name and password are required.',
      }
    }

    const nextUser = {
      username: normalizedUserName,
      loggedInAt: new Date().toISOString(),
    }

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser))
    setCurrentUser(nextUser)

    const saveResult = await saveLoggedUserToFirebase(nextUser)

    if (!saveResult.saved && saveResult.reason === 'missing-config') {
      return {
        ok: true,
        message:
          'Logged in locally. Add Firebase env values to persist users remotely.',
      }
    }

    if (!saveResult.saved) {
      return {
        ok: true,
        message: 'Logged in, but Firebase save did not complete.',
      }
    }

    return {
      ok: true,
      message: 'Login successful.',
    }
  }

  const handleLogout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    setCurrentUser(null)
  }

  return (
    <BrowserRouter>
      <div className="appShell">
        <Navbar currentUser={currentUser} onLogout={handleLogout} />

        <main className="appMain">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route
              path="/login"
              element={
                <LoginForm currentUser={currentUser} onLogin={handleLogin} />
              }
            />
            <Route
              path="/order"
              element={
                <ProtectedRoute currentUser={currentUser}>
                  <OrderPage currentUser={currentUser} />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                <Navigate
                  to={currentUser ? '/order' : '/login'}
                  replace
                />
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
