import { motion } from "framer-motion";
import { useState } from "react";


// 1. Importaciones de Logos (Rutas relativas desde src/components/...)
// Ajusta los "../" dependiendo de si este archivo está en src/components/
import logoCalaverandia from "../LogoClientes/Calaverandia.png";
import logoCinepolis from "../LogoClientes/Cinepolis.png";
import logoCollins from "../LogoClientes/GRUPO COLLINS.png";
import logoCaliente from "../LogoClientes/Grupo_Caliente_Logo.png";
import logoHeineken from "../LogoClientes/Heineken-Logo.png";
import logoDriscolls from "../LogoClientes/Logo Driscolls.png";
import logoFord from "../LogoClientes/Logo Ford.png";
import logoHospitalJoya from "../LogoClientes/Logo Hospital Joya.png";
import logoHospitalSanJavier from "../LogoClientes/Logo Hospital San Javier.webp";
import logoInterceramic from "../LogoClientes/Logo interceramic.png";
import logoKenworth from "../LogoClientes/Logo Kenworth.svg";
import logoKia from "../LogoClientes/Logo KIA.webp";
import logoMarisa from "../LogoClientes/Marisa.png";
import logoMercedesBenz from "../LogoClientes/mercedes-benz_2025-logo_brandlogos.net_qwgk8.png";
import logoVolkswagen from "../LogoClientes/Volkswagen_logopng.png";


export default function TrustedCompanies() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const logos = [
    { src: logoCalaverandia, alt: "Calaverandia", color: "red" },
    { src: logoCinepolis, alt: "Cinépolis", color: "blue" },
    { src: logoCollins, alt: "Grupo Collins", color: "yellow" },
    { src: logoCaliente, alt: "Grupo Caliente", color: "red" },
    { src: logoHeineken, alt: "Heineken", color: "green" },
    { src: logoDriscolls, alt: "Driscoll's", color: "yellow" },
    { src: logoFord, alt: "Ford", color: "blue" },
    { src: logoHospitalJoya, alt: "Hospital Joya", color: "blue" },
    { src: logoHospitalSanJavier, alt: "Hospital San Javier", color: "blue" },
    { src: logoInterceramic, alt: "Interceramic", color: "gray" }, // Corregido nombre y color
    { src: logoKenworth, alt: "Kenworth", color: "red" },           // Corregido nombre
    { src: logoKia, alt: "KIA Motors", color: "red" },
    { src: logoMarisa, alt: "Marisa", color: "red" },              // Corregido nombre
    { src: logoMercedesBenz, alt: "Mercedes-Benz", color: "gray" }, // Corregido nombre
    { src: logoVolkswagen, alt: "Volkswagen", color: "blue" },    // Corregido nombre
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-weprom-gray-50 to-white dark:from-weprom-dark dark:via-weprom-dark-gray dark:to-weprom-dark overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-rainbow"></div>
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-weprom-blue/5 dark:bg-weprom-blue/10 rounded-full blur-3xl -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-weprom-red/5 dark:bg-weprom-red/10 rounded-full blur-3xl -translate-y-1/2"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-4 sm:mb-6"
          >
            <div className="flex items-center gap-2 bg-gradient-to-r from-weprom-red/10 via-weprom-yellow/10 to-weprom-blue/10 dark:from-weprom-red/20 dark:via-weprom-yellow/20 dark:to-weprom-blue/20 px-4 py-2 rounded-full border border-weprom-red/20 dark:border-weprom-red/30">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-weprom-red animate-pulse"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-weprom-yellow animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1.5 h-1.5 rounded-full bg-weprom-blue animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue bg-clip-text text-transparent uppercase tracking-widest">
                Confían en nosotros
              </span>
            </div>
          </motion.div>

          {/* Título */}
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-weprom-gray-900 dark:text-weprom-white mb-3 sm:mb-4"
          >
            Algunos de Nuestros{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue">
              Clientes
            </span>
          </motion.h2>

          {/* Descripción */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base sm:text-base lg:text-lg text-weprom-gray-600 dark:text-weprom-gray-400 font-light max-w-2xl mx-auto"
          >
            Más de <span className="font-semibold text-weprom-red">500 empresas</span> han confiado en nuestro servicio, conoce algunas de ellas
          </motion.p>
        </motion.div>

        {/* Logos Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto"
        >
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative group"
            >
              {/* Card principal */}
              <div className={`
                relative p-6 sm:p-8 rounded-2xl 
                bg-white dark:bg-weprom-dark-gray
                border-2 transition-all duration-500
                ${hoveredIndex === index 
                  ? `border-weprom-${logo.color} shadow-2xl shadow-weprom-${logo.color}/20` 
                  : 'border-weprom-gray-200 dark:border-weprom-gray-800 shadow-lg hover:shadow-xl'
                }
                transform hover:scale-105 hover:-translate-y-1
                cursor-pointer
              `}>
                {/* Glow effect de fondo */}
                <div className={`
                  absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10
                  bg-weprom-${logo.color}/5 dark:bg-weprom-${logo.color}/10 blur-xl
                `}></div>

                {/* Logo */}
                <div className="relative flex items-center justify-center h-12 sm:h-16">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className={`
                      h-full w-auto max-w-full object-contain
                      transition-all duration-500
                      ${hoveredIndex === index 
                        ? 'opacity-100 scale-110 filter-none' 
                        : 'opacity-50 dark:opacity-40 grayscale group-hover:grayscale-0'
                      }
                    `}
                  />
                </div>

                {/* Nombre de la empresa (aparece en hover) */}
                <div className={`
                  absolute -bottom-6 left-1/2 -translate-x-1/2 
                  px-3 py-1 rounded-full
                  bg-weprom-${logo.color} text-white text-xs font-semibold whitespace-nowrap
                  opacity-0 group-hover:opacity-100 group-hover:-bottom-8
                  transition-all duration-300 shadow-lg
                `}>
                  {logo.alt}
                </div>

                {/* Corner accent */}
                <div className={`
                  absolute top-2 right-2 w-2 h-2 rounded-full
                  bg-weprom-${logo.color}
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300
                `}></div>
              </div>

              {/* Partícula flotante */}
              <motion.div
                className={`absolute -top-2 -right-2 w-4 h-4 rounded-full bg-weprom-${logo.color}/30 blur-sm`}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-rainbow"></div>
    </section>
  );
}