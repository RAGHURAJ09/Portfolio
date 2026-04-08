"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { skills } from "@/data/portfolio";

const groups = [
  { label: "Backend", items: skills.backend },
  { label: "Database", items: skills.database },
  { label: "Tools", items: skills.tools },
];

export default function SkillsSection() {
  return (
    <section className="section-wrap" id="skills">
      <SectionHeading
        eyebrow="Skills"
        title="Backend-focused engineering toolkit"
        description="Core technologies I use to build resilient services, reliable data layers, and production-ready workflows."
      />

      <div className="space-y-6">
        {groups.map((group, groupIndex) => (
          <FadeIn key={group.label} delay={groupIndex * 0.1}>
            <div className="glass-card p-6">
              <h3 className="text-lg font-medium text-white">{group.label}</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {group.items.map((item, itemIndex) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: itemIndex * 0.04, duration: 0.45 }}
                    viewport={{ once: true }}
                    className="skill-chip"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
