import { ArrowRight, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';

// Configuración de la API
const API_URL = 'https://we-prom-backend.vercel.app';

interface Product {
  id: number;
  name: string;
  price: string;
  stock: number;
  img: string;
}

interface ProjectsProps {
  onAddToCart: (name: string, price: string) => void;
}

export default function Projects({ onAddToCart }: ProjectsProps) {
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

  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>, name: string, price: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Feedback visual inmediato
    const button = e.currentTarget;
    const originalHTML = button.innerHTML;
    const originalBg = button.style.backgroundColor;
    const originalColor = button.style.color;
    
    // Cambiar ícono a check
    button.innerHTML = `
      <svg class="w-5 h-5 animate-check" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
      </svg>
    `;
    button.style.backgroundColor = '#10b981'; // Verde
    button.style.color = 'white';
    
    // Llamar a la función de agregar al carrito
    onAddToCart(name, price);
    
    // Restaurar después de 1 segundo
    setTimeout(() => {
      button.innerHTML = originalHTML;
      button.style.backgroundColor = originalBg;
      button.style.color = originalColor;
    }, 1000);
  };

  if (loading) {
    return (
      <section id="proyectos" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-10 lg:mb-12 gap-4">
            <div className="w-full sm:w-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Proyectos Recientes
              </h2>
              <p className="text-sm sm:text-base text-gray-600">Cargando productos...</p>
            </div>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="proyectos" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-10 lg:mb-12 gap-4">
            <div className="w-full sm:w-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Proyectos Recientes
              </h2>
              <p className="text-sm sm:text-base text-red-600">{error}</p>
              <button
                onClick={loadProducts}
                className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
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
      <section id="proyectos" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-10 lg:mb-12 gap-4">
            <div className="w-full sm:w-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Proyectos Recientes
              </h2>
              <p className="text-sm sm:text-base text-gray-600">No hay productos disponibles en este momento.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="proyectos" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-10 lg:mb-12 animate-fade-in-up gap-4">
          <div className="w-full sm:w-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Proyectos Recientes
            </h2>
            <p className="text-sm sm:text-base text-gray-600">Lo último en merchandising corporativo.</p>
          </div>
          <a
            href="#"
            className="flex items-center text-weprom-pink font-semibold hover:underline group text-sm sm:text-base"
            onClick={(e) => e.preventDefault()}
          >
            Ver todos 
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
          </a>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Contenedor de imagen */}
              <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                  src={product.img}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredProduct === product.id ? 'scale-110' : 'scale-100'
                  }`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop';
                  }}
                />
                
                {/* Botón de agregar al carrito */}
                <button
                  onClick={(e) => handleAddToCartClick(e, product.name, product.price)}
                  className={`absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-xl text-weprom-pink hover:bg-weprom-pink hover:text-white transition-all duration-300 z-10 ${
                    hoveredProduct === product.id ? 'scale-110 rotate-12' : 'scale-100'
                  }`}
                  aria-label={`Agregar ${product.name} al carrito`}
                  title="Agregar al carrito"
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? (
                    <span className="text-xs font-bold">SIN STOCK</span>
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </button>
                
                {/* Indicador de stock */}
                {product.stock > 0 && product.stock <= 5 && (
                  <div className="absolute top-4 left-4 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    ¡Últimas {product.stock} unidades!
                  </div>
                )}
                
                {product.stock === 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    AGOTADO
                  </div>
                )}
                
                {/* Overlay en hover */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent transition-opacity duration-300 ${
                  hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                }`}></div>
              </div>
              
              {/* Información del producto */}
              <div className="p-4 sm:p-6">
                <h4 className={`font-bold text-lg mb-2 transition-colors duration-300 ${
                  hoveredProduct === product.id ? 'text-weprom-pink' : 'text-gray-900'
                }`}>
                  {product.name}
                </h4>
                <p className={`text-xl font-bold transition-all duration-300 inline-block ${
                  hoveredProduct === product.id ? 'text-purple-600 scale-105' : 'text-weprom-pink'
                }`}>
                  ${parseInt(product.price).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {product.stock === 0 
                    ? 'Producto temporalmente agotado' 
                    : `Stock disponible: ${product.stock} unidades`}
                </p>
              </div>
              
              {/* Indicador de hover */}
              <div className={`h-1 bg-gradient-to-r from-weprom-pink via-purple-500 to-purple-600 transition-all duration-300 ${
                hoveredProduct === product.id ? 'w-full' : 'w-0'
              }`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}