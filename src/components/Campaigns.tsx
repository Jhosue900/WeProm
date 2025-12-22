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

  if (loading) {
    return (
      <section id="campañas" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
              Nuevas Campañas
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
              Cargando campañas...
            </p>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="campañas" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
              Nuevas Campañas
            </h2>
            <p className="text-sm sm:text-base text-red-600 max-w-2xl mx-auto px-4">
              {error}
            </p>
            <button
              onClick={loadCampaigns}
              className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
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
      <section id="campañas" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
              Nuevas Campañas
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
              No hay campañas disponibles en este momento.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="campañas" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            Nuevas Campañas
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Descubre nuestras colecciones de temporada. Sección actualizable dinámicamente.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {campaigns.map((campaign, index) => (
            <div
              key={campaign.id}
              className="group relative overflow-hidden rounded-xl sm:rounded-3xl shadow-lg cursor-pointer h-64 sm:h-72 lg:h-80 animate-fade-in-up hover:shadow-2xl transition-shadow duration-500"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <img
                src={campaign.img}
                alt={campaign.title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&h=400&fit=crop';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 sm:p-6 text-white">
                <h3 className="text-xl sm:text-2xl font-bold mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {campaign.title}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 transform translate-y-2 group-hover:translate-y-0">
                  {campaign.desc}
                </p>
              </div>
              
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}