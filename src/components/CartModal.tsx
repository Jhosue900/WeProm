
import { X, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useEffect } from 'react';

interface CartItem {
  name: string;
  price: string;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (index: number) => void;
}

export default function CartModal({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
}: CartModalProps) {
  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[$.,]/g, ''));
      return total + price;
    }, 0);
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('es-CO')}`;
  };

  const goToProducts = () => {
    onClose();
    const proyectosSection = document.getElementById('proyectos');
    if (proyectosSection) {
      proyectosSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-[60] animate-fade-in">
      {/* Backdrop con Dark Effect */}
      <div
        className="absolute inset-0 bg-weprom-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Panel del carrito con diseño minimalista */}
      <div className="absolute right-0 top-0 h-full w-full sm:w-[420px] md:w-96 bg-gradient-dark shadow-xl p-4 sm:p-6 flex flex-col animate-slide-in-right border-l border-weprom-gray-800 backdrop-blur-lg">
        {/* Header con tipografía WeProm */}
        <div className="flex justify-between items-center mb-4 sm:mb-6 pb-4 border-b border-weprom-gray-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-weprom-red to-weprom-yellow">
              <ShoppingBag className="w-5 h-5 text-weprom-white" />
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-weprom-white tracking-wide">
              Tu Carrito ({cartItems.length})
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className="text-weprom-gray-400 hover:text-weprom-red transition-all duration-300 hover:rotate-90 transform p-1 hover:bg-weprom-gray-900 rounded-full"
            aria-label="Cerrar carrito"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Lista de productos */}
        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="text-center text-weprom-gray-400 mt-10 animate-fade-in">
              <div className="text-5xl sm:text-6xl mb-4">🛒</div>
              <p className="text-sm sm:text-base font-semibold mb-2 text-weprom-white">
                Tu carrito está vacío
              </p>
              <p className="text-xs font-light mb-6 leading-relaxed">
                Agrega productos desde la sección "Proyectos"
              </p>
              <button
                onClick={goToProducts}
                className="bg-gradient-to-r from-weprom-red to-weprom-yellow text-weprom-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto transform hover:-translate-y-1"
              >
                <ArrowLeft className="w-4 h-4" />
                Ver Productos
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item, index) => {
                // Rainbow Effect - asignar color según índice
                const borderColors = ['red', 'blue', 'green', 'yellow'];
                const color = borderColors[index % 4];
                
                return (
                  <div 
                    key={index} 
                    className={`flex justify-between items-center p-4 bg-gradient-to-r from-weprom-dark-gray to-transparent border border-weprom-gray-800 rounded-xl hover:from-weprom-${color}/10 transition-all duration-300 animate-slide-in-right shadow-sm border-l-4 border-weprom-${color}`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex-1 min-w-0 pr-3">
                      <p className="font-semibold text-sm sm:text-base truncate text-weprom-white">
                        {item.name}
                      </p>
                      <p className="text-xs sm:text-sm text-weprom-gray-400 font-light mt-1">
                        {item.price}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemoveItem(index)}
                      className="text-weprom-red hover:text-weprom-red/80 text-xs font-semibold transition-colors duration-300 flex-shrink-0 px-3 py-1 border border-weprom-red rounded-lg hover:bg-weprom-red/10"
                    >
                      Eliminar
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer con total y botones */}
        {cartItems.length > 0 && (
          <div className="border-t border-weprom-gray-800 pt-4 mt-4 animate-fade-in animation-delay-300 space-y-3">
            <div className="flex justify-between font-extrabold text-base sm:text-lg mb-2">
              <span className="text-weprom-white tracking-wide">Total</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-weprom-red to-weprom-yellow">
                {formatPrice(calculateTotal())}
              </span>
            </div>
            
            {/* Botón principal con color de marca */}
            <button className="w-full bg-gradient-to-r from-weprom-red to-weprom-yellow text-weprom-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-sm sm:text-base flex items-center justify-center gap-2 group">
              <ShoppingBag className="w-5 h-5 group-hover:animate-bounce" />
              Finalizar Compra
            </button>
            
            {/* Botón secundario minimalista */}
            <button
              onClick={goToProducts}
              className="w-full bg-transparent text-weprom-gray-300 border border-weprom-gray-700 py-3 rounded-lg font-light hover:border-weprom-blue hover:text-weprom-blue transition-all duration-300 text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-weprom-dark-gray/50"
            >
              <ArrowLeft className="w-4 h-4" />
              Seguir Comprando
            </button>
          </div>
        )}
      </div>
    </div>
  );
}