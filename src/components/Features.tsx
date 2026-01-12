import { Truck, ShieldCheck, PenTool, Headphones } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Truck,
      title: 'Envíos Rápidos',
      description: 'Logística eficiente a todo el país.',
      color: 'red',
      gradient: 'bg-gradient-red'
    },
    {
      icon: ShieldCheck,
      title: 'Calidad Garantizada',
      description: 'Materiales premium y duraderos.',
      color: 'blue',
      gradient: 'bg-gradient-blue'
    },
    {
      icon: PenTool,
      title: 'Diseño a Medida',
      description: 'Personalización total de tu marca.',
      color: 'green',
      gradient: 'bg-gradient-green'
    },
    {
      icon: Headphones,
      title: 'Soporte 24/7',
      description: 'Atención al cliente personalizada.',
      color: 'yellow',
      gradient: 'bg-gradient-yellow'
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-weprom-light-bg dark:bg-gradient-dark">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="h-0.5 w-6 bg-gradient-to-r from-weprom-red to-weprom-yellow"></div>
            <span className="text-xs font-semibold text-weprom-red uppercase tracking-widest">
              Beneficios
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-3 sm:mb-4 tracking-wide">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-sm sm:text-base text-weprom-gray-600 dark:text-weprom-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Ofrecemos soluciones integrales para todas tus necesidades promocionales
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-5 sm:p-6 bg-white dark:bg-weprom-dark-gray border border-weprom-gray-200 dark:border-weprom-gray-800 rounded-xl hover:border-weprom-white transition-all duration-500 group cursor-pointer animate-fade-in-up hover:-translate-y-2 hover:shadow-lg relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Fondo sutil con color */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-weprom-${feature.color}`}></div>
                
                {/* Acento de color */}
                <div className={`absolute top-0 left-0 w-full h-1 ${feature.gradient} opacity-80`}></div>
                
                <div className="mb-3 sm:mb-4 inline-block transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative z-10">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-white dark:bg-weprom-dark border border-weprom-gray-200 dark:border-weprom-gray-800 flex items-center justify-center mx-auto group-hover:border-weprom-${feature.color} transition-all duration-300`}>
                    <Icon className={`w-8 h-8 sm:w-10 sm:h-10 text-weprom-${feature.color}`} />
                  </div>
                </div>
                
                <h3 className={`font-extrabold text-base sm:text-lg mb-2 text-weprom-gray-900 dark:text-weprom-white group-hover:text-weprom-${feature.color} transition-all duration-300 tracking-wide relative z-10`}>
                  {feature.title}
                </h3>
                
                <p className="text-weprom-gray-600 dark:text-weprom-gray-400 text-xs sm:text-sm font-light group-hover:text-weprom-gray-700 dark:group-hover:text-weprom-gray-300 transition-colors duration-300 leading-relaxed relative z-10">
                  {feature.description}
                </p>
                
                {/* Línea decorativa */}
                <div className={`mt-3 sm:mt-4 h-0.5 w-0 bg-gradient-to-r from-weprom-${feature.color} to-transparent mx-auto group-hover:w-full transition-all duration-500 relative z-10`}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}