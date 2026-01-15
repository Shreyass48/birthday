import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RomanticButtonProps {
  variant?: "primary" | "secondary" | "gold";
  size?: "default" | "lg";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const RomanticButton = ({
  className,
  variant = "primary",
  size = "default",
  children,
  onClick,
  disabled,
}: RomanticButtonProps) => {
  const variants = {
    primary: "bg-romantic text-foreground shadow-romantic hover:shadow-glow",
    secondary: "glass-romantic text-foreground border-2 border-primary/30",
    gold: "bg-gold-gradient text-gold-foreground shadow-gold",
  };

  const sizes = {
    default: "py-4 px-8 text-base",
    lg: "py-5 px-10 text-lg",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative rounded-2xl font-elegant font-medium",
        "touch-target min-h-[44px]",
        "transition-all duration-300",
        "active:opacity-90",
        "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </motion.button>
  );
};

export default RomanticButton;
