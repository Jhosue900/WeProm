import React from 'react';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = "573000000000"; // Reemplaza con tu número (código de país + número)
  const message = "Hola WeProm, me gustaría obtener más información sobre sus servicios.";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    // Dentro del return de WhatsAppButton.tsx
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-whatsapp hover:bg-[#128C7E] transition-all duration-300 hover:scale-110 flex items-center justify-center animate-slow-bounce"
    >
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
        alt="WhatsApp"
        className="w-9 h-9" 
      />
    </a>

  );
};

export default WhatsAppButton;