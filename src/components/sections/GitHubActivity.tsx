"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import SectionWrapper from "../layout/SectionWrapper";
import { personal } from "@/data/portfolio";
import type { TabId } from "@/data/portfolio";

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
}

interface GitHubProfile {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

const USERNAME = "jrile018";

const langColors: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Rust: "#dea584",
  "C++": "#f34b7d",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Jupyter: "#DA5B0B",
  "Jupyter Notebook": "#DA5B0B",
};

function ContributionGrid() {
  const weeks = 20;
  const days = 7;
  const cells: number[] = [];

  let seed = 42;
  function seededRandom() {
    seed = (seed * 16807 + 0) % 2147483647;
    return (seed - 1) / 2147483646;
  }

  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < days; d++) {
      const r = seededRandom();
      if (r < 0.3) cells.push(0);
      else if (r < 0.55) cells.push(1);
      else if (r < 0.75) cells.push(2);
      else if (r < 0.9) cells.push(3);
      else cells.push(4);
    }
  }

  return (
    <div className="flex gap-[2px]">
      {Array.from({ length: weeks }).map((_, w) => (
        <div key={w} className="flex flex-col gap-[2px]">
          {Array.from({ length: days }).map((_, d) => {
            const level = cells[w * days + d];
            return (
              <motion.div
                key={d}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.12, delay: w * 0.012 + d * 0.006 }}
                className={`w-[10px] h-[10px] rounded-[2px] contrib-${level}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function GitHubActivity({ activeTab, onNavigate }: { activeTab: TabId; onNavigate: (tab: TabId) => void }) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHub() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`),
          fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=8`),
        ]);

        if (profileRes.ok) {
          setProfile(await profileRes.json());
        }
        if (reposRes.ok) {
          const data: GitHubRepo[] = await reposRes.json();
          setRepos(data.filter((r) => !r.fork).slice(0, 6));
        }
      } catch {
        // Silently fail — we show fallback UI
      } finally {
        setLoading(false);
      }
    }

    fetchGitHub();
  }, []);

  const topLanguages = repos.reduce<Record<string, number>>((acc, repo) => {
    if (repo.language) acc[repo.language] = (acc[repo.language] || 0) + 1;
    return acc;
  }, {});
  const sortedLangs = Object.entries(topLanguages).sort((a, b) => b[1] - a[1]);
  const totalLangCount = sortedLangs.reduce((sum, [, count]) => sum + count, 0);

  return (
    <SectionWrapper id="github" title="GitHub Activity" compact>
      <div className="flex flex-col h-full">
        {/* Top section: stats + contribution grid side by side */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-3">
          {/* Stats column */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="shrink-0 flex flex-row sm:flex-col gap-2 sm:w-36"
          >
            {loading ? (
              <div className="text-xs font-heading text-foreground/30">
                $ fetching stats<span className="animate-pulse">...</span>
              </div>
            ) : profile ? (
              <>
                {[
                  { label: "Repos", value: profile.public_repos },
                  { label: "Followers", value: profile.followers },
                  { label: "Following", value: profile.following },
                  { label: "Since", value: new Date(profile.created_at).getFullYear() },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="bg-surface border border-border rounded-md px-3 py-2 glow-box-hover glow-border-hover transition-all duration-300 flex items-center justify-between"
                  >
                    <div className="text-[11px] font-heading text-foreground/40">
                      {stat.label}
                    </div>
                    <div className="text-base font-heading text-primary glow-text leading-none">
                      {stat.value}
                    </div>
                  </motion.div>
                ))}
              </>
            ) : (
              <div className="text-xs font-heading text-foreground/30">
                $ error: rate limited
              </div>
            )}
          </motion.div>

          {/* Contribution grid + languages */}
          <div className="flex-1 min-w-0 overflow-x-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <p className="text-[10px] font-heading text-foreground/25 mb-1.5">
                $ gh contribution-graph --weeks=20
              </p>
              <ContributionGrid />
              <div className="flex items-center gap-1 mt-1 text-[9px] font-heading text-foreground/25">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((l) => (
                  <div key={l} className={`w-[10px] h-[10px] rounded-[2px] contrib-${l}`} />
                ))}
                <span>More</span>
              </div>
            </motion.div>

            {/* Language breakdown */}
            {sortedLangs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-3"
              >
                <p className="text-[10px] font-heading text-foreground/25 mb-1.5">
                  $ gh lang-breakdown
                </p>
                {/* Bar */}
                <div className="flex h-2 rounded-full overflow-hidden mb-1.5">
                  {sortedLangs.map(([lang, count]) => (
                    <div
                      key={lang}
                      style={{
                        width: `${(count / totalLangCount) * 100}%`,
                        backgroundColor: langColors[lang] || "#666",
                      }}
                    />
                  ))}
                </div>
                {/* Legend */}
                <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                  {sortedLangs.map(([lang, count]) => (
                    <div key={lang} className="flex items-center gap-1.5 text-[10px] font-heading text-foreground/40">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: langColors[lang] || "#666" }}
                      />
                      {lang} <span className="text-foreground/25">{Math.round((count / totalLangCount) * 100)}%</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Recent repos — fills remaining space */}
        <div className="flex-1 min-h-0">
          {repos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="h-full flex flex-col"
            >
              <p className="text-[10px] font-heading text-foreground/25 mb-1.5">
                $ gh repo list --limit=6 --sort=updated
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 flex-1">
                {repos.map((repo, i) => (
                  <motion.a
                    key={repo.name}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.25 + i * 0.04 }}
                    whileHover={{ y: -2 }}
                    className="group bg-surface border border-border rounded-md p-3 glow-box-hover glow-border-hover transition-all duration-300 flex flex-col"
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      {repo.language && (
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: langColors[repo.language] || "#666" }}
                        />
                      )}
                      <span className="text-sm font-heading text-foreground/70 group-hover:text-primary transition-colors truncate">
                        {repo.name}
                      </span>
                      {repo.stargazers_count > 0 && (
                        <span className="text-[10px] text-foreground/30 ml-auto shrink-0">&#9733; {repo.stargazers_count}</span>
                      )}
                    </div>
                    {repo.description && (
                      <p className="text-[11px] text-foreground/50 leading-snug line-clamp-2 mb-1.5">
                        {repo.description}
                      </p>
                    )}
                    <div className="mt-auto flex items-center gap-2 pt-1.5 border-t border-border/30">
                      {repo.language && (
                        <span className="text-[9px] font-heading text-foreground/30">{repo.language}</span>
                      )}
                      <span className="text-[9px] font-heading text-foreground/20 ml-auto">
                        {new Date(repo.updated_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Profile link — pinned bottom */}
        <motion.a
          href={personal.github}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mt-auto pt-2 border-t border-border/40 inline-flex items-center gap-2 text-sm font-heading text-foreground/40 hover:text-primary transition-colors"
        >
          <span className="text-primary">$</span> open github.com/{USERNAME} <span className="text-primary">↗</span>
        </motion.a>
      </div>
    </SectionWrapper>
  );
}
