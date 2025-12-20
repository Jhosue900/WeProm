export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-[80vh] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/40"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in-up">
          <span className="text-weprom-pink font-bold tracking-wider uppercase text-sm">
            Personalización Total
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mt-2 mb-6">
            Marca tu{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-weprom-pink to-purple-600">
              Estilo
            </span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg">
            Artículos promocionales únicos para tu empresa. Calidad, diseño y funcionalidad
            en cada producto.
          </p>
          <div className="flex gap-4">
            <a
              href="#proyectos"
              className="bg-weprom-pink text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-pink-600 hover:shadow-xl transition transform hover:-translate-y-1"
            >
              Ver Catálogo
            </a>
            <a
              href="#contacto"
              className="bg-white text-gray-800 border border-gray-200 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition"
            >
              Cotizar Ahora
            </a>
          </div>
        </div>
        <div className="hidden md:block relative">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="Producto Hero"
            className="rounded-3xl shadow-2xl transform rotate-[-6deg] hover:rotate-0 transition duration-500"
          />
        </div>
      </div>
    </section>
  );
}
