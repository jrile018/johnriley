"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";

interface HackTransitionProps {
  targetPath: string;
  onComplete: () => void;
}

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:',.<>?/~`0123456789ABCDEFabcdef";
const HACK_LINES = [
  "INTERCEPTING SIGNAL...",
  "BYPASSING FIREWALL ████████░░ 78%",
  "DECRYPTING PAYLOAD [0xFA3B..2C91]",
  "INJECTING SHELLCODE...",
  "ROOT ACCESS GRANTED",
];

function randomChar() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}

function randomLine() {
  const len = 20 + Math.floor(Math.random() * 40);
  return Array.from({ length: len }, () => randomChar()).join("");
}

export default function HackTransition({ targetPath, onComplete }: HackTransitionProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [phase, setPhase] = useState<"hack" | "access">("hack");
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);
  const lineIndexRef = useRef(0);

  useEffect(() => {
    // Phase 1: rapid random lines + hack messages
    let lineCount = 0;
    intervalRef.current = setInterval(() => {
      lineCount++;
      setLines((prev) => {
        const next = [...prev];
        // Mix random gibberish with hack messages
        if (lineCount % 3 === 0 && lineIndexRef.current < HACK_LINES.length) {
          next.push(HACK_LINES[lineIndexRef.current]);
          lineIndexRef.current++;
        } else {
          next.push(`[${String(Math.random().toFixed(6)).slice(2)}] ${randomLine()}`);
        }
        // Keep last 12 lines
        return next.slice(-12);
      });
    }, 45);

    // Phase 2: "ACCESS GRANTED" after 500ms
    const accessTimer = setTimeout(() => {
      setPhase("access");
      if (intervalRef.current) clearInterval(intervalRef.current);
    }, 500);

    // Complete after 800ms total
    const completeTimer = setTimeout(onComplete, 800);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearTimeout(accessTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.08 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none scanlines opacity-40" />

      {/* Flicker effect */}
      <motion.div
        animate={{ opacity: [1, 0.7, 1, 0.4, 1, 0.8, 1] }}
        transition={{ duration: 0.5, ease: "linear" }}
        className="absolute inset-0"
      >
        {/* RGB split glitch bars */}
        <motion.div
          animate={{ x: [-2, 3, -1, 4, 0], opacity: [0.3, 0.6, 0.2, 0.5, 0] }}
          transition={{ duration: 0.4, ease: "linear" }}
          className="absolute inset-0 mix-blend-screen"
          style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,0,0,0.03) 3px, rgba(255,0,0,0.03) 4px)" }}
        />
        <motion.div
          animate={{ x: [2, -3, 1, -2, 0], opacity: [0.2, 0.5, 0.3, 0.4, 0] }}
          transition={{ duration: 0.35, ease: "linear" }}
          className="absolute inset-0 mix-blend-screen"
          style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(0,255,65,0.04) 5px, rgba(0,255,65,0.04) 6px)" }}
        />

        {/* Random glitch blocks */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{
              opacity: [0, 0.8, 0, 0.6, 0],
              scaleX: [0, 1, 0.5, 1.5, 0],
              x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20, 0],
            }}
            transition={{
              duration: 0.3,
              delay: i * 0.06,
              ease: "linear",
            }}
            className="absolute h-[2px] bg-primary/60"
            style={{
              top: `${15 + i * 14}%`,
              left: 0,
              right: 0,
            }}
          />
        ))}
      </motion.div>

      {/* Terminal output */}
      <div className="relative w-full max-w-2xl px-8 font-heading text-[11px] leading-relaxed">
        {phase === "hack" && (
          <>
            {lines.map((line, i) => (
              <motion.div
                key={`${i}-${line.slice(0, 8)}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: i === lines.length - 1 ? 1 : 0.3, x: 0 }}
                transition={{ duration: 0.03 }}
                className={
                  HACK_LINES.includes(line)
                    ? "text-primary"
                    : "text-primary/20"
                }
              >
                {line}
              </motion.div>
            ))}
          </>
        )}

        {phase === "access" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
            className="text-center"
          >
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 0.3, repeat: 1 }}
              className="text-primary text-2xl font-heading glow-text-strong mb-3"
            >
              ACCESS GRANTED
            </motion.div>
            <div className="text-primary/50 text-sm">
              cd ~/{targetPath}
            </div>
          </motion.div>
        )}
      </div>

      {/* Screen flash on entry */}
      <motion.div
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="absolute inset-0 bg-primary/10 pointer-events-none"
      />
    </motion.div>
  );
}
