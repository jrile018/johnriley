"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence } from "motion/react";
import MatrixRain from "@/components/background/MatrixRain";
import LoadingScreen from "@/components/loading/LoadingScreen";
import FloatingNav from "@/components/layout/FloatingNav";
import HackTransition from "@/components/ui/HackTransition";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import GitHubActivity from "@/components/sections/GitHubActivity";
import { navLinks } from "@/data/portfolio";
import type { TabId } from "@/data/portfolio";

const allTabs: TabId[] = ["home", ...navLinks.map((l) => l.id)];

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [transitioning, setTransitioning] = useState(false);
  const [pendingTab, setPendingTab] = useState<TabId | null>(null);
  const navigatingRef = useRef(false);

  const onNavigate = useCallback((tab: TabId) => {
    if (navigatingRef.current) return;
    if (tab === "home") {
      // No hack effect going home
      setActiveTab(tab);
      return;
    }
    navigatingRef.current = true;
    setPendingTab(tab);
    setTransitioning(true);
  }, []);

  const onTransitionComplete = useCallback(() => {
    if (pendingTab) {
      setActiveTab(pendingTab);
    }
    setTransitioning(false);
    setPendingTab(null);
    navigatingRef.current = false;
  }, [pendingTab]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (navigatingRef.current) return;

      let next: TabId | null = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const idx = allTabs.indexOf(activeTab);
        next = allTabs[(idx + 1) % allTabs.length];
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const idx = allTabs.indexOf(activeTab);
        next = allTabs[(idx - 1 + allTabs.length) % allTabs.length];
      }
      if (next) onNavigate(next);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, onNavigate]);

  const renderTab = () => {
    switch (activeTab) {
      case "home":
        return <Hero key="home" onNavigate={onNavigate} />;
      case "about":
        return <About key="about" activeTab={activeTab} onNavigate={onNavigate} />;
      case "projects":
        return <Projects key="projects" activeTab={activeTab} onNavigate={onNavigate} />;
      case "experience":
        return <Experience key="experience" activeTab={activeTab} onNavigate={onNavigate} />;
case "github":
        return <GitHubActivity key="github" activeTab={activeTab} onNavigate={onNavigate} />;
      default:
        return <Hero key="home" onNavigate={onNavigate} />;
    }
  };

  return (
    <>
      <LoadingScreen />
      <MatrixRain />
      <div className="relative z-10 min-h-screen sm:h-screen sm:overflow-hidden flex flex-col">
        <main className="flex-1 overflow-y-auto sm:overflow-hidden">
          {renderTab()}
        </main>
      </div>
      <FloatingNav activeTab={activeTab} onNavigate={onNavigate} />
      <AnimatePresence>
        {transitioning && pendingTab && (
          <HackTransition
            key="hack"
            targetPath={pendingTab}
            onComplete={onTransitionComplete}
          />
        )}
      </AnimatePresence>
    </>
  );
}
