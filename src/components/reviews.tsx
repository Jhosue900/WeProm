import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, ChevronLeft, ChevronRight, Quote, MapPin, 
  Calendar, ThumbsUp, User, Filter, Sparkles,
  CheckCircle, Award, Shield, Loader2, Users
} from 'lucide-react';

// Interface actualizada para coincidir con el backend
interface Review {
  id: number;
  name: string;
  rating: number;
  review: string;
  location: string;
  created_at: string;
  status?: 'published' | 'pending';
  helpfulCount: number; // Añadir helpfulCount
}

export default function GoogleReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState('all');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likedReviews, setLikedReviews] = useState<number[]>([]);

  // Colores para avatares (se generan basados en el nombre)
  const avatarColors = ['red', 'blue', 'green', 'yellow', 'purple', 'teal', 'pink', 'indigo', 'orange', 'cyan'];

  const API_URL = 'https://we-prom-backend.vercel.app';

  // Cargar reseñas del backend
  const loadReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/reviews`);
      const result = await response.json();
      
      if (result.success) {
        // Filtrar solo reseñas publicadas
        const publishedReviews = result.data.filter((review: Review) => 
          review.status === 'published' || !review.status
        );
        setReviews(publishedReviews);
      } else {
        setError('No se pudieron cargar las reseñas');
      }
    } catch (error) {
      console.error('Error cargando reseñas:', error);
      setError('Error al cargar las reseñas. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  // Servicios disponibles (esto podría venir del backend también)
  const services = [
    'Branding Corporativo',
    'Campaña Publicitaria', 
    'Merchandising',
    'Productos Promocionales',
    'Consultoría de Marca',
    'Diseño Gráfico'
  ];

  // Estadísticas calculadas dinámicamente
  const stats = {
    averageRating: reviews.length > 0 
      ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
      : '0.0',
    totalReviews: reviews.length,
    fiveStarReviews: reviews.filter(review => review.rating === 5).length,
    helpfulCountTotal: reviews.reduce((sum, review) => sum + (review.helpfulCount || 0), 0),
    responseRate: '100%',
    responseTime: '< 2 horas'
  };

  // Servicios más evaluados (esto sería mejor calcularlo del backend)
  const topServices = [
    { name: 'Branding Corporativo', reviews: 89, rating: 4.9 },
    { name: 'Productos Promocionales', reviews: 76, rating: 4.8 },
    { name: 'Campañas Publicitarias', reviews: 62, rating: 5.0 },
    { name: 'Diseño Gráfico', reviews: 58, rating: 4.9 }
  ];

  const nextReview = () => {
    if (reviews.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }
  };

  const prevReview = () => {
    if (reviews.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
    }
  };

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
    if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} meses`;
    return `Hace ${Math.floor(diffDays / 365)} años`;
  };

  // Obtener color del avatar basado en el nombre
  const getAvatarColor = (name: string) => {
    const charCode = name.charCodeAt(0);
    return avatarColors[charCode % avatarColors.length];
  };

  // Manejar like en reseña
  const handleLikeReview = (reviewId: number) => {
    if (likedReviews.includes(reviewId)) {
      // Quitar like
      setLikedReviews(prev => prev.filter(id => id !== reviewId));
      // Actualizar contador localmente (simulación)
      setReviews(prev => prev.map(review => 
        review.id === reviewId 
          ? { ...review, helpfulCount: Math.max(0, review.helpfulCount - 1) }
          : review
      ));
    } else {
      // Agregar like
      setLikedReviews(prev => [...prev, reviewId]);
      // Actualizar contador localmente (simulación)
      setReviews(prev => prev.map(review => 
        review.id === reviewId 
          ? { ...review, helpfulCount: (review.helpfulCount || 0) + 1 }
          : review
      ));
    }
  };

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

  // Componente para mostrar el contador de "útil"
  const renderHelpfulCount = (review: Review) => {
    const isLiked = likedReviews.includes(review.id);
    const count = review.helpfulCount || 0;

    if (count > 0) {
      return (
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLikeReview(review.id);
            }}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all duration-200 ${isLiked 
              ? 'bg-weprom-green/20 text-weprom-green border border-weprom-green/30' 
              : 'bg-weprom-gray-100 dark:bg-weprom-dark hover:bg-weprom-gray-200 dark:hover:bg-weprom-dark-gray text-weprom-gray-600 dark:text-weprom-gray-400'
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-weprom-green' : ''}`} />
            <span className="text-sm font-semibold">
              {isLiked ? 'Te pareció útil' : 'A '} ({count}) personas les pareció útil.
            </span>
          </button>
        </div>
      );
    }

    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleLikeReview(review.id);
        }}
        className={`flex items-center gap-1 px-3 py-1 rounded-lg mt-3 transition-all duration-200 ${isLiked 
          ? 'bg-weprom-green/20 text-weprom-green border border-weprom-green/30' 
          : 'bg-weprom-gray-100 dark:bg-weprom-dark hover:bg-weprom-gray-200 dark:hover:bg-weprom-dark-gray text-weprom-gray-600 dark:text-weprom-gray-400'
        }`}
      >
        <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-weprom-green' : ''}`} />
        <span className="text-sm">¿Te pareció útil?</span>
      </button>
    );
  };

  // Si está cargando
  if (loading) {
    return (
      <section id="reseñas" className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-weprom-gray-50 via-white to-weprom-gray-50 dark:from-weprom-dark dark:via-weprom-dark-gray dark:to-weprom-dark overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 text-weprom-yellow animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  // Si hay error
  if (error && reviews.length === 0) {
    return (
      <section id="reseñas" className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-weprom-gray-50 via-white to-weprom-gray-50 dark:from-weprom-dark dark:via-weprom-dark-gray dark:to-weprom-dark overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="bg-white/50 dark:bg-weprom-dark/50 backdrop-blur-sm rounded-2xl p-8 border border-weprom-gray-200 dark:border-weprom-gray-800">
            <p className="text-weprom-gray-600 dark:text-weprom-gray-400 mb-4">{error}</p>
            <button
              onClick={loadReviews}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-weprom-yellow to-weprom-orange text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all"
            >
              <Loader2 className="w-5 h-5" />
              Reintentar
            </button>
          </div>
        </div>
      </section>
    );
  }

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
          {/* Badge Reseñas */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="flex items-center gap-3 bg-gradient-to-r from-weprom-red/10 via-weprom-yellow/10 to-weprom-blue/10 dark:from-weprom-red/20 dark:via-weprom-yellow/20 dark:to-weprom-blue/20 px-5 py-2.5 rounded-full border border-weprom-yellow/30">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-weprom-yellow to-weprom-orange flex items-center justify-center">
                  <Star className="w-3 h-3 text-white fill-white" />
                </div>
                <span className="text-sm font-semibold bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue bg-clip-text text-transparent uppercase tracking-widest">
                  Reseñas de Clientes
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
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
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
              <div className="flex flex-col items-center justify-center gap-1 mb-3">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-6 h-6 text-weprom-blue" />
                  <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-weprom-red to-weprom-yellow">
                    {stats.helpfulCountTotal}+
                  </div>
                </div>
              </div>
              <p className="text-sm text-weprom-gray-600 dark:text-weprom-gray-400">Personas encontraron útil</p>
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

        {/* Carrusel de reseñas - Solo muestra si hay reseñas */}
        {reviews.length > 0 ? (
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
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-weprom-${getAvatarColor(reviews[currentIndex].name)} to-weprom-yellow flex items-center justify-center text-white font-bold text-lg`}>
                          {reviews[currentIndex].name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-extrabold text-weprom-gray-900 dark:text-weprom-white">
                              {reviews[currentIndex].name}
                            </h3>
                            <div className="flex items-center gap-1 text-weprom-green text-xs">
                              <CheckCircle className="w-4 h-4" />
                              <span className="font-semibold">Verificado</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            {renderStars(reviews[currentIndex].rating)}
                            <span className="text-sm text-weprom-gray-500 dark:text-weprom-gray-400">
                              {formatDate(reviews[currentIndex].created_at)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Quote className="w-8 h-8 text-weprom-yellow/30" />
                    </div>

                    <div className="mb-6">
                      <p className="text-weprom-gray-700 dark:text-weprom-gray-300 leading-relaxed text-lg italic">
                        "{reviews[currentIndex].review}"
                      </p>
                    </div>

                    {/* Sección de "¿Te pareció útil?" */}
                    {renderHelpfulCount(reviews[currentIndex])}

                    <div className="flex flex-wrap gap-4 mt-4">
                      {reviews[currentIndex].location && (
                        <div className="flex items-center gap-2 text-sm text-weprom-gray-600 dark:text-weprom-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span>{reviews[currentIndex].location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-weprom-gray-600 dark:text-weprom-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(reviews[currentIndex].created_at)}</span>
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
                            className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${index === currentIndex ? 'bg-white dark:bg-weprom-dark-gray border border-weprom-gray-200 dark:border-weprom-gray-800' : 'hover:bg-white/50 dark:hover:bg-weprom-dark-gray/50'}`}
                            onClick={() => setCurrentIndex(index)}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-weprom-${getAvatarColor(review.name)} to-weprom-yellow flex items-center justify-center text-white text-xs font-bold`}>
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
                                  {review.review.substring(0, 50)}...
                                </p>
                                
                                {/* Contador de "útil" en miniatura */}
                                {review.helpfulCount > 0 && (
                                  <div className="flex items-center gap-1 mt-1">
                                    <ThumbsUp className="w-3 h-3 text-weprom-blue" />
                                    <span className="text-xs text-weprom-gray-500 dark:text-weprom-gray-400">
                                      {review.helpfulCount} persona{review.helpfulCount > 1 ? 's' : ''} le{review.helpfulCount > 1 ? 's' : ''} resulto útil
                                    </span>
                                  </div>
                                )}
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
                className="p-3 rounded-full bg-white dark:bg-weprom-dark-gray border border-weprom-gray-300 dark:border-weprom-gray-700 hover:border-weprom-red transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Reseña anterior"
                disabled={reviews.length === 0}
              >
                <ChevronLeft className="w-5 h-5 text-weprom-gray-600 dark:text-weprom-gray-400" />
              </button>
              
              <div className="flex gap-2">
                {reviews.slice(0, 5).map((_, index) => (
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
                {reviews.length > 5 && (
                  <span className="text-sm text-weprom-gray-500 dark:text-weprom-gray-400 flex items-center">
                    +{reviews.length - 5}
                  </span>
                )}
              </div>

              <button
                onClick={nextReview}
                className="p-3 rounded-full bg-white dark:bg-weprom-dark-gray border border-weprom-gray-300 dark:border-weprom-gray-700 hover:border-weprom-blue transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Siguiente reseña"
                disabled={reviews.length === 0}
              >
                <ChevronRight className="w-5 h-5 text-weprom-gray-600 dark:text-weprom-gray-400" />
              </button>
            </div>
          </div>
        ) : (
          /* Mensaje si no hay reseñas */
          <div className="text-center py-12">
            <div className="bg-white/50 dark:bg-weprom-dark/50 backdrop-blur-sm rounded-2xl p-8 border border-weprom-gray-200 dark:border-weprom-gray-800">
              <Star className="w-16 h-16 text-weprom-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-weprom-gray-700 dark:text-weprom-gray-300 mb-2">
                Aún no hay reseñas
              </h3>
              <p className="text-weprom-gray-500 dark:text-weprom-gray-400 mb-6">
                Sé el primero en compartir tu experiencia con WeProm.
              </p>
              <a 
                href="#contacto"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-weprom-yellow to-weprom-orange text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all"
              >
                <Star className="w-5 h-5" />
                Deja tu reseña
              </a>
            </div>
          </div>
        )}

        
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-rainbow"></div>
    </section>
  );
}