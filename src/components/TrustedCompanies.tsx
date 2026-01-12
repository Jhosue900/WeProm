import { motion } from "framer-motion";
import { useState } from "react";

// Importaciones (Mantenidas igual)
import logoCalaverandia from "../LogoClientes/Calaverandia.png";
import logoCinepolis from "../LogoClientes/Cinepolis.png";
import logoCollins from "../LogoClientes/GRUPO COLLINS.png";
import logoCaliente from "../LogoClientes/Grupo_Caliente_Logo.png";
import logoHeineken from "../LogoClientes/Heineken-Logo.png";
import logoDriscolls from "../LogoClientes/Logo Driscolls.png";
import logoFord from "../LogoClientes/Logo Ford.png";
import logoHospitalJoya from "../LogoClientes/Logo Hospital Joya.png";
import logoHospitalSanJavier from "../LogoClientes/Logo Hospital San Javier.webp";
import logoInterceramic from "../LogoClientes/logo interceramic.png";
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
    { src: logoInterceramic, alt: "Interceramic", color: "gray" },
    { src: logoKenworth, alt: "Kenworth", color: "red" },
    { src: logoKia, alt: "KIA Motors", color: "red" },
    { src: logoMarisa, alt: "Marisa", color: "red" },
    { src: logoMercedesBenz, alt: "Mercedes-Benz", color: "gray" },
    { src: logoVolkswagen, alt: "Volkswagen", color: "blue" },
  ];

  // Duplicamos los logos para el efecto infinito
  const infiniteLogos = [...logos, ...logos];

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-weprom-gray-50 to-white dark:from-weprom-dark dark:via-weprom-dark-gray dark:to-weprom-dark overflow-hidden">
      {/* Decoración superior e inferior */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-rainbow"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-rainbow"></div>
      
      {/* Glows de fondo */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-weprom-blue/5 dark:bg-weprom-blue/10 rounded-full blur-3xl -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-weprom-red/5 dark:bg-weprom-red/10 rounded-full blur-3xl -translate-y-1/2"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Section (Sin cambios en textos/badge) */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-5 sm:mb-10 lg:mb-13"
        >
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
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
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-weprom-gray-900 dark:text-weprom-white mb-3 sm:mb-4">
            Algunos de Nuestros{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue">
              Clientes
            </span>
          </h2>

          <p className="text-base sm:text-base lg:text-lg text-weprom-gray-600 dark:text-weprom-gray-400 font-light max-w-2xl mx-auto">
            Más de <span className="font-semibold text-weprom-red">500 empresas</span> han confiado en nuestro servicio.
          </p>
        </motion.div>

        {/* --- CONTENEDOR DEL SLIDER INFINITO --- */}
        <div className="relative mt-5">
          {/* Máscara de desvanecimiento para bordes (Efecto Moderno) */}
          <div className="absolute inset-y-0 left-0 w-20 sm:w-40 z-20 bg-gradient-to-r from-white dark:from-weprom-dark to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-20 sm:w-40 z-20 bg-gradient-to-l from-white dark:from-weprom-dark to-transparent pointer-events-none"></div>

          {/* Wrapper de la animación */}
          <div className="flex overflow-hidden h-[180px] sm:h-[220px] items-center">
            <motion.div
              className="flex gap-4 sm:gap-8 pr-4 sm:pr-8"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                ease: "linear",
                duration: 40, // Ajusta la velocidad aquí
                repeat: Infinity,
              }}
              // Pausa al pasar el mouse para usabilidad profesional
              whileHover={{ animationPlayState: "paused" }}
            >
              {infiniteLogos.map((logo, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative flex-shrink-0 w-40 sm:w-52 lg:w-64"
                >
                  <div className={`
                    relative p-6 sm:p-8 rounded-2xl 
                    bg-white dark:bg-weprom-dark-gray
                    border-2 transition-all duration-500
                    ${hoveredIndex === index 
                      ? `border-weprom-${logo.color} shadow-xl scale-105` 
                      : 'border-weprom-gray-100 dark:border-weprom-gray-800 opacity-80'
                    }
                    flex items-center justify-center h-24 sm:h-32
                  `}>
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className={`
                        h-full w-auto max-w-full object-contain transition-all duration-500
                        ${hoveredIndex === index ? 'grayscale-0' : 'grayscale brightness-90 dark:brightness-110'}
                      `}
                    />
                    
                    {/* Tooltip moderno al hacer hover */}
                    {hoveredIndex === index && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`absolute -bottom-8 px-3 py-1 rounded-md bg-weprom-${logo.color} text-white text-[10px] font-bold uppercase tracking-tighter shadow-lg z-30`}
                      >
                        {logo.alt}
                      </motion.div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        {/* --- FIN DEL SLIDER --- */}
      </div>
    </section>
  );
}