export const personalInfo = {
  name: "Raghuraj Pratap Rajpoot",
  title: "AI Engineer | Full Stack Developer | Gen-AI Specialist",
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
  "I build AI-powered systems.",
  "I solve real-world problems.",
  "I ship recruiter-ready products.",
];

export const stats = [
  { value: 1, suffix: "", label: "Major AI Projects" },
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
  languages: ["Java", "TypeScript", "Python", "JavaScript", "React", "HTML", "CSS"],
};

export const skillCategories = {
  aiMl: ["Python", "OpenAI", "LangChain", "RAG", "Prompt Engineering", "FastAPI"],
  webDevelopment: ["Next.js", "React", "TypeScript", "JavaScript", "HTML", "CSS", "REST APIs"],
  toolsAndTechnologies: ["Docker", "Git", "Postman", "AWS", "CI/CD", "PostgreSQL", "MongoDB", "Redis"],
};

export type SkillExperience = {
  name: string;
  logoPath: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  confidence: number;
  mostUsed?: boolean;
  shortUse: string;
  detailedUse: string;
  storytelling: string;
  projectRefs: string[];
};

export const skillExperiences: SkillExperience[] = [
  {
    name: "Java",
    logoPath: "/tech-logos/java.svg",
    level: "Advanced",
    confidence: 88,
    mostUsed: true,
    shortUse: "Built backend services and problem-solving focused APIs.",
    detailedUse: "Used Java for designing clean service logic, writing scalable backend modules, and implementing production-style API layers with maintainable architecture.",
    storytelling: "Java represents my engineering discipline: writing robust code, structuring systems clearly, and delivering features with long-term maintainability in mind.",
    projectRefs: ["Portfolio Intelligence Dashboard", "Smart Interview Assistant"],
  },
  {
    name: "Python",
    logoPath: "/tech-logos/python.svg",
    level: "Advanced",
    confidence: 92,
    mostUsed: true,
    shortUse: "Used Python for AI backend workflows and automation.",
    detailedUse: "Used Python for building AI chatbot backend services with FastAPI, model workflow orchestration, and prompt-driven logic for real-world product features.",
    storytelling: "Python is where I convert ideas into intelligent systems quickly, from experiments to deployable AI pipelines.",
    projectRefs: ["AI Chatbot (RAG based)", "AI Resume Analyzer"],
  },
  {
    name: "C++",
    logoPath: "/tech-logos/cpp.svg",
    level: "Intermediate",
    confidence: 72,
    shortUse: "Used for performance-focused foundations and DSA depth.",
    detailedUse: "Used C++ to strengthen core algorithmic thinking, optimize performance-critical logic, and improve system-level understanding that reflects in backend design quality.",
    storytelling: "C++ shaped my problem-solving mindset and helped me think about optimization before implementation.",
    projectRefs: ["Interview prep engine", "Algorithmic modules"],
  },
  {
    name: "React",
    logoPath: "/tech-logos/react.svg",
    level: "Advanced",
    confidence: 87,
    mostUsed: true,
    shortUse: "Built responsive, interactive product UIs including chat experiences.",
    detailedUse: "Used React for building responsive UI flows, reusable components, animated interfaces, and chat-like interaction patterns similar to modern AI assistants.",
    storytelling: "React is how I translate backend intelligence into intuitive product experiences recruiters can instantly evaluate.",
    projectRefs: ["Smart Interview Assistant", "Portfolio site"],
  },
  {
    name: "Next.js",
    logoPath: "/tech-logos/nextjs.svg",
    level: "Advanced",
    confidence: 90,
    mostUsed: true,
    shortUse: "Shipped full-stack AI products with optimized routing and SEO.",
    detailedUse: "Used Next.js App Router to build fast, recruiter-facing full-stack applications with dynamic sections, optimized rendering, and production-grade deployment readiness.",
    storytelling: "Next.js is my default platform for turning polished ideas into real products with performance and SEO built in.",
    projectRefs: ["AI Chatbot (RAG based)", "Portfolio Intelligence Dashboard"],
  },
  {
    name: "MongoDB",
    logoPath: "/tech-logos/mongodb.svg",
    level: "Intermediate",
    confidence: 78,
    shortUse: "Modeled flexible schemas for evolving AI features.",
    detailedUse: "Used MongoDB for rapid iteration in projects where schema flexibility matters, especially for storing evolving AI interactions and feature metadata.",
    storytelling: "MongoDB helps me move fast when products evolve quickly and data structures need adaptability.",
    projectRefs: ["Smart Interview Assistant", "Portfolio Intelligence Dashboard"],
  },
  {
    name: "Docker",
    logoPath: "/tech-logos/docker.svg",
    level: "Intermediate",
    confidence: 80,
    shortUse: "Containerized apps for consistent local and deploy runs.",
    detailedUse: "Used Docker to package APIs and web services into portable environments, reducing setup friction and enabling reproducible project delivery.",
    storytelling: "Docker is my reliability layer for collaboration and deployment confidence.",
    projectRefs: ["AI Chatbot (RAG based)", "AI Resume Analyzer"],
  },
  {
    name: "LangChain",
    logoPath: "/tech-logos/langchain.svg",
    level: "Advanced",
    confidence: 86,
    shortUse: "Built retrieval and orchestration logic for RAG flows.",
    detailedUse: "Used LangChain to orchestrate retrieval-augmented generation workflows, document chunking, context routing, and response synthesis for domain-aware assistants.",
    storytelling: "LangChain is central to how I build practical Gen-AI systems that answer with context instead of guesswork.",
    projectRefs: ["AI Chatbot (RAG based)"],
  },
  {
    name: "FastAPI",
    logoPath: "/tech-logos/fastapi.svg",
    level: "Advanced",
    confidence: 89,
    shortUse: "Created high-performance AI APIs and backend interfaces.",
    detailedUse: "Used FastAPI to build low-latency AI service endpoints, structured request/response schemas, and modular API layers for chatbot and analyzer products.",
    storytelling: "FastAPI helps me connect AI logic to real users through clean, fast, and scalable interfaces.",
    projectRefs: ["AI Chatbot (RAG based)", "AI Resume Analyzer"],
  },
];

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
  "what projects has he built": "Raghuraj has built AI-first products including a RAG-based chatbot (FastAPI + Next.js + LangChain + ChromaDB), a smart interview assistant, and an AI resume analyzer with practical recruiter-facing insights.",
  "what are his skills": "He combines AI engineering and full-stack execution across Python, OpenAI, LangChain, FastAPI, Next.js, React, TypeScript, Java, PostgreSQL, MongoDB, Docker, AWS, and CI/CD workflows.",
  "why should i hire him": "You should hire Raghuraj because he is a fast learner and builder who translates real business problems into production-ready AI and full-stack solutions, backed by hands-on Gen-AI internship experience at SkillCred.",
};
