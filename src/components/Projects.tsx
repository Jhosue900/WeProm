import { ArrowRight, Plus } from 'lucide-react';
import { projectsData } from '../data';

interface ProjectsProps {
  onAddToCart: (name: string, price: string) => void;
}

export default function Projects({ onAddToCart }: ProjectsProps) {
  return (
    <section id="proyectos" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Proyectos Recientes
            </h2>
            <p className="text-gray-600">Lo último en merchandising corporativo.</p>
          </div>
          <a
            href="#"
            className="hidden md:flex items-center text-weprom-pink font-semibold hover:underline"
          >
            Ver todos <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {projectsData.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 group"
            >
              <div className="relative h-48 overflow-hidden rounded-t-xl bg-gray-100">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition duration-500"
                />
                <button
                  onClick={() => onAddToCart(product.name, product.price)}
                  className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-md text-weprom-pink hover:bg-weprom-pink hover:text-white transition"
                >
                  <Plus size={20} />
                </button>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-gray-800">{product.name}</h4>
                <p className="text-weprom-pink font-semibold mt-1">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
