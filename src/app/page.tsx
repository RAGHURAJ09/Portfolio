import AchievementsSection from "@/components/sections/AchievementsSection";
import ContactSection from "@/components/sections/ContactSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import Footer from "@/components/sections/Footer";
import GithubReposSection from "@/components/sections/GithubReposSection";
import HeroSection from "@/components/sections/HeroSection";
import Navbar from "@/components/sections/Navbar";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import StatsSection from "@/components/sections/StatsSection";
import TechStackSection from "@/components/sections/TechStackSection";
import WhyHireMeSection from "@/components/sections/WhyHireMeSection";
import AIChatWidget from "@/components/ui/AIChatWidget";
import CursorGlow from "@/components/ui/CursorGlow";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#07090f] text-zinc-100">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <ProjectsSection />
        <SkillsSection />
        <TechStackSection />
        <ExperienceSection />
        <AchievementsSection />
        <WhyHireMeSection />
        <GithubReposSection />
        <ContactSection />
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  );
}
