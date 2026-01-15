import { motion } from "framer-motion";
import { useMemo } from "react";

interface FirecrackersProps {
  count?: number;
}

const Firecrackers = ({ count = 6 }: FirecrackersProps) => {
  const fireworks = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const fireworkCount = isMobile ? 3 : count;
    
    return Array.from({ length: fireworkCount }, (_, i) => {
      const left = `${15 + Math.random() * 70}%`;
      const top = `${15 + Math.random() * 40}%`; // Upper portion of screen
      const delay = 1 + Math.random() * 2;
      const duration = 1.5 + Math.random() * 0.5;
      const sparkCount = isMobile ? 20 : 30;
      
      return {
        id: i,
        left,
        top,
        delay,
        duration,
        sparkCount,
        // Create multiple layers of sparks for realistic explosion
        layers: [
          { count: sparkCount, distance: 60, size: 6, delay: 0 },
          { count: Math.floor(sparkCount * 0.7), distance: 90, size: 4, delay: 0.1 },
          { count: Math.floor(sparkCount * 0.5), distance: 120, size: 3, delay: 0.2 },
        ],
      };
    });
  }, [count]);

  const createSparks = (firework: typeof fireworks[0], layer: typeof firework.layers[0]) => {
    return Array.from({ length: layer.count }, (_, i) => {
      // Random angle for more natural explosion
      const angle = (360 / layer.count) * i + (Math.random() - 0.5) * 20;
      const distance = layer.distance + Math.random() * 30;
      const radian = (angle * Math.PI) / 180;
      const x = Math.cos(radian) * distance;
      const y = Math.sin(radian) * distance + (Math.random() * 20); // Add slight gravity effect
      
      const colors = [
        "bg-rose-400",
        "bg-coral-400",
        "bg-gold",
        "bg-yellow-400",
        "bg-orange-400",
        "bg-red-400",
        "bg-pink-400",
        "bg-purple-400",
      ];
      
      return {
        id: `${layer.delay}-${i}`,
        x,
        y,
        delay: layer.delay + Math.random() * 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: layer.size + Math.random() * 2,
        opacity: 0.8 + Math.random() * 0.2,
      };
    });
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-30">
      {fireworks.map((firework) => (
        <div key={firework.id}>
          {/* Rocket trail (shooting up) */}
          <motion.div
            className="absolute"
            style={{
              left: firework.left,
              bottom: '20%',
            }}
            initial={{
              y: 0,
              opacity: 1,
            }}
            animate={{
              y: `-${parseFloat(firework.top)}`,
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 0.5,
              delay: firework.delay,
              repeat: Infinity,
              repeatDelay: 3 + Math.random() * 2,
              ease: "easeOut",
            }}
          >
            <div className="w-1 h-8 bg-gradient-to-t from-yellow-400 to-orange-500 rounded-full blur-sm" />
          </motion.div>

          {/* Firework explosion center */}
          <motion.div
            className="absolute"
            style={{
              left: firework.left,
              top: firework.top,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.5, 1, 0],
              opacity: [0, 1, 0.8, 0],
            }}
            transition={{
              duration: firework.duration,
              delay: firework.delay + 0.5,
              repeat: Infinity,
              repeatDelay: 3 + Math.random() * 2,
              ease: "easeOut",
            }}
          >
            <div className="w-4 h-4 bg-gold rounded-full blur-sm" />
          </motion.div>

          {/* Multiple layers of sparks for realistic explosion */}
          {firework.layers.map((layer) => {
            const sparks = createSparks(firework, layer);
            return sparks.map((spark) => (
              <motion.div
                key={spark.id}
                className={`absolute rounded-full ${spark.color} blur-[1px]`}
                style={{
                  left: firework.left,
                  top: firework.top,
                  width: spark.size,
                  height: spark.size,
                  boxShadow: `0 0 ${spark.size * 2}px currentColor`,
                }}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  x: spark.x,
                  y: spark.y,
                  scale: [0, 1, 0.8, 0],
                  opacity: [0, spark.opacity, spark.opacity * 0.7, 0],
                }}
                transition={{
                  duration: firework.duration,
                  delay: firework.delay + 0.5 + spark.delay,
                  repeat: Infinity,
                  repeatDelay: 3 + Math.random() * 2,
                  ease: "easeOut",
                }}
              />
            ));
          })}

          {/* Additional twinkling sparks */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`twinkle-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                left: firework.left,
                top: firework.top,
                width: 2,
                height: 2,
              }}
              initial={{
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * 100,
                scale: 0,
                opacity: 0,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 0.8,
                delay: firework.delay + 0.5 + i * 0.1,
                repeat: Infinity,
                repeatDelay: 3 + Math.random() * 2,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Firecrackers;
