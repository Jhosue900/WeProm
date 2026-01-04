import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  ChevronDown, 
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  Clock,
  Shield,
  Zap,
  Sparkles,
  Search
} from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'general' | 'productos' | 'pagos' | 'envios' | 'soporte';
  icon: any;
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [openItems, setOpenItems] = useState<number[]>([1]); // Primera FAQ abierta por defecto

  // Datos de preguntas frecuentes
  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: '¿Cuál es el tiempo de entrega estimado?',
      answer: 'El tiempo de entrega varía según el producto y la personalización requerida. En general, los productos estándar tienen un tiempo de entrega de 5-10 días hábiles, mientras que los productos personalizados pueden tomar de 10-15 días hábiles. Para pedidos urgentes, contamos con opciones express (consulta disponibilidad).',
      category: 'envios',
      icon: Clock
    },
    {
      id: 2,
      question: '¿Cómo funciona el proceso de personalización?',
      answer: 'Nuestro proceso de personalización incluye: 1) Consulta inicial gratuita, 2) Diseño conceptual, 3) Aprobación del diseño, 4) Producción, y 5) Control de calidad. Te asignamos un diseñador especializado que trabajará contigo para crear el diseño perfecto para tu marca.',
      category: 'productos',
      icon: Zap
    },
    {
      id: 3,
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos múltiples métodos de pago seguros: transferencia bancaria, tarjetas de crédito/débito (Visa, MasterCard, American Express), PSE, y en algunas regiones, efectivo. Todas las transacciones están protegidas con cifrado SSL de 256 bits.',
      category: 'pagos',
      icon: Shield
    },
    {
      id: 4,
      question: '¿Tienen garantía en sus productos?',
      answer: 'Sí, todos nuestros productos cuentan con garantía de calidad. La garantía varía según el producto: textiles (6 meses), tecnología (12 meses), y productos generales (3 meses). Cubrimos defectos de fabricación y problemas de calidad.',
      category: 'productos',
      icon: Shield
    },
    {
      id: 5,
      question: '¿Pueden crear un producto que no está en el catálogo?',
      answer: '¡Absolutamente! Si tienes una idea específica o necesitas un producto que no aparece en nuestro catálogo, nuestro equipo de sourcing se encargará de encontrarlo o crearlo para ti. Contamos con una red de proveedores globales para satisfacer necesidades especiales.',
      category: 'general',
      icon: Sparkles
    },
    {
      id: 6,
      question: '¿Cómo puedo solicitar una cotización?',
      answer: 'Puedes solicitar una cotización de tres formas: 1) Usando nuestro formulario de contacto, 2) Llamando a nuestro número de atención, o 3) Enviando un email con los detalles de tu proyecto. Te responderemos en menos de 24 horas hábiles con una cotización detallada.',
      category: 'general',
      icon: MessageSquare
    },
    {
      id: 7,
      question: '¿Hacen envíos a todo el país?',
      answer: 'Sí, realizamos envíos a todas las ciudades principales de Colombia. Trabajamos con las mejores empresas de logística para garantizar entregas seguras y puntuales. El costo de envío varía según la ubicación y se calcula al momento de la cotización.',
      category: 'envios',
      icon: Zap
    },
    {
      id: 8,
      question: '¿Ofrecen muestras físicas de los productos?',
      answer: 'Sí, ofrecemos muestras físicas para la mayoría de nuestros productos. El costo de la muestra puede ser reembolsable en caso de realizar un pedido mayor. Contáctanos para coordinar el envío de muestras específicas.',
      category: 'productos',
      icon: Shield
    },
    {
      id: 9,
      question: '¿Cuál es el mínimo de compra?',
      answer: 'No tenemos un mínimo de compra estricto. Trabajamos con pedidos de todo tamaño, desde pequeñas empresas hasta grandes corporaciones. Sin embargo, algunos productos personalizados pueden requerir cantidades mínimas para ser rentables.',
      category: 'general',
      icon: HelpCircle
    },
    {
      id: 10,
      question: '¿Cómo funciona el soporte post-venta?',
      answer: 'Nuestro soporte post-venta incluye: asistencia técnica, seguimiento de entregas, resolución de dudas, y gestión de garantías. Puedes contactarnos por teléfono, email o WhatsApp durante nuestro horario de atención extendido.',
      category: 'soporte',
      icon: MessageSquare
    }
  ];

  // Categorías para filtros
  const categories = [
    { id: 'todos', label: 'Todos', count: faqItems.length },
    { id: 'general', label: 'General', count: faqItems.filter(item => item.category === 'general').length },
    { id: 'productos', label: 'Productos', count: faqItems.filter(item => item.category === 'productos').length },
    { id: 'pagos', label: 'Pagos', count: faqItems.filter(item => item.category === 'pagos').length },
    { id: 'envios', label: 'Envíos', count: faqItems.filter(item => item.category === 'envios').length },
    { id: 'soporte', label: 'Soporte', count: faqItems.filter(item => item.category === 'soporte').length }
  ];

  // Filtrar FAQs
  const filteredFaqs = faqItems.filter(item => {
    const matchesCategory = activeCategory === 'todos' || item.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Alternar FAQ abierta
  const toggleFaq = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  // Variantes de animación con tipos correctos
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { 
      y: 20, 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  const answerVariants: Variants = {
    hidden: { 
      height: 0, 
      opacity: 0,
      marginTop: 0
    },
    visible: { 
      height: "auto", 
      opacity: 1,
      marginTop: "1rem"
    }
  };

  return (
    <section id="faq" className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-weprom-gray-50 to-white dark:from-weprom-dark dark:via-weprom-dark-gray dark:to-weprom-dark overflow-hidden">
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
              <HelpCircle className="w-5 h-5 text-weprom-yellow animate-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue bg-clip-text text-transparent uppercase tracking-widest">
                Preguntas Frecuentes
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
            Encuentra respuestas{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue">
              rápidas
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
            Hemos recopilado las preguntas más comunes sobre nuestros productos y servicios para ayudarte a encontrar lo que necesitas.
          </motion.p>
        </motion.div>

       

        {/* Filtros por categoría */}
        
        {/* Contador de resultados */}
        {searchTerm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-6"
          >
            <p className="text-weprom-gray-600 dark:text-weprom-gray-400">
              {filteredFaqs.length} {filteredFaqs.length === 1 ? 'resultado' : 'resultados'} para "{searchTerm}"
            </p>
          </motion.div>
        )}

        {/* Grid de FAQs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12"
        >
          {filteredFaqs.length > 0 ? (
            <div className="space-y-4">
              {filteredFaqs.map((faq) => {
                const Icon = faq.icon;
                const isOpen = openItems.includes(faq.id);
                
                return (
                  <motion.div
                    key={faq.id}
                    variants={itemVariants}
                    className="overflow-hidden"
                  >
                    <div className="group">
                      {/* Pregunta */}
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full text-left p-6 bg-white dark:bg-weprom-dark-gray rounded-xl border-2 border-weprom-gray-200 dark:border-weprom-gray-800 hover:border-weprom-yellow transition-all duration-300 group-hover:shadow-lg"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-r from-weprom-red to-weprom-yellow flex items-center justify-center`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-lg font-extrabold text-weprom-gray-900 dark:text-weprom-white group-hover:text-weprom-red transition-colors duration-300">
                              {faq.question}
                            </h3>
                          </div>
                          <ChevronDown 
                            className={`w-5 h-5 text-weprom-gray-400 transition-transform duration-300 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </div>

                        {/* Respuesta con animación */}
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              variants={answerVariants}
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              className="overflow-hidden"
                            >
                              <div className={`border-t border-weprom-gray-200 dark:border-weprom-gray-800 pt-4`}>
                                <p className="text-weprom-gray-600 dark:text-weprom-gray-400 leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>

                      {/* Indicador de categoría */}
                      <div className="flex justify-between items-center mt-2 px-2">
                        <span className="text-xs text-weprom-gray-500 dark:text-weprom-gray-400 capitalize">
                          {faq.category}
                        </span>
                        {isOpen && (
                          <div className="w-16 h-1 rounded-full bg-gradient-to-r from-weprom-red to-weprom-yellow"></div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* Estado vacío */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <HelpCircle className="w-16 h-16 text-weprom-gray-300 dark:text-weprom-gray-700 mx-auto mb-4" />
              <h3 className="text-xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-2">
                No encontramos resultados
              </h3>
              <p className="text-weprom-gray-600 dark:text-weprom-gray-400 mb-6">
                No hay preguntas que coincidan con tu búsqueda "{searchTerm}"
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-weprom-red to-weprom-yellow text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span>Ver todas las preguntas</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </motion.div>

       
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-rainbow"></div>
    </section>
  );
}