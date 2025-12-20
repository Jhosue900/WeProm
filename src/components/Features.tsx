import { Truck, ShieldCheck, PenTool, Headphones } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Truck,
      title: 'Envíos Rápidos',
      description: 'Logística eficiente a todo el país.',
    },
    {
      icon: ShieldCheck,
      title: 'Calidad Garantizada',
      description: 'Materiales premium y duraderos.',
    },
    {
      icon: PenTool,
      title: 'Diseño a Medida',
      description: 'Personalización total de tu marca.',
    },
    {
      icon: Headphones,
      title: 'Soporte 24/7',
      description: 'Atención al cliente personalizada.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-weprom-dark text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="p-5 sm:p-6 border border-gray-700 rounded-xl hover:border-weprom-pink transition-all duration-500 group cursor-pointer animate-fade-in-up hover:bg-gray-800/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-weprom-pink/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-3 sm:mb-4 inline-block transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <Icon className="mx-auto w-8 h-8 sm:w-10 sm:h-10 text-weprom-pink group-hover:text-pink-400" />
              </div>
              <h3 className="font-bold text-base sm:text-lg mb-2 group-hover:text-weprom-pink transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>
              
              {/* Línea decorativa */}
              <div className="mt-3 sm:mt-4 h-0.5 w-0 bg-gradient-to-r from-weprom-pink to-purple-600 mx-auto group-hover:w-full transition-all duration-500"></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}