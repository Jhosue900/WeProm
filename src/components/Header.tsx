import { useEffect, useState } from 'react';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import Logo from '../logo.jpg'

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Header({ cartCount, onCartClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartAnimation, setCartAnimation] = useState('');
  const [showTopBar, setShowTopBar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      setShowTopBar(scrollPosition < 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efecto de animación cuando cambia el carrito
  useEffect(() => {
    if (cartCount > 0) {
      setCartAnimation('cart-bounce');
      const timer = setTimeout(() => setCartAnimation(''), 800);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleCartButtonClick = () => {
    console.log('Carrito clickeado, items:', cartCount);
    onCartClick();
  };

  return (
    <>
      {/* Top Bar con gradiente sutil */}
      <div className={`fixed top-0 left-0 w-full bg-gradient-to-r from-weprom-dark via-weprom-dark-gray to-weprom-dark z-[100] py-2.5 shadow-lg border-b border-weprom-gray-800 transition-transform duration-300 ${
        showTopBar ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="container mx-auto px-4 flex flex-row justify-between items-center text-weprom-white">
          {/* Información de contacto con iconos */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a 
              href="tel:+11234567890"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity group"
              aria-label="Llamar al +1 (123) 456-7890"
              title="+1 (123) 456-7890"
            >
              <div className="bg-weprom-gray-900 p-2 rounded-full group-hover:bg-weprom-gray-800 transition-colors border border-weprom-gray-800">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
              </div>
              <span className="hidden md:inline text-sm font-light text-weprom-gray-300">+1 (123) 456-7890</span>
            </a>
            
            <a 
              href="mailto:contacto@weprom.com"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity group"
              aria-label="Enviar email a contacto@weprom.com"
              title="contacto@weprom.com"
            >
              <div className="bg-weprom-gray-900 p-2 rounded-full group-hover:bg-weprom-gray-800 transition-colors border border-weprom-gray-800">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <span className="hidden md:inline text-sm font-light text-weprom-gray-300">contacto@weprom.com</span>
            </a>
          </div>

          {/* Buscador minimalista */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="pl-3 pr-10 py-1.5 rounded-full text-sm text-weprom-gray-900 bg-weprom-gray-100 focus:outline-none focus:ring-2 focus:ring-weprom-red focus:bg-weprom-white w-[200px] sm:w-[240px] md:w-[320px] transition-all placeholder:text-weprom-gray-500 font-light border border-weprom-gray-300"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-gradient-to-r from-weprom-red to-weprom-yellow hover:from-weprom-red/90 hover:to-weprom-yellow/90 text-weprom-white p-1.5 rounded-full transition-all duration-300">
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Header principal con Dark Effect */}
      <div className={`fixed left-0 w-full bg-gradient-dark z-[90] shadow-lg border-b border-weprom-gray-800 transition-all duration-300 ${
        showTopBar ? 'top-[46px]' : 'top-0'
      }`}>
        <header
          className={`w-full transition-all duration-500 ${
            isScrolled ? 'bg-gradient-dark/95 backdrop-blur-md py-2' : 'bg-transparent py-3'
          }`}
        >
          <div className="container mx-auto px-5 sm:px-9 py-2 flex justify-between items-center">
            {/* Logo con imagen */}
            <a href="#" className="flex items-center gap-2 group z-[110] hover-lift">
              {/* Logo image */}
              <div className="relative">
                <img 
                  src={Logo} 
                  alt="WeProm Marketing Logo" 
                  className="h-10 w-36 sm:h-12 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
                  
                />
              </div>
            </a>

            {/* Desktop Navigation con colores de marca */}
            <nav className="hidden lg:flex space-x-6 xl:space-x-8 font-lg">
              {[
                { name: 'Inicio', color: 'red' },
                { name: 'Campañas', color: 'blue' },
                { name: 'Proyectos', color: 'green' },
                { name: 'Contacto', color: 'yellow' }
              ].map((item, i) => (
                <a key={i} href={`#${item.name.toLowerCase()}`} className="relative group text-sm xl:text-base font-medium">
                  <span className={`text-weprom-gray-300 hover:text-weprom-${item.color} transition-colors duration-300`}>
                    {item.name}
                  </span>
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-weprom-${item.color} to-weprom-${item.color}/50 group-hover:w-full transition-all duration-300`}></span>
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                onClick={handleCartButtonClick}
                className={`relative transition-all duration-300 group z-[110] ${cartAnimation}`}
                aria-label={`Carrito de compras (${cartCount} items)`}
              >
                <div className="p-2 rounded-full bg-weprom-dark-gray border border-weprom-gray-800 group-hover:border-weprom-red transition-colors duration-300">
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 text-weprom-gray-400 group-hover:text-weprom-red group-hover:scale-110" />
                </div>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-weprom-red to-weprom-yellow text-weprom-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse font-semibold border-2 border-weprom-dark">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-full bg-weprom-dark-gray border border-weprom-gray-800 hover:border-weprom-red transition-colors z-[110]"
                aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 text-weprom-red" /> : <Menu className="w-5 h-5 text-weprom-gray-400" />}
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-weprom-black/80 backdrop-blur-sm z-[80] lg:hidden animate-fade-in modal-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu con Dark Effect */}
      <nav
        className={`fixed top-0 right-0 h-full w-64 sm:w-80 bg-gradient-dark shadow-xl z-[80] lg:hidden transform transition-transform duration-300 border-l border-weprom-gray-800 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="pt-24 px-6 flex flex-col space-y-6">
          {/* Logo en mobile menu */}
          <div className="flex justify-center mb-4">
            <a href="#" onClick={handleNavClick}>
              <img 
                src={Logo}
                alt="WeProm Marketing Logo" 
                className="h-12 w-auto"
                
              />
            </a>
          </div>
          
          {[
            { name: 'Inicio', color: 'red' },
            { name: 'Campañas', color: 'blue' },
            { name: 'Proyectos', color: 'green' },
            { name: 'Contacto', color: 'yellow' }
          ].map((item, i) => (
            <a
              key={i}
              href={`#${item.name.toLowerCase()}`}
              onClick={handleNavClick}
              className={`text-lg font-semibold text-weprom-gray-300 hover:text-weprom-${item.color} transition-colors duration-300 py-2 border-b border-weprom-gray-800 hover-lift group`}
            >
              {item.name}
              <span className={`block h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-weprom-${item.color} to-transparent transition-all duration-300 mt-1`}></span>
            </a>
          ))}
          <div className="pt-4 border-t border-weprom-gray-800">
            <p className="text-sm text-weprom-gray-500 font-light">Carrito: {cartCount} items</p>
            <button
              onClick={() => {
                handleNavClick();
                handleCartButtonClick();
              }}
              className="mt-2 w-full bg-gradient-to-r from-weprom-red to-weprom-yellow text-weprom-white py-2 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 hover-lift shadow-lg"
            >
              Ver Carrito
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}