import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

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
              Descubre nuestros trabajos más recientes en artículos promocionales.
            </p>
          </div>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product, index) => {
            const color = colors[index % 4];
            
            return (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="bg-white dark:bg-weprom-dark-gray rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-weprom-gray-200 dark:border-weprom-gray-800 group overflow-hidden animate-fade-in-up hover:-translate-y-1 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Gradiente superior sutil */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-weprom-${color} to-transparent`}></div>
                
                {/* Contenedor de imagen */}
                <div className="relative h-48 sm:h-56 overflow-hidden bg-weprom-gray-100 dark:bg-weprom-dark">
                  <img
                    src={product.img}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      hoveredProduct === product.id ? 'scale-110' : 'scale-100'
                    }`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop';
                    }}
                  />
                  
                  {/* Indicador de stock */}
                  {product.stock !== undefined && product.stock <= 5 && product.stock > 0 && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-weprom-yellow to-weprom-red text-white text-xs font-semibold px-2 py-1 rounded-full">
                      ¡Popular!
                    </div>
                  )}
                  
                  {product.stock !== undefined && product.stock === 0 && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-weprom-gray-600 to-weprom-gray-800 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      Consultar
                    </div>
                  )}
                  
                  {/* Overlay con botón de ver más */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
                    hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                  </div>
                </div>
                
                {/* Información del producto */}
                <div className="p-4 sm:p-6">
                  <h4 className={`font-semibold text-lg mb-2 transition-colors duration-300 ${
                    hoveredProduct === product.id 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-weprom-red to-weprom-yellow' 
                      : 'text-weprom-gray-900 dark:text-weprom-white'
                  }`}>
                    {product.name}
                  </h4>
                  
                  {/* CATEGORÍA - Manteniendo el diseño original */}
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full bg-weprom-${color}/10 text-weprom-${color} font-semibold`}>
                      {product.category || 'General'}
                    </span>
                    {product.price && (
                      <span className="font-semibold text-weprom-green text-sm">
                        {product.price}
                      </span>
                    )}
                  </div>
                  
                  {/* DESCRIPCIÓN - Manteniendo diseño responsive */}
                  {product.description ? (
                    <p className="text-sm text-weprom-gray-600 dark:text-weprom-gray-400 font-light line-clamp-2 min-h-[40px]">
                      {product.description}
                    </p>
                  ) : (
                    <p className="text-sm text-weprom-gray-600 dark:text-weprom-gray-400 font-light italic min-h-[40px]">
                      Producto promocional personalizable
                    </p>
                  )}
                </div>
                
                {/* Indicador de hover con color de marca */}
                <div className={`h-1 bg-gradient-to-r from-weprom-${color} to-transparent transition-all duration-300 ${
                  hoveredProduct === product.id ? 'w-full' : 'w-0'
                }`}></div>
              </div>
            );
          })}
        </div>

        {/* CTA al final de la sección */}
        <div className="text-center mt-12 animate-fade-in animation-delay-300">
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-xl sm:text-2xl">
            ¿Interesado en alguno de nuestros productos?
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-weprom-blue to-weprom-green text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group font-bold text-2xl"
          >
            Contactar a un asesor
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
          </a>
        </div>

      </div>
    </section>
  );
}