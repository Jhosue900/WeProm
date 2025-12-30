export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 sm:pt-20 lg:pt-0"
    >
      {/* Background con Dark Effect */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      >
        {/* Dark overlay con gradiente sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-weprom-dark/95 via-weprom-dark/90 to-weprom-dark/85"></div>
        
        {/* Acento de color minimalista - Rainbow Effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-rainbow"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-[5] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Contenido de texto */}
        <div className="animate-fade-in-up text-center lg:text-left space-y-4 sm:space-y-6">
          <span className="text-weprom-red font-semibold tracking-wider uppercase text-xs sm:text-sm inline-block animate-slide-in">
            Personalización Total
          </span>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-weprom-white leading-tight tracking-wide">
            Marca tu{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue animate-gradient-x">
              Estilo
            </span>
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-weprom-gray-400 max-w-lg mx-auto lg:mx-0 animate-fade-in animation-delay-300 font-light leading-relaxed">
            Artículos promocionales únicos para tu empresa. Calidad, diseño y funcionalidad
            en cada producto.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in animation-delay-500 pt-2">
            <a
              href="#proyectos"
              className="relative overflow-hidden bg-gradient-to-r from-weprom-red to-weprom-yellow text-weprom-white px-6 sm:px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 hover:scale-105 duration-300 text-center text-sm sm:text-base group"
            >
              <span className="relative z-10">Ver Catálogo</span>
              <div className="absolute inset-0 bg-gradient-to-r from-weprom-blue to-weprom-green opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300"></div>
            </a>
            <a
              href="#contacto"
              className="bg-transparent text-weprom-gray-300 border-2 border-weprom-gray-700 px-6 sm:px-8 py-3 rounded-full font-semibold hover:border-weprom-blue hover:text-weprom-blue transition-all duration-300 text-center text-sm sm:text-base hover:bg-weprom-dark-gray/50"
            >
              Cotizar Ahora
            </a>
          </div>
          
          {/* Stats con colores de marca - Rainbow Effect */}
          <div className="grid grid-cols-3 gap-4 pt-8 animate-fade-in animation-delay-700">
            <div className="text-center border-l-2 border-weprom-red pl-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-weprom-red to-weprom-red/80">500+</div>
              <div className="text-xs sm:text-sm text-weprom-gray-500 font-light">Productos</div>
            </div>
            <div className="text-center border-l-2 border-weprom-blue pl-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-weprom-blue to-weprom-blue/80">1000+</div>
              <div className="text-xs sm:text-sm text-weprom-gray-500 font-light">Clientes</div>
            </div>
            <div className="text-center border-l-2 border-weprom-green pl-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-weprom-green to-weprom-green/80">24/7</div>
              <div className="text-xs sm:text-sm text-weprom-gray-500 font-light">Soporte</div>
            </div>
          </div>
        </div>

        {/* Imagen del producto con Vintage Effect */}
        <div className="hidden lg:block relative animate-fade-in animation-delay-700">
          <div className="relative group">
            {/* Acento de color - línea decorativa */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-red rounded-full opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-blue rounded-full opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-500"></div>
            
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Producto Hero"
              className="rounded-3xl shadow-xl transform rotate-[-6deg] hover:rotate-0 hover:scale-105 transition-all duration-500 hover:shadow-2xl w-full max-w-lg mx-auto filter grayscale hover:grayscale-0 border-2 border-weprom-gray-800"
            />
            
            {/* Badge decorativo con color de marca */}
            <div className="absolute top-4 right-4 bg-gradient-to-r from-weprom-red to-weprom-yellow text-weprom-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">
              Nuevo
            </div>
          </div>
        </div>

        {/* Imagen móvil/tablet con Vintage Effect */}
        <div className="lg:hidden relative animate-fade-in animation-delay-700 mt-8">
          <div className="relative">
            {/* Efectos de luz sutiles */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-red rounded-full opacity-30 blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-blue rounded-full opacity-30 blur-xl"></div>
            
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Producto Hero"
              className="rounded-2xl shadow-lg w-full max-w-sm mx-auto filter grayscale border-2 border-weprom-gray-800"
            />
            
            {/* Badge decorativo */}
            <div className="absolute top-4 right-4 bg-gradient-to-r from-weprom-red to-weprom-yellow text-weprom-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
              Nuevo
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator con color de marca */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-weprom-gray-700 rounded-full flex items-start justify-center p-2 bg-weprom-dark-gray/50 backdrop-blur-sm">
          <div className="w-1.5 h-3 bg-gradient-to-b from-weprom-red to-weprom-yellow rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}