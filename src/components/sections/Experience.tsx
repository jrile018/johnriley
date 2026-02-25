"use client";

import { motion } from "motion/react";
import SectionWrapper from "../layout/SectionWrapper";
import { experience, skills } from "@/data/portfolio";
import type { TabId } from "@/data/portfolio";

export default function Experience({ activeTab, onNavigate }: { activeTab: TabId; onNavigate: (tab: TabId) => void }) {
  return (
    <SectionWrapper id="experience" title="Experience" compact>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-full overflow-y-auto md:overflow-hidden">
        {experience.map((item, i) => (
          <motion.div
            key={item.company}
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
            className="group bg-surface border border-border rounded-md overflow-hidden glow-box-hover glow-border-hover transition-all duration-300 flex flex-col"
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-light border-b border-border shrink-0">
              <span className="terminal-dot bg-[#ff5f57]" />
              <span className="terminal-dot bg-[#febc2e]" />
              <span className="terminal-dot bg-[#28c840]" />
              <span className="ml-2 text-[10px] text-foreground/40 font-heading truncate">
                ~/{item.company.toLowerCase().replace(/\s+/g, "-")}
              </span>
              {item.current && (
                <span className="ml-auto flex items-center gap-1 text-[9px] font-heading text-primary/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse" />
                  active
                </span>
              )}
            </div>

            <div className="p-4 flex-1 flex flex-col">
              {/* Role */}
              <h3 className="text-base font-heading text-foreground group-hover:text-primary transition-colors duration-200 leading-tight mb-1">
                {item.role}
              </h3>
              <p className="text-[11px] text-foreground/60 font-heading mb-0.5">{item.company}</p>
              <p className="text-[11px] font-heading text-primary/70 mb-3">{item.period}</p>

              {/* Description bullets */}
              <ul className="space-y-2.5">
                {item.description.map((desc, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.1 + 0.15 + j * 0.05 }}
                    className="text-[12px] text-foreground/70 leading-relaxed flex gap-2"
                  >
                    <span className="text-primary shrink-0 mt-0.5">▹</span>
                    {desc}
                  </motion.li>
                ))}
              </ul>

              <div className="flex-1" />

              {/* Tech hint */}
              <div className="pt-3 mt-3 border-t border-border/50">
                <p className="text-[10px] font-heading text-foreground/30">
                  <span className="text-primary/50">$</span> {item.current ? "status: actively contributing" : "status: completed"}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
