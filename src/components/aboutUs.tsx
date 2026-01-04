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
    <section id="nosotros" className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-weprom-gray-50 via-white to-weprom-gray-50 dark:from-weprom-dark dark:via-weprom-dark-gray dark:to-weprom-dark overflow-hidden">
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
              <Star className="w-5 h-5 text-weprom-yellow animate-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue bg-clip-text text-transparent uppercase tracking-widest">
                Nuestra Historia
              </span>
            </div>
          </motion.div>

          {/* Título */}
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-4"
          >
            Conoce a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue">
              WeProm
            </span>
          </motion.h2>

          {/* Descripción */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base sm:text-lg text-weprom-gray-600 dark:text-weprom-gray-400 font-light max-w-3xl mx-auto leading-relaxed"
          >
            Más de una década transformando marcas y creando conexiones significativas a través de soluciones de marketing innovadoras y productos promocionales de alta calidad.
          </motion.p>
        </motion.div>

        {/* Sección de Misión y Visión */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 lg:mb-20">
          {/* Misión */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative overflow-hidden rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-white to-weprom-gray-50 dark:from-weprom-dark-gray dark:to-weprom-dark border border-weprom-gray-200 dark:border-weprom-gray-800 hover:shadow-xl transition-all duration-500"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-weprom-red to-weprom-yellow"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-weprom-red to-weprom-yellow flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-extrabold text-weprom-gray-900 dark:text-weprom-white">Nuestra Misión</h3>
              </div>
              <p className="text-weprom-gray-600 dark:text-weprom-gray-400 leading-relaxed mb-6">
                Impulsar el éxito de nuestros clientes a través de soluciones innovadoras de marketing y productos promocionales de alta calidad que generen conexiones auténticas y resultados medibles.
              </p>
              <div className="space-y-3">
                {['Innovación constante', 'Calidad excepcional', 'Resultados tangibles', 'Servicio personalizado'].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-weprom-green" />
                    <span className="text-weprom-gray-700 dark:text-weprom-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Visión */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative overflow-hidden rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-white to-weprom-gray-50 dark:from-weprom-dark-gray dark:to-weprom-dark border border-weprom-gray-200 dark:border-weprom-gray-800 hover:shadow-xl transition-all duration-500"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-weprom-blue to-weprom-green"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-weprom-blue to-weprom-green flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-extrabold text-weprom-gray-900 dark:text-weprom-white">Nuestra Visión</h3>
              </div>
              <p className="text-weprom-gray-600 dark:text-weprom-gray-400 leading-relaxed mb-6">
                Ser la agencia líder en Colombia reconocida por transformar marcas y crear experiencias memorables a través de soluciones creativas y efectivas que generen impacto real en el mercado.
              </p>
              <div className="space-y-3">
                {['Liderazgo en innovación', 'Crecimiento sostenible', 'Excelencia comprobada', 'Impacto regional'].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-weprom-yellow" />
                    <span className="text-weprom-gray-700 dark:text-weprom-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Diferenciadores */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-20"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-0.5 w-8 bg-gradient-to-r from-weprom-red to-weprom-yellow"></div>
              <span className="text-sm font-semibold text-weprom-red uppercase tracking-widest">
                ¿Qué nos hace diferentes?
              </span>
              <div className="h-0.5 w-8 bg-gradient-to-r from-weprom-yellow to-weprom-blue"></div>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-4">
              Nuestros{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-weprom-red to-weprom-yellow">
                Diferenciadores
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((item, index) => {
              const Icon = item.icon;
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
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-weprom-${item.color}`}></div>
                  
                  {/* Icono */}
                  <div className="relative z-10 mb-6">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r from-weprom-${item.color} to-weprom-yellow flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="relative z-10">
                    <h4 className={`text-xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-3 group-hover:text-weprom-${item.color} transition-colors duration-300`}>
                      {item.title}
                    </h4>
                    <p className="text-weprom-gray-600 dark:text-weprom-gray-400 mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    <div className={`text-sm font-semibold text-weprom-${item.color}`}>
                      {item.stats}
                    </div>
                  </div>

                  {/* Línea decorativa inferior */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-weprom-${item.color} to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Valores */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-4">
              Nuestros{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-weprom-blue to-weprom-green">
                Valores
              </span>
            </h3>
            <p className="text-weprom-gray-600 dark:text-weprom-gray-400 max-w-2xl mx-auto">
              Los principios que guían cada decisión y acción en WeProm
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group text-center p-6 rounded-2xl bg-gradient-to-b from-white to-weprom-gray-50 dark:from-weprom-dark-gray dark:to-weprom-dark border border-weprom-gray-200 dark:border-weprom-gray-800 hover:border-weprom-yellow/50 transition-all duration-500"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-weprom-${value.color}/10 mb-4 group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className={`w-8 h-8 text-weprom-${value.color}`} />
                  </div>
                  <h4 className="text-lg font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-2">
                    {value.title}
                  </h4>
                  <p className="text-sm text-weprom-gray-600 dark:text-weprom-gray-400">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Estadísticas */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-weprom-red/5 via-weprom-yellow/5 to-weprom-blue/5 dark:from-weprom-red/10 dark:via-weprom-yellow/10 dark:to-weprom-blue/10 rounded-2xl p-8 sm:p-12 border border-weprom-gray-200 dark:border-weprom-gray-800"
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

        {/* CTA Final */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-weprom-gray-600 dark:text-weprom-gray-400 mb-6">
            ¿Listo para llevar tu marca al siguiente nivel?
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-weprom-red to-weprom-yellow text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
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