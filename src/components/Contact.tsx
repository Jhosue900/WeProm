import { Mail, Phone, MapPin, CheckCircle, XCircle } from 'lucide-react';
import { FormEvent, useState } from 'react';

// Configuración de la API
const API_URL = 'https://we-prom-backend.vercel.app';

// Modal de éxito
const SuccessModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-weprom-dark-gray rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-weprom-green to-emerald-500 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-2">
              ¡Mensaje enviado!
            </h3>
            <p className="text-weprom-gray-600 dark:text-weprom-gray-400 mb-6">
              Hemos recibido tu mensaje. Te contactaremos lo mas rapido posible.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-weprom-green to-emerald-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    privacy: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validaciones
    if (!formData.privacy) {
      alert('Debes aceptar la política de privacidad');
      return;
    }

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Reset form
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          message: '',
          privacy: false
        });
        
        // Show success modal
        setShowSuccessModal(true);
      } else {
        alert(result.message || 'Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      alert('Error de conexión. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
      
      <section id="contacto" className="py-12 sm:py-16 lg:py-20 bg-weprom-light-bg dark:bg-gradient-dark">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="bg-white dark:bg-weprom-dark-gray rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row animate-fade-in-up hover:shadow-2xl transition-all duration-500 border border-weprom-gray-200 dark:border-weprom-gray-800">
            
            {/* Columna de información */}
            <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-weprom-gray-50 to-white dark:from-weprom-dark via-weprom-dark-gray to-weprom-dark text-weprom-gray-900 dark:text-weprom-white flex flex-col justify-center relative overflow-hidden border-r border-weprom-gray-200 dark:border-weprom-gray-800">
              <div className="absolute -top-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 bg-weprom-red/20 dark:bg-weprom-red/10 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 bg-weprom-blue/20 dark:bg-weprom-blue/10 rounded-full animate-pulse animation-delay-500"></div>
              
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
                <p className="mb-5 sm:mb-6 text-white text-sm sm:text-base font-light animate-fade-in animation-delay-300 leading-relaxed opacity-90">
                  ¿Tienes una idea en mente? Escríbenos y te ayudamos a hacerla realidad con nuestros servicios de personalización.
                </p>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { 
                      icon: Mail, 
                      text: 'info@weprommexico.com', 
                      color: 'red',
                      title: 'Email',
                      link: 'mailto:info@weprommexico.com'
                    },
                    { 
                      icon: Phone, 
                      text: '+52 333 459 0989', 
                      color: 'blue',
                      title: 'Teléfono',
                      link: 'tel:+523334590989'
                    },
                    { 
                      icon: MapPin, 
                      text: ['Corrientes 3071, Col. Providencia,', 'Guadalajara, Jalisco.'],
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
                        <p className="text-xs text-white/70 font-medium uppercase tracking-wider">{item.title}</p>

                        <p className="text-sm sm:text-base font-semibold break-all text-white group-hover:text-white transition-colors">
                          {Array.isArray(item.text) ? (
                            item.text.map((line, i) => (
                              <span key={i} className="block">{line}</span>
                            ))
                          ) : (
                            item.text
                          )}
                        </p>

                      </div>
                    </a>
                  ))}
                </div>
                
                <div className="mt-6 p-4 rounded-lg bg-white/50 dark:bg-weprom-dark/50 border border-weprom-gray-200 dark:border-weprom-gray-800">
                  <p className="text-sm font-semibold text-weprom-gray-900 dark:text-weprom-white mb-1">Horarios de atención:</p>
                  <p className="text-lg text-weprom-gray-900 text-black font-bold dark:text-weprom-gray-200">
                    Lunes a Viernes de 9:00am a 6:00pm
                  </p>
                </div>
              </div>
            </div>
            
            {/* Columna de formulario */}
            <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 bg-white dark:bg-weprom-dark">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="animate-fade-in">
                  <label className="block text-sm font-semibold mb-2 text-weprom-gray-900 dark:text-weprom-white">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-3 bg-white dark:bg-weprom-dark-gray border border-weprom-gray-300 dark:border-weprom-gray-800 rounded-lg focus:ring-2 focus:ring-weprom-red focus:border-transparent outline-none transition-all duration-300 hover:border-weprom-gray-400 dark:hover:border-weprom-gray-700 text-sm sm:text-base text-weprom-gray-900 dark:text-weprom-white font-light placeholder:text-weprom-gray-500 dark:placeholder:text-weprom-gray-600"
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div className="animate-fade-in animation-delay-100">
                  <label className="block text-sm font-semibold mb-2 text-weprom-gray-900 dark:text-weprom-white">
                    Empresa
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-3 bg-white dark:bg-weprom-dark-gray border border-weprom-gray-300 dark:border-weprom-gray-800 rounded-lg focus:ring-2 focus:ring-weprom-red focus:border-transparent outline-none transition-all duration-300 hover:border-weprom-gray-400 dark:hover:border-weprom-gray-700 text-sm sm:text-base text-weprom-gray-900 dark:text-weprom-white font-light placeholder:text-weprom-gray-500 dark:placeholder:text-weprom-gray-600"
                    placeholder="Nombre de tu empresa"
                  />
                </div>
                
                <div className="animate-fade-in animation-delay-100">
                  <label className="block text-sm font-semibold mb-2 text-weprom-gray-900 dark:text-weprom-white">
                    Correo *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-3 bg-white dark:bg-weprom-dark-gray border border-weprom-gray-300 dark:border-weprom-gray-800 rounded-lg focus:ring-2 focus:ring-weprom-red focus:border-transparent outline-none transition-all duration-300 hover:border-weprom-gray-400 dark:hover:border-weprom-gray-700 text-sm sm:text-base text-weprom-gray-900 dark:text-weprom-white font-light placeholder:text-weprom-gray-500 dark:placeholder:text-weprom-gray-600"
                    placeholder="tucorreo@ejemplo.com"
                    required
                  />
                </div>
                
                <div className="animate-fade-in animation-delay-200">
                  <label className="block text-sm font-semibold mb-2 text-weprom-gray-900 dark:text-weprom-white">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-3 bg-white dark:bg-weprom-dark-gray border border-weprom-gray-300 dark:border-weprom-gray-800 rounded-lg focus:ring-2 focus:ring-weprom-red focus:border-transparent outline-none transition-all duration-300 hover:border-weprom-gray-400 dark:hover:border-weprom-gray-700 text-sm sm:text-base text-weprom-gray-900 dark:text-weprom-white font-light placeholder:text-weprom-gray-500 dark:placeholder:text-weprom-gray-600"
                    placeholder="+52 300 123 4567"
                    required
                  />
                </div>
                
                <div className="animate-fade-in animation-delay-300">
                  <label className="block text-sm font-semibold mb-2 text-weprom-gray-900 dark:text-weprom-white">
                    Mensaje *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 bg-white dark:bg-weprom-dark-gray border border-weprom-gray-300 dark:border-weprom-gray-800 rounded-lg focus:ring-2 focus:ring-weprom-red focus:border-transparent outline-none transition-all duration-300 hover:border-weprom-gray-400 dark:hover:border-weprom-gray-700 text-sm sm:text-base resize-none text-weprom-gray-900 dark:text-weprom-white font-light placeholder:text-weprom-gray-500 dark:placeholder:text-weprom-gray-600"
                    placeholder="Cuéntanos sobre tu proyecto o idea..."
                    required
                  ></textarea>
                </div>
                
                <div className="animate-fade-in animation-delay-400">
                  <label className="flex items-center gap-2 text-sm text-weprom-gray-600 dark:text-weprom-gray-400 cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="privacy"
                      checked={formData.privacy}
                      onChange={handleChange}
                      className="rounded border-weprom-gray-300" 
                      required 
                    />
                    <span>Acepto la política de privacidad y tratamiento de datos *</span>
                  </label>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-weprom-red to-weprom-yellow text-white font-semibold py-2.5 sm:py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in animation-delay-500 text-sm sm:text-base group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Mensaje
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </span>
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-xs text-weprom-gray-500 dark:text-weprom-gray-400">
                  Te responderemos los mas rapido posible
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}