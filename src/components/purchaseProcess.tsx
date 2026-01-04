import { motion, Variants } from 'framer-motion';
import { 
  Search, 
  Palette, 
  FileCheck, 
  CreditCard,
  Truck,
  CheckCircle,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Shield,
  Clock,
  Users
} from 'lucide-react';

export default function PurchaseProcess() {
  // Pasos del proceso de compra
  const steps = [
    {
      id: 1,
      icon: Search,
      title: 'Consulta y Exploración',
      description: 'Cuéntanos tus necesidades o explora nuestro catálogo de productos promocionales.',
      subSteps: [
        'Agenda una consulta gratuita',
        'Explora catálogo digital',
        'Recibe asesoría experta'
      ],
      color: 'red',
      estimatedTime: '1-2 días'
    },
    {
      id: 2,
      icon: Palette,
      title: 'Personalización y Diseño',
      description: 'Creamos el diseño perfecto para tu marca con nuestro equipo de diseño gráfico.',
      subSteps: [
        'Propuesta de diseño inicial',
        'Revisiones ilimitadas',
        'Aprobación final del diseño'
      ],
      color: 'blue',
      estimatedTime: '2-3 días'
    },
    {
      id: 3,
      icon: FileCheck,
      title: 'Cotización y Aprobación',
      description: 'Recibe una cotización detallada y aprueba el proyecto para continuar.',
      subSteps: [
        'Cotización transparente',
        'Negociación de términos',
        'Firma de acuerdo'
      ],
      color: 'green',
      estimatedTime: '1 día'
    },
    {
      id: 4,
      icon: CreditCard,
      title: 'Pago Seguro',
      description: 'Realiza el pago de forma segura a través de nuestros métodos certificados.',
      subSteps: [
        'Múltiples métodos de pago',
        'Facturación electrónica',
        'Confirmación inmediata'
      ],
      color: 'yellow',
      estimatedTime: 'Horas'
    },
    {
      id: 5,
      icon: Truck,
      title: 'Producción y Envío',
      description: 'Fabricamos tus productos y los enviamos a cualquier parte del país.',
      subSteps: [
        'Producción controlada',
        'Control de calidad',
        'Logística optimizada'
      ],
      color: 'purple',
      estimatedTime: '5-10 días'
    },
    {
      id: 6,
      icon: CheckCircle,
      title: 'Entrega y Soporte',
      description: 'Recibe tus productos y disfruta de nuestro soporte post-venta.',
      subSteps: [
        'Entrega garantizada',
        'Soporte 24/7',
        'Garantía de satisfacción'
      ],
      color: 'teal',
      estimatedTime: 'Continuo'
    }
  ];

  // Beneficios del proceso
  const benefits = [
    {
      icon: Shield,
      title: 'Garantía de Calidad',
      description: 'Todos nuestros productos cuentan con garantía de calidad premium',
      color: 'red'
    },
    {
      icon: Clock,
      title: 'Tiempos Claros',
      description: 'Cumplimos con los plazos establecidos en cada etapa',
      color: 'blue'
    },
    {
      icon: Users,
      title: 'Acompañamiento',
      description: 'Asesor personal durante todo el proceso',
      color: 'green'
    },
    {
      icon: MessageSquare,
      title: 'Comunicación Constante',
      description: 'Actualizaciones regulares en cada etapa',
      color: 'yellow'
    }
  ];

  // Timeline animado con tipos correctos
  const timelineVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8 
    },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        type: "spring" as const, // Especificar como constante literal
        stiffness: 100
      }
    })
  };

  // Variantes para beneficios
  const benefitVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9 
    },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring" as const,
        stiffness: 100
      }
    })
  };

  return (
    <section id="proceso" className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-weprom-gray-50 to-white dark:from-weprom-dark dark:via-weprom-dark-gray dark:to-weprom-dark overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-rainbow"></div>
      <div className="absolute top-20 left-0 w-96 h-96 bg-weprom-red/5 dark:bg-weprom-red/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-weprom-blue/5 dark:bg-weprom-blue/10 rounded-full blur-3xl"></div>
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
              <Sparkles className="w-5 h-5 text-weprom-yellow animate-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue bg-clip-text text-transparent uppercase tracking-widest">
                Proceso Sencillo
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
            Tu proceso de compra en{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue">
              6 sencillos pasos
            </span>
          </motion.h2>

          {/* Descripción */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base sm:text-lg text-weprom-gray-600 dark:text-weprom-gray-400 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Desde la idea inicial hasta la entrega final, te acompañamos en cada etapa con transparencia y profesionalismo.
          </motion.p>
        </motion.div>

        {/* Línea de tiempo principal */}
        <div className="relative mb-16 lg:mb-20">
          {/* Línea conectiva - Solo visible en desktop */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue opacity-20 z-0"></div>
          
          {/* Grid de pasos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  custom={index}
                  variants={timelineVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="group"
                >
                  <div className="relative h-full">
                    {/* Número del paso */}
                    <div className="absolute -top-4 -left-4 z-20">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-r from-weprom-${step.color} to-weprom-yellow flex items-center justify-center text-white font-extrabold text-lg shadow-lg`}>
                        {step.id}
                      </div>
                    </div>

                    {/* Card del paso */}
                    <div className="relative bg-white dark:bg-weprom-dark-gray rounded-2xl p-6 border-2 border-weprom-gray-200 dark:border-weprom-gray-800 group-hover:border-weprom-yellow transition-all duration-500 h-full">
                      {/* Icono */}
                      <div className="mb-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-r from-weprom-${step.color} to-weprom-yellow flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                      </div>

                      {/* Título y tiempo estimado */}
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-extrabold text-weprom-gray-900 dark:text-weprom-white group-hover:text-weprom-red transition-colors duration-300">
                          {step.title}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-weprom-gray-500 dark:text-weprom-gray-400">
                          <Clock className="w-3 h-3" />
                          <span>{step.estimatedTime}</span>
                        </div>
                      </div>

                      {/* Descripción */}
                      <p className="text-weprom-gray-600 dark:text-weprom-gray-400 mb-4 text-sm leading-relaxed">
                        {step.description}
                      </p>

                      {/* Sub-pasos */}
                      <ul className="space-y-2 mb-4">
                        {step.subSteps.map((subStep, subIndex) => (
                          <li key={subIndex} className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full bg-weprom-${step.color}`}></div>
                            <span className="text-sm text-weprom-gray-700 dark:text-weprom-gray-300">{subStep}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Indicador de flecha (solo desktop) */}
                      {index < steps.length - 1 && (
                        <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-20">
                          <div className="w-6 h-6 rounded-full bg-weprom-gray-100 dark:bg-weprom-dark border border-weprom-gray-300 dark:border-weprom-gray-700 flex items-center justify-center">
                            <ArrowRight className="w-3 h-3 text-weprom-gray-400" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Efecto de hover */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-weprom-${step.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-md`}></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        
        </div>
      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-rainbow"></div>
    </section>
  );
}