import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import CallUs from './Components/CallUs/CallUs'
import useFetch from './hooks/useFetch'

const ORDERS_API_URL = 'https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/orders'

function App() {
  const { data: orders } = useFetch(ORDERS_API_URL)
  const cartCount = Array.isArray(orders) ? orders.length : 0

  return (
    <>
      <Navbar cartCount={cartCount} />
      <Header />
      <CallUs />
      <Footer />
    </>
  )
}

export default App
