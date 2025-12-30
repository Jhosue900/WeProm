import { Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'red' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'blue' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'green' }
  ];

  return (
    <footer className="bg-gradient-dark border-t border-weprom-gray-800 py-8 sm:py-10">
      <div className="container mx-auto px-4 sm:px-6 text-center text-weprom-gray-400">
        {/* Redes sociales con Rainbow Effect */}
        <div className="flex justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <a 
                key={index}
                href={social.href} 
                className={`hover-lift animate-fade-in p-3 bg-weprom-dark-gray rounded-lg border border-weprom-gray-800 hover:border-weprom-${social.color} hover:shadow-lg transition-all duration-300 group`}
                style={{ animationDelay: `${index * 100}ms` }}
                aria-label={social.label}
              >
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 text-weprom-gray-400 group-hover:text-weprom-${social.color} transition-colors duration-300`} />
              </a>
            );
          })}
        </div>
        
        {/* Copyright con tipografía ligera */}
        <p className="animate-fade-in animation-delay-300 text-xs sm:text-sm font-light text-weprom-gray-500">
          &copy; 2025 WeProm Marketing. Todos los derechos reservados.
        </p>
        
        {/* Línea decorativa con Rainbow gradient */}
        <div className="mt-4 sm:mt-6 h-1 w-32 sm:w-40 mx-auto bg-gradient-rainbow opacity-60 rounded-full"></div>
      </div>
    </footer>
  );
}