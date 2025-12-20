import { Mail, Phone, MapPin } from 'lucide-react';
import { FormEvent } from 'react';

export default function Contact() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Mensaje enviado!');
  };

  return (
    <section id="contacto" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2 p-10 bg-weprom-pink text-white flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4">Hablemos de tu proyecto</h3>
            <p className="mb-6 opacity-90">
              ¿Tienes una idea en mente? Escríbenos y te ayudamos a hacerla realidad.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail />
                <span>hola@weprom.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone />
                <span>+57 300 123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin />
                <span>Cali, Colombia</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 p-10">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-weprom-pink focus:border-transparent outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-weprom-pink focus:border-transparent outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-weprom-pink focus:border-transparent outline-none"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-weprom-dark text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition"
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
