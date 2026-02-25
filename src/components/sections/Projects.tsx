"use client";

import SectionWrapper from "../layout/SectionWrapper";
import ProjectCard from "../ui/ProjectCard";
import { projects } from "@/data/portfolio";
import type { TabId } from "@/data/portfolio";

export default function Projects({ activeTab, onNavigate }: { activeTab: TabId; onNavigate: (tab: TabId) => void }) {
  return (
    <SectionWrapper id="projects" title="Projects" compact>
      <div className="grid md:grid-cols-2 grid-rows-2 gap-2 h-[96%] mx-auto w-full">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
