import { motion } from 'framer-motion';
import { 
  Coffee, 
  Smartphone, 
  ShoppingBag, 
  Shirt,
  Award,
  Package,
  Zap,
  Target
} from 'lucide-react';

export default function Services() {
  // Categorías de servicios
  const categories = [
    {
      icon: Coffee,
      title: 'Bebidas',
      description: 'Vasos, termos, botellas y accesorios de bebida personalizados con tu marca.',
      color: 'red',
      items: ['Vasos térmicos', 'Botellas deportivas', 'Tazas personalizadas', 'Kits de café']
    },
    {
      icon: Smartphone,
      title: 'Tecnología',
      description: 'Accesorios tecnológicos de alta calidad para potenciar tu imagen corporativa.',
      color: 'blue',
      items: ['Power banks', 'USB personalizados', 'Auriculares', 'Soportes para móviles']
    },
    {
      icon: ShoppingBag,
      title: 'Bolsas',
      description: 'Soluciones de almacenamiento y transporte con diseño único para tu empresa.',
      color: 'green',
      items: ['Mochilas', 'Bolsas ecológicas', 'Tote bags', 'Portafolios ejecutivos']
    },
    {
      icon: Shirt,
      title: 'Textiles',
      description: 'Ropa corporativa de calidad premium para uniformar a tu equipo.',
      color: 'yellow',
      items: ['Polos personalizados', 'Camisetas técnicas', 'Chamarras', 'Gorras bordadas']
    }
  ];

  // Diferenciadores
  const differentiators = [
    {
      icon: Award,
      title: 'Calidad Premium',
      description: 'Materiales de primera calidad garantizados',
      color: 'yellow'
    },
    {
      icon: Package,
      title: 'Encuéntralo todo',
      description: 'Si no lo tenemos, lo conseguimos para ti',
      color: 'blue'
    },
    {
      icon: Zap,
      title: 'Sin Complicaciones',
      description: 'Experiencia profesional y fluida',
      color: 'green'
    },
    {
      icon: Target,
      title: 'Máximo Esfuerzo',
      description: 'Compromiso total con tu satisfacción',
      color: 'red'
    }
  ];

  return (
    <section id="servicios" className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-weprom-gray-50 via-white to-weprom-gray-50 dark:from-weprom-dark dark:via-weprom-dark-gray dark:to-weprom-dark overflow-hidden">
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

          {/* Título principal */}
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-4"
          >
            Productos Promocionales de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue">
              Excelencia
            </span>
          </motion.h2>

          {/* Descripción principal */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base sm:text-lg text-weprom-gray-600 dark:text-weprom-gray-400 font-light max-w-3xl mx-auto leading-relaxed"
          >
            Nuestro compromiso es ofrecer productos de la más alta calidad. Si no encuentras lo que buscas, contáctanos y nos encargaremos de obtenerlo para ti. Nos esforzamos al máximo para que tu experiencia sea sin complicaciones y profesional.
          </motion.p>
        </motion.div>

        {/* Grid de categorías */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative overflow-hidden rounded-2xl p-6 bg-white dark:bg-weprom-dark-gray border border-weprom-gray-200 dark:border-weprom-gray-800 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                >
                  {/* Fondo con color sutil */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-weprom-${category.color}`}></div>
                  
                  {/* Icono */}
                  <div className="relative z-10 mb-6">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r from-weprom-${category.color} to-weprom-yellow flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="relative z-10">
                    <h4 className={`text-xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-3 group-hover:text-weprom-${category.color} transition-colors duration-300`}>
                      {category.title}
                    </h4>
                    <p className="text-weprom-gray-600 dark:text-weprom-gray-400 mb-4 leading-relaxed text-sm">
                      {category.description}
                    </p>
                    
                    {/* Lista de productos */}
                    <ul className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full bg-weprom-${category.color}`}></div>
                          <span className="text-sm text-weprom-gray-700 dark:text-weprom-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Línea decorativa inferior */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-weprom-${category.color} to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Sección de diferenciadores */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-weprom-red/5 via-weprom-yellow/5 to-weprom-blue/5 dark:from-weprom-red/10 dark:via-weprom-yellow/10 dark:to-weprom-blue/10 rounded-2xl p-8 sm:p-12 border border-weprom-gray-200 dark:border-weprom-gray-800"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Texto destacado */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl sm:text-3xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-4">
                ¿Por qué elegir nuestros{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-weprom-red to-weprom-yellow">
                  productos promocionales
                </span>
                ?
              </h3>
              <p className="text-weprom-gray-600 dark:text-weprom-gray-400 leading-relaxed mb-6">
                Nos diferenciamos por nuestro compromiso absoluto con la calidad y la satisfacción del cliente. Cada producto es seleccionado cuidadosamente para garantizar que represente tu marca con excelencia.
              </p>
              <a
                href="#contacto"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-weprom-blue to-weprom-green text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
              >
                <span>Solicitar catálogo completo</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>

            {/* Grid de diferenciadores */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {differentiators.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-white/80 dark:bg-weprom-dark-gray/80 backdrop-blur-sm rounded-xl p-4 border border-weprom-gray-200/50 dark:border-weprom-gray-800/50 group hover:bg-white dark:hover:bg-weprom-dark-gray transition-all duration-300"
                  >
                    <div className={`inline-flex p-2 rounded-lg bg-weprom-${item.color}/10 mb-3 group-hover:scale-110 transition-transform duration-500`}>
                      <Icon className={`w-6 h-6 text-weprom-${item.color}`} />
                    </div>
                    <h4 className="font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-1 text-sm">
                      {item.title}
                    </h4>
                    <p className="text-xs text-weprom-gray-600 dark:text-weprom-gray-400">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Final */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-weprom-gray-600 dark:text-weprom-gray-400 mb-6">
            ¿Necesitas un producto específico que no encuentras en nuestro catálogo?
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-weprom-red to-weprom-yellow text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
          >
            <span>Te lo conseguimos sin costo adicional</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-rainbow"></div>
    </section>
  );
}