import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const isMobileRef = useRef(false);

  useEffect(() => {
    // Detect touch device
    isMobileRef.current = Boolean(
      navigator.maxTouchPoints || window.ontouchstart !== undefined
    );

    // Simple smooth cursor following
    const animate = () => {
      // Dot follows quickly
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.15;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.15;

      // Ring follows more slowly (more delay)
      ringPosRef.current.x += (targetRef.current.x - ringPosRef.current.x) * 0.05;
      ringPosRef.current.y += (targetRef.current.y - ringPosRef.current.y) * 0.05;

      if (cursorRef.current) {
        cursorRef.current.style.left = posRef.current.x + "px";
        cursorRef.current.style.top = posRef.current.y + "px";
      }

      if (ringRef.current) {
        ringRef.current.style.left = ringPosRef.current.x + "px";
        ringRef.current.style.top = ringPosRef.current.y + "px";
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX - 16;
      targetRef.current.y = e.clientY - 16;

      if (cursorRef.current) {
        cursorRef.current.style.opacity = "1";
      }

      if (ringRef.current) {
        ringRef.current.style.opacity = "1";
      }

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[data-interactive]");

      if (dotRef.current) {
        dotRef.current.style.boxShadow = isInteractive
          ? "0 0 20px rgba(59, 130, 246, 0.9), 0 0 40px rgba(59, 130, 246, 0.5)"
          : "0 0 12px rgba(59, 130, 246, 0.6), 0 0 24px rgba(59, 130, 246, 0.3)";
      }

      if (ringRef.current) {
        const ring = ringRef.current.querySelector(".cursor-ring") as HTMLElement;
        if (ring) {
          ring.style.borderColor = isInteractive
            ? "rgb(59, 130, 246)"
            : "rgba(59, 130, 246, 0.6)";
          ring.style.transform = isInteractive ? "scale(1.6)" : "scale(1)";
        }
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "0";
      }

      if (ringRef.current) {
        ringRef.current.style.opacity = "0";
      }
    };

    const handleMouseDown = () => {
      if (cursorRef.current) {
        cursorRef.current.style.display = "none";
      }

      if (ringRef.current) {
        ringRef.current.style.display = "none";
      }
    };

    const handleMouseUp = () => {
      if (cursorRef.current) {
        cursorRef.current.style.display = "block";
      }

      if (ringRef.current) {
        ringRef.current.style.display = "block";
      }
    };

    // Touch handlers for mobile
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      targetRef.current.x = touch.clientX - 16;
      targetRef.current.y = touch.clientY - 16;

      if (cursorRef.current) {
        cursorRef.current.style.opacity = "1";
      }

      if (ringRef.current) {
        ringRef.current.style.opacity = "1";
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      targetRef.current.x = touch.clientX - 16;
      targetRef.current.y = touch.clientY - 16;
    };

    const handleTouchEnd = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "0";
      }

      if (ringRef.current) {
        ringRef.current.style.opacity = "0";
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Outer ring - separate positioning with more delay */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998]"
        style={{
          width: "32px",
          height: "32px",
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <div
          className="cursor-ring absolute inset-0 border-2 rounded-full"
          style={{
            borderColor: "rgba(59, 130, 246, 0.6)",
            transition: "all 0.1s ease",
          }}
        />
      </div>

      {/* Dot container - faster following */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999]"
        style={{
          width: "32px",
          height: "32px",
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {/* Inner dot - centered */}
        <div
          ref={dotRef}
          style={{
            position: "absolute",
            width: "8px",
            height: "8px",
            backgroundColor: "rgb(59, 130, 246)",
            borderRadius: "50%",
            left: "50%",
            top: "50%",
            marginLeft: "-4px",
            marginTop: "-4px",
            transition: "all 0.1s ease",
            boxShadow:
              "0 0 12px rgba(59, 130, 246, 0.6), 0 0 24px rgba(59, 130, 246, 0.3)",
          }}
        />
      </div>

      {/* Hide default cursor for desktop only */}
      <style>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
          input,
          textarea,
          select {
            cursor: text !important;
          }
        }
        .cursor-ring {
          transition: all 0.3s ease;
        }
      `}</style>
    </>
  );
}
