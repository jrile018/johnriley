"use client";

import { useEffect, useRef } from "react";
import { createMatrixRain } from "@/lib/matrixRain";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !canvasRef.current) return;

    const rain = createMatrixRain(canvasRef.current);
    rain.start();
    return () => rain.stop();
  }, []);

  return (
    <>
      {/* Canvas with the terminal panes */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{ opacity: 0.35 }}
      />

      {/* CRT scanline overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.15) 2px,
            rgba(0, 0, 0, 0.15) 4px
          )`,
          opacity: 0.4,
        }}
      />

      {/* CRT vignette — dark edges like a curved monitor */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{
          background: `radial-gradient(
            ellipse at center,
            transparent 50%,
            rgba(0, 0, 0, 0.5) 80%,
            rgba(0, 0, 0, 0.85) 100%
          )`,
        }}
      />

      {/* Subtle green phosphor glow at center */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{
          background: `radial-gradient(
            ellipse at center,
            rgba(0, 255, 65, 0.015) 0%,
            transparent 60%
          )`,
        }}
      />
    </>
  );
}
