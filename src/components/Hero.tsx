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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-weprom-dark transition-colors duration-500 py-20"
    >
      {/* NUEVO FONDO ANIMADO CONCEPTUAL - Reemplaza el anterior por completo */}
      {/* Genera un efecto de "video conceptual" con formas y colores en movimiento */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-50 dark:bg-weprom-dark transition-colors duration-500">

        {/* Círculo de color Rojo/Naranja grande y difuminado */}
        <motion.div
          animate={{
            x: ["-10%", "10%", "-10%", "0%", "5%", "-5%", "0%"],
            y: ["-10%", "0%", "10%", "-5%", "5%", "-10%", "0%"],
            scale: [1, 1.2, 0.9, 1.1, 0.95, 1],
            rotate: [0, 15, -15, 5, -5, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-[80%] h-[80%] rounded-full bg-weprom-red/30 dark:bg-weprom-red/40 blur-[150px] dark:blur-[200px]"
        />

        {/* Círculo de color Azul/Púrpura grande y difuminado */}
        <motion.div
          animate={{
            x: ["5%", "-10%", "0%", "-5%", "10%", "0%", "5%"],
            y: ["5%", "10%", "-10%", "0%", "-5%", "10%", "5%"],
            scale: [1, 0.9, 1.1, 1.05, 0.9, 1],
            rotate: [0, -10, 10, -5, 5, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute bottom-0 right-0 w-[70%] h-[70%] rounded-full bg-weprom-blue/25 dark:bg-weprom-blue/40 blur-[160px] dark:blur-[220px]"
        />

        {/* Círculo de color Verde/Amarillo mediano y difuminado (para mezcla) */}
        <motion.div
          animate={{
            x: ["0%", "15%", "-15%", "0%"],
            y: ["10%", "-10%", "0%", "10%"],
            scale: [1, 0.8, 1.2, 1],
            opacity: [0.4, 0.7, 0.5, 0.4],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 10 }}
          className="absolute top-[30%] left-[20%] w-[60%] h-[60%] rounded-full bg-weprom-yellow/20 dark:bg-weprom-yellow/30 blur-[180px] dark:blur-[250px]"
        />

        {/* Overlay de Textura (Noise) para un efecto más orgánico como el video */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.2] dark:opacity-30 mix-blend-overlay"></div>

        {/* Gradiente de Legibilidad Superior e Inferior */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/70 dark:from-transparent dark:to-weprom-dark/90"></div>
      </div>

      {/* Barra de colores superior (se mantiene) */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-rainbow z-10"></div>

      {/* El resto de tu contenido (texto y carrusel de imágenes) */}
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
        </motion.div>

        {/* IMAGEN HERO - Carrusel Interactivo con IMAGEN REDONDEADA */}
        <div className="hidden lg:flex relative h-[450px] w-full items-center justify-center">
          <div className="relative w-full max-w-2xl aspect-[16/10] group">

            {/* Contenedor con redondeado y overflow-hidden para la imagen */}
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden">
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
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-weprom-red z-20 shadow-xl border border-white/20"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-weprom-red z-20 shadow-xl border border-white/20"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>

            {/* Puntos indicadores inferiores */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10">
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

      {/* Scroll indicator - Solo desktop */}
      <div className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-weprom-gray-300 dark:border-weprom-gray-700 rounded-full flex items-start justify-center p-2 bg-white/80 dark:bg-weprom-dark-gray/50 backdrop-blur-sm">
          <div className="w-1.5 h-3 bg-gradient-to-b from-weprom-red to-weprom-yellow rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}