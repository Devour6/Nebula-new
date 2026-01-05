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

  const planetConfig = {
    stake: {
      baseColors: ["#1a0533", "#3d1a5c", "#6b2d9e", "#9b4dca", "#c77dff"],
      atmosphere: "rgba(167, 139, 250, 0.3)",
      glow: "rgba(139, 92, 246, 0.5)",
      rotationDuration: "80s",
    },
    unstake: {
      baseColors: ["#0a1628", "#1a3a5c", "#2d6a9e", "#4d9eca", "#7dcfff"],
      atmosphere: "rgba(96, 165, 250, 0.3)",
      glow: "rgba(59, 130, 246, 0.5)",
      rotationDuration: "100s",
    },
    security: {
      baseColors: ["#331a00", "#5c3d1a", "#9e6b2d", "#ca9b4d", "#ffcf7d"],
      atmosphere: "rgba(251, 146, 60, 0.3)",
      glow: "rgba(249, 115, 22, 0.5)",
      rotationDuration: "60s",
    },
    tools: {
      baseColors: ["#0a2818", "#1a4c32", "#2d8e5a", "#4dca8a", "#7dffba"],
      atmosphere: "rgba(52, 211, 153, 0.3)",
      glow: "rgba(16, 185, 129, 0.5)",
      rotationDuration: "70s",
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
  const uniqueId = `planet-${type}-${Math.random().toString(36).substr(2, 9)}`;

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
              inset: -size * 0.12,
              background: `radial-gradient(circle at 30% 30%, ${config.atmosphere}, transparent 60%)`,
              filter: "blur(10px)",
            }}
          />

          <div
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{
              boxShadow: `
                inset -${size * 0.2}px -${size * 0.1}px ${size * 0.4}px rgba(0,0,0,0.9),
                inset ${size * 0.08}px ${size * 0.08}px ${size * 0.25}px rgba(255,255,255,0.15),
                0 0 ${size * 0.4}px ${config.glow},
                0 0 ${size * 0.8}px ${config.glow}
              `,
            }}
          >
            <svg 
              viewBox="0 0 200 200" 
              className="absolute inset-0 w-full h-full"
              style={{
                animation: `spin ${config.rotationDuration} linear infinite`,
              }}
            >
              <defs>
                <radialGradient id={`${uniqueId}-base`} cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor={config.baseColors[4]} stopOpacity="0.6" />
                  <stop offset="40%" stopColor={config.baseColors[2]} />
                  <stop offset="100%" stopColor={config.baseColors[0]} />
                </radialGradient>
                <filter id={`${uniqueId}-turbulence`}>
                  <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="4" seed={type === "stake" ? 1 : type === "unstake" ? 2 : type === "security" ? 3 : 4} />
                  <feDisplacementMap in="SourceGraphic" scale="15" />
                </filter>
                <filter id={`${uniqueId}-blur`}>
                  <feGaussianBlur stdDeviation="1" />
                </filter>
              </defs>
              
              <circle cx="100" cy="100" r="100" fill={`url(#${uniqueId}-base)`} />
              
              <ellipse cx="100" cy="60" rx="85" ry="12" fill={config.baseColors[3]} opacity="0.4" filter={`url(#${uniqueId}-blur)`} />
              <ellipse cx="100" cy="85" rx="90" ry="8" fill={config.baseColors[4]} opacity="0.3" filter={`url(#${uniqueId}-blur)`} />
              <ellipse cx="100" cy="110" rx="88" ry="10" fill={config.baseColors[2]} opacity="0.35" filter={`url(#${uniqueId}-blur)`} />
              <ellipse cx="100" cy="140" rx="80" ry="14" fill={config.baseColors[3]} opacity="0.4" filter={`url(#${uniqueId}-blur)`} />
              
              <circle cx="45" cy="70" r="18" fill={config.baseColors[4]} opacity="0.25" filter={`url(#${uniqueId}-blur)`} />
              <circle cx="130" cy="50" r="12" fill={config.baseColors[3]} opacity="0.2" filter={`url(#${uniqueId}-blur)`} />
              <circle cx="70" cy="130" r="22" fill={config.baseColors[2]} opacity="0.2" filter={`url(#${uniqueId}-blur)`} />
              <circle cx="150" cy="120" r="15" fill={config.baseColors[4]} opacity="0.15" filter={`url(#${uniqueId}-blur)`} />
              <circle cx="90" cy="40" r="10" fill={config.baseColors[4]} opacity="0.3" filter={`url(#${uniqueId}-blur)`} />
              <circle cx="160" cy="85" r="8" fill={config.baseColors[3]} opacity="0.25" filter={`url(#${uniqueId}-blur)`} />
              
              <path 
                d="M30,80 Q60,75 90,82 Q120,88 150,78 Q170,72 180,80" 
                stroke={config.baseColors[4]} 
                strokeWidth="6" 
                fill="none" 
                opacity="0.3"
                filter={`url(#${uniqueId}-blur)`}
              />
              <path 
                d="M20,120 Q50,130 80,118 Q110,106 140,115 Q160,122 180,115" 
                stroke={config.baseColors[3]} 
                strokeWidth="4" 
                fill="none" 
                opacity="0.25"
                filter={`url(#${uniqueId}-blur)`}
              />
            </svg>
          </div>

          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `linear-gradient(135deg, transparent 45%, rgba(0,0,0,0.75) 100%)`,
            }}
          />

          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              top: size * 0.06,
              left: size * 0.1,
              width: size * 0.35,
              height: size * 0.2,
              background: `radial-gradient(ellipse at center, rgba(255,255,255,0.35) 0%, transparent 70%)`,
              transform: "rotate(-25deg)",
              filter: "blur(3px)",
            }}
          />
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              top: size * 0.15,
              left: size * 0.2,
              width: size * 0.15,
              height: size * 0.08,
              background: `radial-gradient(ellipse at center, rgba(255,255,255,0.5) 0%, transparent 70%)`,
              transform: "rotate(-25deg)",
              filter: "blur(1px)",
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
