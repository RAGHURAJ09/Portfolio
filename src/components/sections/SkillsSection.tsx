"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { skillCategories, skillExperiences, skills } from "@/data/portfolio";

const groups = [
  { label: "AI/ML", items: skillCategories.aiMl },
  { label: "Web Development", items: skillCategories.webDevelopment },
  { label: "Tools & Technologies", items: skillCategories.toolsAndTechnologies },
  { label: "Backend", items: skills.backend },
  { label: "Database", items: skills.database },
];

const levelClass: Record<string, string> = {
  Beginner: "bg-amber-300/20 text-amber-100 border-amber-200/35",
  Intermediate: "bg-blue-300/20 text-blue-100 border-blue-200/35",
  Advanced: "bg-emerald-300/20 text-emerald-100 border-emerald-200/35",
};

export default function SkillsSection() {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const [selectedSkillName, setSelectedSkillName] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0);
  const [autoScrollPaused, setAutoScrollPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [pauseTimeout, setPauseTimeout] = useState<NodeJS.Timeout | null>(null);
  const previewOffsets = [-2, -1, 1, 2];

  const skillCount = skillExperiences.length;
  const prevIndex = (activeIndex - 1 + skillCount) % skillCount;
  const nextIndex = (activeIndex + 1) % skillCount;

  const activeSkill = skillExperiences[activeIndex];

  const selectedSkill = useMemo(
    () => skillExperiences.find((skill) => skill.name === selectedSkillName) ?? activeSkill,
    [selectedSkillName, activeSkill]
  );

  const isFlipped = Boolean(flipped[activeSkill.name]);

  const toggleFlip = (name: string) => {
    setFlipped((prev) => {
      const willBeFlipped = !prev[name];
      setAutoScrollPaused(willBeFlipped);
      return { ...prev, [name]: willBeFlipped };
    });
  };

  useEffect(() => {
    if (autoScrollPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % skillCount);
    }, 2800);

    return () => {
      window.clearInterval(timer);
    };
  }, [skillCount, autoScrollPaused]);

  return (
    <section className="section-wrap" id="skills">
      <SectionHeading
        eyebrow="Skills"
        title="AI-first, full-stack engineering capabilities"
        description="An execution-ready skill map across Gen-AI, web development, backend systems, and production tooling."
      />

      <div className="mb-8 flex justify-center">
        <div className="rounded-2xl border border-cyan-200/25 bg-cyan-300/8 px-4 py-2 text-center text-base text-cyan-100/90 backdrop-blur">
          Click the center card to flip and inspect usage details.
        </div>
      </div>

      <div
        className="skills-stage"
        onMouseEnter={() => {
          setIsHovered(true);
          if (pauseTimeout) {
            clearTimeout(pauseTimeout);
            setPauseTimeout(null);
          }
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          const timeout = setTimeout(() => {
            setAutoScrollPaused(false);
          }, 1500);
          setPauseTimeout(timeout);
        }}
      >
        {previewOffsets.map((offset) => {
          const index = (activeIndex + offset + skillCount) % skillCount;
          const skill = skillExperiences[index];
          const isLeft = offset < 0;
          const depth = Math.abs(offset);

          return (
            <button
              key={`${skill.name}-${offset}`}
              type="button"
              className={`skills-side-card ${isLeft ? "skills-side-left" : "skills-side-right"} ${
                depth === 1 ? "skills-side-near" : "skills-side-far"
              }`}
              onClick={() => {
                setSlideDirection(isLeft ? -1 : 1);
                setActiveIndex(index);
                setAutoScrollPaused(true);
                setFlipped({});
              }}
              aria-label={`Go to ${skill.name}`}
            >
              <div className="flex items-center gap-3">
                <Image src={skill.logoPath} alt={`${skill.name} logo`} width={34} height={34} className="h-8 w-8" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">{skill.name}</p>
                  <p className="text-xs text-zinc-300">{skill.level}</p>
                </div>
              </div>
            </button>
          );
        })}

        <motion.article
          key={activeSkill.name}
          initial={{ opacity: 0, x: slideDirection * 80, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            event.currentTarget.style.setProperty("--mx", `${x}px`);
            event.currentTarget.style.setProperty("--my", `${y}px`);
          }}
          className="skill-exp-card skills-main-card"
        >
          <button
            type="button"
            onClick={() => toggleFlip(activeSkill.name)}
            className="skill-exp-hit"
            aria-label={`Flip ${activeSkill.name} card`}
          />

          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.55, ease: [0.2, 0.82, 0.2, 1] }}
            className="skill-exp-inner"
          >
            <div className="skill-exp-face">
              <div className="flex items-center justify-between gap-3">
                <span className={`rounded-full border px-2.5 py-1 text-xs ${levelClass[activeSkill.level] ?? levelClass.Intermediate}`}>
                  {activeSkill.level}
                </span>
                {activeSkill.mostUsed ? (
                  <span className="rounded-full border border-cyan-200/45 bg-cyan-300/15 px-2.5 py-1 text-xs text-cyan-100">
                    Most Used
                  </span>
                ) : null}
              </div>

              <div className="mt-6 flex items-center gap-3">
                <div className="rounded-xl border border-white/15 bg-white/10 p-2.5">
                  <Image src={activeSkill.logoPath} alt={`${activeSkill.name} logo`} width={40} height={40} className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-semibold text-white">{activeSkill.name}</h3>
              </div>

              <p className="mt-4 text-sm text-zinc-200">{activeSkill.shortUse}</p>

              <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-white/15">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${activeSkill.confidence}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.08 }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300"
                />
              </div>
              <p className="mt-2 text-xs text-cyan-100/85">Confidence: {activeSkill.confidence}%</p>

              <div className="mt-5 flex items-center justify-center">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 backdrop-blur-sm">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSlideDirection(0);
                      setActiveIndex(0);
                      setAutoScrollPaused(false);
                      setFlipped({});
                    }}
                    className={`relative p-0.5 transition-all duration-300 ${
                      0 === activeIndex
                        ? "scale-125"
                        : "scale-100 opacity-35 hover:opacity-60"
                    }`}
                    aria-label="Go to Java"
                  >
                    <Image
                      src={skillExperiences[0].logoPath}
                      alt="Java"
                      width={0 === activeIndex ? 22 : 16}
                      height={0 === activeIndex ? 22 : 16}
                      className={`rounded-sm transition-all duration-300 ${
                        0 === activeIndex
                          ? "bg-white/20 shadow-[0_0_10px_rgba(125,211,252,0.6)]"
                          : "bg-white/5"
                      }`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSlideDirection(0);
                      setActiveIndex(1);
                      setAutoScrollPaused(false);
                      setFlipped({});
                    }}
                    className={`relative p-0.5 transition-all duration-300 ${
                      1 === activeIndex
                        ? "scale-125"
                        : "scale-100 opacity-35 hover:opacity-60"
                    }`}
                    aria-label="Go to Python"
                  >
                    <Image
                      src={skillExperiences[1].logoPath}
                      alt="Python"
                      width={1 === activeIndex ? 22 : 16}
                      height={1 === activeIndex ? 22 : 16}
                      className={`rounded-sm transition-all duration-300 ${
                        1 === activeIndex
                          ? "bg-white/20 shadow-[0_0_10px_rgba(125,211,252,0.6)]"
                          : "bg-white/5"
                      }`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSlideDirection(0);
                      setActiveIndex(2);
                      setAutoScrollPaused(false);
                      setFlipped({});
                    }}
                    className={`relative p-0.5 transition-all duration-300 ${
                      2 === activeIndex
                        ? "scale-125"
                        : "scale-100 opacity-35 hover:opacity-60"
                    }`}
                    aria-label="Go to C++"
                  >
                    <Image
                      src={skillExperiences[2].logoPath}
                      alt="C++"
                      width={2 === activeIndex ? 22 : 16}
                      height={2 === activeIndex ? 22 : 16}
                      className={`rounded-sm transition-all duration-300 ${
                        2 === activeIndex
                          ? "bg-white/20 shadow-[0_0_10px_rgba(125,211,252,0.6)]"
                          : "bg-white/5"
                      }`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSlideDirection(0);
                      setActiveIndex(3);
                      setAutoScrollPaused(false);
                      setFlipped({});
                    }}
                    className={`relative p-0.5 transition-all duration-300 ${
                      3 === activeIndex
                        ? "scale-125"
                        : "scale-100 opacity-35 hover:opacity-60"
                    }`}
                    aria-label="Go to React"
                  >
                    <Image
                      src={skillExperiences[3].logoPath}
                      alt="React"
                      width={3 === activeIndex ? 22 : 16}
                      height={3 === activeIndex ? 22 : 16}
                      className={`rounded-sm transition-all duration-300 ${
                        3 === activeIndex
                          ? "bg-white/20 shadow-[0_0_10px_rgba(125,211,252,0.6)]"
                          : "bg-white/5"
                      }`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSlideDirection(0);
                      setActiveIndex(4);
                      setAutoScrollPaused(false);
                      setFlipped({});
                    }}
                    className={`relative p-0.5 transition-all duration-300 ${
                      4 === activeIndex
                        ? "scale-125"
                        : "scale-100 opacity-35 hover:opacity-60"
                    }`}
                    aria-label="Go to Next.js"
                  >
                    <Image
                      src={skillExperiences[4].logoPath}
                      alt="Next.js"
                      width={4 === activeIndex ? 22 : 16}
                      height={4 === activeIndex ? 22 : 16}
                      className={`rounded-sm transition-all duration-300 ${
                        4 === activeIndex
                          ? "bg-white/20 shadow-[0_0_10px_rgba(125,211,252,0.6)]"
                          : "bg-white/5"
                      }`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSlideDirection(0);
                      setActiveIndex(5);
                      setAutoScrollPaused(false);
                      setFlipped({});
                    }}
                    className={`relative p-0.5 transition-all duration-300 ${
                      5 === activeIndex
                        ? "scale-125"
                        : "scale-100 opacity-35 hover:opacity-60"
                    }`}
                    aria-label="Go to MongoDB"
                  >
                    <Image
                      src={skillExperiences[5].logoPath}
                      alt="MongoDB"
                      width={5 === activeIndex ? 22 : 16}
                      height={5 === activeIndex ? 22 : 16}
                      className={`rounded-sm transition-all duration-300 ${
                        5 === activeIndex
                          ? "bg-white/20 shadow-[0_0_10px_rgba(125,211,252,0.6)]"
                          : "bg-white/5"
                      }`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSlideDirection(0);
                      setActiveIndex(6);
                      setAutoScrollPaused(false);
                      setFlipped({});
                    }}
                    className={`relative p-0.5 transition-all duration-300 ${
                      6 === activeIndex
                        ? "scale-125"
                        : "scale-100 opacity-35 hover:opacity-60"
                    }`}
                    aria-label="Go to Docker"
                  >
                    <Image
                      src={skillExperiences[6].logoPath}
                      alt="Docker"
                      width={6 === activeIndex ? 22 : 16}
                      height={6 === activeIndex ? 22 : 16}
                      className={`rounded-sm transition-all duration-300 ${
                        6 === activeIndex
                          ? "bg-white/20 shadow-[0_0_10px_rgba(125,211,252,0.6)]"
                          : "bg-white/5"
                      }`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSlideDirection(0);
                      setActiveIndex(7);
                      setAutoScrollPaused(false);
                      setFlipped({});
                    }}
                    className={`relative p-0.5 transition-all duration-300 ${
                      7 === activeIndex
                        ? "scale-125"
                        : "scale-100 opacity-35 hover:opacity-60"
                    }`}
                    aria-label="Go to LangChain"
                  >
                    <Image
                      src={skillExperiences[7].logoPath}
                      alt="LangChain"
                      width={7 === activeIndex ? 22 : 16}
                      height={7 === activeIndex ? 22 : 16}
                      className={`rounded-sm transition-all duration-300 ${
                        7 === activeIndex
                          ? "bg-white/20 shadow-[0_0_10px_rgba(125,211,252,0.6)]"
                          : "bg-white/5"
                      }`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSlideDirection(0);
                      setActiveIndex(8);
                      setAutoScrollPaused(false);
                      setFlipped({});
                    }}
                    className={`relative p-0.5 transition-all duration-300 ${
                      8 === activeIndex
                        ? "scale-125"
                        : "scale-100 opacity-35 hover:opacity-60"
                    }`}
                    aria-label="Go to FastAPI"
                  >
                    <Image
                      src={skillExperiences[8].logoPath}
                      alt="FastAPI"
                      width={8 === activeIndex ? 22 : 16}
                      height={8 === activeIndex ? 22 : 16}
                      className={`rounded-sm transition-all duration-300 ${
                        8 === activeIndex
                          ? "bg-white/20 shadow-[0_0_10px_rgba(125,211,252,0.6)]"
                          : "bg-white/5"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="skill-exp-face skill-exp-back">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">Real Usage</p>
              <h3 className="mt-3 text-lg font-semibold text-white">{activeSkill.name} in my projects</h3>
              <p className="mt-3 text-sm text-zinc-200">{activeSkill.detailedUse}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {activeSkill.projectRefs.map((project) => (
                  <a key={project} href="#projects" className="tech-pill">
                    {project}
                  </a>
                ))}
              </div>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedSkillName(activeSkill.name);
                }}
                className="mt-5 inline-flex rounded-full border border-cyan-200/45 bg-cyan-300/15 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-300/25"
              >
                Expand Skill Story
              </button>
            </div>
          </motion.div>
        </motion.article>

      </div>

      <FadeIn delay={0.08}>
        <div className="mt-8 rounded-2xl border border-white/15 bg-white/7 p-6 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/80">About Me Through Skills</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">{selectedSkill.name}</h3>
          <p className="mt-3 text-zinc-200">{selectedSkill.storytelling}</p>
          <div className="mt-4 h-2 w-full max-w-xl overflow-hidden rounded-full bg-white/15">
            <motion.div
              key={selectedSkill.name}
              initial={{ width: 0 }}
              animate={{ width: `${selectedSkill.confidence}%` }}
              transition={{ duration: 0.6 }}
              className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300"
            />
          </div>
        </div>
      </FadeIn>

      <div className="mt-8 space-y-6">
        {groups.map((group, groupIndex) => (
          <FadeIn key={group.label} delay={groupIndex * 0.08}>
            <div className="glass-card p-6">
              <h3 className="text-lg font-medium text-white">{group.label}</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {group.items.map((item, itemIndex) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: itemIndex * 0.035, duration: 0.4 }}
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

      <AnimatePresence>
        {selectedSkillName ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/65 backdrop-blur-sm"
            onClick={() => setSelectedSkillName(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.35, ease: [0.2, 0.82, 0.2, 1] }}
              className="skill-modal-panel"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-white/20 bg-white/10 p-2.5">
                    <Image src={selectedSkill.logoPath} alt={`${selectedSkill.name} logo`} width={40} height={40} className="h-10 w-10" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">Skill Detail</p>
                    <h3 className="text-2xl font-semibold text-white">{selectedSkill.name}</h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedSkillName(null)}
                  className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm text-zinc-200 transition hover:bg-white/20"
                >
                  Close
                </button>
              </div>

              <p className="mt-5 text-zinc-200">{selectedSkill.detailedUse}</p>
              <p className="mt-3 text-zinc-300">{selectedSkill.storytelling}</p>

              <div className="mt-6 rounded-xl border border-cyan-200/20 bg-cyan-400/10 p-4">
                <div className="flex items-center justify-between text-sm text-cyan-100">
                  <span>Confidence Level</span>
                  <span>{selectedSkill.confidence}%</span>
                </div>
                <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-black/35">
                  <motion.div
                    key={`modal-${selectedSkill.name}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedSkill.confidence}%` }}
                    transition={{ duration: 0.65 }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300 shadow-[0_0_18px_rgba(125,211,252,0.65)]"
                  />
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">Project References</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedSkill.projectRefs.map((project) => (
                    <a key={project} href="#projects" className="tech-pill">
                      {project}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
