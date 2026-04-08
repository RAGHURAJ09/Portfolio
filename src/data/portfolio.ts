export const personalInfo = {
  name: "Raghuraj Pratap Rajpoot",
  title: "Backend Developer | Software Engineer",
  location: "India",
  email: "raghurajrajpoot2819@gmail.com",
  github: "https://github.com/RAGHURAJ09",
  linkedin: "https://www.linkedin.com/in/raghuraj-rajpoot",
  internshipBadge: "Gen-AI Intern @ SkillCred",
  cvPath: "/Raghuraj_Pratap_Rajpoot_CV.pdf",
};

export const navLinks = [
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Tech Stack", href: "/#techstack" },
  { label: "Experience", href: "/#experience" },
  { label: "Achievements", href: "/#achievements" },
  { label: "Contact", href: "/#contact" },
];

export const heroTypingLines = [
  "Building scalable systems",
  "Designing APIs",
  "Optimizing performance",
];

export const stats = [
  { value: 3, suffix: "+", label: "Major AI Projects" },
  { value: 10, suffix: "+", label: "Technologies" },
  { value: 5, suffix: "+", label: "Certifications" },
  { value: 1, suffix: "", label: "Gen-AI Internship Experience" },
];

export const projects = [
  {
    title: "AI Chatbot (RAG based)",
    problem: "Built a context-aware assistant to answer domain-specific questions with retrieval-augmented generation.",
    impact: "Context-aware Q&A",
    tech: ["FastAPI", "Next.js", "LangChain", "ChromaDB"],
    live: "https://github.com/RAGHURAJ09",
    github: "https://github.com/RAGHURAJ09",
    featured: true,
  },
  {
    title: "Smart Interview Assistant",
    problem: "Engineered an AI workflow that generates role-based interview questions and evaluates candidate responses.",
    impact: "Improved interview preparation quality",
    tech: ["Python", "OpenAI", "React", "Node.js"],
    live: "https://github.com/RAGHURAJ09",
    github: "https://github.com/RAGHURAJ09",
    featured: false,
  },
  {
    title: "Portfolio Intelligence Dashboard",
    problem: "Created a full-stack dashboard to track projects, certifications, and recruiter-facing performance metrics.",
    impact: "Single source of professional growth insights",
    tech: ["Next.js", "TypeScript", "Tailwind", "REST API"],
    live: "https://github.com/RAGHURAJ09",
    github: "https://github.com/RAGHURAJ09",
    featured: false,
  },
  {
    title: "AI Resume Analyzer",
    problem: "Built a smart screening tool that analyzes resume content and surfaces role-fit strengths with Gen-AI.",
    impact: "Faster recruiter review with structured insights",
    tech: ["Python", "OpenAI", "FastAPI", "Next.js"],
    live: "https://github.com/RAGHURAJ09",
    github: "https://github.com/RAGHURAJ09",
    featured: false,
  },
];

export const skills = {
  backend: ["Java", "Node.js", "Spring Boot", "Express", "REST APIs"],
  database: ["PostgreSQL", "MongoDB", "Redis", "SQL", "Database Design"],
  tools: ["Docker", "Git", "AWS", "Postman", "CI/CD"],
  languages: ["Java", "TypeScript", "Python", "JavaScript"],
};

export const certifications = [
  "Microsoft AI-900",
  "Microsoft AZ-900",
  "Microsoft DP-700",
  "Infosys Springboard",
  "HackerRank Certifications",
];

export const experience = [
  {
    company: "SkillCred",
    role: "Gen-AI Intern",
    duration: "Recent",
    points: [
      "Built practical AI solutions for real-world use cases.",
      "Improved product engagement through intelligent features.",
      "Collaborated on rapid prototyping and delivery cycles.",
    ],
  },
];

export const hireReasons = [
  {
    title: "Problem-Solving Mindset",
    description: "I focus on solving measurable business problems, not just shipping code.",
  },
  {
    title: "Real-World AI Experience",
    description: "From RAG chatbots to workflow automation, I build AI systems that users actually use.",
  },
  {
    title: "Fast Learner + Builder",
    description: "I learn quickly, iterate rapidly, and deliver production-oriented solutions.",
  },
];

export const aiChatAnswers: Record<string, string> = {
  "what projects has he built": "Raghuraj has built AI-first products including a RAG-based chatbot using FastAPI, Next.js, LangChain, and ChromaDB, plus intelligent assistants and full-stack dashboards.",
  "what are his skills": "He combines backend engineering and AI delivery skills across Java, Spring Boot, Node.js, PostgreSQL, MongoDB, Docker, AWS, and API-first architecture.",
  "why should i hire him": "You should hire Raghuraj because he can convert business needs into production-grade AI and backend features quickly, with a strong problem-solving mindset and real internship experience in Gen-AI.",
};
