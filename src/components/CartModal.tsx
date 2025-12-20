import { X } from 'lucide-react';
import { CartItem } from '../types';

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

  return (
    <div className="fixed inset-0 z-[60]">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="absolute right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl p-6 flex flex-col animate-slide-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Tu Carrito</h2>
          <button onClick={onClose} className="hover:text-weprom-pink transition">
            <X />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              Tu carrito está vacío.
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-3 border-b">
                <div>
                  <p className="font-bold text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.price}</p>
                </div>
                <button
                  onClick={() => onRemoveItem(index)}
                  className="text-red-500 text-xs hover:underline"
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total</span>
              <span>{formatPrice(calculateTotal())}</span>
            </div>
            <button className="w-full bg-weprom-pink text-white py-3 rounded-lg font-bold hover:bg-pink-600 transition">
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
