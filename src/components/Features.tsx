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
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-dark text-weprom-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="p-5 sm:p-6 bg-gradient-to-b from-weprom-dark-gray to-weprom-dark border border-weprom-gray-800 rounded-xl hover:border-weprom-red transition-all duration-500 group cursor-pointer animate-fade-in-up hover:-translate-y-2 hover:shadow-xl relative overflow-hidden backdrop-blur-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Fondo sutil con color */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-weprom-${feature.color}`}></div>
              
              {/* Acento de color minimalista - Rainbow Effect */}
              <div className={`absolute top-0 left-0 w-full h-1 ${feature.gradient} opacity-80`}></div>
              
              <div className="mb-3 sm:mb-4 inline-block transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative z-10">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-br from-weprom-dark to-weprom-dark-gray flex items-center justify-center mx-auto group-hover:from-weprom-${feature.color}/20 group-hover:to-weprom-dark transition-all duration-300 border border-weprom-gray-800`}>
                  <Icon className={`w-8 h-8 sm:w-10 sm:h-10 text-weprom-${feature.color}`} />
                </div>
              </div>
              
              <h3 className={`font-extrabold text-base sm:text-lg mb-2 text-weprom-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-b group-hover:from-weprom-${feature.color} group-hover:to-weprom-${feature.color}/80 transition-all duration-300 tracking-wide relative z-10`}>
                {feature.title}
              </h3>
              
              <p className="text-weprom-gray-400 text-xs sm:text-sm font-light group-hover:text-weprom-gray-300 transition-colors duration-300 leading-relaxed relative z-10">
                {feature.description}
              </p>
              
              {/* Línea decorativa con el color de la marca */}
              <div className={`mt-3 sm:mt-4 h-0.5 w-0 bg-gradient-to-r from-weprom-${feature.color} to-transparent mx-auto group-hover:w-full transition-all duration-500 relative z-10`}></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}