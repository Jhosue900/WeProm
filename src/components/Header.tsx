import { useEffect, useState } from 'react';
import { ShoppingCart, Menu } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Header({ cartCount, onCartClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-weprom-dark flex items-center gap-2">
          <img
            src="https://via.placeholder.com/40x40/ec4899/ffffff?text=W"
            alt="WeProm Logo"
            className="rounded-full"
          />
          <span>WeProm</span>
        </a>

        <nav className="hidden md:flex space-x-8 font-medium text-gray-800">
          <a href="#hero" className="hover:text-weprom-pink transition">
            Inicio
          </a>
          <a href="#campanas" className="hover:text-weprom-pink transition">
            Campañas
          </a>
          <a href="#proyectos" className="hover:text-weprom-pink transition">
            Proyectos
          </a>
          <a href="#contacto" className="hover:text-weprom-pink transition">
            Contacto
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={onCartClick}
            className="relative hover:text-weprom-pink transition"
          >
            <ShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-weprom-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden hover:text-weprom-pink transition">
            <Menu />
          </button>
        </div>
      </div>
    </header>
  );
}
