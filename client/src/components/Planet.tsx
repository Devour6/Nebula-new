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
      glow: "rgba(180, 120, 255, 0.5)",
    },
    unstake: {
      glow: "rgba(80, 150, 255, 0.5)",
    },
    security: {
      glow: "rgba(255, 140, 50, 0.5)",
    },
    tools: {
      glow: "rgba(50, 220, 150, 0.5)",
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
            className="absolute pointer-events-none"
            style={{
              inset: -size * 0.15,
              borderRadius: "50%",
              background: `radial-gradient(circle at center, ${config.glow} 0%, transparent 70%)`,
              filter: "blur(20px)",
            }}
          />

          <div
            style={{
              width: size,
              height: size,
              aspectRatio: "1 / 1",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <img 
              src={planetImages[type]} 
              alt={label}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: "scale(1.15)",
              }}
              draggable={false}
            />
          </div>

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
