"use client";

import { motion } from "motion/react";
import TechTag from "./TechTag";
import type { Project } from "@/data/portfolio";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      className="group bg-surface border border-border rounded-md overflow-hidden glow-box-hover glow-border-hover transition-all duration-300 flex flex-col"
    >
      {/* Terminal title bar */}
      <div className="flex items-center gap-1.5 px-2 py-0.5 bg-surface-light border-b border-border shrink-0">
        <span className="terminal-dot bg-[#ff5f57]" />
        <span className="terminal-dot bg-[#febc2e]" />
        <span className="terminal-dot bg-[#28c840]" />
        <span className="ml-1.5 text-[8px] text-foreground/40 font-heading truncate">
          ~/projects/{project.title.toLowerCase().replace(/\s+/g, "-")}
        </span>
        <span className="ml-auto text-[8px] text-foreground/20 font-heading hidden sm:block">
          {project.date}
        </span>
      </div>

      <div className="p-2 flex-1 flex flex-col min-h-0">
        {/* Scrollable content */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          {/* Header: title + award */}
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <h3 className="text-xs font-heading text-foreground group-hover:text-primary transition-colors duration-200 leading-tight">
              {project.title}
            </h3>
            <span className="text-[8px] font-heading text-primary px-1 py-px border border-primary/30 rounded-sm badge-glow shrink-0">
              {project.award}
            </span>
          </div>
          <p className="text-[10px] text-foreground/60 font-heading mb-1">{project.event}</p>

          {/* Description */}
          <p className="text-[11px] text-foreground/75 leading-snug mb-1">
            {project.description}
          </p>

          {/* Highlights — show first 2 */}
          <ul className="space-y-0.5 mb-1">
            {project.highlights.slice(0, 2).map((h, i) => (
              <li
                key={i}
                className="text-[11px] text-foreground/65 leading-snug flex gap-1"
              >
                <span className="text-primary shrink-0">▹</span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Pinned bottom: tech tags + links (always visible) */}
        <div className="shrink-0">
          <div className="flex flex-wrap gap-0.5 mb-1">
            {project.tech.map((t) => (
              <TechTag key={t} label={t} />
            ))}
          </div>

          <div className="flex gap-3 pt-1 border-t border-border/50">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] font-heading text-foreground/60 hover:text-primary transition-colors"
              >
                [GitHub ↗]
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] font-heading text-foreground/60 hover:text-primary transition-colors"
              >
                [Live ↗]
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
