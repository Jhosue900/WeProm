import { ArrowRight, Plus } from 'lucide-react';
import { useState } from 'react';

// Datos de productos
const projectsData = [
  { id: 1, name: 'Bolso Canvas', price: '$45.000', img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop' },
  { id: 2, name: 'Botella Térmica', price: '$35.000', img: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop' },
  { id: 3, name: 'Libreta Premium', price: '$25.000', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop' },
  { id: 4, name: 'USB Personalizado', price: '$18.000', img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop' }
];

interface ProjectsProps {
  onAddToCart: (name: string, price: string) => void;
}

export default function Projects({ onAddToCart }: ProjectsProps) {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>, name: string, price: string) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Agregando al carrito:', name, price);
    onAddToCart(name, price);
    
    // Feedback visual
    const button = e.currentTarget;
    button.style.backgroundColor = '#10b981'; // Verde de éxito
    button.style.color = 'white';
    
    setTimeout(() => {
      button.style.backgroundColor = '';
      button.style.color = '';
    }, 300);
  };

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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {projectsData.map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group animate-fade-in-up overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Imagen del producto */}
              <div className="relative h-32 sm:h-40 lg:h-48 overflow-hidden bg-gray-100">
                <img
                  src={product.img}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-700 ${hoveredProduct === product.id ? 'scale-110' : 'scale-100'}`}
                />
                
                {/* Botón de agregar al carrito - AHORA FUNCIONAL */}
                <button
                  onClick={(e) => handleAddToCartClick(e, product.name, product.price)}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2) rotate(90deg)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = ''}
                  className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-lg text-weprom-pink hover:bg-weprom-pink hover:text-white transition-all duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-weprom-pink focus:ring-offset-2"
                  style={{
                    transform: hoveredProduct === product.id ? 'scale(1.1)' : 'scale(1)',
                    opacity: hoveredProduct === product.id ? 1 : 0.9
                  }}
                  aria-label={`Agregar ${product.name} al carrito`}
                  title={`Agregar ${product.name} al carrito`}
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                
                {/* Overlay en hover */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-300 ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'}`}></div>
              </div>
              
              {/* Información del producto */}
              <div className="p-3 sm:p-4">
                <h4 className={`font-bold text-sm sm:text-base mb-1 transition-colors duration-300 ${hoveredProduct === product.id ? 'text-weprom-pink' : 'text-gray-800'}`}>
                  {product.name}
                </h4>
                <p className={`font-semibold text-sm sm:text-base transition-all duration-300 inline-block ${hoveredProduct === product.id ? 'text-purple-600 scale-105' : 'text-weprom-pink'}`}>
                  {product.price}
                </p>
                <p className="text-xs text-gray-500 mt-1">Haz clic en + para agregar</p>
              </div>
              
              {/* Indicador de hover */}
              <div className={`h-1 bg-gradient-to-r from-weprom-pink to-purple-600 transition-all duration-300 ${hoveredProduct === product.id ? 'w-full' : 'w-0'}`}></div>
            </div>
          ))}
        </div>

        {/* Debug info (solo en desarrollo) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg text-sm">
            <p className="font-semibold text-weprom-pink">Debug Info:</p>
            <p>onAddToCart function: {typeof onAddToCart === 'function' ? '✓ Disponible' : '✗ No disponible'}</p>
            <p>Total productos: {projectsData.length}</p>
          </div>
        )}
      </div>
    </section>
  );
}