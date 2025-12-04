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
  repelThreshold: number;
  closeDuration: number;
  stuckDuration: number;
  isStuck: boolean;
  isSpecial: boolean;
}

export function ParticlesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const mousePosRef = useRef({ x: -1000, y: -1000 });
  const isMouseDownRef = useRef(false);
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
      repelThreshold: Math.random() * 60 + 40,
      closeDuration: 0,
      stuckDuration: 0,
      isStuck: false,
      isSpecial: false,
    }));

    setParticles(initialParticles);

    const animate = () => {
      setParticles((prev) => {
        const updated = prev.map((p) => {
          let newX = p.x + p.speedX;
          let newY = p.y + p.speedY;

          // Wrap around edges
          newX = ((newX + 100) % 100);
          newY = ((newY + 100) % 100);

          // Mouse interaction
          const pxPos = (newX * window.innerWidth) / 100;
          const pyPos = (newY * window.innerHeight) / 100;
          const dx = mousePosRef.current.x - pxPos;
          const dy = mousePosRef.current.y - pyPos;
          const distance = Math.sqrt(dx * dx + dy * dy);

          let closeDuration = p.closeDuration;
          let stuckDuration = p.stuckDuration;
          let isStuck = p.isStuck;

          if (distance < 300) {
            const influence = Math.max(0, 1 - distance / 300);
            
            if (isMouseDownRef.current) {
              // Repel on click
              const repelForce = influence * 0.8;
              newX -= (dx / (distance || 1)) * repelForce * 0.15;
              newY -= (dy / (distance || 1)) * repelForce * 0.15;
              closeDuration = 0;
              stuckDuration = 0;
              isStuck = false;
            } else if (distance < p.repelThreshold) {
              // Repel if too close - track duration
              const repelForce = (1 - distance / p.repelThreshold) * 1.2;
              newX -= (dx / (distance || 1)) * repelForce * 0.4;
              newY -= (dy / (distance || 1)) * repelForce * 0.4;
              closeDuration += 1;
              if (closeDuration > 60) {
                isStuck = true;
              }
              stuckDuration = 0;
            } else if (!isStuck) {
              // Attract strongly to cursor (unless stuck)
              const baseAttractForce = influence * 1.5;
              const attractForce = p.isSpecial ? baseAttractForce * 2.5 : baseAttractForce;
              newX += (dx / (distance || 1)) * attractForce * 0.25;
              newY += (dy / (distance || 1)) * attractForce * 0.25;
              closeDuration = 0;
              stuckDuration = 0;
            } else {
              // Particle is stuck - increment stuck duration
              stuckDuration += 1;
              if (stuckDuration > 300) {
                // After 5 seconds of being stuck, reset and allow attraction again
                isStuck = false;
                stuckDuration = 0;
              }
              closeDuration = 0;
            }
          } else {
            closeDuration = 0;
          }

          return {
            ...p,
            x: newX,
            y: newY,
            speedX: p.speedX * 0.95 + (Math.random() - 0.5) * 0.12,
            speedY: p.speedY * 0.95 + (Math.random() - 0.5) * 0.12,
            closeDuration,
            stuckDuration,
            isStuck,
          };
        });

        // Find stuck particles and boost a far away one
        const stuckParticles = updated.filter((p) => p.isStuck && !p.isSpecial);
        if (stuckParticles.length > 0) {
          // Find the farthest particle from mouse
          const farthest = updated.reduce((max, p) => {
            const pxPos = (p.x * window.innerWidth) / 100;
            const pyPos = (p.y * window.innerHeight) / 100;
            const dx = mousePosRef.current.x - pxPos;
            const dy = mousePosRef.current.y - pyPos;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            const maxPxPos = (max.x * window.innerWidth) / 100;
            const maxPyPos = (max.y * window.innerHeight) / 100;
            const maxDx = mousePosRef.current.x - maxPxPos;
            const maxDy = mousePosRef.current.y - maxPyPos;
            const maxDistance = Math.sqrt(maxDx * maxDx + maxDy * maxDy);
            
            return distance > maxDistance ? p : max;
          });

          return updated.map((p) =>
            p.id === farthest.id ? { ...p, isSpecial: true } : { ...p, isSpecial: false }
          );
        }

        return updated;
      });
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
      mousePosRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const handleMouseDown = () => {
      isMouseDownRef.current = true;
    };

    const handleMouseUp = () => {
      isMouseDownRef.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
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
        <defs>
          <filter id="particleGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {particles.map((particle) => {
          const pxPos = (particle.x * window.innerWidth) / 100;
          const pyPos = (particle.y * window.innerHeight) / 100;
          const dx = mousePosRef.current.x - pxPos;
          const dy = mousePosRef.current.y - pyPos;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - distance / 300);

          return (
            <circle
              key={particle.id}
              cx={`${particle.x}%`}
              cy={`${particle.y}%`}
              r={particle.size}
              fill="currentColor"
              className="text-primary"
              filter={influence > 0 ? "url(#particleGlow)" : undefined}
              style={{
                opacity: particle.opacity + influence * 0.3,
              }}
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
