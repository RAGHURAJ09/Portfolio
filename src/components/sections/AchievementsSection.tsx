"use client";

import FadeIn from "@/components/animations/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { certifications } from "@/data/portfolio";

export default function AchievementsSection() {
  return (
    <section className="section-wrap" id="achievements">
      <SectionHeading
        eyebrow="Achievements"
        title="Certifications and recognition"
        description="Continuous learning with validated credentials and practical problem-solving achievements."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, index) => (
          <FadeIn key={cert} delay={index * 0.07}>
            <div className="glass-card p-5">
              <p className="text-white">{cert}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
