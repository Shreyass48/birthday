import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import RomanticButton from "@/components/RomanticButton";
import PageTransition from "@/components/PageTransition";
import Confetti from "@/components/Confetti";
import Balloons from "@/components/Balloons";
import Firecrackers from "@/components/Firecrackers";
import Sparkles from "@/components/Sparkles";

const Celebrate = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showEffects, setShowEffects] = useState(false);

  useEffect(() => {
    // Show confetti after cake appears
    const confettiTimer = setTimeout(() => setShowConfetti(true), 1000);
    // Show effects after a short delay
    const effectsTimer = setTimeout(() => setShowEffects(true), 500);
    // Show button after animations
    const buttonTimer = setTimeout(() => setShowButton(true), 2000);

    return () => {
      clearTimeout(confettiTimer);
      clearTimeout(effectsTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-sunset overflow-hidden flex flex-col items-center justify-center px-safe pb-safe pt-safe">
        {/* Confetti */}
        {showConfetti && <Confetti />}

        {/* Balloons floating from bottom to top */}
        {showEffects && <Balloons count={10} />}

        {/* Firecrackers */}
        {showEffects && <Firecrackers count={6} />}

        {/* Sparkles for extra fancy effect */}
        {showEffects && <Sparkles count={15} />}

        {/* Main content */}
        <div className="relative z-40 text-center px-4 xs:px-6 max-w-lg mx-auto">
          {/* Cake with enhanced glow */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              type: "spring",
              stiffness: 100,
            }}
            className="mb-6 xs:mb-8"
          >
            <motion.div
              className="text-7xl xs:text-8xl md:text-9xl animate-pulse-soft relative"
              animate={{
                filter: [
                  "drop-shadow(0 0 10px rgba(255, 182, 193, 0.5))",
                  "drop-shadow(0 0 20px rgba(255, 192, 203, 0.8))",
                  "drop-shadow(0 0 10px rgba(255, 182, 193, 0.5))",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              🎂
            </motion.div>
          </motion.div>

          {/* Title with enhanced styling */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="font-script text-3xl xs:text-4xl md:text-5xl text-foreground mb-3 xs:mb-4 relative"
          >
            <motion.span
              className="inline-block"
              animate={{
                textShadow: [
                  "0 0 10px rgba(255, 182, 193, 0.5)",
                  "0 0 20px rgba(255, 192, 203, 0.8)",
                  "0 0 10px rgba(255, 182, 193, 0.5)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
          >
            Make a Wish!
            </motion.span>
          </motion.h2>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="font-elegant text-sm xs:text-base md:text-lg text-muted-foreground mb-6 xs:mb-8 leading-relaxed px-2"
          >
            Close your eyes, take a deep breath, and make the most beautiful wish. 
            May all your dreams come true this year! 🌟
          </motion.p>

          {/* Enhanced candles animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex justify-center gap-1 xs:gap-2 mb-6 xs:mb-8 flex-wrap"
          >
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  filter: [
                    "drop-shadow(0 0 5px rgba(255, 215, 0, 0.5))",
                    "drop-shadow(0 0 15px rgba(255, 215, 0, 0.9))",
                    "drop-shadow(0 0 5px rgba(255, 215, 0, 0.5))",
                  ],
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
                className="text-xl xs:text-2xl"
              >
                🕯️
              </motion.span>
            ))}
          </motion.div>

          {/* Button */}
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full xs:w-auto"
            >
              <RomanticButton
                onClick={() => navigate("/message")}
                variant="gold"
                size="lg"
                className="w-full xs:w-auto"
              >
                💌 Open My Message
              </RomanticButton>
            </motion.div>
          )}
        </div>

        {/* Enhanced decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-6 xs:bottom-10 left-0 right-0 flex justify-center gap-3 xs:gap-4 text-2xl xs:text-3xl z-30"
        >
          <motion.span
            className="animate-float"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🎁
          </motion.span>
          <motion.span
            className="animate-float-slow"
            animate={{
              y: [0, -8, 0],
              rotate: [0, -3, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            🎀
          </motion.span>
          <motion.span
            className="animate-float"
            animate={{
              y: [0, -12, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            🎊
          </motion.span>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Celebrate;
