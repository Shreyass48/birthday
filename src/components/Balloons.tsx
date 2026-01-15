import { motion } from "framer-motion";
import { useMemo } from "react";

interface BalloonsProps {
  count?: number;
}

const Balloons = ({ count = 8 }: BalloonsProps) => {
  const balloons = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const balloonCount = isMobile ? 5 : count;
    
    const colors = [
      "text-rose-400",
      "text-coral-400",
      "text-lavender-300",
      "text-rose-300",
      "text-blush-400",
      "text-gold",
      "text-accent",
    ];
    
    return Array.from({ length: balloonCount }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      delay: Math.random() * 3,
      duration: 8 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: isMobile ? 32 + Math.random() * 16 : 40 + Math.random() * 24,
      rotation: -15 + Math.random() * 30,
      horizontalDrift: -20 + Math.random() * 40,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          className={`absolute ${balloon.color}`}
          style={{
            left: balloon.left,
            fontSize: balloon.size,
            bottom: '-5vh',
          }}
          initial={{
            y: 0,
            x: 0,
            rotate: balloon.rotation,
            opacity: 0,
          }}
          animate={{
            y: '-120vh',
            x: balloon.horizontalDrift,
            rotate: balloon.rotation + 360,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: balloon.duration,
            delay: balloon.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          🎈
        </motion.div>
      ))}
    </div>
  );
};

export default Balloons;
