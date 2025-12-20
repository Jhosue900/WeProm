import { Mail, Phone, MapPin } from 'lucide-react';
import { FormEvent } from 'react';

export default function Contact() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Mensaje enviado!');
  };

  return (
    <section id="contacto" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row animate-fade-in-up hover:shadow-2xl transition-shadow duration-500">
          
          {/* Columna de información */}
          <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-weprom-pink to-purple-600 text-white flex flex-col justify-center relative overflow-hidden">
            {/* Círculos decorativos animados */}
            <div className="absolute -top-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-full animate-pulse animation-delay-500"></div>
            
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 animate-slide-in">
                Hablemos de tu proyecto
              </h3>
              <p className="mb-5 sm:mb-6 opacity-90 text-sm sm:text-base animate-fade-in animation-delay-300">
                ¿Tienes una idea en mente? Escríbenos y te ayudamos a hacerla realidad.
              </p>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { icon: Mail, text: 'hola@weprom.com' },
                  { icon: Phone, text: '+57 300 123 4567' },
                  { icon: MapPin, text: 'Cali, Colombia' }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 animate-slide-in group cursor-pointer hover:translate-x-2 transition-transform duration-300"
                    style={{ animationDelay: `${(index + 5) * 100}ms` }}
                  >
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                    <span className="text-sm sm:text-base break-all">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Columna de formulario */}
          <div className="md:w-1/2 p-6 sm:p-8 lg:p-10">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {[
                { label: 'Nombre', type: 'text' },
                { label: 'Email', type: 'email' },
              ].map((field, index) => (
                <div 
                  key={index}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-weprom-pink focus:border-transparent outline-none transition-all duration-300 hover:border-gray-400 text-sm sm:text-base"
                    required
                  />
                </div>
              ))}
              
              <div className="animate-fade-in animation-delay-300">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-weprom-pink focus:border-transparent outline-none transition-all duration-300 hover:border-gray-400 text-sm sm:text-base resize-none"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-weprom-dark text-white font-bold py-2.5 sm:py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in animation-delay-500 text-sm sm:text-base"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}