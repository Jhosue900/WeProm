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
    const originalBg = button.style.backgroundImage;
    
    // Cambiar ícono a check
    button.innerHTML = `
      <svg class="w-5 h-5 animate-check" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
      </svg>
    `;
    button.style.backgroundImage = 'linear-gradient(135deg, #34C759 0%, #32D74B 100%)';
    
    // Llamar a la función de agregar al carrito
    onAddToCart(name, price);
    
    // Restaurar después de 1 segundo
    setTimeout(() => {
      button.innerHTML = originalHTML;
      button.style.backgroundImage = originalBg;
    }, 1000);
  };

  // Colores del Rainbow Effect para las cards
  const colors = ['red', 'blue', 'green', 'yellow'];

  if (loading) {
    return (
      <section id="proyectos" className="py-12 sm:py-16 lg:py-20 bg-gradient-dark">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-10 lg:mb-12 gap-4">
            <div className="w-full sm:w-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-weprom-white mb-2 tracking-wide">
                Proyectos Recientes
              </h2>
              <p className="text-sm sm:text-base text-weprom-gray-400 font-light">Cargando productos...</p>
            </div>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-transparent border-gradient-to-r from-weprom-red to-weprom-yellow"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="proyectos" className="py-12 sm:py-16 lg:py-20 bg-gradient-dark">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-10 lg:mb-12 gap-4">
            <div className="w-full sm:w-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-weprom-white mb-2 tracking-wide">
                Proyectos Recientes
              </h2>
              <p className="text-sm sm:text-base text-weprom-red font-light">{error}</p>
              <button
                onClick={loadProducts}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-weprom-red to-weprom-yellow text-weprom-white rounded-lg hover:shadow-xl transition-all duration-300 font-semibold transform hover:-translate-y-1"
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
      <section id="proyectos" className="py-12 sm:py-16 lg:py-20 bg-gradient-dark">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-10 lg:mb-12 gap-4">
            <div className="w-full sm:w-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-weprom-white mb-2 tracking-wide">
                Proyectos Recientes
              </h2>
              <p className="text-sm sm:text-base text-weprom-gray-400 font-light">No hay productos disponibles en este momento.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="proyectos" className="py-12 sm:py-16 lg:py-20 bg-gradient-dark">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header con tipografía WeProm */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-10 lg:mb-12 animate-fade-in-up gap-4">
          <div className="w-full sm:w-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-weprom-white mb-2 tracking-wide">
              Proyectos Recientes
            </h2>
            <p className="text-sm sm:text-base text-weprom-gray-400 font-light leading-relaxed">
              Lo último en merchandising corporativo.
            </p>
          </div>
          <a
            href="#"
            className="flex items-center text-weprom-red font-semibold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-weprom-red hover:to-weprom-yellow group text-sm sm:text-base hover-lift"
            onClick={(e) => e.preventDefault()}
          >
            Ver todos 
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
          </a>
        </div>

        {/* Grid de productos con Dark Effect y Rainbow Effect */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product, index) => {
            const color = colors[index % 4];
            
            return (
              <div
                key={product.id}
                className="bg-gradient-to-b from-weprom-dark-gray to-weprom-dark rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-weprom-gray-800 group overflow-hidden animate-fade-in-up relative backdrop-blur-sm"
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Gradiente superior sutil */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-weprom-${color} to-transparent`}></div>
                
                {/* Contenedor de imagen con Vintage Effect */}
                <div className="relative h-48 sm:h-56 overflow-hidden bg-weprom-dark">
                  <img
                    src={product.img}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-all duration-700 filter grayscale group-hover:grayscale-0 ${
                      hoveredProduct === product.id ? 'scale-110' : 'scale-100'
                    }`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop';
                    }}
                  />
                  
                  {/* Botón de agregar al carrito */}
                  <button
                    onClick={(e) => handleAddToCartClick(e, product.name, product.price)}
                    className={`absolute bottom-4 right-4 bg-gradient-to-r from-weprom-red to-weprom-yellow p-3 rounded-full shadow-lg text-weprom-white hover:shadow-xl transition-all duration-300 z-10 ${
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
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-weprom-yellow to-weprom-red text-weprom-black text-xs font-semibold px-2 py-1 rounded-full">
                      ¡Últimas {product.stock} unidades!
                    </div>
                  )}
                  
                  {product.stock === 0 && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-weprom-red to-weprom-red/80 text-weprom-white text-xs font-semibold px-2 py-1 rounded-full">
                      AGOTADO
                    </div>
                  )}
                  
                  {/* Overlay oscuro en hover */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-weprom-dark via-transparent to-transparent transition-opacity duration-300 ${
                    hoveredProduct === product.id ? 'opacity-80' : 'opacity-60'
                  }`}></div>
                </div>
                
                {/* Información del producto */}
                <div className="p-4 sm:p-6">
                  <h4 className={`font-semibold text-lg mb-2 transition-colors duration-300 ${
                    hoveredProduct === product.id 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-weprom-red to-weprom-yellow' 
                      : 'text-weprom-white'
                  }`}>
                    {product.name}
                  </h4>
                  <p className={`text-xl font-extrabold transition-all duration-300 inline-block bg-gradient-to-r from-weprom-gray-300 to-weprom-gray-400 bg-clip-text text-transparent ${
                    hoveredProduct === product.id ? 'from-weprom-red to-weprom-yellow scale-105' : ''
                  }`}>
                    ${parseInt(product.price).toLocaleString()}
                  </p>
                  <p className="text-sm text-weprom-gray-400 font-light mt-2">
                    {product.stock === 0 
                      ? 'Producto temporalmente agotado' 
                      : `Stock disponible: ${product.stock} unidades`}
                  </p>
                </div>
                
                {/* Indicador de hover con color de marca */}
                <div className={`h-1 bg-gradient-to-r from-weprom-${color} to-transparent transition-all duration-300 ${
                  hoveredProduct === product.id ? 'w-full' : 'w-0'
                }`}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}