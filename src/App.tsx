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
import SuccessModal from './components/SuccessModal';


interface CartItem {
  name: string;
  price: string;
}

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);

  const handleAddToCart = (name: string, price: string) => {
    const newItem = { name, price };
    setCartItems([...cartItems, newItem]);
    setLastAddedItem(newItem);
    setIsSuccessModalOpen(true); // Mostrar modal de éxito
    console.log('Producto agregado:', name, price);
  };

  const handleRemoveItem = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const goToCart = () => {
    setIsSuccessModalOpen(false);
    setIsCartOpen(true);
  };

  const continueShopping = () => {
    setIsSuccessModalOpen(false);
    // Scroll suave a la sección de productos
    const proyectosSection = document.getElementById('proyectos');
    if (proyectosSection) {
      proyectosSection.scrollIntoView({ behavior: 'smooth' });
    }
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
      
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={closeSuccessModal}
        onGoToCart={goToCart}
        onContinueShopping={continueShopping}
        productName={lastAddedItem?.name || ''}
      />
    </div>
  );
}

export default App;