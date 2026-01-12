import { motion } from 'framer-motion';
import { 
  Search, 
  FileText, 
  Monitor, 
  PackageCheck, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';

export default function PurchaseProcess() {
  
  // Datos basados exactamente en el texto de tu imagen
  const steps = [
    {
      id: "01",
      icon: Search,
      title: 'Propuesta a la Medida',
      description: 'Revisa nuestro catálogo o recibe una propuesta ajustada a tus necesidades.',
      color: 'red', // Rojo WeProm
      badgeColor: 'bg-weprom-red',
      lightColor: 'bg-red-50',
      borderColor: 'border-red-200',
      iconColor: 'text-weprom-red'
    },
    {
      id: "02",
      icon: FileText,
      title: 'Cotización Formal',
      description: 'Te haremos una cotización detallada con los mejores precios del mercado.',
      color: 'blue', // Azul WeProm
      badgeColor: 'bg-weprom-blue',
      lightColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-weprom-blue'
    },
    {
      id: "03",
      icon: Monitor,
      title: 'Muestra Virtual',
      description: 'Haremos una muestra virtual de tu pedido aplicando tu logo para aprobación.',
      color: 'green', // Verde WeProm
      badgeColor: 'bg-weprom-green',
      lightColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconColor: 'text-weprom-green'
    },
    {
      id: "04",
      icon: PackageCheck,
      title: 'Producción y Entrega',
      description: 'Autoriza y en un promedio de 8 días hábiles estará listo tu pedido.',
      color: 'orange', // Naranja WeProm
      badgeColor: 'bg-weprom-orange', 
      // Nota: Si no tienes 'weprom-orange' configurado en tailwind, usa 'bg-orange-500'
      lightColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      iconColor: 'text-weprom-orange'
    }
  ];

  // Variantes de animación para aparición secuencial
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 50 }
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-weprom-dark overflow-hidden relative">
      {/* Fondo decorativo sutil */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-b from-weprom-red/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-t from-weprom-blue/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Encabezado */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block py-1 px-3 rounded-full bg-gray-100 dark:bg-gray-800 text-weprom-gray-600 dark:text-gray-300 text-sm font-semibold tracking-wider mb-4"
          >
            CÓMO TRABAJAMOS
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-weprom-gray-900 dark:text-white"
          >
            Tu pedido listo en <span className="text-transparent bg-clip-text bg-gradient-to-r from-weprom-red to-weprom-orange">4 simples pasos</span>
          </motion.h2>
        </div>

        {/* Contenedor de los Pasos */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            
            return (
              <motion.div 
                key={step.id} 
                variants={itemVariants}
                className="flex flex-col items-center text-center group relative"
              >
                {/* Flecha conectora (Solo visible en Desktop entre pasos) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 -right-[50%] w-full flex justify-center z-0">
                     <ChevronRight className="w-8 h-8 text-gray-300 dark:text-gray-700 animate-pulse" />
                  </div>
                )}

                {/* Gráfico Principal (Círculo) */}
                <div className="relative mb-6">
                  {/* Anillo externo punteado con animación sutil al hover */}
                  <div className={`w-32 h-32 rounded-full border-2 border-dashed ${step.borderColor} dark:border-gray-700 p-2 transition-transform duration-500 group-hover:rotate-12`}>
                    {/* Círculo interior sólido */}
                    <div className={`w-full h-full rounded-full ${step.lightColor} dark:bg-gray-800 flex items-center justify-center relative overflow-hidden`}>
                      <Icon className={`w-10 h-10 ${step.iconColor} relative z-10 transition-transform duration-300 group-hover:scale-110`} />
                      
                      {/* Efecto de brillo hover */}
                      <div className={`absolute inset-0 bg-${step.color}-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    </div>
                  </div>

                  {/* Badge de Número (Posicionado a la izquierda como en la imagen) */}
                  <div className={`absolute top-1/2 -left-2 transform -translate-y-1/2 w-10 h-10 rounded-full ${step.badgeColor} border-4 border-white dark:border-weprom-dark flex items-center justify-center shadow-lg z-20`}>
                    <span className="text-white font-bold text-sm">{step.id}</span>
                  </div>
                </div>

                {/* Textos */}
                <div className="max-w-[240px]">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-weprom-blue transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-lg font-medium text-gray-500 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Final */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <button className="bg-gradient-to-r from-weprom-red to-weprom-orange hover:from-red-600 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-weprom-red/20 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 mx-auto">
            Contáctanos <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}