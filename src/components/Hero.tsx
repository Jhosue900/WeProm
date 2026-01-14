import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import imagenBolsos from "../Bolsos.png"; 
import imagenTextil from "../Textil.png";
import imagenUSBs from "../USB's.png";

const heroImages = [
  imagenBolsos,
  imagenTextil,
  imagenUSBs
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

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

      {/* FONDO ANIMADO CONCEPTUAL - Abstract Colorful Gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-50 dark:bg-weprom-dark transition-colors duration-500">
        
        {/* Capa de Color Base Dinámica */}
        <div className="absolute inset-0 opacity-50 dark:opacity-80">
          {/* Círculo Rojo */}
        <motion.div
          animate={{
            x: [0, 80, -80, 0],
            y: [0, -40, 40, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-5%] left-[-5%] w-[50%] h-[50%] rounded-full bg-weprom-red/30 dark:bg-weprom-red/40 blur-[80px] dark:blur-[100px]"
        />
        
        {/* Círculo Azul */}
        <motion.div
          animate={{
            x: [0, -100, 100, 0],
            y: [0, 80, -80, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] rounded-full bg-weprom-blue/20 dark:bg-weprom-blue/40 blur-[80px] dark:blur-[100px]"
        />
    
        {/* Círculo Verde */}
        <motion.div
          animate={{
            scale: [0.8, 1.1, 0.8],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[10%] w-[35%] h-[35%] rounded-full bg-weprom-green/20 dark:bg-weprom-green/30 blur-[90px]"
          />
      
          {/* Círculo Amarillo */}
          <motion.div
            animate={{
              y: [-60, 60, -60],
              x: [40, -40, 40],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[15%] w-[40%] h-[30%] rounded-full bg-weprom-yellow/20 dark:bg-weprom-yellow/30 blur-[80px]"
          />
        </div>
      
        {/* Capa Geométrica - Grid adaptable */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.08] dark:opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-hero" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-900 dark:text-white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-hero)" />
        </svg>
      
        {/* Overlay de Textura (Noise) */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] dark:opacity-20 mix-blend-overlay"></div>
      
        {/* Gradiente de Legibilidad Superior - Evita que el fondo sea blanco puro arriba */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/80 dark:from-transparent dark:to-weprom-dark/90"></div>
      </div>

      {/* Barra de colores superior */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-rainbow z-10"></div>

      {/* Círculos decorativos fijos */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-weprom-red/5 dark:bg-weprom-red/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-weprom-blue/5 dark:bg-weprom-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-weprom-yellow/5 dark:bg-weprom-yellow/10 rounded-full blur-3xl"></div>

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
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden bg-gradient-to-r from-weprom-red to-weprom-yellow text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 text-center text-base group font-bold"
            >
              <span className="text-2xl relative z-10 flex items-center justify-center gap-2 font-bold">
                Contáctanos
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-weprom-blue to-weprom-green opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.a>
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

        {/* IMAGEN HERO - Carrusel Interactivo Rectangular */}
        <div className="hidden lg:flex relative h-[450px] w-full items-center justify-center">
          <div className="relative w-full max-w-2xl mx-auto group">
            
            {/* Luces decorativas detrás de la imagen */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-weprom-red/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-weprom-blue/20 rounded-full blur-2xl"></div>

            {/* Contenedor Principal de la Imagen - RECTANGULAR */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl border-2 border-white/20 dark:border-weprom-gray-800 aspect-[16/10] flex items-center justify-center bg-white/5 backdrop-blur-sm transform transition-transform duration-500 group-hover:scale-[1.02]">
              
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={heroImages[currentIndex]}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-contain p-4"
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