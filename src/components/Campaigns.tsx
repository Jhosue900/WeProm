import { useState, useEffect, useRef } from 'react'; // Añadido useRef
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react'; // Añadidos Chevrons

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

  const WHATSAPP_NUMBER = "523334590989";

  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      // 420px es ideal para las campañas que son más grandes
      const scrollAmount = direction === 'left' ? -420 : 420;
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

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
            {/* <div className="flex items-center gap-3 bg-gradient-to-r from-weprom-red/10 via-weprom-yellow/10 to-weprom-blue/10 dark:from-weprom-red/20 dark:via-weprom-yellow/20 dark:to-weprom-blue/20 px-5 py-2.5 rounded-full border border-weprom-yellow/30">
              <Sparkles className="w-5 h-5 text-weprom-yellow animate-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue bg-clip-text text-transparent uppercase tracking-widest">
                Campañas Destacadas
              </span>
            </div> */}
          </motion.div>

          {/* Título */}
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-4"
          >
            Artículos de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue">
              Temporada
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
            Conoce nuestras colecciones exclusivas, diseñadas para impulsar y posicionar tu marca 
          </motion.p>
        </motion.div>

        
        {/* Carrusel de Campañas */}
        <div className="relative mt-8 group/container">
          
          {/* Controles Mobile */}
          <div className="flex sm:hidden justify-end gap-3 mb-6 px-4">
            <button 
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 active:scale-90 transition-transform"
            >
              <ChevronLeft className="w-6 h-6 text-weprom-red" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 active:scale-90 transition-transform"
            >
              <ChevronRight className="w-6 h-6 text-weprom-red" />
            </button>
          </div>

          {/* Máscaras laterales fijas */}
          <div className="absolute inset-y-0 left-0 w-12 sm:w-32 z-20 pointer-events-none bg-gradient-to-r from-weprom-gray-50 dark:from-weprom-dark to-transparent"></div>
          <div className="absolute inset-y-0 right-0 w-12 sm:w-32 z-20 pointer-events-none bg-gradient-to-l from-weprom-gray-50 dark:from-weprom-dark to-transparent"></div>

          {/* Área de Scroll */}
          <div 
            ref={containerRef} 
            className="w-full overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-6"
          >
            <motion.div
              className="flex gap-8 w-max pb-12 pt-4"
              animate={typeof window !== 'undefined' && window.innerWidth > 640 ? { x: ["0%", "-33.33%"] } : {}} 
              transition={{
                ease: "linear",
                duration: 50, // Un poco más rápido que productos porque son menos cards
                repeat: Infinity,
              }}
              drag="x"
              dragConstraints={containerRef}
              dragElastic={0.05}
              whileHover={{ animationPlayState: "paused" }}
            >
              {[...campaigns, ...campaigns, ...campaigns].map((campaign, index) => {
                const color = rainbowColors[index % 4];
                return (
                  <div
                    key={`${campaign.id}-${index}`}
                    className="group relative flex-shrink-0 w-[300px] sm:w-[450px] overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer bg-gradient-to-br from-white to-weprom-gray-50 dark:from-weprom-dark-gray dark:to-weprom-dark border border-gray-200 dark:border-gray-800"
                  >
                    {/* Contenedor de imagen */}
                    <div className="relative h-56 sm:h-72 overflow-hidden rounded-t-3xl">
                      <img
                        src={campaign.img}
                        alt={campaign.title}
                        draggable="false"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 select-none"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="absolute top-4 right-4 px-4 py-2 rounded-full text-xs font-bold text-white shadow-lg bg-gradient-to-r from-weprom-red to-weprom-yellow backdrop-blur-sm border border-white/20">
                        ✨ Nuevo
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-6 sm:p-8 space-y-4 select-none">
                      <div className={`w-16 h-1 rounded-full bg-weprom-${color}`}></div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-weprom-gray-900 dark:text-weprom-white group-hover:text-weprom-red transition-colors duration-200 line-clamp-1">
                        {campaign.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-weprom-gray-600 dark:text-weprom-gray-400 leading-relaxed line-clamp-2 min-h-[40px]">
                        {campaign.desc}
                      </p>
                      
                      <div className="pt-2">
                        <motion.a
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                            `Hola! Me interesa la campaña: ${campaign.title}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold bg-weprom-${color} text-white shadow-lg text-sm`}
                        >
                          <span>Conocer más</span>
                          <ChevronRight className="w-4 h-4" />
                        </motion.a>
                      </div>
                    </div>

                    {/* Barra inferior animada */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-weprom-${color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-b-3xl`}></div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

      
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-rainbow"></div>
    </section>
  );
}