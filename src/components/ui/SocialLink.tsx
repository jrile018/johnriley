"use client";

import { motion } from "motion/react";

interface SocialLinkProps {
  href: string;
  label: string;
  command: string;
  index: number;
}

export default function SocialLink({ href, label, command, index }: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      initial={{ opacity: 0, x: -30, filter: "blur(6px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ x: 6, borderColor: "rgba(0,255,65,0.5)" }}
      className="group flex items-center gap-3 p-4 bg-surface border border-border rounded-md glow-box-hover transition-all duration-300"
    >
      <span className="text-primary font-heading text-sm">$</span>
      <span className="text-foreground/50 font-heading text-sm group-hover:text-foreground transition-colors">
        {command}
      </span>
      <motion.span
        className="ml-auto text-xs text-foreground/30 group-hover:text-primary font-heading transition-colors"
        initial={false}
      >
        {label} ↗
      </motion.span>
    </motion.a>
  );
}
