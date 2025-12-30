import { CheckCircle, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToCart: () => void;
  onContinueShopping: () => void;
  productName: string;
}

export default function SuccessModal({
  isOpen,
  onClose,
  onGoToCart,
  onContinueShopping,
  productName
}: SuccessModalProps) {
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

  // Cerrar modal con Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] animate-fade-in">
      {/* Overlay con Dark Effect */}
      <div
        className="absolute inset-0 bg-weprom-black/80 backdrop-blur-md modal-overlay"
        onClick={onClose}
      ></div>
      
      {/* Modal con Dark Effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md animate-scale-in transform-gpu">
        <div className="bg-gradient-dark rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden mx-4 border-2 border-weprom-gray-800 relative backdrop-blur-sm">
          {/* Acento de color superior - Rainbow Effect */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-rainbow"></div>
          
          {/* Header */}
          <div className="relative p-6 sm:p-8 text-center">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-weprom-gray-400 hover:text-weprom-red transition-colors duration-300 p-1 hover:bg-weprom-gray-900 rounded-full"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Ícono de éxito animado con color WeProm */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-weprom-green to-weprom-blue rounded-full flex items-center justify-center animate-bounce shadow-lg">
                  <CheckCircle className="w-12 h-12 text-weprom-white" />
                </div>
                
                {/* Anillos de onda con color WeProm */}
                <div className="absolute inset-0 border-4 border-weprom-green/30 rounded-full animate-ping opacity-75"></div>
                <div 
                  className="absolute inset-0 border-4 border-weprom-green/50 rounded-full animate-ping opacity-50"
                  style={{ animationDelay: '0.5s' }}
                ></div>
              </div>
            </div>
            
            {/* Título y mensaje con tipografía WeProm */}
            <h3 className="text-2xl font-extrabold text-weprom-white mb-2 animate-fade-in-up tracking-wide">
              ¡Producto Agregado!
            </h3>
            <p className="text-weprom-gray-400 mb-1 animate-fade-in-up animation-delay-100 font-light">
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-weprom-red to-weprom-yellow">{productName}</span> ha sido agregado al carrito.
            </p>
            <p className="text-sm text-weprom-gray-500 animate-fade-in-up animation-delay-200 font-light">
              ¿Qué te gustaría hacer ahora?
            </p>
          </div>
          
          {/* Botones con colores de marca */}
          <div className="p-6 sm:p-8 pt-0 space-y-3">
            <button
              onClick={onGoToCart}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-weprom-red to-weprom-yellow text-weprom-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              <ShoppingBag className="w-5 h-5 group-hover:animate-bounce transition-transform duration-300" />
              <span>Ver Carrito</span>
              <div className="absolute inset-0 bg-weprom-white/10 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
            
            <button
              onClick={onContinueShopping}
              className="w-full group relative bg-weprom-dark-gray text-weprom-white border-2 border-weprom-gray-700 font-semibold py-4 px-6 rounded-xl hover:border-weprom-blue hover:text-weprom-blue transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 hover:bg-weprom-dark"
            >
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              <span>Seguir Comprando</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-weprom-red/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
            
            {/* Enlace para cerrar */}
            <button
              onClick={onClose}
              className="w-full text-sm text-weprom-gray-500 hover:text-weprom-gray-300 transition-colors duration-300 pt-2 font-light"
            >
              O seguir explorando la página
            </button>
          </div>
          
          {/* Efectos decorativos con colores de marca */}
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-red rounded-full blur-2xl opacity-20"></div>
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-green rounded-full blur-2xl opacity-20"></div>
        </div>
      </div>
    </div>
  );
}