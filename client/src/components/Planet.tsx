import { useState } from "react";
import { motion } from "framer-motion";
import stakePlanetImg from "@assets/image_1767655627119.png";
import unstakePlanetImg from "@assets/image_1767655641511.png";
import securityPlanetImg from "@assets/image_1767655674835.png";

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

  const planetImages = {
    stake: stakePlanetImg,
    unstake: unstakePlanetImg,
    security: securityPlanetImg,
    tools: securityPlanetImg,
  };

  const planetConfig = {
    stake: {
      atmosphere: "rgba(167, 139, 250, 0.25)",
      glow: "rgba(139, 92, 246, 0.5)",
      rotationDuration: "40s",
    },
    unstake: {
      atmosphere: "rgba(96, 165, 250, 0.25)",
      glow: "rgba(59, 130, 246, 0.5)",
      rotationDuration: "50s",
    },
    security: {
      atmosphere: "rgba(251, 146, 60, 0.25)",
      glow: "rgba(249, 115, 22, 0.5)",
      rotationDuration: "35s",
    },
    tools: {
      atmosphere: "rgba(52, 211, 153, 0.25)",
      glow: "rgba(16, 185, 129, 0.5)",
      rotationDuration: "45s",
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
              inset: -size * 0.1,
              background: `radial-gradient(circle at 30% 30%, ${config.atmosphere}, transparent 60%)`,
              filter: "blur(12px)",
            }}
          />

          <div
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{
              boxShadow: `
                0 0 ${size * 0.3}px ${config.glow},
                0 0 ${size * 0.6}px ${config.glow}
              `,
            }}
          >
            <div
              className="absolute"
              style={{
                top: 0,
                left: 0,
                width: size * 2,
                height: size,
                backgroundImage: `url(${planetImages[type]})`,
                backgroundSize: `${size}px ${size}px`,
                backgroundRepeat: "repeat-x",
                animation: `scroll-planet ${config.rotationDuration} linear infinite`,
              }}
            />
          </div>

          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `linear-gradient(100deg, transparent 40%, rgba(0,0,0,0.6) 100%)`,
            }}
          />

          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              top: size * 0.05,
              left: size * 0.08,
              width: size * 0.3,
              height: size * 0.18,
              background: `radial-gradient(ellipse at center, rgba(255,255,255,0.25) 0%, transparent 70%)`,
              transform: "rotate(-25deg)",
              filter: "blur(4px)",
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
