import SectionHeading from "@/components/ui/SectionHeading";
import TechStackOrbField from "@/components/sections/TechStackOrbField";
import { skills } from "@/data/portfolio";

const stackSections = [
  { title: "Backend", items: skills.backend },
  { title: "Databases", items: skills.database },
  { title: "Tools & Cloud", items: skills.tools },
  { title: "Languages", items: skills.languages },
];

const orbLabels = [...skills.backend, ...skills.database, ...skills.tools, ...skills.languages];

export default function TechStackSection() {
  return (
    <section className="section-wrap" id="techstack">
      <SectionHeading
        eyebrow="Capability Matrix"
        title="Tech Stack"
        description="Interactive physics stack: technologies move in from every direction, collide naturally, and react to your cursor with bounce impulses."
      />

      <div className="tech-orb-shell p-3 md:p-4">
        <TechStackOrbField labels={orbLabels} />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stackSections.map((section) => (
          <article key={section.title} className="tech-stack-card p-6">
            <h3 className="text-xl font-semibold text-cyan-100">{section.title}</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {section.items.map((item) => (
                <li key={item} className="tech-pill">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
