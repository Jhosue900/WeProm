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
          {projectsData.map((product, index) => (
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
                />
                
                {/* Botón de agregar al carrito */}
                <button
                  onClick={(e) => handleAddToCartClick(e, product.name, product.price)}
                  className={`absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-xl text-weprom-pink hover:bg-weprom-pink hover:text-white transition-all duration-300 z-10 ${
                    hoveredProduct === product.id ? 'scale-110 rotate-12' : 'scale-100'
                  }`}
                  aria-label={`Agregar ${product.name} al carrito`}
                  title="Agregar al carrito"
                >
                  <Plus className="w-5 h-5" />
                </button>
                
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
                  {product.price}
                </p>
                <p className="text-sm text-gray-500 mt-2">Haz clic en el botón + para agregar al carrito</p>
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