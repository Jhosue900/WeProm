

export default function TrustedCompanies() {
  const logos = [
    { src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", alt: "Google", color: "red" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", alt: "Amazon", color: "blue" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", alt: "Microsoft", color: "green" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg", alt: "YouTube", color: "yellow" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg", alt: "Facebook", color: "red" }
  ];

  return (
    <section className="py-8 sm:py-10 bg-gradient-dark border-t border-weprom-gray-800 overflow-hidden relative">
      {/* Acento decorativo superior - Rainbow Effect */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-rainbow opacity-50"></div>
      
      <div className="container mx-auto px-4 sm:px-6">
        <p className="text-center text-weprom-gray-500 text-xs sm:text-sm mb-4 sm:mb-6 uppercase tracking-widest animate-fade-in font-light">
          Empresas que confían en nosotros
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
          {logos.map((logo, index) => (
            <div 
              key={index}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Contenedor con borde de color en hover - Rainbow Effect */}
              <div className={`p-4 rounded-lg border-2 border-transparent group-hover:border-weprom-${logo.color} transition-all duration-500 bg-weprom-dark-gray group-hover:bg-weprom-dark`}>
                <img 
                  src={logo.src} 
                  className="h-6 sm:h-8 grayscale group-hover:grayscale-0 transition-all duration-500 opacity-40 group-hover:opacity-100 animate-fade-in group-hover:scale-110 cursor-pointer filter brightness-200" 
                  alt={logo.alt}
                />
              </div>
              
              {/* Efecto de brillo sutil */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className={`absolute inset-0 bg-weprom-${logo.color}/5 rounded-lg blur-xl`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Acento decorativo inferior */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-rainbow opacity-50"></div>
    </section>
  );
}