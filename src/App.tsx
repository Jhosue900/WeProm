import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustedCompanies from './components/TrustedCompanies';
import Campaigns from './components/Campaigns';
import Projects from './components/Projects';
import Features from './components/Features';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import { CartItem } from './types';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (name: string, price: string) => {
    setCartItems([...cartItems, { name, price }]);
  };

  const handleRemoveItem = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={cartItems.length} onCartClick={toggleCart} />
      <Hero />
      <TrustedCompanies />
      <Campaigns />
      <Projects onAddToCart={handleAddToCart} />
      <Features />
      <Contact />
      <Footer />
      <CartModal
        isOpen={isCartOpen}
        onClose={toggleCart}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}

export default App;
