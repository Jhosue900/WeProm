import { useEffect, useState, useRef } from 'react';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import LogoLight from '../LOGOLISONEGRO.png';
import Logo from '../LOGOLISOBLANCO.png';
import LogoLight2 from '../LogoBlanco2.png';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      setShowTopBar(scrollPosition < 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Función para generar el enlace basado en el nombre
  const getNavLink = (name: string) => {
    const mappings: Record<string, string> = {
      'Inicio': '#',
      'Campañas': '#campañas',
      'Proyectos': '#proyectos',
      'Servicios': '#servicios',
      'Contacto': '#contacto',
      'Nosotros': '#nosotros',
      'Reseñas': '#reseñas',
      'FAQ': '#faq',
      'Proceso de compra': '#proceso'
    };
    
    return mappings[name] || `#${name.toLowerCase()}`;
  };

  return (
    <>
      {/* Top Bar - Visible en todas las pantallas */}
      <div
        className={`fixed top-0 left-0 w-full bg-white dark:bg-weprom-dark z-[100] py-3.5 md:py-3.5 border-b border-weprom-gray-200 dark:border-weprom-gray-800 transition-transform duration-300 ${
          showTopBar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center text-weprom-gray-600 dark:text-weprom-gray-400">
          {/* Contacto - Desktop: ambos visibles, Mobile: solo iconos */}
          <div className="flex items-center gap-3 md:gap-6">
            <a 
              href="tel:+573001234567"
              className="flex items-center gap-2 hover:text-weprom-red transition-colors group"
            >
              <div className="p-1.5 rounded-md bg-weprom-gray-100 dark:bg-weprom-gray-900 group-hover:bg-weprom-red/10">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
              </div>
              <span className="text-sm font-light hidden sm:inline">+57 300 123 4567</span>
            </a>
            
            <a 
              href="mailto:comunicacion.weprom@gmail.com"
              className="flex items-center gap-2 hover:text-weprom-blue transition-colors group"
            >
              <div className="p-1.5 rounded-md bg-weprom-gray-100 dark:bg-weprom-gray-900 group-hover:bg-weprom-blue/10">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <span className="text-sm font-light hidden sm:inline">comunicacion.weprom@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Header principal */}
      <div 
        ref={headerRef}
        className={`fixed left-0 w-full bg-white/95 dark:bg-weprom-dark/95 backdrop-blur-sm z-[90] border-b border-weprom-gray-200 dark:border-weprom-gray-800 transition-all duration-300 ${
          showTopBar ? 'top-[58px] md:top-[58px]' : 'top-0'
        }`}
        style={{ top: showTopBar ? undefined : '0' }}
      >
        <header className={`w-full transition-all duration-500 ${
          isScrolled ? 'py-4 md:py-5' : 'py-6 md:py-6'
        }`}>
          <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group z-[110] flex-col">
              <img 
                src={isDarkMode ? LogoLight2 : LogoLight} 
                alt="WeProm Marketing Logo" 
                className="h-12 w-auto sm:h-14 md:h-16 lg:h-14 transition-all duration-300 group-hover:scale-105"
              />

              <p className="text-sm font-bold text-weprom-gray-700 dark:text-weprom-gray-300">División Promocional</p>
            </a>

            

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Botón modo oscuro/claro */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-weprom-gray-100 dark:bg-weprom-gray-900 border border-weprom-gray-300 dark:border-weprom-gray-700 hover:border-weprom-black transition-colors"
                aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-weprom-gray-600 dark:text-weprom-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-lg bg-weprom-gray-100 dark:bg-weprom-gray-900 border border-weprom-gray-300 dark:border-weprom-gray-700 hover:border-weprom-red transition-colors z-[110] relative"
                aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-weprom-red" />
                ) : (
                  <Menu className="w-5 h-5 text-weprom-gray-600 dark:text-weprom-gray-400" />
                )}
              </button>
              
              {/* Botón CTA en desktop */}
              <a 
                href="#contacto" 
                className="hidden lg:inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-weprom-red to-weprom-yellow text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>Cotizar Ahora</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[95] lg:hidden animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <nav
        className={`fixed top-1 right-0 h-full w-full max-w-sm bg-white dark:bg-weprom-dark shadow-2xl z-[100] lg:hidden transform transition-transform duration-300 ease-out overflow-y-auto ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full pt-4 flex flex-col min-h-screen">
          {/* Header del mobile menu */}
          <div className="p-6 border-b border-weprom-gray-200 dark:border-weprom-gray-800 bg-gradient-to-r from-weprom-gray-50 to-white dark:from-weprom-dark dark:to-weprom-dark-gray flex-shrink-0">
            <div className="flex items-center justify-between">
              <img 
                src={isDarkMode ? LogoLight2 : LogoLight}
                alt="WeProm Logo" 
                className="h-12 w-auto"
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg bg-white dark:bg-weprom-gray-900 border border-weprom-gray-300 dark:border-weprom-gray-700"
                >
                  {isDarkMode ? (
                    <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-weprom-gray-600 dark:text-weprom-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-white dark:bg-weprom-gray-900 border border-weprom-gray-300 dark:border-weprom-gray-700"
                >
                  <X className="w-5 h-5 text-weprom-gray-600 dark:text-weprom-gray-400" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Navegación principal mobile */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-1">
              {[
                { name: 'Inicio', color: 'red'},
                { name: 'Campañas', color: 'blue'},
                { name: 'Proyectos', color: 'green'},
                { name: 'Servicios', color: 'yellow'},
                { name: 'Contacto', color: 'purple'},
                { name: 'Nosotros', color: 'teal'},
                { name: 'Reseñas', color: 'pink'},
                { name: 'Proceso de compra', color: 'orange'},
                { name: 'FAQ', color: 'indigo'}
              ].map((item, i) => (
                <a
                  key={i}
                  href={getNavLink(item.name)}
                  onClick={handleNavClick}
                  className={`flex items-center gap-3 px-4 py-4 rounded-lg text-weprom-gray-700 dark:text-weprom-gray-300 hover:bg-weprom-gray-100 dark:hover:bg-weprom-gray-800 hover:text-weprom-${item.color} transition-all duration-300 group border-b border-weprom-gray-100 dark:border-weprom-gray-800 last:border-0`}
                >
                  <div className={`p-2 rounded-lg bg-weprom-${item.color}/10 group-hover:bg-weprom-${item.color}/20 transition-colors`}>
                    <span className="text-lg"></span>
                  </div>
                  <span className="font-semibold flex-1">{item.name}</span>
                  <svg className="w-4 h-4 text-weprom-gray-400 group-hover:text-weprom-red transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>
            
            {/* Información de contacto en mobile */}
            <div className="mt-6 p-4 bg-weprom-gray-50 dark:bg-weprom-gray-900 rounded-lg border border-weprom-gray-200 dark:border-weprom-gray-800">
              <h3 className="text-sm font-semibold text-weprom-gray-700 dark:text-weprom-gray-300 mb-3">Contáctanos</h3>
              <div className="space-y-3">
                <a 
                  href="tel:+573001234567"
                  className="flex items-center gap-3 text-weprom-gray-600 dark:text-weprom-gray-400 hover:text-weprom-red transition-colors group"
                >
                  <div className="p-2 rounded-md bg-white dark:bg-weprom-gray-800 group-hover:bg-weprom-red/10">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-light">+57 300 123 4567</span>
                </a>
                
                <a 
                  href="mailto:hola@weprom.com"
                  className="flex items-center gap-3 text-weprom-gray-600 dark:text-weprom-gray-400 hover:text-weprom-blue transition-colors group"
                >
                  <div className="p-2 rounded-md bg-white dark:bg-weprom-gray-800 group-hover:bg-weprom-blue/10">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-light">hola@weprom.com</span>
                </a>
              </div>
            </div>
            
            {/* CTA en mobile menu */}
            <div className="mt-6 pb-8">
              <a
                href="#contacto"
                onClick={handleNavClick}
                className="block w-full text-center bg-gradient-to-r from-weprom-red to-weprom-yellow text-white py-3.5 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mb-3"
              >
                Solicitar Cotización
              </a>
              <div className="flex gap-3">
                <a href="https://www.instagram.com/weprommarketing?igsh=MTVrYmVjcjM3Z3N3Zg==" className="flex-1 text-center py-2.5 rounded-lg border border-weprom-gray-300 dark:border-weprom-gray-700 text-weprom-gray-700 dark:text-weprom-gray-300 hover:border-weprom-blue hover:text-weprom-blue transition-colors">
                  Instagram
                </a>
                <a href="https://www.instagram.com/weprommarketing?igsh=MTVrYmVjcjM3Z3N3Zg==" className="flex-1 text-center py-2.5 rounded-lg border border-weprom-gray-300 dark:border-weprom-gray-700 text-weprom-gray-700 dark:text-weprom-gray-300 hover:border-weprom-red hover:text-weprom-red transition-colors">
                  Facebook
                </a>
              </div>
            </div>
          </div>
          
          {/* Footer del mobile menu */}
          <div className="p-6 border-t border-weprom-gray-200 dark:border-weprom-gray-800 bg-weprom-gray-50 dark:bg-weprom-dark flex-shrink-0">
            <div className="text-center text-xs text-weprom-gray-500 dark:text-weprom-gray-400">
              © 2025 WeProm Marketing. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}