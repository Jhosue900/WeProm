import { campaignsData } from '../data';

export default function Campaigns() {
  return (
    <section id="campañas" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            Nuevas Campañas
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Descubre nuestras colecciones de temporada. Sección actualizable dinámicamente.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {campaignsData.map((campaign, index) => (
            <div
              key={campaign.id}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg cursor-pointer h-64 sm:h-72 lg:h-80 animate-fade-in-up hover:shadow-2xl transition-shadow duration-500"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <img
                src={campaign.img}
                alt={campaign.title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 sm:p-6 text-white">
                <h3 className="text-xl sm:text-2xl font-bold mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {campaign.title}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 transform translate-y-2 group-hover:translate-y-0">
                  {campaign.desc}
                </p>
              </div>
              
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}