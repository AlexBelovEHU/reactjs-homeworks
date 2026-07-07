import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import HomePage from './Components/HomePage/HomePage'
import LoginForm from './Components/LoginForm/LoginForm'
import OrderPage from './Components/OrderPage/OrderPage'
import ProtectedRoute from './Components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="appShell">
        <Navbar />

        <main className="appMain">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/order"
              element={
                <ProtectedRoute>
                  <OrderPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
