import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

import stakePlanetImg from "@assets/image_1767655627119.png";
import unstakePlanetImg from "@assets/image_1767655641511.png";
import securityPlanetImg from "@assets/image_1767655674835.png";
import toolsPlanetImg from "@assets/generated_images/emerald_green_planet_texture.png";

interface PlanetMeshProps {
  textureUrl: string;
  rotationSpeed: number;
}

function PlanetMesh({ textureUrl, rotationSpeed }: PlanetMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(textureUrl);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial 
        map={texture} 
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}

interface Planet3DProps {
  type: "stake" | "unstake" | "security" | "tools";
  label: string;
  size: number;
  onClick: () => void;
  mousePosition: { x: number; y: number };
  delay?: number;
}

export function Planet3D({ type, label, size, onClick, mousePosition, delay = 0 }: Planet3DProps) {
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
      rotationSpeed: 0.15,
    },
    unstake: {
      glow: "rgba(59, 130, 246, 0.4)",
      rotationSpeed: 0.1,
    },
    security: {
      glow: "rgba(249, 115, 22, 0.4)",
      rotationSpeed: 0.2,
    },
    tools: {
      glow: "rgba(16, 185, 129, 0.4)",
      rotationSpeed: 0.12,
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
              inset: -size * 0.12,
              background: `radial-gradient(circle at center, ${config.glow}, transparent 55%)`,
              filter: "blur(15px)",
            }}
          />

          <Canvas
            className="absolute inset-0"
            camera={{ position: [0, 0, 2.5], fov: 45 }}
            style={{ 
              width: size, 
              height: size,
              borderRadius: "50%",
            }}
          >
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 3, 5]} intensity={1.2} />
            <directionalLight position={[-3, -1, 2]} intensity={0.3} color="#4488ff" />
            <PlanetMesh 
              textureUrl={planetImages[type]} 
              rotationSpeed={config.rotationSpeed}
            />
          </Canvas>

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
