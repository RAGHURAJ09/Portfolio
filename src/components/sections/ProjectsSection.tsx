"use client";

import { ArrowUpRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import FadeIn from "@/components/animations/FadeIn";
import HoverTilt from "@/components/animations/HoverTilt";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/data/portfolio";

export default function ProjectsSection() {
  return (
    <section className="section-wrap" id="projects">
      <SectionHeading
        eyebrow="Projects"
        title="AI + Engineering products that solve real problems"
        description="Each build blends practical AI with scalable full-stack architecture."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <FadeIn key={project.title} delay={index * 0.08}>
            <HoverTilt className="h-full">
              <motion.article className={`project-card h-full ${project.featured ? "featured-project" : ""}`}>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  {project.featured ? (
                    <span className="rounded-full border border-fuchsia-300/40 bg-fuchsia-300/10 px-3 py-1 text-xs text-fuchsia-200">
                      Highlight
                    </span>
                  ) : null}
                </div>
                <p className="mt-4 text-zinc-300">{project.problem}</p>
                <p className="mt-4 text-sm text-cyan-200">{project.impact}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tag) => (
                    <span key={tag} className="tech-pill">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex gap-3">
                  <a href={project.live} target="_blank" className="btn-secondary inline-flex items-center gap-2">
                    <ArrowUpRight className="h-4 w-4" /> Live Demo
                  </a>
                  <a href={project.github} target="_blank" className="btn-secondary inline-flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" /> GitHub
                  </a>
                </div>
              </motion.article>
            </HoverTilt>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
