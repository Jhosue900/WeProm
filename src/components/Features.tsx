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
    <section className="py-20 bg-weprom-dark text-white">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="p-6 border border-gray-700 rounded-xl hover:border-weprom-pink transition duration-300"
            >
              <Icon className="mx-auto w-10 h-10 text-weprom-pink mb-4" />
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
