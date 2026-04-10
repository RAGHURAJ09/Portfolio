"use client";

import { Download, MapPin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Typewriter from "@/components/ui/Typewriter";
import { heroTypingLines, personalInfo } from "@/data/portfolio";

function SocialLogo({ type }: { type: "github" | "linkedin" }) {
  if (type === "github") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-current">
        <path d="M12 .5C5.73.5.68 5.66.68 12.05c0 5.11 3.23 9.44 7.71 10.96.57.11.78-.25.78-.56v-2.1c-3.14.69-3.8-1.55-3.8-1.55-.52-1.36-1.26-1.72-1.26-1.72-1.03-.72.08-.71.08-.71 1.13.08 1.73 1.19 1.73 1.19 1.01 1.76 2.65 1.25 3.3.96.1-.75.4-1.25.73-1.54-2.5-.3-5.12-1.28-5.12-5.72 0-1.26.44-2.29 1.16-3.11-.12-.3-.5-1.5.11-3.13 0 0 .96-.31 3.14 1.19a10.7 10.7 0 0 1 5.72 0c2.17-1.5 3.13-1.19 3.13-1.19.62 1.63.23 2.83.11 3.13.72.82 1.16 1.85 1.16 3.11 0 4.45-2.62 5.42-5.12 5.72.41.37.78 1.1.78 2.22v3.28c0 .31.21.68.79.56 4.47-1.52 7.7-5.85 7.7-10.96C23.32 5.66 18.27.5 12 .5Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-current">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.05-1.86-3.05-1.87 0-2.15 1.45-2.15 2.95v5.67H9.34V9h3.41v1.56h.05c.47-.9 1.62-1.86 3.33-1.86 3.57 0 4.23 2.35 4.23 5.41v6.34ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45ZM22.23 0H1.77A1.74 1.74 0 0 0 0 1.72v20.56A1.74 1.74 0 0 0 1.77 24h20.46A1.74 1.74 0 0 0 24 22.28V1.72A1.74 1.74 0 0 0 22.23 0Z" />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden px-6 pb-20 pt-40 md:px-10 md:pt-44" id="top">
      <div className="absolute inset-0 -z-10 opacity-70">
        <div className="hero-grid absolute inset-0" />
        <div className="hero-gradient absolute inset-0" />
        <div className="particle-layer absolute inset-0" />
        <div className="tech-blocks">
          <span className="tech-block left-[8%] top-[14%] h-20 w-28" data-label="AI" />
          <span className="tech-block left-[18%] top-[62%] h-16 w-24" data-label="DSA" />
          <span className="tech-block right-[18%] top-[18%] h-24 w-36" data-label="ML" />
          <span className="tech-block right-[10%] top-[56%] h-18 w-28" data-label="CODE" />
          <span className="tech-block left-[42%] top-[10%] h-12 w-20" data-label="GPU" />
        </div>
      </div>

      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.25fr_0.9fr]"
      >
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1 text-xs font-medium tracking-[0.2em] text-cyan-200"
          >
            FUTURE-READY ENGINEER
          </motion.span>

          <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
            {personalInfo.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-300 md:text-xl">{personalInfo.title}</p>
          <div className="mt-5">
            <Typewriter lines={heroTypingLines} />
          </div>

          <div className="mt-7 flex flex-wrap gap-4 text-sm text-zinc-300">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur">
              <MapPin className="h-4 w-4 text-cyan-300" /> {personalInfo.location}
            </span>
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur transition hover:border-cyan-300/60"
            >
              <Mail className="h-4 w-4 text-cyan-300" /> {personalInfo.email}
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary">View My Work</a>
            <a href="#contact" className="btn-secondary">Hire Me</a>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <Link href={personalInfo.github} target="_blank" className="social-chip">
              <SocialLogo type="github" /> GitHub
            </Link>
            <Link href={personalInfo.linkedin} target="_blank" className="social-chip">
              <SocialLogo type="linkedin" /> LinkedIn
            </Link>
          </div>

          <div className="mt-4">
            <div className="resume-split">
              <a
                href={personalInfo.cvPath}
                target="_blank"
                rel="noreferrer"
                className="resume-action"
              >
                <Download className="h-4 w-4" /> View Resume
              </a>
              <a href={personalInfo.cvPath} download className="resume-action">
                <Download className="h-4 w-4" /> Download Resume
              </a>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="floating-badge absolute -top-3 right-2 z-20"
          >
            <span>🚀 {personalInfo.internshipBadge}</span>
          </motion.div>
          <div className="profile-shell relative">
            <div className="profile-ring" />
            <div className="profile-core">
              <div className="profile-photo-wrap">
                <Image
                  src="/profile-avatar.svg"
                  alt="Raghuraj Pratap Rajpoot profile"
                  width={240}
                  height={240}
                  className="profile-photo"
                  priority
                />
              </div>
              <p className="mt-3 text-center text-lg font-medium text-white">Open to impactful roles</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
