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
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="absolute right-0 top-0 h-full w-full sm:w-[420px] md:w-96 bg-white shadow-2xl p-4 sm:p-6 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sm:mb-6 pb-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-weprom-pink" />
            <h2 className="text-lg sm:text-xl font-bold">Tu Carrito ({cartItems.length})</h2>
          </div>
          <button 
            onClick={onClose} 
            className="hover:text-weprom-pink transition-all duration-300 hover:rotate-90 transform p-1"
            aria-label="Cerrar carrito"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Lista de productos */}
        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 mt-10 animate-fade-in">
              <div className="text-5xl sm:text-6xl mb-4">🛒</div>
              <p className="text-sm sm:text-base font-medium mb-2">Tu carrito está vacío</p>
              <p className="text-xs text-gray-400 mb-6">Agrega productos desde la sección "Proyectos"</p>
              <button
                onClick={goToProducts}
                className="bg-weprom-pink text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-600 transition-colors duration-300 flex items-center gap-2 mx-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                Ver Productos
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center p-4 border rounded-xl hover:bg-gray-50 transition-colors duration-300 animate-slide-in-right shadow-sm"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex-1 min-w-0 pr-3">
                    <p className="font-bold text-sm sm:text-base truncate">{item.name}</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">{item.price}</p>
                  </div>
                  <button
                    onClick={() => onRemoveItem(index)}
                    className="text-red-500 hover:text-red-700 text-xs font-medium hover:underline transition-colors duration-300 flex-shrink-0 px-3 py-1 border border-red-200 rounded-lg hover:bg-red-50"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer con total y botones */}
        {cartItems.length > 0 && (
          <div className="border-t pt-4 mt-4 animate-fade-in animation-delay-300 space-y-3">
            <div className="flex justify-between font-bold text-base sm:text-lg mb-2">
              <span>Total</span>
              <span className="text-weprom-pink">{formatPrice(calculateTotal())}</span>
            </div>
            
            <button className="w-full bg-weprom-pink text-white py-3 rounded-lg font-bold hover:bg-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base flex items-center justify-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Finalizar Compra
            </button>
            
            <button
              onClick={goToProducts}
              className="w-full bg-white text-gray-700 border border-gray-300 py-3 rounded-lg font-medium hover:border-weprom-pink hover:text-weprom-pink transition-all duration-300 text-sm sm:text-base flex items-center justify-center gap-2"
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