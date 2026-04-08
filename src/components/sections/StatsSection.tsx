"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { stats } from "@/data/portfolio";

function AnimatedNumber({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const value = useMotionValue(0);
  const spring = useSpring(value, { damping: 20, stiffness: 80 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) {
      value.set(to);
    }
  }, [inView, to, value]);

  useEffect(() => {
    return spring.on("change", (latest) => setDisplay(Math.round(latest)));
  }, [spring]);

  return <span ref={ref}>{display}</span>;
}

export default function StatsSection() {
  return (
    <section className="section-wrap" id="stats">
      <SectionHeading
        eyebrow="Impact"
        title="Numbers that show momentum"
        description="Built with consistency, measurable outcomes, and AI-first execution."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => (
          <FadeIn delay={index * 0.08} key={item.label}>
            <motion.div whileHover={{ y: -6 }} className="glass-card p-5">
              <p className="text-4xl font-semibold text-cyan-300">
                <AnimatedNumber to={item.value} />
                {item.suffix}
              </p>
              <p className="mt-2 text-sm tracking-wide text-zinc-300">{item.label}</p>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
