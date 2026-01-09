import { motion, AnimatePresence } from "framer-motion"; // Asegúrate de importar AnimatePresence
import { useState, useEffect } from "react";


import imagenBolsos from "../Bolsos.png"; 
import imagenTextil from "../Textil.png"; // Usando los que vi en tu 'ls' anterior
import imagenUSBs from "../USB's.png";

// 2. Colócalas en el array
const heroImages = [
  imagenBolsos,
  imagenTextil,
  imagenUSBs
];

export default function Hero() {

  const [currentIndex, setCurrentIndex] = useState(0);

  // Funciones de navegación
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);


  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-light dark:bg-gradient-dark py-20"
    >
      {/* Background con parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/70 to-white/85 dark:from-weprom-dark/95 dark:via-weprom-dark/90 dark:to-weprom-dark/85"></div>
      </div>

      {/* Barra de colores superior */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-rainbow z-10"></div>

      {/* Círculos decorativos sutiles */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-weprom-red/5 dark:bg-weprom-red/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-weprom-blue/5 dark:bg-weprom-blue/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-[5] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-30 lg:py-10 mt-28">
        {/* CONTENIDO TEXTO */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-center lg:text-left space-y-2 sm:space-y-2 "
        >
          {/* Badge superior */}
          <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-2 text-weprom-red font-semibold tracking-wider uppercase text-xs sm:text-sm bg-weprom-red/10 dark:bg-weprom-red/20 px-4 py-2 rounded-full border border-weprom-red/20"
          >
            <span className="w-2 h-2 bg-weprom-red rounded-full animate-pulse"></span>
            Personalización Total
          </motion.span>

          {/* Título principal */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-weprom-gray-900 dark:text-weprom-white leading-[1.1] tracking-tight">
            Que tu Marca deje{" "}
            <span className="relative inline-block mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue animate-gradient-x bg-[length:200%_auto]">
                Huella
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
            </span>
          </h1>

          {/* Descripción */}
          <p className="text-lg sm:text-xl md:text-2xl text-weprom-gray-600           dark:text-weprom-gray-400 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
            Artículos Promocionales funcionales y de alto impacto para que tus clientes te vean           y recuerden todos los días.
          </p>

          {/* Botones CTA */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            <motion.a
              href="#proyectos"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden bg-gradient-to-r from-weprom-red to-weprom-yellow text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 text-center text-base group font-bold"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 font-bold">
                Ver Catálogo
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-weprom-blue to-weprom-green opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.a>

            {/*<motion.a
              href="#contacto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white dark:bg-weprom-dark-gray text-weprom-gray-700 dark:text-weprom-gray-300 border-2 border-weprom-gray-300 dark:border-weprom-gray-700 px-8 py-4 rounded-full font-semibold hover:border-weprom-blue hover:text-weprom-blue dark:hover:border-weprom-blue transition-all duration-300 text-center text-base hover:bg-weprom-gray-50 dark:hover:bg-weprom-gray-800"
            >
              Cotizar Ahora
            </motion.a>*/}

          </div>

          {/* Estadísticas */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-3 gap-6 pt-8 sm:pt-12"
          >
            

          </motion.div>
        </motion.div>

        {/* IMAGEN HERO - Carrusel Interactivo y Responsivo */}
        <div className="hidden lg:flex relative h-[450px] w-full items-center justify-center">
          <div className="relative w-full max-w-sm mx-auto group"> {/* max-w-sm reduce el tamaño */}
            
            {/* Luces decorativas detrás de la imagen */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-weprom-red/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-weprom-blue/20 rounded-full blur-2xl"></div>

            {/* Contenedor Principal de la Imagen */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl border-2 border-white/20 dark:border-weprom-gray-800 aspect-square flex items-center justify-center bg-white/5 backdrop-blur-sm transform transition-transform duration-500 group-hover:scale-[1.02]">
              
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={heroImages[currentIndex]}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                  alt="Producto WeProm"
                />
              </AnimatePresence>

              {/* FLECHAS INTERACTIVAS (Solo se ven al pasar el mouse) */}
              <button 
                onClick={prevSlide}
                className="absolute left-3 p-2 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 opacity-0 group-hover:opacity-100 transition-all hover:bg-weprom-red z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>

              <button 
                onClick={nextSlide}
                className="absolute right-3 p-2 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 opacity-0 group-hover:opacity-100 transition-all hover:bg-weprom-red z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>

            {/* Puntos indicadores inferiores */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === index ? "w-8 bg-weprom-red" : "w-2 bg-weprom-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        </div>

      {/* Scroll indicator - Solo desktop */}
      <div className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-weprom-gray-300 dark:border-weprom-gray-700 rounded-full flex items-start justify-center p-2 bg-white/80 dark:bg-weprom-dark-gray/50 backdrop-blur-sm">
          <div className="w-1.5 h-3 bg-gradient-to-b from-weprom-red to-weprom-yellow rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}