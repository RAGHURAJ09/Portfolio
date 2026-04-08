"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { experience } from "@/data/portfolio";

export default function ExperienceSection() {
  return (
    <section className="section-wrap" id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="Applied Gen-AI in real product contexts"
        description="Execution-focused experience with practical outcomes and iterative delivery."
      />

      <div className="relative border-l border-cyan-300/20 pl-6">
        {experience.map((item, index) => (
          <FadeIn key={item.company + item.role} delay={index * 0.1}>
            <motion.article whileHover={{ x: 6 }} className="timeline-item glass-card mb-6 p-6">
              <div className="timeline-dot" />
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/80">{item.duration}</p>
              <h3 className="mt-2 text-xl font-semibold text-white">
                {item.role} <span className="text-cyan-300">@ {item.company}</span>
              </h3>
              <ul className="mt-4 space-y-2 text-zinc-300">
                {item.points.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
            </motion.article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
