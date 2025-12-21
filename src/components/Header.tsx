import { useEffect, useState } from 'react';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';

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
      {/* Recuadro morado con contacto y búsqueda */}
      <div className={`fixed top-0 left-0 w-full bg-gradient-to-r from-purple-600 to-purple-700 z-[100] py-2.5 shadow-md transition-transform duration-300 ${
        showTopBar ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="container mx-auto px-4 flex flex-row justify-between items-center text-white">
          {/* Información de contacto con iconos */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a 
              href="tel:+11234567890"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity group"
              aria-label="Llamar al +1 (123) 456-7890"
              title="+1 (123) 456-7890"
            >
              <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
              </div>
              <span className="hidden md:inline text-sm font-medium">+1 (123) 456-7890</span>
            </a>
            
            <a 
              href="mailto:contacto@weprom.com"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity group"
              aria-label="Enviar email a contacto@weprom.com"
              title="contacto@weprom.com"
            >
              <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <span className="hidden md:inline text-sm font-medium">contacto@weprom.com</span>
            </a>
          </div>

          {/* Buscador mejorado */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="pl-3 pr-10 py-1.5 rounded-full text-sm text-gray-700 bg-white/95 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white w-[200px] sm:w-[240px] md:w-[320px] transition-all placeholder:text-gray-500"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-weprom-pink hover:bg-pink-600 text-white p-1.5 rounded-full transition-colors">
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recuadro blanco fijo */}
      <div className={`fixed left-0 w-full bg-white z-[90] shadow-md transition-all duration-300 ${
        showTopBar ? 'top-[46px]' : 'top-0'
      }`}>
        <header
          className={`w-full transition-all duration-500 ${
            isScrolled ? 'bg-white/95 backdrop-blur-md py-2' : 'bg-transparent py-3'
          }`}
        >
          <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
            {/* Logo */}
            <a href="#" className="text-xl sm:text-2xl font-bold text-weprom-dark flex items-center gap-2 group z-[110] hover-lift">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-weprom-pink to-purple-600 rounded-full flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <span className="text-white font-bold text-sm sm:text-base">W</span>
              </div>
              <span className="group-hover:text-weprom-pink transition-colors duration-300">WeProm</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6 xl:space-x-8 font-lg text-gray-800">
              {['Inicio', 'Campañas', 'Proyectos', 'Contacto'].map((item, i) => (
                <a key={i} href={`#${item.toLowerCase()}`} className="relative group text-sm xl:text-base shine-effect">
                  <span className="hover:text-weprom-pink transition-colors duration-300">{item}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-weprom-pink group-hover:w-full transition-all duration-300"></span>
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
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300 text-gray-700 hover:text-weprom-pink" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-weprom-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse font-semibold border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden hover:text-weprom-pink transition z-[110]"
                aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80] lg:hidden animate-fade-in modal-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <nav
        className={`fixed top-0 right-0 h-full w-64 sm:w-80 bg-white shadow-2xl z-[80] lg:hidden transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="pt-24 px-6 flex flex-col space-y-6">
          {['Inicio', 'Campañas', 'Proyectos', 'Contacto'].map((item, i) => (
            <a
              key={i}
              href={`#${item.toLowerCase()}`}
              onClick={handleNavClick}
              className="text-lg font-medium text-gray-800 hover:text-weprom-pink transition-colors duration-300 py-2 border-b border-gray-100 hover-lift"
            >
              {item}
            </a>
          ))}
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500">Carrito: {cartCount} items</p>
            <button
              onClick={() => {
                handleNavClick();
                handleCartButtonClick();
              }}
              className="mt-2 w-full bg-weprom-pink text-white py-2 rounded-lg font-semibold hover:bg-pink-600 transition-colors duration-300 hover-lift"
            >
              Ver Carrito
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}