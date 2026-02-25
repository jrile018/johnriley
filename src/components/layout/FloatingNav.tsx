"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import TerminalPanel from "../ui/TerminalPanel";
import type { TabId } from "@/data/portfolio";

interface FloatingNavProps {
  activeTab: TabId;
  onNavigate: (tab: TabId) => void;
}

export default function FloatingNav({ activeTab, onNavigate }: FloatingNavProps) {
  const [open, setOpen] = useState(false);

  // Hidden on home — the Hero has an inline terminal
  if (activeTab === "home") return null;

  return (
    <>
      {/* Toggle button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={() => setOpen((o) => !o)}
        className={`fixed bottom-5 right-5 z-[60] w-12 h-12 rounded-xl font-heading text-sm
          backdrop-blur-2xl border flex items-center justify-center cursor-pointer
          transition-all duration-300
          ${open
            ? "bg-primary/15 border-primary/40 text-primary shadow-[0_0_24px_rgba(0,255,65,0.2)]"
            : "bg-primary/10 border-primary/30 text-primary shadow-[0_0_16px_rgba(0,255,65,0.15)] hover:bg-primary/15 hover:border-primary/50 hover:shadow-[0_0_24px_rgba(0,255,65,0.25)]"
          }`}
        aria-label="Toggle navigation"
      >
        {open ? "\u00D7" : ">_"}
      </motion.button>

      {/* Overlay terminal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px]"
            />
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none [&>*]:pointer-events-auto"
            >
              <TerminalPanel activeTab={activeTab} onNavigate={(tab) => { onNavigate(tab); setOpen(false); }} mode="overlay" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
