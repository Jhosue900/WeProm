import { Campaign, Product } from '../types';

export const campaignsData: Campaign[] = [
  {
    id: 1,
    title: "Verano Corporativo",
    desc: "Gorras, termos y camisetas para eventos al aire libre.",
    img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    color: "bg-orange-100"
  },
  {
    id: 2,
    title: "Vuelta a la Oficina",
    desc: "Kits de bienvenida, libretas y bolígrafos premium.",
    img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    color: "bg-blue-100"
  }
];

export const projectsData: Product[] = [
  {
    id: 101,
    name: "Termo Digital",
    price: "$45.000",
    img: "https://images.unsplash.com/photo-1602143407151-11115cd4e69b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 102,
    name: "Hoodie WeProm",
    price: "$85.000",
    img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 103,
    name: "Mochila Tech",
    price: "$120.000",
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 104,
    name: "Mug Cerámica",
    price: "$25.000",
    img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  }
];
