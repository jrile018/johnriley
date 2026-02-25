"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { navLinks } from "@/data/portfolio";
import type { TabId } from "@/data/portfolio";

interface TerminalPanelProps {
  activeTab: TabId;
  onNavigate: (tab: TabId) => void;
  mode?: "inline" | "overlay";
}

const VALID_TABS = new Map<string, TabId>(
  [{ label: "home", id: "home" as TabId }, ...navLinks].map((l) => [l.label, l.id])
);

const SECTIONS: { id: TabId; label: string; command: string; desc: string }[] = [
  { id: "home",       label: "home",       command: "cd home",       desc: "Landing page" },
  { id: "about",      label: "about",      command: "cd about",      desc: "About me & skills" },
  { id: "projects",   label: "projects",   command: "cd projects",   desc: "Hackathon projects" },
  { id: "experience", label: "experience", command: "cd experience", desc: "Work experience" },
  { id: "github",     label: "github",     command: "cd github",     desc: "GitHub activity" },
];

interface HistoryEntry {
  type: "input" | "output" | "error";
  text: string;
}

export default function TerminalPanel({ activeTab, onNavigate, mode = "inline" }: TerminalPanelProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim().toLowerCase();
      const next: HistoryEntry[] = [
        ...history,
        { type: "input", text: `$ ${raw.trim()}` },
      ];

      if (trimmed === "help" || trimmed === "--help" || trimmed === "-h") {
        next.push({ type: "output", text: "__TABLE__" });
      } else if (trimmed === "clear" || trimmed === "cls") {
        setHistory([]);
        setInput("");
        return;
      } else if (trimmed.startsWith("cd ")) {
        const target = trimmed.slice(3).trim();
        const tabId = VALID_TABS.get(target);
        if (tabId) {
          next.push({ type: "output", text: `~/${target}` });
          onNavigate(tabId);
        } else {
          next.push({ type: "error", text: `cd: ${target}: no such section` });
          next.push({ type: "output", text: 'Type "help" for sections' });
        }
      } else if (trimmed === "pwd") {
        next.push({ type: "output", text: `~/${activeTab}` });
      } else if (trimmed === "") {
        // noop
      } else {
        next.push({ type: "error", text: `${trimmed.split(" ")[0]}: command not found` });
      }

      setHistory(next);
      setInput("");
    },
    [history, activeTab, onNavigate]
  );

  const isInline = mode === "inline";

  /* Shared table renderer */
  const renderTable = (delayOffset: number) => (
    <div className="font-heading text-[12px] sm:text-[13px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.01, delay: delayOffset }}
        className="grid grid-cols-[minmax(100px,1.2fr)_minmax(80px,1.5fr)] gap-x-3 text-white/25 pb-1"
      >
        <span>Command</span>
        <span>Description</span>
      </motion.div>
      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.3, delay: delayOffset + 0.03, ease: "easeOut" }}
        className="h-px bg-white/[0.06] origin-left mb-1.5"
      />
      {/* Rows */}
      {SECTIONS.map((sec, i) => {
        const isActive = activeTab === sec.id;
        return (
          <motion.button
            key={sec.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.01, delay: delayOffset + 0.05 + i * 0.03 }}
            onClick={() => {
              setHistory((prev) => [
                ...prev,
                { type: "input", text: `$ ${sec.command}` },
                { type: "output", text: `~/${sec.label}` },
              ]);
              onNavigate(sec.id);
            }}
            className={`grid grid-cols-[minmax(100px,1.2fr)_minmax(80px,1.5fr)] gap-x-3 w-full text-left
              py-[5px] px-2 -mx-2 rounded-lg cursor-pointer transition-all duration-200
              ${isActive
                ? "bg-primary/[0.07] text-primary"
                : "text-white/40 hover:bg-white/[0.04] hover:text-white/60"
              }`}
          >
            <span className={`truncate ${isActive ? "text-primary/70" : "text-white/30"}`}>
              {sec.command}
            </span>
            <span className={`truncate ${isActive ? "text-primary/50" : "text-white/25"}`}>
              {sec.desc}
            </span>
          </motion.button>
        );
      })}
    </div>
  );

  return (
    <div
      className={`overflow-hidden ${
        isInline
          ? "w-full max-w-2xl rounded-2xl border border-white/[0.06] bg-[#0c0c0c]/60 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.02),inset_0_1px_0_rgba(255,255,255,0.03)]"
          : "w-[calc(100vw-2rem)] sm:w-[380px] md:w-[460px] max-w-[460px] rounded-2xl border border-white/[0.06] bg-[#0c0c0c]/90 backdrop-blur-2xl shadow-[0_16px_64px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.02)]"
      }`}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/[0.05] select-none bg-white/[0.02]">
        <div className="flex items-center gap-[7px]">
          <span className="w-[11px] h-[11px] rounded-full bg-[#ff5f57] shadow-[inset_0_-1px_1px_rgba(0,0,0,0.15)]" />
          <span className="w-[11px] h-[11px] rounded-full bg-[#febc2e] shadow-[inset_0_-1px_1px_rgba(0,0,0,0.15)]" />
          <span className="w-[11px] h-[11px] rounded-full bg-[#28c840] shadow-[inset_0_-1px_1px_rgba(0,0,0,0.15)]" />
        </div>
        <span className="flex-1 text-center text-[11px] text-white/20 font-heading tracking-wide">
          visitor@portfolio &mdash; ~/{activeTab}
        </span>
        <div className="w-[52px]" />
      </div>

      {/* Body */}
      <div
        ref={scrollRef}
        className={`px-5 pt-4 pb-3 overflow-y-auto font-heading text-[12.5px] leading-[1.7] ${
          isInline ? "max-h-[340px]" : "max-h-[55vh]"
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        {renderTable(0.04)}

        {/* History */}
        {history.length > 0 && (
          <div className="mt-3 pt-3 border-t border-white/[0.04]">
            {history.map((entry, i) =>
              entry.text === "__TABLE__" ? (
                <div key={i} className="my-2">
                  {renderTable(0)}
                </div>
              ) : (
                <div
                  key={i}
                  className={`${
                    entry.type === "input"
                      ? "text-white/50"
                      : entry.type === "error"
                        ? "text-red-400/60"
                        : "text-white/30"
                  }`}
                >
                  {entry.text}
                </div>
              )
            )}
          </div>
        )}

        {/* Input */}
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/[0.04]">
          <span className="text-primary/60 shrink-0">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCommand(input);
              e.stopPropagation();
            }}
            className="flex-1 bg-transparent text-white/60 outline-none caret-primary/70 font-heading text-[12.5px] placeholder:text-white/15"
            placeholder="cd about"
            spellCheck={false}
            autoComplete="off"
          />
          <motion.span
            animate={{ opacity: [0.6, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
            className="w-[5px] h-[14px] bg-primary/40 rounded-[1px]"
          />
        </div>
      </div>
    </div>
  );
}
