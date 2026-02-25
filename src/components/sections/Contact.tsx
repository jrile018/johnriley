"use client";

import SectionWrapper from "../layout/SectionWrapper";
import SocialLink from "../ui/SocialLink";
import { personal } from "@/data/portfolio";
import type { TabId } from "@/data/portfolio";

const links = [
  {
    href: `mailto:${personal.email}`,
    label: "Email",
    command: `open mailto:${personal.email}`,
  },
  {
    href: personal.github,
    label: "GitHub",
    command: "open github.com/jrile018",
  },
  {
    href: personal.linkedin,
    label: "LinkedIn",
    command: "open linkedin.com/in/john-riley1287",
  },
];

export default function Contact({ activeTab, onNavigate }: { activeTab: TabId; onNavigate: (tab: TabId) => void }) {
  return (
    <SectionWrapper id="contact" title="Contact" compact>
      <p className="text-foreground/50 mb-6 text-sm font-heading">
        $ echo &quot;Let&apos;s connect — feel free to reach out.&quot;
      </p>
      <div className="grid sm:grid-cols-1 gap-3 max-w-lg">
        {links.map((link, i) => (
          <SocialLink
            key={link.label}
            href={link.href}
            label={link.label}
            command={link.command}
            index={i}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
