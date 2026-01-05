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

  const planetColors = {
    stake: {
      base: "from-violet-900 via-purple-700 to-violet-500",
      surface: "from-purple-600/40 via-violet-800/60 to-purple-950",
      atmosphere: "rgba(139, 92, 246, 0.4)",
      glow: "rgba(167, 139, 250, 0.3)",
    },
    unstake: {
      base: "from-blue-900 via-blue-700 to-cyan-500",
      surface: "from-cyan-500/30 via-blue-800/60 to-blue-950",
      atmosphere: "rgba(59, 130, 246, 0.4)",
      glow: "rgba(96, 165, 250, 0.3)",
    },
    security: {
      base: "from-orange-900 via-orange-600 to-amber-400",
      surface: "from-amber-400/40 via-orange-700/60 to-orange-950",
      atmosphere: "rgba(249, 115, 22, 0.4)",
      glow: "rgba(251, 146, 60, 0.3)",
    },
    tools: {
      base: "from-emerald-900 via-emerald-600 to-teal-400",
      surface: "from-teal-400/30 via-emerald-700/60 to-emerald-950",
      atmosphere: "rgba(16, 185, 129, 0.4)",
      glow: "rgba(52, 211, 153, 0.3)",
    },
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

  const colors = planetColors[type];

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
          className="relative"
          style={{ width: size, height: size }}
          animate={{
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          data-testid={`planet-${type}`}
        >
          <div 
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: -size * 0.15,
              background: `radial-gradient(circle at 30% 30%, ${colors.atmosphere}, transparent 60%)`,
              filter: "blur(8px)",
            }}
          />

          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${colors.base}`}
            style={{
              boxShadow: `
                inset -${size * 0.15}px -${size * 0.1}px ${size * 0.3}px rgba(0,0,0,0.8),
                inset ${size * 0.05}px ${size * 0.05}px ${size * 0.2}px rgba(255,255,255,0.1),
                0 0 ${size * 0.3}px ${colors.glow},
                0 0 ${size * 0.6}px ${colors.glow}
              `,
            }}
          />

          <div
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${colors.surface})`,
            }}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 20%),
                  radial-gradient(circle at 70% 60%, rgba(0,0,0,0.3) 0%, transparent 25%),
                  radial-gradient(circle at 40% 70%, rgba(0,0,0,0.2) 0%, transparent 15%),
                  radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 20%)
                `,
              }}
            />
          </div>

          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `linear-gradient(135deg, transparent 40%, rgba(0,0,0,0.7) 100%)`,
            }}
          />

          <div
            className="absolute rounded-full"
            style={{
              top: size * 0.08,
              left: size * 0.12,
              width: size * 0.25,
              height: size * 0.15,
              background: `radial-gradient(ellipse at center, rgba(255,255,255,0.4) 0%, transparent 70%)`,
              transform: "rotate(-30deg)",
              filter: "blur(2px)",
            }}
          />

          <div
            className="absolute rounded-full"
            style={{
              top: size * 0.18,
              left: size * 0.25,
              width: size * 0.1,
              height: size * 0.06,
              background: `radial-gradient(ellipse at center, rgba(255,255,255,0.6) 0%, transparent 70%)`,
              transform: "rotate(-30deg)",
              filter: "blur(1px)",
            }}
          />

          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
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
        </motion.div>
      </div>
    </motion.div>
  );
}
