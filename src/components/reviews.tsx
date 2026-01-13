import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, ChevronLeft, ChevronRight, Quote, MapPin, 
  Calendar, ThumbsUp, User, Filter, Sparkles,
  CheckCircle, Award, Shield
} from 'lucide-react';

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
  location: string;
  verified: boolean;
  helpful: number;
  service: string;
  avatarColor: string;
}

export default function GoogleReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState('all');

  // Datos de reseñas simuladas
  const reviews: Review[] = [
    {
      id: 1,
      name: 'María González',
      rating: 5,
      date: 'Hace 2 semanas',
      comment: 'Excelente servicio! Los productos personalizados superaron mis expectativas. La calidad es increíble y el equipo fue muy profesional en todo momento.',
      location: 'Guadalajara, México',
      verified: true,
      helpful: 24,
      service: 'Branding Corporativo',
      avatarColor: 'red'
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      rating: 5,
      date: 'Hace 1 mes',
      comment: 'Trabajamos con WeProm para nuestra campaña de lanzamiento y los resultados fueron espectaculares. Los diseños creativos y la atención al detalle hacen la diferencia.',
      location: 'CDMX, México',
      verified: true,
      helpful: 18,
      service: 'Campaña Publicitaria',
      avatarColor: 'blue'
    },
    {
      id: 3,
      name: 'Ana Martínez',
      rating: 5,
      date: 'Hace 3 días',
      comment: 'Los mejores en personalización de productos. Rápidos, eficientes y con precios competitivos. Definitivamente los recomendaré a todos mis contactos.',
      location: 'Monterrey, México',
      verified: true,
      helpful: 12,
      service: 'Merchandising',
      avatarColor: 'green'
    },
    {
      id: 4,
      name: 'David López',
      rating: 5,
      date: 'Hace 2 meses',
      comment: 'La calidad de los materiales es superior. Nuestros clientes quedaron encantados con los productos personalizados. Volveremos a trabajar con ellos sin duda.',
      location: 'Mérida, México',
      verified: true,
      helpful: 31,
      service: 'Productos Promocionales',
      avatarColor: 'yellow'
    },
    {
      id: 5,
      name: 'Laura Pérez',
      rating: 5,
      date: 'Hace 1 semana',
      comment: 'Asesoramiento excepcional desde el primer contacto. Entendieron perfectamente nuestra visión y la materializaron en productos increíbles.',
      location: 'Colima, México',
      verified: true,
      helpful: 15,
      service: 'Consultoría de Marca',
      avatarColor: 'purple'
    },
    {
      id: 6,
      name: 'Roberto Silva',
      rating: 5,
      date: 'Hace 3 semanas',
      comment: 'Entrega puntual y productos de alta calidad. El equipo de diseño es muy creativo y supo captar la esencia de nuestra marca perfectamente.',
      location: 'Tijuana, México',
      verified: true,
      helpful: 22,
      service: 'Diseño Gráfico',
      avatarColor: 'teal'
    }
  ];

  // Estadísticas generales
  const stats = {
    averageRating: 4.9,
    totalReviews: 247,
    fiveStarReviews: 238,
    responseRate: '100%',
    responseTime: '< 2 horas'
  };

  // Servicios más evaluados
  const topServices = [
    { name: 'Branding Corporativo', reviews: 89, rating: 4.9 },
    { name: 'Productos Promocionales', reviews: 76, rating: 4.8 },
    { name: 'Campañas Publicitarias', reviews: 62, rating: 5.0 },
    { name: 'Diseño Gráfico', reviews: 58, rating: 4.9 }
  ];

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  // Filtrar reseñas por servicio
  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(review => review.service === filter);

  // Renderizar estrellas
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-weprom-yellow fill-weprom-yellow' : 'text-gray-300 dark:text-gray-600'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="reseñas" className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-weprom-gray-50 via-white to-weprom-gray-50 dark:from-weprom-dark dark:via-weprom-dark-gray dark:to-weprom-dark overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-rainbow"></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-weprom-blue/5 dark:bg-weprom-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-weprom-red/5 dark:bg-weprom-red/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-weprom-green/5 dark:bg-weprom-green/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header de la sección */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          {/* Badge Google */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="flex items-center gap-3 bg-gradient-to-r from-weprom-red/10 via-weprom-yellow/10 to-weprom-blue/10 dark:from-weprom-red/20 dark:via-weprom-yellow/20 dark:to-weprom-blue/20 px-5 py-2.5 rounded-full border border-weprom-yellow/30">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">G</span>
                </div>
                <span className="text-sm font-semibold bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue bg-clip-text text-transparent uppercase tracking-widest">
                  Reseñas Google
                </span>
              </div>
            </div>
          </motion.div>

          {/* Título principal */}
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-4"
          >
            Lo que dicen nuestros{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue">
              clientes
            </span>
          </motion.h2>

          {/* Descripción */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-md sm:text-xl md:text-2xl font-medium text-weprom-gray-600 dark:text-weprom-gray-400 font-light max-w-2xl mx-auto leading-relaxed italic"
          >
            Experiencias reales de empresas que han transformado su marca con nuestros servicios
          </motion.p>
        </motion.div>

        {/* Estadísticas destacadas */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-weprom-dark-gray rounded-2xl p-6 border border-weprom-gray-200 dark:border-weprom-gray-800 text-center group hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-weprom-red to-weprom-yellow">
                  {stats.averageRating}
                </div>
                <div className="flex gap-0.5">
                  <Star className="w-5 h-5 text-weprom-yellow fill-weprom-yellow" />
                  <Star className="w-5 h-5 text-weprom-yellow fill-weprom-yellow" />
                  <Star className="w-5 h-5 text-weprom-yellow fill-weprom-yellow" />
                  <Star className="w-5 h-5 text-weprom-yellow fill-weprom-yellow" />
                  <Star className="w-5 h-5 text-weprom-yellow fill-weprom-yellow" />
                </div>
              </div>
              <p className="text-sm text-weprom-gray-600 dark:text-weprom-gray-400">Calificación promedio</p>
            </div>

            <div className="bg-white dark:bg-weprom-dark-gray rounded-2xl p-6 border border-weprom-gray-200 dark:border-weprom-gray-800 text-center group hover:shadow-xl transition-all duration-300">
              <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-weprom-blue to-weprom-green mb-3">
                {stats.totalReviews}+
              </div>
              <p className="text-sm text-weprom-gray-600 dark:text-weprom-gray-400">Reseñas verificadas</p>
            </div>

            <div className="bg-white dark:bg-weprom-dark-gray rounded-2xl p-6 border border-weprom-gray-200 dark:border-weprom-gray-800 text-center group hover:shadow-xl transition-all duration-300">
              <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-weprom-green to-weprom-blue mb-3">
                {stats.fiveStarReviews}
              </div>
              <p className="text-sm text-weprom-gray-600 dark:text-weprom-gray-400">Reseñas 5 estrellas</p>
            </div>

            <div className="bg-white dark:bg-weprom-dark-gray rounded-2xl p-6 border border-weprom-gray-200 dark:border-weprom-gray-800 text-center group hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Shield className="w-6 h-6 text-weprom-green" />
                <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-weprom-red to-weprom-yellow">
                  {stats.responseRate}
                </div>
              </div>
              <p className="text-sm text-weprom-gray-600 dark:text-weprom-gray-400">Respuesta a reseñas</p>
            </div>
          </div>
        </motion.div>

        
        {/* Carrusel de reseñas */}
        <div className="relative mb-12">
          <div className="overflow-hidden rounded-2xl">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-white to-weprom-gray-50 dark:from-weprom-dark-gray dark:to-weprom-dark rounded-2xl p-6 sm:p-8 border-2 border-weprom-gray-200 dark:border-weprom-gray-800"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Columna izquierda - Reseña principal */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-weprom-${reviews[currentIndex].avatarColor} to-weprom-yellow flex items-center justify-center text-white font-bold text-lg`}>
                        {reviews[currentIndex].name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-extrabold text-weprom-gray-900 dark:text-weprom-white">
                            {reviews[currentIndex].name}
                          </h3>
                          {reviews[currentIndex].verified && (
                            <div className="flex items-center gap-1 text-weprom-green text-xs">
                              <CheckCircle className="w-4 h-4" />
                              <span className="font-semibold">Verificado</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          {renderStars(reviews[currentIndex].rating)}
                          <span className="text-sm text-weprom-gray-500 dark:text-weprom-gray-400">
                            {reviews[currentIndex].date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Quote className="w-8 h-8 text-weprom-yellow/30" />
                  </div>

                  <div className="mb-6">
                    <p className="text-weprom-gray-700 dark:text-weprom-gray-300 leading-relaxed text-lg italic">
                      "{reviews[currentIndex].comment}"
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-sm text-weprom-gray-600 dark:text-weprom-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{reviews[currentIndex].location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-weprom-gray-600 dark:text-weprom-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{reviews[currentIndex].service}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-weprom-gray-600 dark:text-weprom-gray-400">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{reviews[currentIndex].helpful} personas encontraron útil esta reseña</span>
                    </div>
                  </div>
                </div>

                {/* Columna derecha - Próximas reseñas */}
                <div className="lg:w-1/3">
                  <div className="bg-weprom-gray-50 dark:bg-weprom-dark rounded-xl p-4">
                    <h4 className="font-semibold text-weprom-gray-900 dark:text-weprom-white mb-4 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-weprom-yellow" />
                      Más reseñas destacadas
                    </h4>
                    <div className="space-y-4">
                      {reviews.slice(0, 3).map((review, index) => (
                        <div 
                          key={review.id} 
                          className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${index === 0 ? 'bg-white dark:bg-weprom-dark-gray border border-weprom-gray-200 dark:border-weprom-gray-800' : 'hover:bg-white/50 dark:hover:bg-weprom-dark-gray/50'}`}
                          onClick={() => setCurrentIndex(index)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-weprom-${review.avatarColor} to-weprom-yellow flex items-center justify-center text-white text-xs font-bold`}>
                              {review.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold text-weprom-gray-900 dark:text-weprom-white truncate">
                                  {review.name}
                                </p>
                                {renderStars(review.rating)}
                              </div>
                              <p className="text-xs text-weprom-gray-500 dark:text-weprom-gray-400 truncate">
                                {review.comment.substring(0, 50)}...
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Controles del carrusel */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevReview}
              className="p-3 rounded-full bg-white dark:bg-weprom-dark-gray border border-weprom-gray-300 dark:border-weprom-gray-700 hover:border-weprom-red transition-all duration-300 transform hover:scale-105"
              aria-label="Reseña anterior"
            >
              <ChevronLeft className="w-5 h-5 text-weprom-gray-600 dark:text-weprom-gray-400" />
            </button>
            
            <div className="flex gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex 
                    ? 'bg-gradient-to-r from-weprom-red to-weprom-yellow w-8' 
                    : 'bg-weprom-gray-300 dark:bg-weprom-gray-700 hover:bg-weprom-gray-400 dark:hover:bg-weprom-gray-600'
                  }`}
                  aria-label={`Ir a reseña ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextReview}
              className="p-3 rounded-full bg-white dark:bg-weprom-dark-gray border border-weprom-gray-300 dark:border-weprom-gray-700 hover:border-weprom-blue transition-all duration-300 transform hover:scale-105"
              aria-label="Siguiente reseña"
            >
              <ChevronRight className="w-5 h-5 text-weprom-gray-600 dark:text-weprom-gray-400" />
            </button>
          </div>
        </div>

        </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-rainbow"></div>
    </section>
  );
}