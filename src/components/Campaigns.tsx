import { useState, useEffect } from 'react';

// Configuración de la API
const API_URL = 'https://we-prom-backend.vercel.app';

interface Campaign {
  id: number;
  title: string;
  desc: string;
  img: string;
}

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar campañas desde el servidor
  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/campaigns`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setCampaigns(result.data);
      } else {
        throw new Error(result.message || 'Error al cargar las campañas');
      }
    } catch (error) {
      console.error('Error cargando campañas:', error);
      setError('No se pudieron cargar las campañas. Intenta de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  // Colores del Rainbow Effect según brandbook
  const rainbowColors = ['red', 'blue', 'green', 'yellow'];

  if (loading) {
    return (
      <section id="campañas" className="py-12 sm:py-16 lg:py-20 bg-gradient-dark">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-weprom-white mb-3 sm:mb-4 px-4 tracking-wide">
              Nuevas Campañas
            </h2>
            <p className="text-sm sm:text-base text-weprom-gray-400 font-light max-w-2xl mx-auto px-4 leading-relaxed">
              Cargando campañas...
            </p>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-transparent border-gradient-to-r from-weprom-red to-weprom-yellow"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="campañas" className="py-12 sm:py-16 lg:py-20 bg-gradient-dark">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-weprom-white mb-3 sm:mb-4 px-4 tracking-wide">
              Nuevas Campañas
            </h2>
            <p className="text-sm sm:text-base text-weprom-red font-light max-w-2xl mx-auto px-4 leading-relaxed">
              {error}
            </p>
            <button
              onClick={loadCampaigns}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-weprom-red to-weprom-yellow text-weprom-white rounded-lg hover:shadow-xl transition-all duration-300 font-semibold transform hover:-translate-y-1"
            >
              Reintentar
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (campaigns.length === 0) {
    return (
      <section id="campañas" className="py-12 sm:py-16 lg:py-20 bg-gradient-dark">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-weprom-white mb-3 sm:mb-4 px-4 tracking-wide">
              Nuevas Campañas
            </h2>
            <p className="text-sm sm:text-base text-weprom-gray-400 font-light max-w-2xl mx-auto px-4 leading-relaxed">
              No hay campañas disponibles en este momento.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="campañas" className="py-12 sm:py-16 lg:py-20 bg-gradient-dark">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header con Dark Effect según brandbook */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-weprom-white mb-3 sm:mb-4 px-4 tracking-wide">
            Nuevas Campañas
          </h2>
          <p className="text-sm sm:text-base text-weprom-gray-400 font-light max-w-2xl mx-auto px-4 leading-relaxed">
            Descubre nuestras colecciones de temporada. Sección actualizable dinámicamente.
          </p>
        </div>

        {/* Grid de campañas con efecto minimalista y Dark Effect */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {campaigns.map((campaign, index) => (
            <div
              key={campaign.id}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg cursor-pointer h-64 sm:h-72 lg:h-80 animate-fade-in-up hover:shadow-xl transition-all duration-500 backdrop-blur-sm"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Imagen con Vintage Effect (B&W) */}
              <img
                src={campaign.img}
                alt={campaign.title}
                className="absolute inset-0 w-full h-full object-cover filter grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&h=400&fit=crop';
                }}
              />
              
              {/* Overlay oscuro según Dark Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-weprom-dark via-weprom-dark/70 to-transparent"></div>
              
              {/* Acento de color minimalista (Rainbow Effect) */}
              <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-weprom-${rainbowColors[index % 4]} to-transparent opacity-80 group-hover:w-2 transition-all duration-300`}></div>
              
              {/* Contenido de texto */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 text-weprom-white">
                <h3 className="text-xl sm:text-2xl font-extrabold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 tracking-wide bg-gradient-to-r from-weprom-white to-weprom-gray-300 bg-clip-text text-transparent group-hover:from-weprom-red group-hover:to-weprom-yellow">
                  {campaign.title}
                </h3>
                <p className="text-weprom-gray-300 text-xs sm:text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 transform translate-y-2 group-hover:translate-y-0 leading-relaxed">
                  {campaign.desc}
                </p>
              </div>
              
              {/* Efecto de brillo sutil en hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}