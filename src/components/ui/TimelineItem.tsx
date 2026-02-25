"use client";

import { motion } from "motion/react";
import type { Experience } from "@/data/portfolio";

export default function TimelineItem({
  item,
  index,
}: {
  item: Experience;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="relative pl-8 pb-10 last:pb-0 group"
    >
      {/* Vertical line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
        className="absolute left-[7px] top-3 bottom-0 w-px bg-border origin-top group-last:hidden"
      />

      {/* Dot */}
      <div className="absolute left-0 top-2.5 w-[15px] h-[15px] rounded-full border-2 border-primary bg-background group-hover:bg-primary/20 transition-colors">
        {item.current && (
          <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
        )}
      </div>

      {/* Content */}
      <motion.div
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
        className="bg-surface border border-border rounded-md p-5 glow-box-hover glow-border-hover transition-all duration-300"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
          <h3 className="text-base font-heading text-foreground group-hover:text-primary transition-colors">
            {item.role}
          </h3>
          <span className="text-xs font-heading text-primary shrink-0">{item.period}</span>
        </div>
        <p className="text-sm font-heading text-foreground/50 mb-3">{item.company}</p>
        <ul className="space-y-1.5">
          {item.description.map((desc, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.15 + 0.3 + i * 0.06 }}
              className="text-sm text-foreground/70 leading-relaxed flex gap-2"
            >
              <span className="text-primary shrink-0">▹</span>
              {desc}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
