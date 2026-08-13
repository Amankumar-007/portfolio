export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  video?: string;
  screenshots: Array<{
    url: string;
    alt?: string;
  }>;
  year: string;
  tags?: string[];
  link?: string;
  featured?: boolean;
}

export const getAllProjects = (): Project[] => [
  {
    id: "project-9",
    title: "SnippetsX",
    description: "Real-time collaboration platform with a custom Operational Transformation engine for live cursors and sub-10ms sync. Built a real-time multiplayer code editor with in-browser execution for 40+ languages inside isolated Docker containers, streaming output live to collaborators. Shipped team workspaces with RBAC, private and expiring links, burn-on-view snippets, an embeddable widget and a REST API.",
    category: "SaaS",
    screenshots: [
      { url: "/projects/snippetsx-cover.png", alt: "SnippetsX — real-time collaborative code editor" }
    ],
    year: "2025",
    tags: ["Real-time Collaboration", "Code Execution", "WebSockets", "Docker", "Redis", "PostgreSQL"],
    link: "https://snippetsx.com",
    featured: true
  },
  {
    id: "project-10",
    title: "Awasdhara",
    description: "A real estate platform for residential plots and land investments, with verified property listings, location/budget filters, EMI plan display, and lead-generation inquiry flows for buyers and investors.",
    category: "Real Estate",
    screenshots: [
      { url: "/logos/awasdhara-logo.png", alt: "Awasdhara — real estate & land investment platform" }
    ],
    year: "2025",
    tags: ["Real Estate", "Next.js", "Lead Generation", "MongoDB"],
    link: "https://awasdhara.in",
    featured: true
  },
  {
    id: "project-11",
    title: "TwoFloww",
    description: "A software development and digital agency platform offering website & app development, UI/UX design, AI-powered solutions, and SEO-first builds for startups and businesses across India.",
    category: "Web Development",
    screenshots: [
      { url: "/projects/twofloww-cover.png", alt: "TwoFloww — software development & digital agency" }
    ],
    year: "2025",
    tags: ["Next.js", "React", "Flutter", "SEO"],
    link: "https://www.twofloww.in",
    featured: true
  },
  {
    id: "project-5",
    title: "TomatoAI",
    description: "AI tools directory and multi-agent assistant with parallel workspaces, streaming responses, guest sessions and chat history migration. Developed an SEO-optimised AI tools directory with category, trending and review pages, server-rendered in Next.js. Shipped in-product AI tooling — resume analyser, prompt optimiser, content generator, summariser and n8n workflow templates. LLM-powered intelligent automation for productivity.",
    category: "AI Tools",
    video: "/ai-tools/ai-tools.mp4",
    screenshots: [
      { url: "/ai-tools/ai-tools.png", alt: "TomatoAI — AI tools platform" }
    ],
    year: "2025",
    tags: ["AI", "LLM APIs", "Automation", "Next.js", "TypeScript", "Node.js"],
    link: "https://tomatoai.in",
    featured: true
  },
  {
    id: "project-3",
    title: "Learning Management System (LMS)",
    description: "Four-role EdTech platform (Admin, Instructor, Student, Examiner) with JWT-protected routes, role-based access control (RBAC) and Stripe course payments. Comprehensive learning management system with interactive courses, detailed assessments, certifications, and student progress tracking for seamless educational experiences.",
    category: "Full Stack",
    video: "/lms/lms.mp4",
    screenshots: [
      { url: "/lms/Screenshot 2025-05-27 131624.png", alt: "LMS Dashboard" }
    ],
    year: "2025",
    tags: ["Education", "React", "Node.js", "MongoDB", "JWT", "Stripe"]
  },
  {
    id: "project-2",
    title: "Real Estate Marketplace",
    description: "Property portal with separate admin, seller and buyer dashboards and multi-parameter search on indexed MongoDB queries. Built a comprehensive real estate marketplace with advanced filtering by location, price, property type, and amenities. Implemented efficient database queries and real-time property listings for seamless browsing experience.",
    category: "Web Development",
    video: "/real-estate/real-estate.mp4",
    screenshots: [
      { url: "/ss-3.png", alt: "Real Estate Platform" }
    ],
    year: "2025",
    tags: ["Real Estate", "React", "Node.js", "MongoDB", "Express"]
  },
  {
    id: "project-6",
    title: "Lenis Restaurant App",
    description: "A sleek restaurant application with Lenis smooth scrolling, online ordering, and reservation management for an enhanced dining experience.",
    category: "Restaurant",
    video: "/restro-1/restro-1.mp4",
    screenshots: [
      { url: "/restro-1/restro-1.png", alt: "Restaurant App" }
    ],
    year: "2025",
    tags: ["Restaurant", "Lenis", "React"]
  },
  {
    id: "project-1",
    title: "E-commerce Website",
    description: "A robust e-commerce platform featuring product catalogs, secure user authentication, and integrated payment gateways for smooth transactions.",
    category: "Web Development",
    video: "/ecommerce/ecommerce.mp4",
    screenshots: [
      { url: "/ss-1.png", alt: "E-commerce Platform" }
    ],
    year: "2023",
    tags: ["E-commerce", "Payment", "React"]
  },
  {
    id: "project-4",
    title: "Employee Management System",
    description: "An Uber-like ride-sharing app with real-time tracking, booking capabilities, and seamless payment integration.",
    category: "Mobile App",
    video: "/employee/employee.mp4",
    screenshots: [
      { url: "/emp/Screenshot 2025-05-29 122724.png", alt: "Employee Management" }
    ],
    year: "2022",
    tags: ["Mobile", "Management", "React Native"]
  },
  {
    id: "project-7",
    title: "Lenis Restaurant Reservation System",
    description: "A user-friendly reservation system for restaurants, leveraging Lenis for smooth UI transitions and efficient booking management.",
    category: "Restaurant",
    video: "/restro-2/restro-2.mp4",
    screenshots: [
      { url: "/restro-2/restro-2.png", alt: "Restaurant Reservation" }
    ],
    year: "2025",
    tags: ["Restaurant", "Reservations", "Lenis"]
  },
  {
    id: "project-8",
    title: "Type-riser",
    description: "Multi-tenant platform with subscription billing and analytics.",
    category: "SaaS",
    video: "/type-riser/type-riser.mp4",
    screenshots: [
      { url: "/type-riser/type-riser.png", alt: "Type-riser Platform" }
    ],
    year: "2025",
    tags: ["SaaS", "Multi-tenant", "Analytics"]
  }
];
