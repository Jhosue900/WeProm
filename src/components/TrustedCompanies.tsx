export default function TrustedCompanies() {
  const logos = [
    { src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", alt: "Google" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", alt: "Amazon" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", alt: "Microsoft" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg", alt: "YouTube" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg", alt: "Facebook" }
  ];

  return (
    <section className="py-8 sm:py-10 bg-white border-b overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <p className="text-center text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 uppercase tracking-widest animate-fade-in">
          Empresas que confían en nosotros
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
          {logos.map((logo, index) => (
            <img 
              key={index}
              src={logo.src} 
              className="h-6 sm:h-8 grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 animate-fade-in hover:scale-110 cursor-pointer" 
              alt={logo.alt}
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}



          
        </div>
      </div>




    </section>
  );
}