import { motion } from "framer-motion";
import { useState } from "react";

export default function TrustedCompanies() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const logos = [
    { src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", alt: "Google", color: "red" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", alt: "Amazon", color: "blue" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", alt: "Microsoft", color: "green" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg", alt: "YouTube", color: "yellow" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg", alt: "Facebook", color: "purple" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", alt: "Netflix", color: "red" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", alt: "Apple", color: "blue" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg", alt: "Microsoft", color: "green" }
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
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto"
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

        {/* Stats Bar */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto"
        >
          {[
            { number: "1000+", label: "Clientes Satisfechos", color: "red" },
            { number: "50K+", label: "Productos Entregados", color: "blue" },
            { number: "98%", label: "Satisfacción", color: "green" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              className="text-center group cursor-pointer"
            >
              <div className={`
                text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-2
                text-transparent bg-clip-text bg-gradient-to-b from-weprom-${stat.color} to-weprom-${stat.color}/70
                group-hover:scale-110 transition-transform duration-300
              `}>
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm text-weprom-gray-600 dark:text-weprom-gray-400 font-medium">
                {stat.label}
              </div>
              <div className={`
                w-12 h-1 mx-auto mt-2 rounded-full
                bg-gradient-to-r from-transparent via-weprom-${stat.color} to-transparent
                transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500
              `}></div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-rainbow"></div>
    </section>
  );
}