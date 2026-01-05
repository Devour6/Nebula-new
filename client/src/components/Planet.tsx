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
      glow: "rgba(139, 92, 246, 0.4)",
      rotationSpeed: "25s",
    },
    unstake: {
      glow: "rgba(59, 130, 246, 0.4)",
      rotationSpeed: "35s",
    },
    security: {
      glow: "rgba(249, 115, 22, 0.4)",
      rotationSpeed: "20s",
    },
    tools: {
      glow: "rgba(16, 185, 129, 0.4)",
      rotationSpeed: "30s",
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
            className="absolute pointer-events-none rounded-full"
            style={{
              inset: -size * 0.06,
              background: `radial-gradient(circle at center, ${config.glow}, transparent 65%)`,
              filter: "blur(12px)",
            }}
          />

          <div
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{
              WebkitMaskImage: "radial-gradient(circle at center, black 0%, black 45%, transparent 50%)",
              maskImage: "radial-gradient(circle at center, black 0%, black 45%, transparent 50%)",
            }}
          >
            <img 
              src={planetImages[type]} 
              alt={label}
              className="w-full h-full object-cover"
              style={{
                transform: "scale(1.15)",
              }}
              draggable={false}
            />
          </div>

          <div
            className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
            style={{
              animation: `planet-atmosphere ${config.rotationSpeed} linear infinite`,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(90deg, 
                    transparent 0%, 
                    transparent 30%,
                    rgba(255,255,255,0.03) 40%,
                    rgba(255,255,255,0.08) 50%,
                    rgba(255,255,255,0.03) 60%,
                    transparent 70%,
                    transparent 100%
                  )
                `,
              }}
            />
          </div>

          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at 30% 25%, rgba(255,255,255,0.15) 0%, transparent 35%),
                linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.4) 100%)
              `,
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
