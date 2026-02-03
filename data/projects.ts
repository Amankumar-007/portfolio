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
}

export const getAllProjects = (): Project[] => [
  {
    id: "project-5",
    title: "AI Tools Platform",
    description: "Explore an innovative AI platform featuring a suite of intelligent tools designed to automate tasks, enhance productivity, and drive smarter decision-making.",
    category: "AI Tools",
    video: "/ai-tools/ai-tools.mp4",
    screenshots: [
      { url: "/ai-tools/ai-tools.png", alt: "AI Tools Platform" }
    ],
    year: "2025",
    tags: ["AI", "Automation", "Productivity"]
  },
  {
    id: "project-3",
    title: "Learning Management System (LMS)",
    description: "A comprehensive LMS that supports interactive learning, role-based access, detailed assessments, and certifications to empower educators and learners.",
    category: "Full Stack",
    video: "/lms/lms.mp4",
    screenshots: [
      { url: "/lms/Screenshot 2025-05-27 131624.png", alt: "LMS Dashboard" }
    ],
    year: "2023",
    tags: ["Education", "React", "Node.js"]
  },
  {
    id: "project-2",
    title: "Real Estate Platform",
    description: "A feature-rich real estate platform offering seamless property browsing, advanced search filters, and secure transactions for buyers and sellers.",
    category: "Web Development",
    video: "/real-estate/real-estate.mp4",
    screenshots: [
      { url: "/ss-3.png", alt: "Real Estate Platform" }
    ],
    year: "2023",
    tags: ["Real Estate", "React", "MongoDB"]
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
