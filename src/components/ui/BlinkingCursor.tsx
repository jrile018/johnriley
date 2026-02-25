"use client";

import { motion } from "motion/react";

export default function BlinkingCursor({ className = "" }: { className?: string }) {
  return (
    <motion.span
      className={`inline-block w-[2px] h-[1em] bg-primary ml-0.5 align-middle ${className}`}
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      aria-hidden="true"
    />
  );
}
