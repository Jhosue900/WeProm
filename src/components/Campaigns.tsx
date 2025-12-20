import { campaignsData } from '../data';

export default function Campaigns() {
  return (
    <section id="campanas" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuevas Campañas
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre nuestras colecciones de temporada. Sección actualizable dinámicamente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {campaignsData.map((campaign) => (
            <div
              key={campaign.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer h-80"
            >
              <img
                src={campaign.img}
                alt={campaign.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {campaign.title}
                </h3>
                <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 text-sm">
                  {campaign.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
