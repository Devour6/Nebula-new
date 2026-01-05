import { useState } from "react";
import { motion } from "framer-motion";

interface PlanetProps {
  type: "stake" | "unstake" | "security" | "tools";
  label: string;
  size: number;
  onClick: () => void;
  mousePosition: { x: number; y: number };
  delay?: number;
}

export function Planet({ type, label, size, onClick, mousePosition, delay = 0 }: PlanetProps) {
  const [isHovered, setIsHovered] = useState(false);

  const planetClasses = {
    stake: "planet-stake",
    unstake: "planet-unstake",
    security: "planet-security",
    tools: "planet-tools",
  };

  const floatClasses = {
    stake: "animate-float-1",
    unstake: "animate-float-2",
    security: "animate-float-3",
    tools: "animate-float-4",
  };

  const parallaxMultiplier = {
    stake: 0.12,
    unstake: 0.10,
    security: 0.08,
    tools: 0.09,
  };

  const parallaxOffset = {
    x: (mousePosition.x - 0.5) * parallaxMultiplier[type] * 100,
    y: (mousePosition.y - 0.5) * parallaxMultiplier[type] * 100,
  };

  return (
    <motion.div
      className="relative cursor-pointer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: 0.5 + delay,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      style={{
        transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`,
      }}
    >
      <div
        className={`${floatClasses[type]}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <motion.div
          className={`rounded-full ${planetClasses[type]} relative`}
          style={{ width: size, height: size }}
          animate={{
            scale: isHovered ? 1.08 : 1,
            filter: isHovered ? "brightness(1.2)" : "brightness(1)",
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          data-testid={`planet-${type}`}
        >
          <div 
            className="absolute inset-0 rounded-full animate-glow-pulse pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, transparent 30%, ${
                type === "stake" ? "rgba(139, 92, 246, 0.3)" :
                type === "unstake" ? "rgba(59, 130, 246, 0.3)" :
                type === "security" ? "rgba(249, 115, 22, 0.3)" :
                "rgba(16, 185, 129, 0.3)"
              } 100%)`,
              transform: "scale(1.2)",
            }}
          />

          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <div 
              className="px-4 py-2 bg-black/80 rounded-full backdrop-blur-sm border border-white/10"
              data-testid={`label-${type}`}
            >
              <span className="text-white font-bold tracking-widest text-sm uppercase">
                {label}
              </span>
            </div>
          </motion.div>

          <div 
            className="absolute inset-0 rounded-full overflow-hidden opacity-30 animate-rotate-slow pointer-events-none"
            style={{
              animationDuration: type === "stake" ? "60s" : type === "unstake" ? "80s" : type === "security" ? "45s" : "70s",
            }}
          >
            <div 
              className="absolute inset-0"
              style={{
                background: `linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)`,
              }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
