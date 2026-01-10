import { motion } from 'framer-motion';
import { 
  Target, Award, Users, Globe, Clock, Shield, 
  Star, Heart, Zap, TrendingUp, CheckCircle, Lightbulb
} from 'lucide-react';

export default function AboutUs() {
  // Datos de diferenciadores
  const differentiators = [
    {
      icon: Target,
      title: 'Enfoque Estratégico',
      description: 'Desarrollamos estrategias personalizadas que generan resultados tangibles para tu marca.',
      color: 'red',
      stats: '100+ estrategias exitosas'
    },
    {
      icon: Award,
      title: 'Calidad Premium',
      description: 'Materiales de primera calidad y acabados profesionales en cada producto.',
      color: 'yellow',
      stats: 'Certificación ISO 9001'
    },
    {
      icon: Users,
      title: 'Equipo Experto',
      description: 'Profesionales con más de 10 años de experiencia en marketing y publicidad.',
      color: 'blue',
      stats: '15+ especialistas'
    },
    {
      icon: Globe,
      title: 'Alcance Nacional',
      description: 'Cobertura en toda Colombia con logística eficiente y rápida.',
      color: 'green',
      stats: '50+ ciudades'
    }
  ];

  // Valores de la empresa
  const values = [
    {
      icon: Heart,
      title: 'Pasión',
      description: 'Amamos lo que hacemos y eso se refleja en cada proyecto.',
      color: 'red'
    },
    {
      icon: Shield,
      title: 'Integridad',
      description: 'Transparencia y honestidad en cada interacción con nuestros clientes.',
      color: 'blue'
    },
    {
      icon: Zap,
      title: 'Innovación',
      description: 'Siempre a la vanguardia con las últimas tendencias y tecnologías.',
      color: 'yellow'
    },
    {
      icon: Clock,
      title: 'Puntualidad',
      description: 'Entregas a tiempo, respetando tus plazos y necesidades.',
      color: 'green'
    }
  ];

  // Hechos y estadísticas
  const stats = [
    { number: '10+', label: 'Años de experiencia', color: 'red' },
    { number: '1000+', label: 'Clientes satisfechos', color: 'blue' },
    { number: '5000+', label: 'Proyectos completados', color: 'green' },
    { number: '98%', label: 'Tasa de satisfacción', color: 'yellow' }
  ];

  return (
    <section id="nosotros" className="relative pt-12 pb-16 sm:pb-20 lg:pb-24 bg-gradient-to-b from-weprom-gray-50 via-white to-weprom-gray-50 dark:from-weprom-dark dark:via-weprom-dark-gray dark:to-weprom-dark overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-rainbow"></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-weprom-blue/5 dark:bg-weprom-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-weprom-red/5 dark:bg-weprom-red/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-weprom-yellow/5 dark:bg-weprom-yellow/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header de la sección */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 lg:mb-12"
        >


          {/* Estadísticas */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-weprom-red/5 via-weprom-yellow/5 to-weprom-blue/5 dark:from-weprom-red/10 dark:via-weprom-yellow/10 dark:to-weprom-blue/10 rounded-2xl p-8 sm:p-12 border border-weprom-gray-200 dark:border-weprom-gray-800 mb-12"
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
         
        </motion.div>



        {/* Sección de diferenciadores */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-weprom-red/5 via-weprom-yellow/5 to-weprom-blue/5 dark:from-weprom-red/10 dark:via-weprom-yellow/10 dark:to-weprom-blue/10 rounded-2xl p-8 sm:p-12 border border-weprom-gray-200 dark:border-weprom-gray-800 mb-12"
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

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-rainbow"></div>
    </section>
  );

}