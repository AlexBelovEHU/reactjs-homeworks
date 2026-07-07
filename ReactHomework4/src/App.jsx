import { useState, useCallback, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import MenuSection from './components/MenuSection/MenuSection';
import Footer from './components/Footer/Footer';

const ORDERS_API_URL = 'https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/orders';

function App() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadOrders = async () => {
      try {
        const response = await fetch(ORDERS_API_URL, { signal: controller.signal });

        if (!response.ok) {
          throw new Error('Failed to load orders');
        }

        const orders = await response.json();

        if (!controller.signal.aborted) {
          setCartCount(Array.isArray(orders) ? orders.length : 0);
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          setCartCount(0);
        }
      }
    };

    loadOrders();

    return () => controller.abort();
  }, []);

  const handleAddToCart = useCallback(() => {
    setCartCount((prev) => prev + 1);
  }, []);

  return (
    <>
      <Navbar cartCount={cartCount} />
      <MenuSection onAddToCart={handleAddToCart} />
      <Footer />
    </>
  );
}

export default App;
