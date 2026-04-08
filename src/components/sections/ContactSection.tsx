"use client";

import { FormEvent, useState } from "react";
import { ExternalLink } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";

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

export default function ContactSection() {
  const [status, setStatus] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Form captured. Connect EmailJS by adding your service/template/public key in this handler.");
  };

  return (
    <section className="section-wrap scroll-mt-36 pb-24 md:scroll-mt-40" id="contact">
      <SectionHeading
        eyebrow="Contact"
        title="Let us build something meaningful"
        description="This form is ready for EmailJS wiring so recruiters can reach you instantly."
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <div className="featured-panel min-h-[420px] p-6 md:p-8">
          <div className="relative z-10 flex h-full flex-col">
            <span className="inline-flex w-fit rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs tracking-[0.25em] text-cyan-100">
              CONNECT
            </span>
            <p className="mt-5 max-w-xl text-zinc-200 md:text-lg">
              Open to AI engineering, Gen-AI, and full-stack opportunities. If you are hiring for impact,
              let us connect.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <a href={`mailto:${personalInfo.email}`} className="glass-card flex items-center justify-between gap-3 overflow-hidden p-4 transition hover:border-cyan-300/50 sm:col-span-2">
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-[0.2em] text-cyan-200/80">Email</span>
                  <span className="mt-1 block truncate whitespace-nowrap text-sm text-white">{personalInfo.email}</span>
                </span>
                <ExternalLink className="h-4 w-4 text-cyan-200" />
              </a>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="glass-card flex items-center justify-between gap-3 overflow-hidden p-4 transition hover:border-cyan-300/50">
                <span className="flex items-center gap-2 text-sm text-white">
                  <SocialLogo type="github" /> GitHub
                </span>
                <ExternalLink className="h-4 w-4 text-cyan-200" />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="glass-card flex items-center justify-between gap-3 overflow-hidden p-4 transition hover:border-cyan-300/50">
                <span className="flex items-center gap-2 text-sm text-white">
                  <SocialLogo type="linkedin" /> LinkedIn
                </span>
                <ExternalLink className="h-4 w-4 text-cyan-200" />
              </a>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="glass-card p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">Response</p>
                <p className="mt-2 text-sm text-white">Fast follow-up</p>
              </div>
              <div className="glass-card p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">Focus</p>
                <p className="mt-2 text-sm text-white">AI + Product builds</p>
              </div>
              <div className="glass-card p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">Mode</p>
                <p className="mt-2 text-sm text-white">Open to collaborate</p>
              </div>
            </div>

            <div className="mt-auto pt-6 text-sm text-cyan-100/80">
              Ready for recruiter outreach, referrals, and direct opportunities.
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="featured-panel min-h-[420px] space-y-4 p-6 md:p-8">
          <div className="relative z-10 space-y-4">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-200/80">Contact Us</p>
            <input className="contact-input" placeholder="Your Name" required />
            <input className="contact-input" type="email" placeholder="Your Email" required />
            <input className="contact-input" placeholder="Subject" required />
            <textarea className="contact-input min-h-32" placeholder="Message" required />
            <button type="submit" className="btn-primary w-full justify-center">
              Send Message
            </button>
            {status ? <p className="text-sm text-cyan-200">{status}</p> : null}
          </div>
        </form>
      </div>
    </section>
  );
}
