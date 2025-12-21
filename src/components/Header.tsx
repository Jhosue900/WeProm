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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
      <div className="fixed top-0 left-0 w-full bg-purple-600 z-[100] py-2">
        <div className="container mx-auto px-4 flex flex-row sm:flex-row justify-between items-center text-white">
          {/* Información de contacto */}
          <div className="flex flex-wrap sm:flex-nowrap justify-between sm:space-x-6 text-xs sm:text-sm w-full sm:w-auto">
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
              <span>📧</span>
              <span>contacto@weprom.com</span>
            </div>
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
              <span>📞</span>
              <span>+1 (123) 456-7890</span>
            </div>
          </div>

          {/* Mini buscador */}
          <div className="flex sm:flex-row items-center space-x-2 w-full sm:w-auto mt-2 sm:mt-0">
            <input
              type="text"
              placeholder="Buscar..."
              className="px-3 py-1 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full sm:w-[250px]"
            />
            <button className="text-white mt-2 sm:mt-0">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Recuadro blanco fijo */}
      <div className="fixed top-0 left-0 w-full bg-white z-[90] shadow-md pt-6 sm:pt-8 md:mt-0 mt-[30px] sm:mt-[25px] md:mt-0 lg:mt-2">
        <header
          className={`w-full transition-all duration-500 ${
            isScrolled ? 'bg-white/95 backdrop-blur-md py-3' : 'bg-transparent py-4 sm:py-5'
          }`}
        >
          <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center [@media(max-width:439px)]:mt-[25px]">
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