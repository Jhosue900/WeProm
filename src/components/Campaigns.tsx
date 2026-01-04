import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

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
  const rainbowColors = ['red', 'yellow', 'green', 'blue'];

  // Loading State
  if (loading) {
    return (
      <section id="campañas" className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-weprom-gray-50 via-white to-weprom-gray-50 dark:from-weprom-dark dark:via-weprom-dark-gray dark:to-weprom-dark overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-rainbow"></div>
        <div className="absolute top-20 right-0 w-72 h-72 bg-weprom-blue/5 dark:bg-weprom-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-weprom-red/5 dark:bg-weprom-red/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <Sparkles className="w-5 h-5 text-weprom-yellow animate-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue bg-clip-text text-transparent uppercase tracking-widest">
                Campañas
              </span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-4">
              Nuevas Campañas
            </h2>
          </div>

          <div className="flex flex-col items-center justify-center h-64">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-weprom-gray-200 dark:border-weprom-gray-800 rounded-full"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-weprom-red border-r-weprom-yellow rounded-full animate-spin"></div>
            </div>
            <p className="mt-6 text-weprom-gray-600 dark:text-weprom-gray-400 font-medium">
              Cargando campañas increíbles...
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section id="campañas" className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-weprom-gray-50 via-white to-weprom-gray-50 dark:from-weprom-dark dark:via-weprom-dark-gray dark:to-weprom-dark overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-rainbow"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <AlertCircle className="w-5 h-5 text-weprom-red" />
              <span className="text-sm font-semibold text-weprom-red uppercase tracking-widest">
                Error
              </span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-4">
              Nuevas Campañas
            </h2>
          </div>

          <div className="max-w-md mx-auto text-center">
            <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-8 mb-6">
              <AlertCircle className="w-12 h-12 text-weprom-red mx-auto mb-4" />
              <p className="text-weprom-gray-700 dark:text-weprom-gray-300 mb-6">
                {error}
              </p>
              <button
                onClick={loadCampaigns}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-weprom-red to-weprom-yellow text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <RefreshCw className="w-5 h-5" />
                Reintentar
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Empty State
  if (campaigns.length === 0) {
    return (
      <section id="campañas" className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-weprom-gray-50 via-white to-weprom-gray-50 dark:from-weprom-dark dark:via-weprom-dark-gray dark:to-weprom-dark overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-rainbow"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <Sparkles className="w-5 h-5 text-weprom-yellow" />
              <span className="text-sm font-semibold bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue bg-clip-text text-transparent uppercase tracking-widest">
                Campañas
              </span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-4">
              Nuevas Campañas
            </h2>
            <p className="text-lg text-weprom-gray-600 dark:text-weprom-gray-400 max-w-2xl mx-auto">
              No hay campañas disponibles en este momento. ¡Pronto habrá novedades!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="campañas" className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-weprom-gray-50 via-white to-weprom-gray-50 dark:from-weprom-dark dark:via-weprom-dark-gray dark:to-weprom-dark overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-rainbow"></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-weprom-blue/5 dark:bg-weprom-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-weprom-red/5 dark:bg-weprom-red/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="flex items-center gap-3 bg-gradient-to-r from-weprom-red/10 via-weprom-yellow/10 to-weprom-blue/10 dark:from-weprom-red/20 dark:via-weprom-yellow/20 dark:to-weprom-blue/20 px-5 py-2.5 rounded-full border border-weprom-yellow/30">
              <Sparkles className="w-5 h-5 text-weprom-yellow animate-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue bg-clip-text text-transparent uppercase tracking-widest">
                Campañas Destacadas
              </span>
            </div>
          </motion.div>

          {/* Título */}
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-4"
          >
            Nuestras{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue">
              Campañas
            </span>
          </motion.h2>

          {/* Descripción */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base sm:text-lg text-weprom-gray-600 dark:text-weprom-gray-400 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Descubre nuestras colecciones exclusivas de temporada, diseñadas para impulsar tu marca
          </motion.p>
        </motion.div>

        {/* Grid de campañas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto">
          {campaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-200 cursor-pointer bg-gradient-to-br from-white to-weprom-gray-50 dark:from-weprom-dark-gray dark:to-weprom-dark"
            >
              {/* Contenedor de imagen */}
              <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-3xl">
                <img
                  src={campaign.img}
                  alt={campaign.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&h=600&fit=crop';
                  }}
                />
                
                {/* Overlay gradiente sutil */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Badge "Nuevo" */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                  <div className={`
                    px-4 py-2 rounded-full text-xs sm:text-sm font-bold text-white shadow-lg
                    bg-gradient-to-r from-weprom-${rainbowColors[index % 4]} to-weprom-yellow
                    backdrop-blur-sm border border-white/20
                  `}>
                    ✨ Nuevo
                  </div>
                </div>

                {/* Número de campaña */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/30 flex items-center justify-center shadow-xl">
                    <span className="text-white font-extrabold text-xl sm:text-2xl">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contenido de texto */}
              <div className="p-6 sm:p-8 space-y-4">
                {/* Línea decorativa */}
                <div className={`w-16 h-1 rounded-full bg-gradient-to-r from-weprom-${rainbowColors[index % 4]} to-weprom-yellow`}></div>

                {/* Título */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-weprom-gray-900 dark:text-weprom-white group-hover:text-weprom-red dark:group-hover:text-weprom-yellow transition-colors duration-200">
                  {campaign.title}
                </h3>

                {/* Descripción */}
                <p className="text-sm sm:text-base text-weprom-gray-600 dark:text-weprom-gray-400 leading-relaxed line-clamp-2">
                  {campaign.desc}
                </p>

                {/* Botón CTA */}
                <div className="pt-2">
                  <button className={`
                    inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold
                    bg-gradient-to-r from-weprom-${rainbowColors[index % 4]} to-weprom-yellow
                    text-white shadow-lg hover:shadow-xl
                    transform hover:scale-105 transition-all duration-200
                    group/btn
                  `}>
                    <span>Ver detalles</span>
                    <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Barra inferior */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-b-3xl"></div>
            </motion.div>
          ))}
        </div>

      
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-rainbow"></div>
    </section>
  );
}