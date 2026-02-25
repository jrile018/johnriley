export const personal = {
  name: "John Riley",
  title: "Computer Engineering Student",
  subtitle: "Building intelligent systems at the intersection of ML & software engineering",
  school: "University of Florida",
  degree: "B.S. Computer Engineering",
  minor: "Mathematics",
  graduation: "December 2026",
  gpa: "3.5",
  location: "Gainesville, FL",
  phone: "(786)-647-3624",
  email: "john.p.riley00@gmail.com",
  github: "https://github.com/jrile018",
  linkedin: "https://linkedin.com/in/john-riley1287",
  coursework: ["Data Structures", "DB Systems", "Probability", "Linear Algebra", "Operating Systems"],
  bio: `I'm a Computer Engineering student with a minor in Mathematics at the University of Florida. I specialize in machine learning, quantitative finance, and full-stack systems that solve real problems at scale. I've won multiple hackathons — including three 1st place finishes — by shipping production-ready ML applications under pressure, from autoimmune disease prediction platforms processing 88K+ patient records to GPU-accelerated legal analysis engines yielding 41.7 cases/sec on AMD MI300X hardware. Currently, I'm building systematic trading strategies for a $500K AUM student quant fund and researching EEG-based seizure prediction models using deep learning. When I'm not training models or writing trading algorithms, I'm exploring new ways to push the boundaries of what software can do.`,
};

export interface Project {
  title: string;
  description: string;
  highlights: string[];
  tech: string[];
  award: string;
  event: string;
  date: string;
  github?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    title: "Autoimmune Risk Analysis",
    description:
      "ML-powered autoimmune disease risk prediction platform achieving 0.98 test AUC and 96% accuracy across 88,742 patient records.",
    highlights: [
      "Engineered a hierarchical dual-scorer triaging patients into 4 clusters using 17 clinical features from 5 datasets",
      "Built a privacy-first clinical decision-support platform with a 5-agent NLP pipeline via FastAPI with SSE streaming and SHAP explainability",
      "Reduced projected diagnostic delay from 4–7 years to 3–5 through proactive risk assessment",
    ],
    tech: ["Python", "FastAPI", "XGBoost", "React", "scikit-learn"],
    award: "1st Place",
    event: "Hacklytics @ Georgia Tech (Actian)",
    date: "Feb 2026",
    github: "https://github.com/jrile018",
  },
  {
    title: "Adjourned",
    description:
      "Autonomous legal research system capable of querying 24+ disparate public databases for case triage across 5 major legal domains.",
    highlights: [
      "Architected a multi-agent orchestration layer using DSPy and MCPs to unify access to distributed federal sources",
      "Built a scalable legal platform that facilitated complex case triage across 5 major legal domains",
      "Developed a dual-interface application integrating sequential AI agents for document analysis and form generation",
    ],
    tech: ["Python", "React", "DSPy", "Azure", "LangChain"],
    award: "2nd Place",
    event: "SwampHacks × Morgan & Morgan",
    date: "Jan 2026",
    github: "https://github.com/jrile018",
  },
  {
    title: "Lawgorithm",
    description:
      "GPU-accelerated legal research system yielding 41.7 cases/sec by orchestrating 100 async workers on AMD MI300X hardware.",
    highlights: [
      "Parallelized Lexis queries, embedding retrieval in FAISS, and RAG-ranking via Saul-7B Legal AI on AMD MI300X",
      "Reduced legal research latency from 90+ seconds to under 21 seconds for 135-case datasets",
      "Implemented intelligent query generation that decomposes natural-language questions into 3–5 optimized sub-queries",
    ],
    tech: ["AMD MI300X", "ROCm", "ADK", "Python", "FastAPI"],
    award: "1st Place",
    event: "KnightHacks × AMD / Morgan & Morgan",
    date: "Oct 2025",
    github: "https://github.com/jrile018",
  },
  {
    title: "Agent Zero",
    description:
      "Multi-agent fraud detection platform orchestrating 6+ specialized agents via an LLM-powered coordinator with BigQuery audit trails.",
    highlights: [
      "Architected adaptive task delegation system that evaluates invoice complexity and dynamically routes to specialized agents",
      "Implemented modular triage logic reducing false positives while maintaining full-spectrum fraud detection",
      "Built real-time processing pipeline improving efficiency while maintaining detection coverage",
    ],
    tech: ["Python", "FastAPI", "Google Gemini", "TensorFlow"],
    award: "1st Place",
    event: "ShellHacks × Capital One",
    date: "Sep 2025",
    github: "https://github.com/jrile018",
  },
];

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
  current: boolean;
}

export const experience: Experience[] = [
  {
    role: "Software Engineering Intern",
    company: "Walmart",
    period: "Jun 2026 — Aug 2026",
    description: [
      "Pending",
    ],
    current: false,
  },
  {
    role: "Quantitative Developer",
    company: "AlgoGators",
    period: "Sept 2025 — Present",
    description: [
      "Develop and optimize systematic trading strategies for a $500K AUM fund by applying quantitative modeling, statistical analysis, and risk management techniques",
      "Refactor trading system codebase implementing modular architecture patterns and unit testing to support scalable strategy deployment across multiple asset classes",
    ],
    current: true,
  },
  {
    role: "Data Science & ML Research Assistant",
    company: "Precision Computational Health & Biomedical Data Science Lab",
    period: "Jun 2025 — Present",
    description: [
      "Annotated 500+ hours of EEG waveform data to identify seizure onset, duration, and classification, establishing labeled datasets for clinical ML applications",
      "Prepared high-quality labeled data being integrated into a machine learning pipeline aimed at predicting future seizure events for proactive patient care",
    ],
    current: true,
  },
  {
    role: "VP Professional Development & Website Scrum Master",
    company: "Venezuelan Student Association",
    period: "Feb 2024 — Present",
    description: [
      "Led development of club website serving 100+ members by implementing Agile methodology, establishing sprint cycles and contribution workflows",
      "Coordinated 10+ professional development workshops by recruiting industry mentors, managing 100+ participant sign-ups",
    ],
    current: true,
  },
];

export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["Python", "C++", "Rust", "SQL"],
  },
  {
    category: "Frameworks",
    skills: ["FastAPI", "Flask", "pytest", "pandas", "NumPy", "scikit-learn", "TensorFlow", "PyTorch"],
  },
  {
    category: "ML / AI",
    skills: ["Google Gemini", "LangChain", "Optuna", "Temporal Fusion Transformer", "LSTM/RNN", "RAG Pipelines"],
  },
  {
    category: "Developer Tools",
    skills: ["Apache Kafka", "AWS", "Docker", "Git", "GitHub Actions", "Google BigQuery", "ROCm"],
  },
];

export type TabId = "home" | "about" | "projects" | "experience" | "github";

export const navLinks: { label: string; id: TabId }[] = [
  { label: "about", id: "about" },
  { label: "projects", id: "projects" },
  { label: "experience", id: "experience" },
  { label: "github", id: "github" },
];
