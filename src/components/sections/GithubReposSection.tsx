"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  fork?: boolean;
  archived?: boolean;
};

const featuredKeywords = ["chatbot", "email", "portfolio", "skill", "ai"];

export default function GithubReposSection() {
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/users/RAGHURAJ09/repos?sort=updated&per_page=100");
        if (!response.ok) {
          return;
        }
        const data = (await response.json()) as Repo[];
        const curated = data
          .filter((repo) => !repo.fork && !repo.archived)
          .filter((repo) => {
            const name = repo.name.toLowerCase();
            return featuredKeywords.some((keyword) => name.includes(keyword)) && !name.includes("public-apis");
          })
          .slice(0, 3);

        setRepos(curated.length ? curated : data.filter((repo) => !repo.fork && !repo.archived).slice(0, 3));
      } catch {
        setRepos([]);
      }
    };

    loadRepos();
  }, []);

  return (
    <section className="section-wrap" id="github">
      <SectionHeading
        id="github"
        eyebrow="GitHub"
        title="Selected live repositories"
        description="A curated preview of relevant work. Only the strongest repos are surfaced here."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {repos.map((repo, index) => (
          <FadeIn key={repo.id} delay={index * 0.06}>
            <article className="glass-card p-5">
              <h3 className="text-lg font-medium text-white">{repo.name}</h3>
              <p className="mt-2 line-clamp-2 min-h-11 text-sm text-zinc-300">
                {repo.description ?? "Repository showcasing practical engineering work."}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-cyan-200">
                <span>{repo.language ?? "Multi-tech"}</span>
              </div>
              <a
                href={repo.html_url}
                target="_blank"
                className="mt-5 inline-flex items-center gap-2 text-sm text-cyan-300 transition hover:text-cyan-200"
              >
                View Repo <ArrowUpRight className="h-4 w-4" />
              </a>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
