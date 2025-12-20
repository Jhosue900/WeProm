import { Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-white border-t py-8 sm:py-10">
      <div className="container mx-auto px-4 sm:px-6 text-center text-gray-500">
        <div className="flex justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <a 
                key={index}
                href={social.href} 
                className="hover:text-weprom-pink transition-all duration-300 transform hover:scale-125 hover:-translate-y-1 animate-fade-in p-2"
                style={{ animationDelay: `${index * 100}ms` }}
                aria-label={social.label}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            );
          })}
        </div>
        <p className="animate-fade-in animation-delay-300 text-xs sm:text-sm">
          &copy; 2025 WeProm. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}