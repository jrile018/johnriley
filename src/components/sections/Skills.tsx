"use client";

import { motion } from "motion/react";
import SectionWrapper from "../layout/SectionWrapper";
import { skills } from "@/data/portfolio";
import type { TabId } from "@/data/portfolio";

export default function Skills({ activeTab, onNavigate }: { activeTab: TabId; onNavigate: (tab: TabId) => void }) {
  return (
    <SectionWrapper id="skills" title="Skills" compact>
      <div className="grid gap-5">
        {skills.map((category, catIdx) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: catIdx * 0.1 }}
            className="space-y-3"
          >
            <h3 className="text-sm font-heading text-primary flex items-center gap-2">
              <span className="w-4 h-px bg-primary/40" />
              {`// ${category.category}`}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIdx) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.7, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.3,
                    delay: catIdx * 0.1 + skillIdx * 0.04,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  whileHover={{
                    scale: 1.08,
                    backgroundColor: "rgba(0, 255, 65, 0.1)",
                    borderColor: "rgba(0, 255, 65, 0.5)",
                    color: "#00FF41",
                  }}
                  className="px-3 py-1.5 text-sm font-heading text-foreground/70 bg-surface border border-border rounded-sm transition-shadow duration-200 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
