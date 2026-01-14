import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  ChevronDown, 
  HelpCircle,
  MessageSquare,
  Clock,
  Shield,
  Zap,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'general' | 'productos' | 'envios';
  icon: any;
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([1]); // La primera abierta para invitar a la interacción

  // Las 4 preguntas más relevantes y estratégicas
  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: '¿Cuál es el tiempo de entrega estimado?',
      answer: 'Los productos estándar (de línea o stock) toman entre 5 a 10 días hábiles en producción, mientras que los proyectos especiales varían según especificaciones.',
      category: 'envios',
      icon: Clock
    },
    {
      id: 2,
      question: '¿Qué tipo de acabados o personalización manejan?',
      answer: 'Dependiendo el material o tipo de producto, manejamos impresión en serigrafía, full color UV, grabado láser, sublimación, bordado, gota de resina, vinil, entre otras.',
      category: 'productos',
      icon: Zap
    },
    {
      id: 3,
      question: '¿Hacen envíos a toda la república mexicana?',
      answer: '¡Así es! Podemos enviar tu pedido a cualquier ciudad del país, ya sea exprés (2 días hábiles) o regular (3-5 días hábiles). El costo de envío varía según volumen y código postal.',
      category: 'productos',
      icon: Shield
    },
    {
      id: 4,
      question: '¿Tienen garantía en sus productos?',
      answer: 'Si, cubrimos defectos de fabricación, funcionamiento e impresión, durante un periodo máximo de 15 días después de entregado.',
      category: 'general',
      icon: MessageSquare
    }
  ];

  const toggleFaq = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  // Variantes para animación de cascada (Stagger)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0, opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  const answerVariants: Variants = {
    hidden: { height: 0, opacity: 0, marginTop: 0 },
    visible: { height: "auto", opacity: 1, marginTop: "1rem" }
  };

  return (
    <section id="faq" className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-weprom-gray-50 to-white dark:from-weprom-dark dark:via-weprom-dark-gray dark:to-weprom-dark overflow-hidden">
      {/* Fondos Decorativos */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-rainbow"></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-weprom-blue/5 dark:bg-weprom-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-weprom-red/5 dark:bg-weprom-red/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6 bg-gradient-to-r from-weprom-red/10 to-weprom-blue/10 px-5 py-2 rounded-full border border-weprom-yellow/30">
            <HelpCircle className="w-5 h-5 text-weprom-yellow" />
            <span className="text-sm font-semibold bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue bg-clip-text text-transparent uppercase tracking-widest">
              FAQ
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-4">
            Preguntas <span className="text-transparent bg-clip-text bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue">Frecuentes</span>
          </h2>
        </motion.div>

        {/* Lista de Preguntas */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="space-y-4">
            {faqItems.map((faq) => {
              const Icon = faq.icon;
              const isOpen = openItems.includes(faq.id);
              
              return (
                <motion.div key={faq.id} variants={itemVariants} className="group">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className={`w-full text-left p-6 bg-white dark:bg-weprom-dark-gray rounded-2xl border-2 transition-all duration-300 ${
                      isOpen ? 'border-weprom-yellow shadow-xl' : 'border-weprom-gray-200 dark:border-weprom-gray-800 hover:border-weprom-red/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-weprom-red to-weprom-yellow flex items-center justify-center shadow-lg transition-transform duration-300 ${isOpen ? 'scale-110' : ''}`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className={`text-lg font-bold transition-colors duration-300 ${isOpen ? 'text-weprom-red' : 'text-weprom-gray-900 dark:text-weprom-white'}`}>
                          {faq.question}
                        </h3>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-weprom-gray-400 transition-transform duration-500 ${isOpen ? 'rotate-180 text-weprom-yellow' : ''}`} />
                    </div>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          variants={answerVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                        >
                          <div className="border-t border-weprom-gray-100 dark:border-weprom-gray-800 pt-4">
                            <p className="text-weprom-gray-600 dark:text-weprom-gray-400 leading-relaxed font-light">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Simple debajo de las preguntas */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <p className="text-weprom-gray-500 dark:text-weprom-gray-400 mb-4">¿Tienes otra duda?</p>
            <a href="#contacto" className="inline-flex items-center gap-2 text-weprom-red font-bold hover:gap-4 transition-all duration-300">
              Contáctanos ahora <Sparkles className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-rainbow"></div>
    </section>
  );
}