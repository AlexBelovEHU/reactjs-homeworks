import { useState, useCallback } from 'react';
import Navbar from './components/Navbar/Navbar';
import MenuSection from './components/MenuSection/MenuSection';
import Footer from './components/Footer/Footer';

function App() {
  const [cartCount, setCartCount] = useState(0);

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
