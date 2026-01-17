import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';


// Configuración de la API
const API_URL = 'https://we-prom-backend.vercel.app';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  img: string;
  price?: string;
  stock?: number;
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      // 304px es el ancho de la card mobile (280px) + gap (24px)
      const scrollAmount = direction === 'left' ? -304 : 304;
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };


  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const WHATSAPP_NUMBER = "523334590989";

  // Cargar productos desde el servidor
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/products`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setProducts(result.data);
      } else {
        throw new Error(result.message || 'Error al cargar los productos');
      }
    } catch (error) {
      console.error('Error cargando productos:', error);
      setError('No se pudieron cargar los productos. Intenta de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  // Colores del Rainbow Effect para las cards
  const colors = ['red', 'blue', 'green', 'yellow'];

  const handleProductClick = (productId: number) => {
    console.log('Producto clickeado:', productId);
  };

  if (loading) {
    return (
      <section id="proyectos" className="py-12 sm:py-16 lg:py-20 bg-weprom-light-bg dark:bg-gradient-dark">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-10 lg:mb-12 gap-4">
            <div className="w-full sm:w-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-2 tracking-wide">
                Proyectos Recientes
              </h2>
              <p className="text-sm sm:text-base text-weprom-gray-600 dark:text-weprom-gray-400 font-light">Cargando productos...</p>
            </div>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-t-weprom-red border-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="proyectos" className="py-12 sm:py-16 lg:py-20 bg-weprom-light-bg dark:bg-gradient-dark">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-10 lg:mb-12 gap-4">
            <div className="w-full sm:w-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-2 tracking-wide">
                Proyectos Recientes
              </h2>
              <p className="text-sm sm:text-base text-weprom-red font-light">{error}</p>
              <button
                onClick={loadProducts}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-weprom-red to-weprom-yellow text-white rounded-lg hover:shadow-xl transition-all duration-300 font-semibold transform hover:-translate-y-1"
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section id="proyectos" className="py-12 sm:py-16 lg:py-20 bg-weprom-light-bg dark:bg-gradient-dark">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-10 lg:mb-12 gap-4">
            <div className="w-full sm:w-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-2 tracking-wide">
                Proyectos Recientes
              </h2>
              <p className="text-sm sm:text-base text-weprom-gray-600 dark:text-weprom-gray-400 font-light">No hay productos disponibles en este momento.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="proyectos" className="py-12 sm:py-16 lg:py-20 bg-weprom-light-bg dark:bg-gradient-dark">
      <div className="container mx-auto px-4 sm:px-6">


        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-10 lg:mb-12 animate-fade-in-up gap-4">
          <div className="w-full sm:w-auto">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-0.5 w-6 bg-gradient-to-r from-weprom-red to-weprom-yellow"></div>
              <span className="text-sm font-semibold text-weprom-red uppercase tracking-widest">
                Portafolio
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-2 tracking-wide">
              Proyectos Recientes
            </h2>
            <p className="text-sm sm:text-base text-weprom-gray-600 dark:text-weprom-gray-400 font-light leading-relaxed">
              Descubre nuestros trabajos más recientes. <span className="hidden sm:inline text-weprom-blue/60 dark:text-weprom-blue/40 italic">— Desliza para ver más</span>
            </p>
          </div>
        </div>


        {/* Controles de navegación y Carrusel */}
        <div className="relative mt-8 group/container">
          
          {/* Botones de navegación (visibles solo en mobile/tablet para facilitar el uso) */}
          <div className="flex sm:hidden justify-end gap-3 mb-6 px-4">
            <button 
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 active:scale-90 transition-transform"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6 text-weprom-red" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 active:scale-90 transition-transform"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-6 h-6 text-weprom-red" />
            </button>
          </div>

          {/* Máscaras de degradado fijas (están fuera del scroll para que no se muevan) */}
          <div className="absolute inset-y-0 left-0 w-12 sm:w-32 z-20 pointer-events-none bg-gradient-to-r from-weprom-light-bg dark:from-[#0f172a] to-transparent"></div>
          <div className="absolute inset-y-0 right-0 w-12 sm:w-32 z-20 pointer-events-none bg-gradient-to-l from-weprom-light-bg dark:from-[#0f172a] to-transparent"></div>

          {/* Contenedor con Scroll Real */}
          <div 
            ref={containerRef} 
            className="w-full overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-6"
          >
            <motion.div
              className="flex gap-6 w-max pb-8 pt-4"
              // Solo animamos automáticamente si la pantalla es mayor a 640px (Desktop)
              animate={typeof window !== 'undefined' && window.innerWidth > 640 ? { x: ["0%", "-33.33%"] } : {}} 
              transition={{
                ease: "linear",
                duration: 60,
                repeat: Infinity,
              }}
              drag="x"
              dragConstraints={{ right: 0, left: -((products.length * 320) * 2) }}
              dragElastic={0.05}
              whileHover={{ animationPlayState: "paused" }}
            >
              {[...products, ...products, ...products].map((product, index) => {
                const color = colors[index % 4];
                return (
                  <div
                    key={`${product.id}-${index}`}
                    className="relative flex-shrink-0 w-[280px] sm:w-[320px] bg-white dark:bg-[#1e293b] rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 group overflow-hidden transition-all duration-300"
                    onMouseEnter={() => setHoveredProduct(index)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100 dark:bg-gray-900">
                      <img
                        src={product.img}
                        alt={product.name}
                        draggable="false"
                        className={`w-full h-full object-cover transition-transform duration-700 select-none ${
                          hoveredProduct === index ? 'scale-110' : 'scale-100'
                        }`}
                      />
                      <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg border border-white/20 uppercase">
                        Proyecto
                      </div>
                    </div>
                    
                    <div className="p-5 select-none">
                      <h4 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg line-clamp-1 mb-2">
                        {product.name}
                      </h4>
                      <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full mb-3 font-bold uppercase tracking-wider bg-weprom-${color}/10 text-weprom-${color} border border-weprom-${color}/20`}>
                        {product.category || 'General'}
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-normal line-clamp-2 min-h-[32px]">
                        {product.description || 'Calidad premium personalizada para marcas exigentes.'}
                      </p>
                    </div>

                    <div className={`absolute bottom-0 left-0 h-1 transition-all duration-500 bg-weprom-${color} ${
                      hoveredProduct === index ? 'w-full opacity-100' : 'w-0 opacity-0'
                    }`}></div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>



        {/* CTA al final de la sección */}
        <div className="text-center mt-12 animate-fade-in animation-delay-300">
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-xl sm:text-2xl">
            ¿Interesado en alguno de nuestros productos?
          </p>
        
          <motion.a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              "¡Hola! Visité su página web y me interesa conocer más sobre sus artículos promocionales."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-weprom-blue to-weprom-green text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group text-xl sm:text-2xl"
          >
            Contactar a un asesor
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </motion.a>
        </div>

      </div>
    </section>
  );
}
