"use client";

import TypewriterText from "../ui/TypewriterText";

interface SectionWrapperProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  compact?: boolean;
}

export default function SectionWrapper({ id, title, children, className = "", compact = false }: SectionWrapperProps) {
  return (
    <section
      className={`min-h-full sm:h-full px-2 sm:px-6 lg:px-8 overflow-visible sm:overflow-hidden ${className}`}
    >
      <div className={`max-w-5xl mx-auto min-h-full sm:h-full flex flex-col ${compact ? "py-2 sm:py-1" : "py-4 sm:py-6"}`}>
        <div className="bg-surface/50 border border-border rounded-md overflow-visible sm:overflow-hidden scanlines backdrop-blur-xs flex-1 min-h-0 flex flex-col">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-3 py-1 bg-surface-light border-b border-border shrink-0">
            <span className="terminal-dot bg-[#ff5f57]" />
            <span className="terminal-dot bg-[#febc2e]" />
            <span className="terminal-dot bg-[#28c840]" />
            <span className="ml-2 text-[10px] text-foreground/40 font-heading">
              ~/{id}
            </span>
            <span className="ml-auto text-[10px] text-foreground/20 font-heading hidden sm:block">
              bash
            </span>
          </div>

          {/* Content */}
          <div className={`${compact ? "p-3 sm:p-2.5" : "p-3 sm:p-6"} relative z-[2] flex-1 min-h-0 overflow-visible sm:overflow-hidden flex flex-col`}>
            <div className={compact ? "mb-1" : "mb-4"}>
              <TypewriterText
                text={`> ${title}`}
                as="h2"
                className={`font-heading text-primary glow-text ${compact ? "text-sm sm:text-base" : "text-xl sm:text-2xl"}`}
                speed={40}
              />
            </div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
