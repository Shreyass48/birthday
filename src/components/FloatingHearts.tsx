import { motion } from "framer-motion";
import { useMemo } from "react";

interface FloatingHeartsProps {
  count?: number;
}

const FloatingHearts = ({ count = 6 }: FloatingHeartsProps) => {
  const hearts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 6,
      size: 16 + Math.random() * 20,
      opacity: 0.3 + Math.random() * 0.4,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-accent"
          style={{
            left: heart.left,
            fontSize: heart.size,
            opacity: heart.opacity,
          }}
          initial={{ y: "100vh", rotate: 0 }}
          animate={{
            y: "-100vh",
            rotate: 360,
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
