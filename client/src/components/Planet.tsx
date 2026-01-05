import { useState } from "react";
import { motion } from "framer-motion";
import stakePlanetImg from "@assets/image_1767655627119.png";
import unstakePlanetImg from "@assets/image_1767655641511.png";
import securityPlanetImg from "@assets/image_1767655674835.png";
import toolsPlanetImg from "@assets/generated_images/emerald_green_planet_texture.png";

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

  const planetImages: Record<string, string> = {
    stake: stakePlanetImg,
    unstake: unstakePlanetImg,
    security: securityPlanetImg,
    tools: toolsPlanetImg,
  };

  const planetConfig = {
    stake: {
      glow: "rgba(139, 92, 246, 0.6)",
      glowColor: "#8B5CF6",
      hueRotate: 0,
    },
    unstake: {
      glow: "rgba(59, 130, 246, 0.6)",
      glowColor: "#3B82F6",
      hueRotate: 0,
    },
    security: {
      glow: "rgba(249, 115, 22, 0.6)",
      glowColor: "#F97316",
      hueRotate: 0,
    },
    tools: {
      glow: "rgba(16, 185, 129, 0.6)",
      glowColor: "#10B981",
      hueRotate: 0,
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

  const config = planetConfig[type];

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
              background: `radial-gradient(circle at center, ${config.glow}, transparent 60%)`,
              filter: "blur(20px)",
            }}
          />

          <div
            className="absolute inset-0 rounded-full overflow-hidden planet-rotate"
            style={{
              boxShadow: `
                0 0 ${size * 0.2}px ${config.glow},
                0 0 ${size * 0.5}px ${config.glow},
                inset -${size * 0.15}px -${size * 0.08}px ${size * 0.25}px rgba(0,0,0,0.5)
              `,
              filter: config.hueRotate ? `hue-rotate(${config.hueRotate}deg)` : "none",
            }}
          >
            <img 
              src={planetImages[type]} 
              alt={label}
              className="w-full h-full object-cover"
              style={{
                transform: "scale(1.1)",
              }}
            />
          </div>

          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `linear-gradient(120deg, rgba(255,255,255,0.1) 0%, transparent 40%, rgba(0,0,0,0.3) 100%)`,
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
