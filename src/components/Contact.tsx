import { Mail, Phone, MapPin } from 'lucide-react';
import { FormEvent } from 'react';

export default function Contact() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Mensaje enviado! Nos pondremos en contacto contigo pronto.');
  };

  return (
    <section id="contacto" className="py-12 sm:py-16 lg:py-20 bg-weprom-light-bg dark:bg-gradient-dark">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="bg-white dark:bg-weprom-dark-gray rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row animate-fade-in-up hover:shadow-2xl transition-all duration-500 border border-weprom-gray-200 dark:border-weprom-gray-800">
          
          {/* Columna de información - FONDO CORREGIDO */}
          <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 bg-gradient-to-gre from-weprom-gray-0 to-white dark:from-weprom-dark via-weprom-dark-gray to-weprom-dark text-weprom-gray-900 dark:text-weprom-white flex flex-col justify-center relative overflow-hidden border-r border-weprom-gray-200 dark:border-weprom-gray-800">
            {/* Efectos decorativos sutiles - MODIFICADOS PARA MODO CLARO */}
            <div className="absolute -top-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 bg-weprom-red/20 dark:bg-weprom-red/10 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 bg-weprom-blue/20 dark:bg-weprom-blue/10 rounded-full animate-pulse animation-delay-500"></div>
            
            {/* Acento de color */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-weprom-yellow to-weprom-red"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 mb-3">
                <div className="h-0.5 w-6 bg-gradient-to-r from-weprom-red to-weprom-yellow"></div>
                <span className="text-xs font-semibold text-weprom-red uppercase tracking-widest">
                  Contacto
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold mb-3 sm:mb-4 animate-slide-in tracking-wide">
                Hablemos de tu proyecto
              </h3>
              <p className="mb-5 sm:mb-6 text-weprom-gray-600 dark:text-weprom-gray-400 text-sm sm:text-base font-light animate-fade-in animation-delay-300 leading-relaxed">
                ¿Tienes una idea en mente? Escríbenos y te ayudamos a hacerla realidad con nuestros servicios de personalización.
              </p>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { 
                    icon: Mail, 
                    text: 'hola@weprom.com', 
                    color: 'red',
                    title: 'Email',
                    link: 'mailto:hola@weprom.com'
                  },
                  { 
                    icon: Phone, 
                    text: '+57 300 123 4567', 
                    color: 'blue',
                    title: 'Teléfono',
                    link: 'tel:+573001234567'
                  },
                  { 
                    icon: MapPin, 
                    text: 'Cali, Colombia', 
                    color: 'green',
                    title: 'Ubicación',
                    link: '#'
                  }
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className="flex items-center gap-3 animate-slide-in group cursor-pointer hover:translate-x-2 transition-all duration-300 block"
                    style={{ animationDelay: `${(index + 5) * 100}ms` }}
                  >
                    <div className={`w-10 h-10 rounded-lg bg-white dark:bg-weprom-dark border border-weprom-gray-200 dark:border-weprom-gray-800 flex items-center justify-center group-hover:border-weprom-${item.color} transition-all duration-300 group-hover:bg-weprom-${item.color}/10`}>
                      <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300 flex-shrink-0 text-weprom-${item.color}`} />
                    </div>
                    <div>
                      <p className="text-xs text-weprom-gray-500 dark:text-weprom-gray-400 font-light">{item.title}</p>
                      <p className="text-sm sm:text-base font-semibold break-all text-weprom-gray-800 dark:text-weprom-gray-300 group-hover:text-weprom-gray-900 dark:group-hover:text-weprom-white transition-colors">
                        {item.text}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
              
              {/* Horarios de atención */}
              <div className="mt-6 p-4 rounded-lg bg-white/50 dark:bg-weprom-dark/50 border border-weprom-gray-200 dark:border-weprom-gray-800">
                <p className="text-sm font-semibold text-weprom-gray-800 dark:text-weprom-white mb-1">Horarios de atención</p>
                <p className="text-xs text-weprom-gray-600 dark:text-weprom-gray-400">
                  Lunes a Viernes: 8:00 AM - 6:00 PM
                </p>
                <p className="text-xs text-weprom-gray-600 dark:text-weprom-gray-400">
                  Sábados: 9:00 AM - 1:00 PM
                </p>
              </div>
            </div>
          </div>
          
          {/* Columna de formulario */}
          <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 bg-white dark:bg-weprom-dark">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="animate-fade-in">
                <label className="block text-sm font-semibold mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  className="w-full px-3 sm:px-4 py-3 bg-white dark:bg-weprom-dark-gray border border-weprom-gray-300 dark:border-weprom-gray-800 rounded-lg focus:ring-2 focus:ring-weprom-red focus:border-transparent outline-none transition-all duration-300 hover:border-weprom-gray-400 dark:hover:border-weprom-gray-700 text-sm sm:text-base text-weprom-gray-900 dark:text-weprom-white font-light placeholder:text-weprom-gray-500 dark:placeholder:text-weprom-gray-600"
                  placeholder="Tu nombre"
                  required
                />
              </div>
              
              <div className="animate-fade-in animation-delay-100">
                <label className="block text-sm font-semibold mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  className="w-full px-3 sm:px-4 py-3 bg-white dark:bg-weprom-dark-gray border border-weprom-gray-300 dark:border-weprom-gray-800 rounded-lg focus:ring-2 focus:ring-weprom-red focus:border-transparent outline-none transition-all duration-300 hover:border-weprom-gray-400 dark:hover:border-weprom-gray-700 text-sm sm:text-base text-weprom-gray-900 dark:text-weprom-white font-light placeholder:text-weprom-gray-500 dark:placeholder:text-weprom-gray-600"
                  placeholder="tucorreo@ejemplo.com"
                  required
                />
              </div>
              
              <div className="animate-fade-in animation-delay-200">
                <label className="block text-sm font-semibold mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  className="w-full px-3 sm:px-4 py-3 bg-white dark:bg-weprom-dark-gray border border-weprom-gray-300 dark:border-weprom-gray-800 rounded-lg focus:ring-2 focus:ring-weprom-red focus:border-transparent outline-none transition-all duration-300 hover:border-weprom-gray-400 dark:hover:border-weprom-gray-700 text-sm sm:text-base text-weprom-gray-900 dark:text-weprom-white font-light placeholder:text-weprom-gray-500 dark:placeholder:text-weprom-gray-600"
                  placeholder="+57 300 123 4567"
                />
              </div>
              
              <div className="animate-fade-in animation-delay-300">
                <label className="block text-sm font-semibold mb-2">
                  Mensaje *
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 bg-white dark:bg-weprom-dark-gray border border-weprom-gray-300 dark:border-weprom-gray-800 rounded-lg focus:ring-2 focus:ring-weprom-red focus:border-transparent outline-none transition-all duration-300 hover:border-weprom-gray-400 dark:hover:border-weprom-gray-700 text-sm sm:text-base resize-none text-weprom-gray-900 dark:text-weprom-white font-light placeholder:text-weprom-gray-500 dark:placeholder:text-weprom-gray-600"
                  placeholder="Cuéntanos sobre tu proyecto o idea..."
                  required
                ></textarea>
              </div>
              
              <div className="animate-fade-in animation-delay-400">
                <label className="flex items-center gap-2 text-sm text-weprom-gray-600 dark:text-weprom-gray-400">
                  <input type="checkbox" className="rounded border-weprom-gray-300" required />
                  <span>Acepto la política de privacidad y tratamiento de datos *</span>
                </label>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-weprom-red to-weprom-yellow text-white font-semibold py-2.5 sm:py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in animation-delay-500 text-sm sm:text-base group"
              >
                <span className="flex items-center justify-center gap-2">
                  Enviar Mensaje
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </button>
            </form>
            
            {/* Información adicional */}
            <div className="mt-6 text-center">
              <p className="text-xs text-weprom-gray-500 dark:text-weprom-gray-400">
                Te responderemos en un máximo de 24 horas hábiles
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}