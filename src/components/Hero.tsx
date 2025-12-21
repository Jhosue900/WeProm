export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 sm:pt-20 lg:pt-0"
    >
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/60 sm:from-white/90 sm:to-white/40"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-[5] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Contenido de texto */}
        <div className="animate-fade-in-up text-center lg:text-left space-y-1 sm:space-y-6">
          <span className="text-weprom-pink font-bold tracking-wider uppercase text-xs sm:text-sm inline-block animate-slide-in">
            Personalización Total
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 leading-tight">
            Marca tu{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-weprom-pink to-purple-600 animate-gradient-x">
              Estilo
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-lg mx-auto lg:mx-0 animate-fade-in animation-delay-300">
            Artículos promocionales únicos para tu empresa. Calidad, diseño y funcionalidad
            en cada producto.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in animation-delay-500 pt-2">
            <a
              href="#proyectos"
              className="bg-weprom-pink text-white px-6 sm:px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-pink-600 hover:shadow-xl transition-all transform hover:-translate-y-1 hover:scale-105 duration-300 text-center text-sm sm:text-base"
            >
              Ver Catálogo
            </a>
            <a
              href="#contacto"
              className="bg-white text-gray-800 border-2 border-gray-200 px-6 sm:px-8 py-3 rounded-full font-semibold hover:border-weprom-pink hover:text-weprom-pink transition-all duration-300 text-center text-sm sm:text-base"
            >
              Cotizar Ahora
            </a>
          </div>
        </div>

        {/* Imagen del producto */}
        <div className="hidden lg:block relative animate-fade-in animation-delay-700">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="Producto Hero"
            className="rounded-3xl shadow-2xl transform rotate-[-6deg] hover:rotate-0 hover:scale-105 transition-all duration-500 hover:shadow-pink-500/50 w-full max-w-lg mx-auto"
          />
        </div>

        {/* Imagen móvil/tablet */}
        <div className="lg:hidden relative animate-fade-in animation-delay-700 mt-8">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Producto Hero"
            className="rounded-2xl shadow-xl w-full max-w-sm mx-auto"
          />
        </div>
      </div>
    </section>
  );
}