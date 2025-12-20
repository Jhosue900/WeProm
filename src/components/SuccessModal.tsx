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
      {/* Overlay con blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md modal-overlay"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md animate-scale-in transform-gpu">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden mx-4 border border-gray-200/50">
          {/* Header */}
          <div className="relative p-6 sm:p-8 text-center">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-300 p-1 hover:bg-gray-100 rounded-full"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Ícono de éxito animado */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                
                {/* Anillos de onda */}
                <div className="absolute inset-0 border-4 border-green-200 rounded-full animate-ping opacity-75"></div>
                <div 
                  className="absolute inset-0 border-4 border-green-300 rounded-full animate-ping opacity-50"
                  style={{ animationDelay: '0.5s' }}
                ></div>
              </div>
            </div>
            
            {/* Título y mensaje */}
            <h3 className="text-2xl font-bold text-gray-900 mb-2 animate-fade-in-up">
              ¡Producto Agregado!
            </h3>
            <p className="text-gray-600 mb-1 animate-fade-in-up animation-delay-100">
              <span className="font-semibold text-weprom-pink">{productName}</span> ha sido agregado al carrito.
            </p>
            <p className="text-sm text-gray-500 animate-fade-in-up animation-delay-200">
              ¿Qué te gustaría hacer ahora?
            </p>
          </div>
          
          {/* Botones */}
          <div className="p-6 sm:p-8 pt-0 space-y-3">
            <button
              onClick={onGoToCart}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-weprom-pink to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 shine-effect"
            >
              <ShoppingBag className="w-5 h-5 group-hover:animate-bounce transition-transform duration-300" />
              <span>Ver Carrito</span>
              <div className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
            
            <button
              onClick={onContinueShopping}
              className="w-full group relative bg-white text-gray-800 border-2 border-gray-200 font-bold py-4 px-6 rounded-xl hover:border-weprom-pink hover:text-weprom-pink transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 hover-lift"
            >
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              <span>Seguir Comprando</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-weprom-pink/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
            
            {/* Enlace para cerrar */}
            <button
              onClick={onClose}
              className="w-full text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300 pt-2"
            >
              O seguir explorando la página
            </button>
          </div>
          
          {/* Efecto decorativo en el fondo */}
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-weprom-pink/10 to-purple-600/10 rounded-full blur-2xl"></div>
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-green-400/10 to-emerald-500/10 rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>
  );
}