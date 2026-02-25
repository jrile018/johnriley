"use client";

import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer className="py-3 px-4 shrink-0 border-t border-border/30">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto text-center flex items-center justify-center gap-4"
      >
        <p className="text-[10px] font-heading text-foreground/20">
          <span className="text-primary/30">$</span> Built with Next.js + Tailwind + Motion
        </p>
        <p className="text-[10px] text-foreground/15 font-heading">
          &copy; {new Date().getFullYear()} John Riley
        </p>
      </motion.div>
    </footer>
  );
}
