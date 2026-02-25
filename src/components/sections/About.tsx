"use client";

import { motion } from "motion/react";
import SectionWrapper from "../layout/SectionWrapper";
import { personal, skills } from "@/data/portfolio";
import type { TabId } from "@/data/portfolio";

const contactLinks = [
  { href: `mailto:${personal.email}`, label: personal.email, icon: "✉" },
  { href: personal.github, label: "github.com/jrile018", icon: "⌘" },
  { href: personal.linkedin, label: "linkedin.com/in/john-riley1287", icon: "◈" },
];

export default function About({ activeTab, onNavigate }: { activeTab: TabId; onNavigate: (tab: TabId) => void }) {
  return (
    <SectionWrapper id="about" title="About Me" compact>
      {/* Top row: photo + bio + education + contact */}
      <div className="flex gap-5 items-start mb-3">
        {/* Headshot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 100 }}
          className="shrink-0"
        >
          <motion.div
            whileHover={{ scale: 1.03, rotate: 1 }}
            className="w-48 h-60 border border-border rounded-md bg-surface-light overflow-hidden glow-box-hover transition-all duration-300 relative"
          >
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/headshot.png`}
              alt="John Riley"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/40" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/40" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/40" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/40" />
          </motion.div>
        </motion.div>

        {/* Bio + education + contact */}
        <motion.div
          initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex-1 min-w-0"
        >
          <p className="text-foreground/65 leading-relaxed text-[12px] mb-2.5">
            {personal.bio}
          </p>

          <div className="grid grid-cols-3 gap-x-4 gap-y-1 mb-2.5">
            {[
              personal.school,
              personal.degree,
              `Minor: ${personal.minor}`,
              personal.location,
              `GPA: ${personal.gpa}`,
              personal.graduation,
            ].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: 0.25 + i * 0.04 }}
                className="flex items-center gap-1.5 text-[11px] font-heading text-foreground/40"
              >
                <span className="text-primary">▹</span> {item}
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>

      {/* Skills grid — 2x2 layout */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
        {skills.map((category, catIdx) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + catIdx * 0.06 }}
          >
            <h3 className="text-[10px] font-heading text-primary/70 flex items-center gap-1.5 mb-1">
              <span className="w-3 h-px bg-primary/30" />
              {`// ${category.category}`}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {category.skills.map((skill, skillIdx) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.2,
                    delay: 0.35 + catIdx * 0.06 + skillIdx * 0.02,
                  }}
                  whileHover={{
                    scale: 1.06,
                    backgroundColor: "rgba(0, 255, 65, 0.1)",
                    borderColor: "rgba(0, 255, 65, 0.5)",
                    color: "#00FF41",
                  }}
                  className="px-2 py-0.5 text-[11px] font-heading text-foreground/60 bg-surface border border-border rounded-sm cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contact links — pinned to bottom */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="mt-auto pt-3 border-t border-border/40 flex items-center gap-6"
      >
        <span className="text-[11px] font-heading text-primary/50">$ contact</span>
        {contactLinks.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.55 + i * 0.06 }}
            whileHover={{ x: 3 }}
            className="flex items-center gap-2 text-[13px] font-heading text-foreground/50 hover:text-primary transition-colors"
          >
            <span className="text-primary/60">{link.icon}</span>
            {link.label}
          </motion.a>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
