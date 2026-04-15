"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const stackCards = [
  {
    id: "home",
    title: "Home",
    subtitle: "AI-first hero and product-grade first impression",
    href: "#top",
  },
  {
    id: "about",
    title: "About",
    subtitle: "Builder mindset, story, and value proposition",
    href: "#why-hire-me",
  },
  {
    id: "skills",
    title: "Skills",
    subtitle: "Interactive skill intelligence and usage depth",
    href: "#skills",
  },
  {
    id: "projects",
    title: "Projects",
    subtitle: "Shipped products solving measurable problems",
    href: "#projects",
  },
];

export default function LayeredStackSection() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const wheelLockRef = useRef(false);

  useEffect(() => {
    const host = rootRef.current;
    if (!host) {
      return;
    }

    const onWheel = (event: WheelEvent) => {
      const rect = host.getBoundingClientRect();
      const inView = rect.top <= 120 && rect.bottom >= window.innerHeight * 0.55;
      if (!inView || wheelLockRef.current) {
        return;
      }

      const direction = Math.sign(event.deltaY);
      if (direction === 0) {
        return;
      }

      const nextIndex = Math.max(0, Math.min(stackCards.length - 1, activeIndex + direction));
      if (nextIndex === activeIndex) {
        return;
      }

      event.preventDefault();
      wheelLockRef.current = true;
      setActiveIndex(nextIndex);
      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 420);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [activeIndex]);

  return (
    <section className="section-wrap" id="stacked-showcase" ref={rootRef}>
      <SectionHeading
        id="stacked-showcase"
        eyebrow="Experience Flow"
        title="Layered Section Stack"
        description="Navigate a premium card-stack preview where each section stays visible in depth while the active layer slides forward."
      />

      <div className="relative mx-auto h-[540px] w-full max-w-5xl overflow-hidden rounded-3xl border border-cyan-200/20 bg-[#070b15]/60 p-5 shadow-[0_20px_90px_rgba(12,27,54,0.65)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.14),transparent_45%),radial-gradient(circle_at_80%_75%,rgba(139,92,246,0.16),transparent_48%)]" />

        <div className="relative h-full">
          {stackCards.map((card, index) => {
            const delta = index - activeIndex;
            const isActive = delta === 0;
            const absDelta = Math.abs(delta);
            const translateY = 36 + delta * 82;
            const scale = Math.max(0.74, 1 - absDelta * 0.09);
            const opacity = Math.max(0.35, 1 - absDelta * 0.22);
            const blur = absDelta === 0 ? 0 : Math.min(9, absDelta * 3);

            return (
              <motion.article
                key={card.id}
                animate={{
                  y: translateY,
                  scale,
                  opacity,
                  filter: `blur(${blur}px)`,
                }}
                transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
                className={`absolute left-1/2 top-0 h-[360px] w-[min(92%,760px)] -translate-x-1/2 rounded-2xl border p-8 ${{
                  true: "border-cyan-200/40 bg-cyan-200/10 shadow-[0_25px_80px_rgba(6,182,212,0.35)]",
                  false: "border-white/15 bg-white/5",
                }[String(isActive) as "true" | "false"]}`}
                style={{ zIndex: 40 - absDelta }}
              >
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-200/85">{index + 1} / {stackCards.length}</p>
                <h3 className="mt-5 text-3xl font-semibold text-white md:text-4xl">{card.title}</h3>
                <p className="mt-4 max-w-2xl text-zinc-200/90">{card.subtitle}</p>
                <div className="mt-8">
                  <a href={card.href} className="inline-flex rounded-full border border-cyan-200/45 bg-cyan-200/10 px-5 py-2 text-sm text-cyan-100 transition hover:bg-cyan-200/20">
                    Open {card.title}
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-2 backdrop-blur">
          {stackCards.map((card, index) => (
            <button
              key={card.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex ? "w-8 bg-cyan-300" : "w-2.5 bg-white/40 hover:bg-white/65"
              }`}
              aria-label={`Show ${card.title} card`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
