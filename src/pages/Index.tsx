import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import Sparkles from "@/components/Sparkles";
import RomanticButton from "@/components/RomanticButton";
import PageTransition from "@/components/PageTransition";

// ✨ CUSTOMIZE: Change this to your loved one's name
const BIRTHDAY_NAME = "My Love";

const Index = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-dreamy overflow-hidden flex flex-col items-center justify-center px-safe pb-safe pt-safe">
        {/* Floating hearts background */}
        <FloatingHearts count={8} />
        
        {/* Sparkles overlay */}
        <Sparkles count={15} />

        {/* Main content */}
        <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
          {/* Decorative heart */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="mb-6"
          >
            <span className="text-5xl md:text-6xl animate-heartbeat inline-block">
              💝
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-script text-4xl xs:text-5xl md:text-7xl text-foreground mb-4 leading-tight"
          >
            Happy Birthday
          </motion.h1>

          {/* Name */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="font-elegant text-2xl xs:text-3xl md:text-4xl text-accent mb-8 italic"
          >
            {BIRTHDAY_NAME}
          </motion.p>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="font-elegant text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-sm mx-auto"
          >
            Today is all about celebrating the most wonderful person in my life. 
            I have something special prepared just for you...
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="w-full xs:w-auto"
          >
            <RomanticButton
              onClick={() => navigate("/celebrate")}
              variant="primary"
              size="lg"
              className="w-full xs:w-auto"
            >
              ✨ Begin the Celebration ✨
            </RomanticButton>
          </motion.div>
        </div>

        {/* Bottom decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 text-2xl"
        >
          <span className="animate-float" style={{ animationDelay: "0s" }}>🌸</span>
          <span className="animate-float-slow" style={{ animationDelay: "0.5s" }}>💕</span>
          <span className="animate-float" style={{ animationDelay: "1s" }}>🌸</span>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Index;
