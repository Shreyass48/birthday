import { motion } from "framer-motion";
import { useMemo } from "react";

interface SparklesProps {
  count?: number;
}

const Sparkles = ({ count = 12 }: SparklesProps) => {
  const sparkles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      top: `${10 + Math.random() * 80}%`,
      delay: Math.random() * 3,
      scale: 0.5 + Math.random() * 0.5,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute w-2 h-2"
          style={{
            left: sparkle.left,
            top: sparkle.top,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, sparkle.scale, 0],
          }}
          transition={{
            duration: 2,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-full h-full text-gold"
          >
            <path
              d="M12 2L13.5 9.5L21 12L13.5 14.5L12 22L10.5 14.5L3 12L10.5 9.5L12 2Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default Sparkles;
