import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

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

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10 text-sm text-zinc-400 md:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-white">
            {personalInfo.name} • {personalInfo.title}
          </p>
          <p className="mt-2">Built with Next.js, TypeScript, Tailwind, and Framer Motion.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link href={personalInfo.github} target="_blank" className="social-chip">
            <SocialLogo type="github" /> GitHub
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          <Link href={personalInfo.linkedin} target="_blank" className="social-chip">
            <SocialLogo type="linkedin" /> LinkedIn
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          <a href={`mailto:${personalInfo.email}`} className="social-chip">
            <ExternalLink className="h-3.5 w-3.5" /> Connect by Email
          </a>
        </div>
      </div>
    </footer>
  );
}
