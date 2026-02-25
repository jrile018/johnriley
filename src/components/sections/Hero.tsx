"use client";

import { motion } from "motion/react";
import { personal } from "@/data/portfolio";
import TypewriterText from "../ui/TypewriterText";
import TerminalPanel from "../ui/TerminalPanel";
import type { TabId } from "@/data/portfolio";

interface HeroProps {
  onNavigate: (tab: TabId) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      className="h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-3xl w-full text-center py-12">
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-4"
        >
          {personal.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-lg sm:text-xl font-heading text-primary glow-text-strong mb-6"
        >
          <TypewriterText
            text={personal.subtitle}
            speed={30}
            delay={1000}
            triggerOnView={false}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-sm font-heading text-foreground/40 mb-10"
        >
          {personal.degree} @ {personal.school} | {personal.graduation} | GPA: {personal.gpa}
        </motion.p>

        {/* Inline terminal navigation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex justify-center"
        >
          <TerminalPanel activeTab="home" onNavigate={onNavigate} mode="inline" />
        </motion.div>
      </div>
    </section>
  );
}
