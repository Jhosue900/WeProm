import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

import imagenBolsos from "../Bolsos.png";
import imagenTextil from "../Textil.png";
import imagenUSBs from "../USB's.png";

const heroImages = [
  imagenBolsos,
  imagenTextil,
  imagenUSBs
];

// VIDEO DE FONDO LOCAL
// 1. Descarga un video y guárdalo en tu carpeta /src o /public
// 2. Si lo guardas en /public: usa "/nombre-del-video.mp4"
// 3. Si lo guardas en /src: usa import videoFondo from "./nombre-del-video.mp4"

// Opción 1: Video en carpeta /public (recomendado para videos grandes)

// Opción 2: Video importado desde /src (descomenta si prefieres esta opción)
import videoFondo from "../videobackground.mp4";
// const BACKGROUND_VIDEO = videoFondo;

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

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

  // Manejar carga del video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsVideoLoaded(true);
      video.play().catch(() => {
        // Silenciosamente manejar errores de autoplay
      });
    };

    video.addEventListener('canplay', handleCanPlay);
    return () => video.removeEventListener('canplay', handleCanPlay);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-weprom-dark transition-colors duration-500 py-20"
    >
      {/* VIDEO DE FONDO - Abstracto profesional */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-25 dark:opacity-20 scale-105"
        >
          <source src={videoFondo} type="video/mp4" />
        </video>
        
        {/* Overlay con colores de marca */}
        <div className="absolute inset-0 bg-gradient-to-br from-weprom-red/10 via-weprom-yellow/5 to-weprom-blue/10 dark:from-weprom-red/20 dark:via-weprom-yellow/10 dark:to-weprom-blue/20 mix-blend-overlay"></div>
        
        {/* Gradiente para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/30 dark:from-weprom-dark/50 dark:via-transparent dark:to-weprom-dark/50"></div>
        
        {/* Efecto de viñeta sutil */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]"></div>
        
        {/* Indicador de carga */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-weprom-red/5 via-weprom-yellow/3 to-weprom-blue/5 animate-pulse"></div>
        )}
      </div>

      {/* Barra de colores superior */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue z-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-[5] flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-48 pb-20 lg:pt-48 lg:pb-32">

        {/* CONTENIDO TEXTO */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-center lg:text-left space-y-2 sm:space-y-2"
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
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
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
          <p className="text-lg sm:text-xl md:text-2xl text-slate-800 dark:text-weprom-gray-400 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
            Artículos Promocionales funcionales y de alto impacto para que tus clientes te vean y recuerden todos los días.
          </p>

          {/* Botones CTA */}
          
          <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center lg:justify-start">
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden bg-gradient-to-r from-weprom-red to-weprom-yellow text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-2xl transition-all duration-300 text-center group"
            >
              <span className="text-xl sm:text-2xl relative z-10 flex items-center justify-center gap-2">
                Contáctanos
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-weprom-blue to-weprom-green opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.a>
          </div>
        </motion.div>

        {/* IMAGEN HERO - Carrusel Interactivo */}
        
{/* IMAGEN HERO - Carrusel Interactivo */}
        <div className="flex relative h-[300px] sm:h-[400px] lg:h-[450px] w-full items-center justify-center mt-8 lg:mt-0">
          <div className="relative w-full max-w-lg lg:max-w-2xl aspect-[16/10] group">
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10 dark:border-white/5">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={heroImages[currentIndex]}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full object-cover"
                  alt="Producto WeProm"
                />
              </AnimatePresence>
            </div>

            {/* FLECHAS INTERACTIVAS */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-weprom-red z-20 shadow-xl border border-white/20 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-weprom-red z-20 shadow-xl border border-white/20 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Puntos indicadores */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === index ? "w-8 bg-weprom-red" : "w-2 bg-slate-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-weprom-gray-300 dark:border-weprom-gray-700 rounded-full flex items-start justify-center p-2 bg-white/80 dark:bg-weprom-dark-gray/50 backdrop-blur-sm">
          <div className="w-1.5 h-3 bg-gradient-to-b from-weprom-red to-weprom-yellow rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}