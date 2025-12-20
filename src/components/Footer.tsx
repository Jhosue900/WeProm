import { Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t py-10">
      <div className="container mx-auto px-6 text-center text-gray-500">
        <div className="flex justify-center gap-6 mb-6">
          <a href="#" className="hover:text-weprom-pink transition">
            <Facebook />
          </a>
          <a href="#" className="hover:text-weprom-pink transition">
            <Instagram />
          </a>
          <a href="#" className="hover:text-weprom-pink transition">
            <Linkedin />
          </a>
        </div>
        <p>&copy; 2024 WeProm. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
