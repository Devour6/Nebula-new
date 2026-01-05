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
      x: Math.random() * 60,
      y: Math.random() * 40,
    };
    setShootingStars((prev) => [...prev, newStar]);
    setTimeout(() => {
      setShootingStars((prev) => prev.filter((s) => s.id !== newStar.id));
    }, 1500);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        spawnShootingStar();
      }
    }, 8000);

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
          <div
            className="w-24 h-0.5 bg-gradient-to-r from-white via-white/50 to-transparent rounded-full"
            style={{
              boxShadow: "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4)",
            }}
          />
        </div>
      ))}
    </div>
  );
}
