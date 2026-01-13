import { motion } from 'framer-motion';
import { 
  Target, Award, Users, Globe, Clock, Shield, 
  Star, Heart, Zap, TrendingUp, CheckCircle, Lightbulb
} from 'lucide-react';

export default function AboutUs() {
  // Datos de diferenciadores
  const differentiators = [
    {
      icon: Target,
      title: 'Enfoque Estratégico',
      description: 'Desarrollamos estrategias personalizadas que generan resultados tangibles para tu marca.',
      color: 'red',
      stats: '100+ estrategias exitosas'
    },
    {
      icon: Award,
      title: 'Calidad Premium',
      description: 'Materiales de primera calidad y acabados profesionales en cada producto.',
      color: 'yellow',
      stats: 'Certificación ISO 9001'
    },
    {
      icon: Users,
      title: 'Equipo Experto',
      description: 'Profesionales con más de 10 años de experiencia en marketing y publicidad.',
      color: 'blue',
      stats: '15+ especialistas'
    },
    {
      icon: Globe,
      title: 'Alcance Nacional',
      description: 'Cobertura en toda Colombia con logística eficiente y rápida.',
      color: 'green',
      stats: '50+ ciudades'
    }
  ];

  // Valores de la empresa
  const values = [
    {
      icon: Heart,
      title: 'Pasión',
      description: 'Amamos lo que hacemos y eso se refleja en cada proyecto.',
      color: 'red'
    },
    {
      icon: Shield,
      title: 'Integridad',
      description: 'Transparencia y honestidad en cada interacción con nuestros clientes.',
      color: 'blue'
    },
    {
      icon: Zap,
      title: 'Innovación',
      description: 'Siempre a la vanguardia con las últimas tendencias y tecnologías.',
      color: 'yellow'
    },
    {
      icon: Clock,
      title: 'Puntualidad',
      description: 'Entregas a tiempo, respetando tus plazos y necesidades.',
      color: 'green'
    }
  ];

  // Hechos y estadísticas
  const stats = [
    { number: '10+', label: 'Años de experiencia', color: 'red' },
    { number: '1000+', label: 'Clientes satisfechos', color: 'blue' },
    { number: '5000+', label: 'Proyectos completados', color: 'green' },
    { number: '98%', label: 'Tasa de satisfacción', color: 'yellow' }
  ];

  return (
    <section id="nosotros" className="relative pt-12 pb-16 sm:pb-20 lg:pb-24 bg-gradient-to-b from-weprom-gray-50 via-white to-weprom-gray-50 dark:from-weprom-dark dark:via-weprom-dark-gray dark:to-weprom-dark overflow-hidden">
      {/* This is not gonna be used for now*/}
    </section>
  );

}