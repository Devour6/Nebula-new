import { useEffect, useState, useMemo, useCallback } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleDelay: number;
  layer: "far" | "medium" | "bright";
}

interface ShootingStar {
  id: number;
  x: number;
  y: number;
}

interface StarFieldProps {
  mousePosition: { x: number; y: number };
}

export function StarField({ mousePosition }: StarFieldProps) {
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

  const stars = useMemo(() => {
    const generatedStars: Star[] = [];
    let id = 0;

    for (let i = 0; i < 150; i++) {
      generatedStars.push({
        id: id++,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        twinkleDelay: Math.random() * 5,
        layer: "far",
      });
    }

    for (let i = 0; i < 50; i++) {
      generatedStars.push({
        id: id++,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1.5,
        opacity: Math.random() * 0.4 + 0.3,
        twinkleDelay: Math.random() * 4,
        layer: "medium",
      });
    }

    for (let i = 0; i < 15; i++) {
      generatedStars.push({
        id: id++,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 2,
        opacity: Math.random() * 0.3 + 0.7,
        twinkleDelay: Math.random() * 3,
        layer: "bright",
      });
    }

    return generatedStars;
  }, []);

  const spawnShootingStar = useCallback(() => {
    const newStar: ShootingStar = {
      id: Date.now(),
      x: Math.random() * 40 + 5,
      y: Math.random() * 25 + 5,
    };
    setShootingStars((prev) => [...prev, newStar]);
    setTimeout(() => {
      setShootingStars((prev) => prev.filter((s) => s.id !== newStar.id));
    }, 1000);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        spawnShootingStar();
      }
    }, 12000);

    return () => clearInterval(interval);
  }, [spawnShootingStar]);

  const getParallaxOffset = (layer: "far" | "medium" | "bright") => {
    const multipliers = {
      far: 0.02,
      medium: 0.05,
      bright: 0.08,
    };
    return {
      x: (mousePosition.x - 0.5) * multipliers[layer] * 100,
      y: (mousePosition.y - 0.5) * multipliers[layer] * 100,
    };
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute -left-1/4 top-1/4 w-[600px] h-[800px] nebula-glow animate-fade-in"
        style={{
          transform: `translate(${(mousePosition.x - 0.5) * -30}px, ${(mousePosition.y - 0.5) * -20}px)`,
          animationDelay: "0.2s",
        }}
      />

      {stars.map((star) => {
        const offset = getParallaxOffset(star.layer);
        return (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `calc(${star.x}% + ${offset.x}px)`,
              top: `calc(${star.y}% + ${offset.y}px)`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.twinkleDelay}s`,
              animationDuration: star.layer === "bright" ? "2s" : star.layer === "medium" ? "3s" : "4s",
              boxShadow: star.layer === "bright" ? `0 0 ${star.size * 2}px rgba(255,255,255,0.5)` : "none",
            }}
          />
        );
      })}

      {shootingStars.map((star) => (
        <div
          key={star.id}
          className="absolute animate-shooting-star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" className="overflow-visible">
            <defs>
              <linearGradient id={`meteor-${star.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="60%" stopColor="rgba(255,255,255,0.3)" />
                <stop offset="90%" stopColor="rgba(255,255,255,0.8)" />
                <stop offset="100%" stopColor="white" />
              </linearGradient>
              <filter id={`glow-${star.id}`}>
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <line 
              x1="0" 
              y1="0" 
              x2="50" 
              y2="35" 
              stroke={`url(#meteor-${star.id})`}
              strokeWidth="2"
              strokeLinecap="round"
              filter={`url(#glow-${star.id})`}
            />
            <circle 
              cx="50" 
              cy="35" 
              r="2" 
              fill="white"
              filter={`url(#glow-${star.id})`}
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
