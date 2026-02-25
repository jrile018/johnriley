"use client";

import { useEffect, useRef, useState } from "react";
import { useTypewriter } from "@/hooks/useTypewriter";
import BlinkingCursor from "./BlinkingCursor";

interface TypewriterTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  speed?: number;
  delay?: number;
  showCursor?: boolean;
  triggerOnView?: boolean;
}

export default function TypewriterText({
  text,
  as: Tag = "span",
  className = "",
  speed = 50,
  delay = 0,
  showCursor = true,
  triggerOnView = true,
}: TypewriterTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(!triggerOnView);

  useEffect(() => {
    if (!triggerOnView) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [triggerOnView]);

  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const { displayText, isComplete } = useTypewriter({
    text,
    speed,
    delay,
    enabled: inView && !prefersReduced,
  });

  const shownText = prefersReduced ? text : displayText;

  return (
    <Tag ref={ref as React.RefObject<HTMLElement & HTMLHeadingElement & HTMLParagraphElement>} className={className}>
      {shownText}
      {showCursor && !isComplete && !prefersReduced && <BlinkingCursor />}
    </Tag>
  );
}
