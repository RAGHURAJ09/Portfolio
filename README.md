# Raghuraj Portfolio

Premium, futuristic, recruiter-focused personal portfolio built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- React Parallax Tilt
- Lucide React

## Implemented Features

- Futuristic hero with animated grid/gradient/particle background
- Typewriter headline animation
- Floating internship badge
- Interactive CTA buttons: View Work, Hire Me, Download Resume
- Floating AI chat widget: "Ask about Raghuraj"
- Animated impact stats with on-scroll counters
- Premium 3D tilt project cards with glow borders
- Skills matrix with animated chips
- Experience timeline and achievements section
- "Why Hire Me" high-impact section
- GitHub API integration for live repositories
- Glassmorphism contact form (ready for EmailJS wiring)
- Custom cursor glow and top scroll progress bar
- SEO metadata (Open Graph + Twitter cards)

## Folder Structure

```text
src/
	app/
		globals.css
		layout.tsx
		page.tsx
	components/
		animations/
			FadeIn.tsx
			HoverTilt.tsx
		sections/
			AchievementsSection.tsx
			ContactSection.tsx
			ExperienceSection.tsx
			Footer.tsx
			GithubReposSection.tsx
			HeroSection.tsx
			Navbar.tsx
			ProjectsSection.tsx
			SkillsSection.tsx
			StatsSection.tsx
			WhyHireMeSection.tsx
		ui/
			AIChatWidget.tsx
			CursorGlow.tsx
			ScrollProgress.tsx
			SectionHeading.tsx
			Typewriter.tsx
	data/
		portfolio.ts
public/
	Raghuraj_Pratap_Rajpoot_Resume.txt
```

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm run start
```

## EmailJS Integration

The contact form is already structured. To connect EmailJS:

1. Create an EmailJS service, template, and public key.
2. Add these values in environment variables:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

3. Update submit handler in [src/components/sections/ContactSection.tsx](src/components/sections/ContactSection.tsx) to call EmailJS.

## Deployment (Vercel - Free)

1. Push this repository to GitHub.
2. Go to Vercel and import the repo.
3. Framework preset: Next.js (auto-detected).
4. Add environment variables (if EmailJS/OpenAI is enabled).
5. Click Deploy.

## Optional OpenAI Upgrade for Chat Widget

Current widget uses reliable local mock intelligence for recruiter demos. You can swap to real OpenAI calls by adding an API route and secure server-side key usage.
