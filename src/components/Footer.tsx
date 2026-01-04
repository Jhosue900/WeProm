import { Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'red' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'blue' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'green' }
  ];

  return (
    <footer className="bg-white dark:bg-weprom-dark border-t border-weprom-gray-200 dark:border-weprom-gray-800 py-8 sm:py-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo y copyright */}
          <div className="text-center md:text-left">
            <div className="text-xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-2">
              WeProm
            </div>
            <p className="text-xs sm:text-sm font-light text-weprom-gray-600 dark:text-weprom-gray-400">
              Marketing & Promociones Personalizadas
            </p>
            <p className="text-xs text-weprom-gray-500 dark:text-weprom-gray-500 mt-4">
              &copy; 2025 WeProm Marketing. Todos los derechos reservados.
            </p>
          </div>
          
          {/* Redes sociales */}
          <div className="flex justify-center gap-4 sm:gap-6">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a 
                  key={index}
                  href={social.href} 
                  className={`hover-lift animate-fade-in p-3 bg-white dark:bg-weprom-dark-gray rounded-lg border border-weprom-gray-200 dark:border-weprom-gray-800 hover:border-weprom-${social.color} hover:shadow-lg transition-all duration-300 group`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  aria-label={social.label}
                >
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 text-weprom-gray-600 dark:text-weprom-gray-400 group-hover:text-weprom-${social.color} transition-colors duration-300`} />
                </a>
              );
            })}
          </div>
          
          {/* Enlaces rápidos */}
          <div className="text-center md:text-right">
            <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
              <a href="#" className="text-weprom-gray-600 dark:text-weprom-gray-400 hover:text-weprom-red transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-weprom-gray-600 dark:text-weprom-gray-400 hover:text-weprom-blue transition-colors">
                Términos y Condiciones
              </a>
              <a href="#" className="text-weprom-gray-600 dark:text-weprom-gray-400 hover:text-weprom-green transition-colors">
                Contacto
              </a>
            </div>
          </div>
        </div>
        
        {/* Línea decorativa */}
        <div className="mt-8 h-0.5 w-32 sm:w-40 mx-auto bg-gradient-rainbow opacity-60 rounded-full"></div>
      </div>
    </footer>
  );
}