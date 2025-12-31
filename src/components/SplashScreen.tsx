import { motion } from "framer-motion";
import Logo from "../logo.jpg";

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-weprom-black"
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{
        delay: 1.4,
        duration: 0.5,
        ease: "easeInOut",
      }}
      onAnimationComplete={onFinish}
    >
      <motion.img
        src={Logo}
        alt="WeProm Logo"
        className="w-52"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
}
