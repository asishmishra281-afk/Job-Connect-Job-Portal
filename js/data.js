// JobConnect - Master Dataset
// Realistic job postings curated for students, fresh graduates, and career seekers

const INITIAL_JOBS = [
  {
    id: "job-101",
    title: "Junior Frontend Developer (React / Next.js)",
    company: "CloudSphere Tech",
    logoColor: "#4f46e5",
    logoBg: "#e0e7ff",
    logoText: "CS",
    location: "Remote (Global)",
    isRemote: true,
    jobType: "Full-time",
    experience: "Junior (0-2 yrs)",
    category: "Engineering",
    salary: "$70,000 - $90,000 / yr",
    salaryMin: 70000,
    postedAt: "Just now",
    deadline: "30 days left",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Entry Level"],
    featured: true,
    urgent: true,
    studentFriendly: true,
    description: "CloudSphere is looking for an enthusiastic Junior Frontend Developer to join our core cloud platform UI team. You will work closely with senior engineers and UI/UX designers to craft responsive, blazing-fast web experiences.",
    responsibilities: [
      "Develop interactive web interfaces using React, Next.js, and TypeScript.",
      "Collaborate with backend teams to integrate REST and GraphQL endpoints.",
      "Write clean, maintainable, and unit-tested code with Jest & React Testing Library.",
      "Participate in agile sprints, daily standups, and bi-weekly code review sessions.",
      "Optimize web applications for maximum speed, accessibility, and responsiveness."
    ],
    requirements: [
      "Solid understanding of JavaScript (ES6+), HTML5, and modern CSS/Flexbox/Grid.",
      "Hands-on experience building projects with React (personal or internship projects count!).",
      "Familiarity with Git and version control workflows.",
      "Eager to learn modern state management (Zustand, Redux, or TanStack Query).",
      "Strong communication and collaborative problem-solving skills."
    ],
    benefits: [
      "100% remote flexibility with home office setup stipend ($1,200).",
      "Mentorship program paired with a Staff Engineer.",
      "Annual learning & certification budget ($1,500).",
      "Comprehensive health, dental, and vision insurance.",
      "Flexible PTO and wellness recharge Fridays."
    ],
    aboutCompany: "CloudSphere provides enterprise-grade infrastructure monitoring for over 4,000 global startups and tech enterprises. We pride ourselves on a transparent, inclusive, and high-growth engineering culture."
  },
  {
    id: "job-102",
    title: "UI/UX Design Intern (Summer 2026)",
    company: "PixelCrafters Studio",
    logoColor: "#ec4899",
    logoBg: "#fce7f3",
    logoText: "PC",
    location: "San Francisco, CA (Hybrid)",
    isRemote: false,
    jobType: "Internship",
    experience: "Fresher / Intern",
    category: "Design",
    salary: "$35 - $45 / hr",
    salaryMin: 60000,
    postedAt: "3 hours ago",
    deadline: "20 days left",
    tags: ["Figma", "UI/UX", "Prototyping", "Design Systems", "Campus Hire"],
    featured: true,
    urgent: false,
    studentFriendly: true,
    description: "Are you a student or recent graduate with a passion for beautiful, intuitive digital experiences? PixelCrafters Studio is hiring a creative UI/UX Design Intern to work on consumer mobile apps and SaaS web products.",
    responsibilities: [
      "Assist in creating high-fidelity wireframes, interactive prototypes, and user flows in Figma.",
      "Conduct user research interviews and synthesize feedback into actionable design iterations.",
      "Contribute to our growing open-source design system and component libraries.",
      "Collaborate with developers to ensure pixel-perfect design implementation.",
      "Present design rationale to cross-functional stakeholders."
    ],
    requirements: [
      "Currently pursuing or recently graduated with a degree in Design, HCI, or related field (or equivalent portfolio).",
      "Proficient in Figma, FigJam, and modern prototyping tools.",
      "A portfolio demonstrating user-centric thinking, clean visual aesthetics, and attention to detail.",
      "Understanding of accessibility standards (WCAG 2.1).",
      "Curious mindset and excitement to receive and incorporate constructive feedback."
    ],
    benefits: [
      "Competitive hourly compensation with potential full-time return offer.",
      "Direct 1-on-1 mentorship from seasoned Lead Product Designers.",
      "Latest M3 MacBook Pro provided for the duration of the internship.",
      "Free daily gourmet lunches and snacks in our SF design loft.",
      "Housing stipend assistance for out-of-state interns."
    ],
    aboutCompany: "PixelCrafters is an award-winning digital product studio behind some of the fastest-growing mobile apps in wellness, fintech, and education."
  },
  {
    id: "job-103",
    title: "Junior Data Analyst / BI Trainee",
    company: "MetricFlow Analytics",
    logoColor: "#059669",
    logoBg: "#d1fae5",
    logoText: "MF",
    location: "New York, NY (Hybrid)",
    isRemote: false,
    jobType: "Full-time",
    experience: "Junior (0-2 yrs)",
    category: "Data & AI",
    salary: "$68,000 - $82,000 / yr",
    salaryMin: 68000,
    postedAt: "5 hours ago",
    deadline: "18 days left",
    tags: ["SQL", "Python", "Tableau", "PowerBI", "Fresher Friendly"],
    featured: false,
    urgent: true,
    studentFriendly: true,
    description: "MetricFlow is expanding its Business Intelligence division! We're seeking an analytical Junior Data Analyst who loves translating raw datasets into compelling visualizations and business insights.",
    responsibilities: [
      "Write complex SQL queries to extract, transform, and aggregate data from relational warehouses.",
      "Design and maintain interactive dashboards in Tableau and PowerBI for executive teams.",
      "Partner with marketing and product leads to identify growth trends and conversion funnels.",
      "Perform exploratory data analysis using Python (Pandas, NumPy, Matplotlib).",
      "Automate recurring weekly and monthly performance reports."
    ],
    requirements: [
      "Bachelor's degree in Computer Science, Statistics, Mathematics, Economics, or equivalent experience.",
      "Strong proficiency in SQL (joins, subqueries, window functions).",
      "Experience with Python or R for data manipulation.",
      "Hands-on experience building dashboards in Tableau, PowerBI, or Looker.",
      "Clear verbal and written communication skills to articulate data findings."
    ],
    benefits: [
      "Hybrid flexibility (2 days office, 3 days remote).",
      "Health, dental, vision coverage with 100% employer-covered premium.",
      "401(k) with 5% immediate company match.",
      "Generous tuition reimbursement for continuing education.",
      "Subsidized commuter passes and transit benefits."
    ],
    aboutCompany: "MetricFlow empowers e-commerce and retail brands with automated revenue analytics and customer predictive modeling tools."
  },
  {
    id: "job-104",
    title: "Associate Product Manager (New Grad Program)",
    company: "NovaScale",
    logoColor: "#8b5cf6",
    logoBg: "#ede9fe",
    logoText: "NS",
    location: "Remote (North America)",
    isRemote: true,
    jobType: "Full-time",
    experience: "Fresher / Intern",
    category: "Product",
    salary: "$85,000 - $105,000 / yr",
    salaryMin: 85000,
    postedAt: "1 day ago",
    deadline: "25 days left",
    tags: ["Product Strategy", "Agile", "User Stories", "Roadmap", "Campus 2026"],
    featured: true,
    urgent: false,
    studentFriendly: true,
    description: "Kickstart your product leadership journey with NovaScale's prestigious 18-month rotational APM program. You will rotate across our core platform, developer ecosystem, and growth product squads.",
    responsibilities: [
      "Define user stories, product specs, and acceptance criteria in Jira.",
      "Run user discovery interviews and synthesize customer friction points.",
      "Partner with engineering leads and designers to deliver bi-weekly sprint deliverables.",
      "Track product OKRs, feature adoption, and user retention metrics.",
      "Present quarterly feature roadmaps to department executives."
    ],
    requirements: [
      "Recent graduate (2025/2026) or career transitioner with high product acumen.",
      "Demonstrated initiative through university leadership, hackathons, or startup side projects.",
      "Strong analytical mindset and ability to balance technical feasibility with user delight.",
      "Exceptional storytelling and cross-functional communication abilities."
    ],
    benefits: [
      "Executive mentorship with VP of Product and Senior Directors.",
      "Accelerated promotion track upon successful program completion.",
      "Unlimited paid time off (minimum 3 weeks encouraged).",
      "Stock option grants with annual refreshers.",
      "Full remote equipment setup package."
    ],
    aboutCompany: "NovaScale provides next-generation developer tooling and API orchestration for modern cloud applications, backed by top Silicon Valley VCs."
  },
  {
    id: "job-105",
    title: "Junior Backend Engineer (Node.js / PostgreSQL)",
    company: "FinVertex",
    logoColor: "#0284c7",
    logoBg: "#e0f2fe",
    logoText: "FV",
    location: "Austin, TX (Hybrid)",
    isRemote: false,
    jobType: "Full-time",
    experience: "Junior (0-2 yrs)",
    category: "Engineering",
    salary: "$75,000 - $95,000 / yr",
    salaryMin: 75000,
    postedAt: "1 day ago",
    deadline: "14 days left",
    tags: ["Node.js", "Express", "PostgreSQL", "Docker", "REST API"],
    featured: false,
    urgent: true,
    studentFriendly: false,
    description: "FinVertex is looking for a driven Junior Backend Engineer to help scale our payment processing engine. You will write robust microservices, optimize SQL queries, and implement secure fintech protocols.",
    responsibilities: [
      "Build and maintain high-throughput RESTful APIs using Node.js, TypeScript, and Express.",
      "Design database schemas, indexes, and migrations in PostgreSQL.",
      "Implement authentication and authorization protocols (OAuth2, JWT).",
      "Collaborate with DevOps engineers to containerize services using Docker.",
      "Investigate and resolve API performance bottlenecks."
    ],
    requirements: [
      "Experience with Node.js and asynchronous programming patterns.",
      "Fundamental understanding of relational databases and SQL query design.",
      "Basic understanding of CI/CD concepts and containerization with Docker.",
      "Appreciation for security best practices (OWASP Top 10).",
      "Computer Science degree or equivalent practical programming portfolio."
    ],
    benefits: [
      "Competitive base salary + equity compensation.",
      "Flexible hybrid work environment in downtown Austin.",
      "Catered lunches, artisanal coffee bar, and team hackathons.",
      "401(k) with company match and comprehensive wellness package."
    ],
    aboutCompany: "FinVertex is a leading financial infrastructure company powering real-time cross-border payments for global commerce."
  },
  {
    id: "job-106",
    title: "Social Media & Growth Marketing Intern",
    company: "VibeWave Media",
    logoColor: "#f59e0b",
    logoBg: "#fef3c7",
    logoText: "VW",
    location: "Remote (US & Canada)",
    isRemote: true,
    jobType: "Internship",
    experience: "Fresher / Intern",
    category: "Marketing",
    salary: "$22 - $30 / hr",
    salaryMin: 45000,
    postedAt: "2 days ago",
    deadline: "12 days left",
    tags: ["Content Creation", "TikTok", "SEO", "Copywriting", "Student Friendly"],
    featured: false,
    urgent: false,
    studentFriendly: true,
    description: "Passionate about viral storytelling, social trends, and brand building? VibeWave Media is looking for an energetic Growth Marketing Intern to support our multichannel creator campaigns.",
    responsibilities: [
      "Create engaging short-form video scripts and content for TikTok, Instagram Reels, and YouTube Shorts.",
      "Monitor social media analytics and prepare weekly engagement reports.",
      "Draft SEO-optimized blog posts and newsletter copy.",
      "Assist in influencer outreach, contract tracking, and partnership coordination.",
      "Participate in creative brainstorms for seasonal launch campaigns."
    ],
    requirements: [
      "Current student in Marketing, Communications, Journalism, or enthusiastic self-starter.",
      "Active knowledge of current social trends, memes, and viral video formats.",
      "Basic design/editing skills in Canva, CapCut, or Adobe Premiere.",
      "Strong writing voice and impeccable grammar."
    ],
    benefits: [
      "Flexible part-time hours tailored around university class schedules.",
      "Creative freedom to pilot new content formats.",
      "Letter of recommendation and portfolio case studies.",
      "Fun, supportive, remote-first team culture."
    ],
    aboutCompany: "VibeWave Media helps DTC lifestyle brands scale through authentic creator partnerships and viral narrative marketing."
  },
  {
    id: "job-107",
    title: "AI & Machine Learning Research Intern",
    company: "NeuroSynthetica",
    logoColor: "#10b981",
    logoBg: "#d1fae5",
    logoText: "NS",
    location: "Boston, MA (On-site)",
    isRemote: false,
    jobType: "Internship",
    experience: "Fresher / Intern",
    category: "Data & AI",
    salary: "$45 - $55 / hr",
    salaryMin: 80000,
    postedAt: "2 days ago",
    deadline: "22 days left",
    tags: ["PyTorch", "NLP", "LLMs", "Python", "Research"],
    featured: true,
    urgent: false,
    studentFriendly: true,
    description: "Join NeuroSynthetica's Applied AI lab to research and fine-tune next-generation multimodal foundation models. Perfect for university students interested in cutting-edge neural architectures.",
    responsibilities: [
      "Assist in training, fine-tuning, and evaluating open-source LLMs using PyTorch and HuggingFace.",
      "Curate, clean, and deduplicate large-scale synthetic datasets.",
      "Benchmark model latency and accuracy across diverse evaluation suites (MMLU, GSM8K).",
      "Co-author research technical reports and internal documentation."
    ],
    requirements: [
      "Enrolled in a BS, MS, or PhD in Computer Science, AI, Robotics, or related STEM discipline.",
      "Strong Python programming skills and familiarity with PyTorch or JAX.",
      "Solid mathematical foundation in linear algebra, probability, and calculus.",
      "Knowledge of transformer architectures and attention mechanisms."
    ],
    benefits: [
      "Direct guidance from PhD research scientists and former Big Tech researchers.",
      "Access to extensive high-end GPU compute clusters (H100/A100).",
      "Potential co-authorship on peer-reviewed academic papers.",
      "Housing allowance and travel stipend for Boston relocation."
    ],
    aboutCompany: "NeuroSynthetica is an AI research institute building specialized reasoning models for biomedical science and material discovery."
  },
  {
    id: "job-108",
    title: "Junior Mobile App Developer (Flutter / Dart)",
    company: "SwiftPulse Mobile",
    logoColor: "#3b82f6",
    logoBg: "#dbeafe",
    logoText: "SP",
    location: "Remote (Worldwide)",
    isRemote: true,
    jobType: "Full-time",
    experience: "Junior (0-2 yrs)",
    category: "Engineering",
    salary: "$65,000 - $85,000 / yr",
    salaryMin: 65000,
    postedAt: "3 days ago",
    deadline: "20 days left",
    tags: ["Flutter", "Dart", "iOS", "Android", "Mobile"],
    featured: false,
    urgent: false,
    studentFriendly: true,
    description: "SwiftPulse Mobile builds beloved productivity and fitness apps. We are looking for an ambitious Junior Flutter Developer to help build cross-platform mobile experiences for both iOS and Android.",
    responsibilities: [
      "Build fluid 60fps animations and custom widgets in Flutter.",
      "Implement state management using Bloc or Riverpod.",
      "Integrate native device features (Camera, Push Notifications, Local Storage).",
      "Ensure cross-platform compatibility across various screen sizes and resolutions."
    ],
    requirements: [
      "Demonstrable Flutter/Dart portfolio projects or personal apps on GitHub/Stores.",
      "Understanding of REST APIs and JSON serialization.",
      "Familiarity with Git branching and pull request reviews.",
      "Passion for sleek mobile UX and micro-interactions."
    ],
    benefits: [
      "Work from anywhere in the world.",
      "Flexible schedule with asynchronous core hours.",
      "Stipend for gym membership and fitness gear.",
      "Annual company retreat to exciting international destinations."
    ],
    aboutCompany: "SwiftPulse Mobile creates intuitive mobile software that helps over 3 million daily active users maintain healthy daily habits."
  },
  {
    id: "job-109",
    title: "Quality Assurance & Test Automation Trainee",
    company: "VeriCore Systems",
    logoColor: "#d97706",
    logoBg: "#fef3c7",
    logoText: "VC",
    location: "Chicago, IL (Hybrid)",
    isRemote: false,
    jobType: "Full-time",
    experience: "Fresher / Intern",
    category: "Engineering",
    salary: "$60,000 - $72,000 / yr",
    salaryMin: 60000,
    postedAt: "3 days ago",
    deadline: "16 days left",
    tags: ["Cypress", "Selenium", "JavaScript", "QA", "Fresher Friendly"],
    featured: false,
    urgent: true,
    studentFriendly: true,
    description: "Launch your career in software testing and quality engineering! VeriCore is hiring an eager QA Trainee to write automated end-to-end test suites and maintain product reliability.",
    responsibilities: [
      "Write automated UI test scripts using Cypress and Playwright.",
      "Conduct manual exploratory testing for newly released features.",
      "Document clear bug reproduction steps and severity reports in Jira.",
      "Integrate test runs into GitHub Actions CI pipelines."
    ],
    requirements: [
      "Basic understanding of HTML, CSS, JavaScript, and web architecture.",
      "Meticulous eye for detail and identifying edge-case bugs.",
      "Excitement to learn modern test automation frameworks.",
      "Degree in IT/CS or certified QA bootcamp graduate."
    ],
    benefits: [
      "Comprehensive paid on-the-job training program.",
      "Mentorship from Senior QA Automation Leads.",
      "Full medical, dental, and life insurance.",
      "Hybrid work schedule with casual office dress code."
    ],
    aboutCompany: "VeriCore Systems builds mission-critical testing and compliance infrastructure for healthcare and government systems."
  },
  {
    id: "job-110",
    title: "Junior Cloud & DevOps Specialist",
    company: "AetherOps Cloud",
    logoColor: "#6366f1",
    logoBg: "#e0e7ff",
    logoText: "AO",
    location: "Seattle, WA (Hybrid)",
    isRemote: false,
    jobType: "Full-time",
    experience: "Junior (0-2 yrs)",
    category: "Engineering",
    salary: "$80,000 - $98,000 / yr",
    salaryMin: 80000,
    postedAt: "4 days ago",
    deadline: "10 days left",
    tags: ["AWS", "Docker", "Kubernetes", "Linux", "Terraform"],
    featured: true,
    urgent: false,
    studentFriendly: false,
    description: "AetherOps Cloud is seeking a talented Junior Cloud & DevOps Engineer to help manage cloud infrastructure, build CI/CD deployment pipelines, and optimize AWS resources.",
    responsibilities: [
      "Manage AWS cloud environments (EC2, S3, RDS, ECS, Lambda).",
      "Build automated CI/CD workflows using GitHub Actions and ArgoCD.",
      "Monitor system health, alerts, and logs with Datadog and Grafana.",
      "Provision infrastructure-as-code using Terraform."
    ],
    requirements: [
      "Strong command of Linux command line, bash scripting, and networking fundamentals.",
      "Familiarity with AWS services and basic Docker concepts.",
      "AWS Certified Cloud Practitioner or Solutions Architect Associate is a plus.",
      "Good debugging and analytical problem-solving skills."
    ],
    benefits: [
      "AWS certification exam reimbursement and bonus vouchers.",
      "Generous 401(k) matching and bonus structure.",
      "Modern office in downtown Seattle with rooftop terrace.",
      "Annual tech gadget allowance."
    ],
    aboutCompany: "AetherOps delivers automated cloud migrations, multi-cloud monitoring, and cost-reduction tooling for Fortune 500 enterprises."
  },
  {
    id: "job-111",
    title: "Junior Content & Copywriter",
    company: "WordSpire Creative",
    logoColor: "#14b8a6",
    logoBg: "#ccfbf1",
    logoText: "WS",
    location: "Remote (Worldwide)",
    isRemote: true,
    jobType: "Part-time",
    experience: "Fresher / Intern",
    category: "Marketing",
    salary: "$25 - $35 / hr",
    salaryMin: 50000,
    postedAt: "4 days ago",
    deadline: "19 days left",
    tags: ["Copywriting", "SEO", "Content Marketing", "Blogging", "Remote"],
    featured: false,
    urgent: false,
    studentFriendly: true,
    description: "Love writing words that inspire and convert? WordSpire Creative is looking for a versatile Junior Copywriter to craft blog articles, email sequences, and website landing page copy.",
    responsibilities: [
      "Write high-quality SEO-optimized articles across tech, lifestyle, and business niches.",
      "Craft compelling headlines and persuasive email campaign copy.",
      "Conduct keyword research using Ahrefs and SEMrush.",
      "Proofread and polish deliverables for brand voice consistency."
    ],
    requirements: [
      "Excellent written English with flawless grammar and vocabulary.",
      "Portfolio of writing samples (articles, essays, newsletters, or case studies).",
      "Ability to meet deadlines with minimal supervision.",
      "Passionate about storytelling and clear communication."
    ],
    benefits: [
      "Completely flexible hours - set your own work schedule.",
      "Monthly book and reading stipend ($50/mo).",
      "Opportunity to transition to full-time.",
      "Supportive feedback and editorial coaching."
    ],
    aboutCompany: "WordSpire Creative is a digital agency partnering with B2B SaaS and consumer tech brands to amplify their voice."
  },
  {
    id: "job-112",
    title: "Junior Cyber Security Analyst",
    company: "AegisGuard Security",
    logoColor: "#ef4444",
    logoBg: "#fee2e2",
    logoText: "AG",
    location: "Washington, DC (Hybrid)",
    isRemote: false,
    jobType: "Full-time",
    experience: "Junior (0-2 yrs)",
    category: "Engineering",
    salary: "$78,000 - $92,000 / yr",
    salaryMin: 78000,
    postedAt: "5 days ago",
    deadline: "21 days left",
    tags: ["Cybersecurity", "SIEM", "Network Security", "SOC", "CompTIA"],
    featured: true,
    urgent: true,
    studentFriendly: true,
    description: "Protect critical digital systems against emerging cyber threats. AegisGuard is seeking a motivated Junior Cyber Security Analyst to join our 24/7 Security Operations Center (SOC).",
    responsibilities: [
      "Monitor SIEM alerts and triage suspicious security events.",
      "Perform vulnerability scans and assist in patch management.",
      "Conduct initial incident response and write forensic summaries.",
      "Assist in educating internal staff on phishing awareness."
    ],
    requirements: [
      "Degree in Cybersecurity, Information Systems, or relevant certifications (Security+, CEH, CYSA+).",
      "Understanding of TCP/IP networking, firewalls, and operating systems.",
      "Familiarity with Wireshark, Splunk, or similar security tools.",
      "High integrity and strong commitment to confidentiality."
    ],
    benefits: [
      "Top-tier security clearance sponsorship assistance.",
      "Certification voucher program (paid exams and study materials).",
      "Full coverage health benefits and 401(k) retirement plan.",
      "Shift differential pay bonus."
    ],
    aboutCompany: "AegisGuard Security provides proactive managed detection and threat intelligence to critical infrastructure and financial organizations."
  }
];

// Available filter categories
const CATEGORIES = [
  { id: "all", name: "All Categories", icon: "briefcase" },
  { id: "Engineering", name: "Engineering & Tech", icon: "code" },
  { id: "Design", name: "Design & Creative", icon: "palette" },
  { id: "Data & AI", name: "Data Science & AI", icon: "brain" },
  { id: "Product", name: "Product Management", icon: "layers" },
  { id: "Marketing", name: "Marketing & Growth", icon: "trending-up" }
];

// Experience Levels
const EXPERIENCE_LEVELS = [
  "Fresher / Intern",
  "Junior (0-2 yrs)",
  "Mid-Level (2-5 yrs)",
  "Senior (5+ yrs)"
];

// Job Types
const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Internship",
  "Contract"
];
