import { motion } from "framer-motion";
import { useState, useRef } from "react";

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
import logoKia from "../LogoClientes/Logo KIA.jpg";
import logoMarisa from "../LogoClientes/Marisa.png";
import logoMercedesBenz from "../LogoClientes/mercedes-benz_2025-logo_brandlogos.net_qwgk8.png";
import logoVolkswagen from "../LogoClientes/Volkswagen_logopng.png";

export default function TrustedCompanies() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const logos = [
    { src: logoCalaverandia, alt: "Calaverandia", color: "red" },
    { src: logoCollins, alt: "Grupo Collins", color: "yellow" },
    { src: logoCaliente, alt: "Grupo Caliente", color: "red" },
    { src: logoHeineken, alt: "Heineken", color: "green", scale: "scale-150" },
    { src: logoDriscolls, alt: "Driscoll's", color: "yellow" },
    { src: logoFord, alt: "Ford", color: "blue" },
    { src: logoHospitalJoya, alt: "Hospital Joya", color: "blue" },
    { src: logoHospitalSanJavier, alt: "Hospital San Javier", color: "blue", scale: "scale-150" },
    { src: logoInterceramic, alt: "Interceramic", color: "gray" },
    { src: logoKenworth, alt: "Kenworth", color: "red" },
    { src: logoKia, alt: "KIA Motors", color: "red" },
    { src: logoMarisa, alt: "Marisa", color: "red" },
    { src: logoMercedesBenz, alt: "Mercedes-Benz", color: "gray", scale: "scale-150" },
    { src: logoVolkswagen, alt: "Volkswagen", color: "blue", scale: "scale-150" },
  ];

  // Hechos y estadísticas
  const stats = [
    { number: '35+', label: 'Años de experiencia', color: 'red' },
    { number: '1.000+', label: 'Clientes satisfechos', color: 'blue' },
    { number: '12.000+', label: 'Proyectos completados', color: 'green' },
    { number: '100%', label: 'Tasa de satisfacción', color: 'yellow' }
  ];

  // Duplicamos los logos para el efecto infinito
  

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-weprom-gray-50 to-white dark:from-weprom-dark dark:via-weprom-dark-gray dark:to-weprom-dark overflow-hidden">
      {/* Decoración superior e inferior */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-rainbow"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-rainbow"></div>
      
      {/* Glows de fondo */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-weprom-blue/5 dark:bg-weprom-blue/10 rounded-full blur-3xl -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-weprom-red/5 dark:bg-weprom-red/10 rounded-full blur-3xl -translate-y-1/2"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Section */}
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

        {/* --- CONTENEDOR DEL SLIDER INFINITO E INTERACTIVO --- */}
        <div className="relative mt-5">
          {/* Máscaras de degradado */}
          <div className="absolute inset-y-0 left-0 w-20 sm:w-40 z-20 bg-gradient-to-r from-white dark:from-weprom-dark to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-20 sm:w-40 z-20 bg-gradient-to-l from-white dark:from-weprom-dark to-transparent pointer-events-none"></div>

          {/* Contenedor con Scroll Manual NATIVO (Permite arrastrar en móviles y Shift+Scroll en PC) */}
          <div className="overflow-hidden h-[180px] sm:h-[230px] flex items-center group">
            
          <motion.div
            className="flex gap-4 sm:gap-8 pr-4 sm:pr-8 cursor-default"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 80, // Velocidad elegante
              repeat: Infinity,
            }}
            drag="x"
            // Aumentamos el constraints para que te deje arrastrar mucho hacia la izquierda
            dragConstraints={{ left: -10000, right: 0 }} 
            dragElastic={0.05}
            // Estas dos líneas son el truco para que no se rompa la animación al soltar
            whileHover={{ animationPlayState: "paused" }}
            whileTap={{ animationPlayState: "paused" }}
          >
              
              {/* Renderizamos los logos (Duplicados para el loop infinito) */}
              {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative flex-shrink-0 w-40 sm:w-52 lg:w-64 select-none"
                >
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className={`
                      relative p-6 sm:p-8 rounded-2xl 
                      bg-white dark:bg-weprom-dark-gray
                      border-2 transition-all duration-500
                      ${hoveredIndex === index 
                        ? `border-weprom-${logo.color} shadow-xl` 
                        : 'border-weprom-gray-100 dark:border-weprom-gray-800'
                      }
                      flex items-center justify-center h-24 sm:h-32
                    `}
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      draggable="false"
                      className={`h-full w-auto max-w-full object-contain pointer-events-none ${logo.scale || 'scale-100'}`}
                    />
                    
                    {hoveredIndex === index && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`absolute -bottom-8 px-3 py-1 rounded-md bg-weprom-${logo.color} text-white text-[10px] font-bold uppercase tracking-tighter shadow-lg z-30`}
                      >
                        {logo.alt}
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              ))}

            </motion.div>



          </div>
        </div>
        {/* --- FIN DEL SLIDER --- */}

        {/* Estadísticas */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-weprom-red/5 via-weprom-yellow/5 to-weprom-blue/5 dark:from-weprom-red/10 dark:via-weprom-yellow/10 dark:to-weprom-blue/10 rounded-2xl p-8 sm:p-12 border border-weprom-gray-200 dark:border-weprom-gray-800 mb-12 mt-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center group"
              >
                <div className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-b from-weprom-${stat.color} to-weprom-${stat.color}/70 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-weprom-gray-600 dark:text-weprom-gray-400 font-medium">
                  {stat.label}
                </div>
                <div className={`w-12 h-1 mx-auto mt-3 rounded-full bg-gradient-to-r from-transparent via-weprom-${stat.color} to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}


