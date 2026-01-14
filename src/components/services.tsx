import { motion } from 'framer-motion';

import { Award, Package, Zap, Target, TrendingUp } from 'lucide-react';

import BebidasImg from '../Productos/Bebidas.png';
import TecnologiaImg from '../Productos/Tecnologia.png';
import OficinaImg from '../Productos/Oficina.png';
import TextilesImg from '../Productos/Textiles.png';
import EspecialesImg from '../Productos/Especiales.png';



export default function Services() {
  // Categorías de servicios
  const categories = [
    {
      title: 'Bebidas',
      image: BebidasImg,
      description: 'Vasos, termos, botellas y accesorios de bebida personalizados con tu marca.',
      color: 'aquamarine',
      items: ['Termos Metálicos', 'Cilindros', 'Tazas', 'Vasos Térmicos']
    },
    {
      title: 'Tecnología',
      image: TecnologiaImg,
      description: 'Accesorios tecnológicos de alta calidad para potenciar tu imagen corporativa.',
      color: 'purple',
      items: ['Memorias USB', 'Accesorios para Celular/Tablet', 'Power Banks', 'Audífonos y Bocinas']
    },
    {
      title: 'Oficina',
      image: OficinaImg,
      description: 'Soluciones de almacenamiento y transporte con diseño único para tu empresa.',
      color: 'green',
      items: ['Portagafetes Personalizados', 'Kits de Escritorio', 'Agendas y Libretas', 'Bolígrafos']
    },
    {
      title: 'Textiles',
      image: TextilesImg,
      description: 'Ropa corporativa de calidad premium para uniformar a tu equipo.',
      color: 'pink',
      items: ['Gorras y Sombreros', 'Bolsas y Mochilas', 'Playeras', 'Uniformes Corporativos']
    },
    {
      title: 'Proyectos Especiales',
      image: EspecialesImg,
      description: 'Diseñamos y Maquilamos cualquier proyecto o solicitud especial bajo pedido.',
      color: 'blue', // Ajustado a un color del stack para coherencia
      items: ['Diseño a Medida', 'Maquila Especializada', 'Importaciones Directas', 'Regalos de Temporada']
    }
  ];

  const differentiators = [
    { icon: Award, title: 'Calidad Premium', description: 'Materiales de primera calidad garantizados', color: 'yellow' },
    { icon: Package, title: 'Encuéntralo todo', description: 'Si no lo tenemos, lo conseguimos para ti', color: 'blue' },
    { icon: Zap, title: 'Sin Complicaciones', description: 'Experiencia profesional y fluida', color: 'green' },
    { icon: Target, title: 'Máximo Esfuerzo', description: 'Compromiso total con tu satisfacción', color: 'red' }
  ];

  return (
    <section id="servicios" className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-weprom-gray-50 via-white to-weprom-gray-50 dark:from-weprom-dark dark:via-weprom-dark-gray dark:to-weprom-dark overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-rainbow"></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-weprom-blue/5 dark:bg-weprom-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-weprom-red/5 dark:bg-weprom-red/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header de la sección */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="flex items-center gap-3 bg-gradient-to-r from-weprom-red/10 via-weprom-yellow/10 to-weprom-blue/10 dark:from-weprom-red/20 dark:via-weprom-yellow/20 dark:to-weprom-blue/20 px-5 py-2.5 rounded-full border border-weprom-yellow/30">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-weprom-red to-weprom-yellow flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <span className="text-sm font-semibold bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue bg-clip-text text-transparent uppercase tracking-widest">
                Productos Promocionales
              </span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-4"
          >
            Artículos Promocionales de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue">
              Excelencia
            </span>
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-md sm:text-xl md:text-2xl text-weprom-gray-800 dark:text-weprom-gray-200 font-medium max-w-4xl mx-auto leading-relaxed italic"
          >
            Tenemos más de 10,000 Artículos Promocionales para todo tipo de industria; desde regalos corporativos, hasta detalles para expos y proyectos expeciales.
          </motion.p>
        </motion.div>

        {/* Grid de categorías optimizado a 5 columnas con efecto Hover profesional */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16 lg:mb-20">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative h-[400px] overflow-hidden rounded-2xl bg-weprom-dark border border-weprom-gray-200 dark:border-weprom-gray-800 shadow-lg cursor-pointer"
            >
              {/* Contenedor de Imagen de Fondo */}
              <div className="absolute inset-0 z-0">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:blur-[2px]"
                />
                {/* Overlay gradiente constante para legibilidad del título */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-40" />
              </div>

              {/* Título visible en estado inicial (abajo) */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transition-all duration-500 group-hover:translate-y-[-20px] group-hover:opacity-0">
                <h4 className="text-2xl font-bold text-white mb-2">
                  {category.title}
                </h4>
                <div className={`w-12 h-1 rounded-full ${category.color === 'green' ? 'bg-green-500' : `bg-weprom-${category.color}`}`} />
              </div>

              {/* Panel de Información (Revelado al Hover) */}
              <div className="absolute inset-0 z-20 flex flex-col justify-center p-6 bg-white/95 dark:bg-weprom-dark/95 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <div className="mb-4">
                  <h4 className={`text-xl font-black uppercase tracking-tight mb-1 ${category.color === 'green' ? 'text-green-600' : `text-weprom-${category.color}`}`}>
                    {category.title}
                  </h4>
                  <div className={`w-full h-0.5 opacity-30 ${category.color === 'green' ? 'bg-green-600' : `bg-weprom-${category.color}`}`} />
                </div>

                <p className="text-weprom-gray-600 dark:text-weprom-gray-400 text-sm mb-6 leading-tight font-medium">
                  {category.description}
                </p>

                <div className="space-y-3">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-weprom-gray-400 dark:text-weprom-gray-500">
                    Artículos disponibles:
                  </p>
                  <ul className="grid grid-cols-1 gap-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${category.color === 'green' ? 'bg-green-500' : `bg-weprom-${category.color}`}`} />
                        <span className="text-sm font-bold text-weprom-gray-800 dark:text-weprom-gray-200">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Acento decorativo inferior en el panel */}
                <div className={`absolute bottom-0 left-0 right-0 h-1.5 ${category.color === 'green' ? 'bg-green-500' : `bg-weprom-${category.color}`}`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sección de diferenciadores - Estilo visual */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl p-6 sm:p-8 border border-weprom-gray-200 dark:border-weprom-gray-800 mb-12 bg-gradient-to-br from-white to-weprom-gray-50 dark:from-weprom-dark-gray dark:to-weprom-dark"
        >
          {/* Fondo decorativo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-weprom-red/5 to-weprom-blue/5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-weprom-yellow/5 to-weprom-green/5 rounded-full translate-y-32 -translate-x-32"></div>

          {/* Título */}
          <div className="text-center mb-10 relative z-10">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-4">
              ¿Por qué elegir nuestros{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue">
                productos promocionales
              </span>
              ?
            </h3>
          </div>

          {/* Grid de ventajas */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
          >
            {/* Excelentes tiempos de entrega */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-gradient-to-br from-white to-white dark:from-weprom-dark-gray dark:to-weprom-dark-gray rounded-xl p-11 border border-weprom-gray-100 dark:border-weprom-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2"
            >
              <div className="flex flex-col items-center text-center">
                {/* Icono grande */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-weprom-green/20 to-weprom-blue/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  <div className="relative p-4 rounded-full bg-gradient-to-r from-weprom-green to-weprom-blue shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>

                {/* Contenido */}
                <h4 className="text-xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-3">
                  Excelentes tiempos de entrega
                </h4>
                <div className="w-12 h-1 bg-gradient-to-r from-weprom-green to-weprom-blue rounded-full mb-4"></div>
              </div>
            </motion.div>

            {/* Mejoramos cualquier precio */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-gradient-to-br from-white to-white dark:from-weprom-dark-gray dark:to-weprom-dark-gray rounded-xl p-11 border border-weprom-gray-100 dark:border-weprom-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2"
            >
              <div className="flex flex-col items-center text-center">
                {/* Icono grande */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-weprom-yellow/20 to-weprom-red/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  <div className="relative p-4 rounded-full bg-gradient-to-r from-weprom-yellow to-weprom-red shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>

                {/* Contenido */}
                <h4 className="text-xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-3">
                  Mejoramos cualquier precio
                </h4>
                <div className="w-12 h-1 bg-gradient-to-r from-weprom-yellow to-weprom-red rounded-full mb-4"></div>

              </div>
            </motion.div>

            {/* Alcance Nacional */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-gradient-to-br from-white to-white dark:from-weprom-dark-gray dark:to-weprom-dark-gray rounded-xl p-11 border border-weprom-gray-100 dark:border-weprom-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2"
            >
              <div className="flex flex-col items-center text-center">
                {/* Icono grande */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-weprom-blue/20 to-weprom-purple/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  <div className="relative p-4 rounded-full bg-gradient-to-r from-weprom-blue to-weprom-purple shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>

                {/* Contenido */}
                <h4 className="text-xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-3">
                  Alcance Nacional
                </h4>
                <div className="w-12 h-1 bg-gradient-to-r from-weprom-blue to-weprom-purple rounded-full mb-4"></div>
               
              </div>
            </motion.div>

            {/* Stock actualizado 24/7 */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-gradient-to-br from-white to-white dark:from-weprom-dark-gray dark:to-weprom-dark-gray rounded-xl p-11 border border-weprom-gray-100 dark:border-weprom-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2"
            >
              <div className="flex flex-col items-center text-center">
                {/* Icono grande */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-weprom-orange/20 to-weprom-pink/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  <div className="relative p-4 rounded-full bg-gradient-to-r from-weprom-orange to-weprom-pink shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                </div>

                {/* Contenido */}
                <h4 className="text-xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-3">
                  Stock actualizado 24/7
                </h4>
                <div className="w-12 h-1 bg-gradient-to-r from-weprom-orange to-weprom-pink rounded-full mb-4"></div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>




        {/* CTA Final */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-3xl text-weprom-gray-600 dark:text-weprom-gray-400 mb-6 font-bold">
            ¿Listo para llevar tu marca al siguiente nivel?
          </p>
          <a
            href="#contacto"
            className="text-2xl inline-flex items-center gap-3 bg-gradient-to-r from-weprom-red to-weprom-yellow text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
          >
            <span>Contactar Ahora</span>
            <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-rainbow"></div>
    </section>
  );
}