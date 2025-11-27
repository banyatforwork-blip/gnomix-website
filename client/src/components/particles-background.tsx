import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export function ParticlesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 30 : 60;

    const initialParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    setParticles(initialParticles);

    const animate = () => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x: ((p.x + p.speedX + 100) % 100),
          y: ((p.y + p.speedY + 100) % 100),
        }))
      );
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (containerRef.current && e.touches.length > 0) {
        const rect = containerRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        setMousePos({
          x: ((touch.clientX - rect.left) / rect.width) * 100,
          y: ((touch.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {/* Mesh gradient background */}
      <div className="mesh-gradient" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, hsla(217, 91%, 60%, 0.4) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: ["-20%", "20%", "-20%"],
          y: ["-20%", "30%", "-20%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute right-0 w-[500px] h-[500px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, hsla(271, 70%, 55%, 0.4) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: ["20%", "-20%", "20%"],
          y: ["30%", "-10%", "30%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-0 left-1/2 w-[400px] h-[400px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, hsla(320, 80%, 55%, 0.4) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: ["-50%", "-30%", "-50%"],
          y: ["0%", "-20%", "0%"],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating particles */}
      <svg className="absolute inset-0 w-full h-full">
        {particles.map((particle) => {
          const dx = mousePos.x - particle.x;
          const dy = mousePos.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - distance / 20);
          const offsetX = dx * influence * 0.1;
          const offsetY = dy * influence * 0.1;

          return (
            <circle
              key={particle.id}
              cx={`${particle.x + offsetX}%`}
              cy={`${particle.y + offsetY}%`}
              r={particle.size}
              fill="currentColor"
              className="text-primary"
              style={{ opacity: particle.opacity }}
            />
          );
        })}

        {/* Connection lines between nearby particles */}
        {particles.map((p1, i) =>
          particles.slice(i + 1).map((p2) => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 15) {
              return (
                <line
                  key={`${p1.id}-${p2.id}`}
                  x1={`${p1.x}%`}
                  y1={`${p1.y}%`}
                  x2={`${p2.x}%`}
                  y2={`${p2.y}%`}
                  stroke="currentColor"
                  className="text-primary"
                  strokeWidth="0.5"
                  style={{ opacity: (1 - distance / 15) * 0.2 }}
                />
              );
            }
            return null;
          })
        )}
      </svg>
    </div>
  );
}
