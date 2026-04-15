"use client";

import FadeIn from "@/components/animations/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { certifications } from "@/data/portfolio";

export default function AchievementsSection() {
  return (
    <section className="section-wrap" id="achievements">
      <SectionHeading
        id="achievements"
        eyebrow="Achievements"
        title="Certifications and recognition"
        description="Continuous learning with validated credentials and practical problem-solving achievements."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, index) => (
          <FadeIn key={cert.name} delay={index * 0.07}>
            <div className="glass-card p-5 flex flex-col gap-3">
              <p className="text-white">{cert.name}</p>
              {cert.certificateUrl && (
                <a
                  href={cert.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cyan-400 hover:text-cyan-300 underline"
                >
                  View Certificate
                </a>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
