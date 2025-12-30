import { Mail, Phone, MapPin } from 'lucide-react';
import { FormEvent } from 'react';

export default function Contact() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Mensaje enviado!');
  };

  return (
    <section id="contacto" className="py-12 sm:py-16 lg:py-20 bg-gradient-dark">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="bg-gradient-to-b from-weprom-dark-gray to-weprom-dark rounded-xl sm:rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row animate-fade-in-up hover:shadow-2xl transition-all duration-500 border border-weprom-gray-800 backdrop-blur-sm">
          
          {/* Columna de información con Rainbow Gradient minimalista */}
          <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-weprom-dark via-weprom-dark-gray to-weprom-dark text-weprom-white flex flex-col justify-center relative overflow-hidden border-r border-weprom-gray-800">
            {/* Efectos decorativos sutiles */}
            <div className="absolute -top-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 bg-weprom-red/10 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 bg-weprom-blue/10 rounded-full animate-pulse animation-delay-500"></div>
            
            {/* Acento de color minimalista */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-weprom-yellow to-transparent"></div>
            
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-extrabold mb-3 sm:mb-4 animate-slide-in tracking-wide">
                Hablemos de tu proyecto
              </h3>
              <p className="mb-5 sm:mb-6 text-weprom-gray-400 text-sm sm:text-base font-light animate-fade-in animation-delay-300 leading-relaxed">
                ¿Tienes una idea en mente? Escríbenos y te ayudamos a hacerla realidad.
              </p>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { icon: Mail, text: 'hola@weprom.com', color: 'red' },
                  { icon: Phone, text: '+57 300 123 4567', color: 'blue' },
                  { icon: MapPin, text: 'Cali, Colombia', color: 'green' }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 animate-slide-in group cursor-pointer hover:translate-x-2 transition-transform duration-300"
                    style={{ animationDelay: `${(index + 5) * 100}ms` }}
                  >
                    <div className={`w-10 h-10 rounded-lg bg-weprom-dark-gray border border-weprom-gray-800 flex items-center justify-center group-hover:border-weprom-${item.color} transition-all duration-300 group-hover:bg-weprom-${item.color}/10`}>
                      <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300 flex-shrink-0 text-weprom-${item.color}`} />
                    </div>
                    <span className="text-sm sm:text-base font-light break-all text-weprom-gray-300 group-hover:text-weprom-white transition-colors">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Columna de formulario con Dark Effect */}
          <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 bg-weprom-dark">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {[
                { label: 'Nombre', type: 'text', color: 'red' },
                { label: 'Email', type: 'email', color: 'blue' },
              ].map((field, index) => (
                <div 
                  key={index}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <label className={`block text-sm font-semibold text-weprom-${field.color} mb-2`}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    className="w-full px-3 sm:px-4 py-3 bg-weprom-dark-gray border border-weprom-gray-800 rounded-lg focus:ring-2 focus:ring-weprom-red focus:border-transparent outline-none transition-all duration-300 hover:border-weprom-gray-700 text-sm sm:text-base text-weprom-white font-light placeholder:text-weprom-gray-600"
                    required
                  />
                </div>
              ))}
              
              <div className="animate-fade-in animation-delay-300">
                <label className="block text-sm font-semibold text-weprom-green mb-2">
                  Mensaje
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 bg-weprom-dark-gray border border-weprom-gray-800 rounded-lg focus:ring-2 focus:ring-weprom-red focus:border-transparent outline-none transition-all duration-300 hover:border-weprom-gray-700 text-sm sm:text-base resize-none text-weprom-white font-light placeholder:text-weprom-gray-600"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-weprom-red to-weprom-yellow text-weprom-white font-semibold py-2.5 sm:py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in animation-delay-500 text-sm sm:text-base"
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