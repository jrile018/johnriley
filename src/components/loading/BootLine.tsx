"use client";

import { useTypewriter } from "@/hooks/useTypewriter";

interface BootLineProps {
  text: string;
  delay: number;
  status?: "ok" | "done" | "ready";
}

export default function BootLine({ text, delay, status = "ok" }: BootLineProps) {
  const { displayText, isComplete } = useTypewriter({
    text,
    speed: 15,
    delay,
  });

  const statusColors = {
    ok: "text-primary",
    done: "text-[#febc2e]",
    ready: "text-primary glow-text",
  };

  return (
    <div className="font-heading text-sm text-foreground/60">
      <span>{displayText}</span>
      {isComplete && (
        <span className={`ml-2 ${statusColors[status]}`}>
          [{status.toUpperCase()}]
        </span>
      )}
    </div>
  );
}
