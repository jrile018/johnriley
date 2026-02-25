"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import BootLine from "./BootLine";

const bootMessages = [
  { text: "Initializing system...", delay: 0, status: "ok" as const },
  { text: "Loading kernel modules...", delay: 600, status: "ok" as const },
  { text: "Mounting file systems...", delay: 1200, status: "ok" as const },
  { text: "Starting network services...", delay: 1800, status: "ok" as const },
  { text: "Compiling portfolio assets...", delay: 2400, status: "done" as const },
  { text: "Connecting to GitHub...", delay: 3000, status: "ok" as const },
  { text: "Loading projects database...", delay: 3600, status: "done" as const },
  { text: "SYSTEM READY", delay: 4200, status: "ready" as const },
];

const TOTAL_DURATION = 5200;

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if already shown this session
    if (sessionStorage.getItem("boot-done")) {
      setVisible(false);
      return;
    }

    // Animate progress bar
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / (TOTAL_DURATION - 800)) * 100, 100);
      setProgress(pct);
      if (pct >= 100) clearInterval(progressInterval);
    }, 50);

    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("boot-done", "1");
    }, TOTAL_DURATION);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
        >
          <div className="w-full max-w-lg px-6">
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-4">
              <span className="terminal-dot bg-[#ff5f57]" />
              <span className="terminal-dot bg-[#febc2e]" />
              <span className="terminal-dot bg-[#28c840]" />
              <span className="ml-2 text-xs text-foreground/30 font-heading">
                system-boot
              </span>
            </div>

            {/* Boot messages */}
            <div className="space-y-1.5 mb-6">
              {bootMessages.map((msg, i) => (
                <BootLine key={i} text={msg.text} delay={msg.delay} status={msg.status} />
              ))}
            </div>

            {/* Progress bar */}
            <div className="h-1.5 bg-surface rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="text-xs font-heading text-foreground/30 mt-2 text-right">
              {Math.round(progress)}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
