"use client";

import FadeIn from "@/components/animations/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { hireReasons } from "@/data/portfolio";

export default function WhyHireMeSection() {
  return (
    <section className="section-wrap" id="why-hire-me">
      <SectionHeading
        eyebrow="Why Hire Me"
        title="Builder mindset with AI execution depth"
        description="I combine ownership, speed, and practical AI implementation to drive meaningful outcomes."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {hireReasons.map((reason, index) => (
          <FadeIn key={reason.title} delay={index * 0.08}>
            <div className="glass-card p-6">
              <h3 className="text-xl font-medium text-white">{reason.title}</h3>
              <p className="mt-3 text-zinc-300">{reason.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
