import { motion } from "framer-motion";
import { useMemo } from "react";

const Confetti = () => {
  // Reduced count for mobile performance
  const confettiPieces = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobile ? 30 : 60;
    
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 3,
      color: [
        "bg-rose-400",
        "bg-coral-400",
        "bg-lavender-300",
        "bg-gold",
        "bg-blush-300",
        "bg-rose-300",
      ][Math.floor(Math.random() * 6)],
      rotation: Math.random() * 360,
      size: 6 + Math.random() * 8,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className={`absolute rounded-sm ${piece.color}`}
          style={{
            left: piece.left,
            width: piece.size,
            height: piece.size * 0.6,
          }}
          initial={{
            y: -20,
            rotate: piece.rotation,
            opacity: 1,
          }}
          animate={{
            y: "100vh",
            rotate: piece.rotation + 720,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
