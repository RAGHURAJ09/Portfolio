# Raghuraj Portfolio

A premium, futuristic, recruiter-focused personal portfolio built with modern web technologies.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-000000)](https://www.framer.com/motion)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow)](https://opensource.org/licenses/MIT)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion, React Parallax Tilt
- **3D Graphics**: React Three Fiber, Three.js
- **Icons**: Lucide React

## Features

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

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/raghuraj-portfolio.git

# Navigate to project directory
cd raghuraj-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/
│   ├── globals.css       # Global styles and Tailwind
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Main page component
├── components/
│   ├── animations/
│   │   ├── FadeIn.tsx
│   │   └── HoverTilt.tsx
│   ├── sections/
│   │   ├── AchievementsSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── Footer.tsx
│   │   ├── GithubReposSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── StatsSection.tsx
│   │   └── WhyHireMeSection.tsx
│   └── ui/
│       ├── AIChatWidget.tsx
│       ├── CursorGlow.tsx
│       ├── ScrollProgress.tsx
│       ├── SectionHeading.tsx
│       └── Typewriter.tsx
└── data/
    └── portfolio.ts     # Portfolio data
```

## EmailJS Integration

The contact form is pre-wired. To enable email sending:

1. Create an [EmailJS](https://www.emailjs.com/) account
2. Create a service, template, and get your public key
3. Add environment variables:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

4. Update the submit handler in `src/components/sections/ContactSection.tsx`

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Framework preset: Next.js
4. Add env vars if using EmailJS
5. Deploy

### Other Platforms

```bash
npm run build
# Deploy the .next folder or output: 'standalone' config
```

## License

MIT License - feel free to use this portfolio as a template.

## Author

Raghuraj Pratap Rajpoot