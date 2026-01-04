import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "../LOGOLISONEGRO.png";
import LogoLight from "../LOGOLISOBLANCO.png";

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-white via-weprom-gray-50 to-weprom-gray-100 dark:from-weprom-dark dark:via-weprom-dark-gray dark:to-black overflow-hidden"
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{
        delay: 2.2,
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      onAnimationComplete={onFinish}
    >
      {/* Círculos decorativos animados */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-weprom-red/10 dark:bg-weprom-red/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-weprom-blue/10 dark:bg-weprom-blue/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-80 h-80 bg-weprom-yellow/10 dark:bg-weprom-yellow/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Contenedor principal */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo con animación mejorada */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue rounded-2xl blur-xl opacity-30"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.img
            src={isDarkMode ? Logo : LogoLight}
            alt="WeProm Logo"
            className="w-56 sm:w-64 md:w-72 relative z-10 drop-shadow-2xl"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Texto animado */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.h2
            className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% auto",
            }}
          >
            Marketing Digital
          </motion.h2>
          <motion.p
            className="text-sm text-weprom-gray-600 dark:text-weprom-gray-400 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Impulsamos tu marca al siguiente nivel
          </motion.p>
        </motion.div>

        {/* Loader de puntos mejorado */}
        <motion.div
          className="mt-12 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {['red', 'yellow', 'green', 'blue'].map((color, i) => (
            <motion.div
              key={i}
              className={`relative`}
            >
              {/* Glow effect */}
              <motion.div
                className={`absolute inset-0 w-3 h-3 rounded-full bg-weprom-${color} blur-md`}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
              {/* Dot principal */}
              <motion.div
                className={`relative w-3 h-3 rounded-full bg-weprom-${color} shadow-lg`}
                animate={{
                  y: [0, -12, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Barra de progreso */}
        <motion.div
          className="mt-8 w-48 h-1 bg-weprom-gray-200 dark:bg-weprom-gray-800 rounded-full overflow-hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.4 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      {/* Partículas flotantes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-weprom-red/20 dark:bg-weprom-red/10 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}