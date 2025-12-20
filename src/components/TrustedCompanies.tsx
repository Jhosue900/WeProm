export default function TrustedCompanies() {
  return (
    <section className="py-10 bg-white border-b">
      <div className="container mx-auto px-6">
        <p className="text-center text-gray-400 text-sm mb-6 uppercase tracking-widest">
          Empresas que confían en nosotros
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <img src="https://via.placeholder.com/100x40?text=LOGO+1" className="h-8" alt="Logo 1" />
          <img src="https://via.placeholder.com/100x40?text=LOGO+2" className="h-8" alt="Logo 2" />
          <img src="https://via.placeholder.com/100x40?text=LOGO+3" className="h-8" alt="Logo 3" />
          <img src="https://via.placeholder.com/100x40?text=LOGO+4" className="h-8" alt="Logo 4" />
          <img src="https://via.placeholder.com/100x40?text=LOGO+5" className="h-8" alt="Logo 5" />
        </div>
      </div>
    </section>
  );
}
