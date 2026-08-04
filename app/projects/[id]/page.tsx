import { ProjectClient } from "./ProjectClient";
import { Suspense } from "react";
import Loading from "./loading";
import type { Metadata } from "next";

// Sample project data (in a real app, you'd fetch this from an API or database)
const projects = [
  {
    id: "project-1",
    title: "E-commerce Website Redesign",
    description: "Complete redesign of an e-commerce platform focused on improving user experience and conversion rates.",
    category: "UI/UX Design",
    image: "/e-commerce/Screenshot 2025-05-28 125131.png",
    demoUrl: "https://ecommerce-demo.amanr.dev",
    githubUrl: "https://github.com/Amankumar-007/e-commerce-app",
    year: "2023",
    client: "Fashion Retailer Inc.",
    role: "Lead Designer",
    challenge: "The client's existing e-commerce platform was outdated, had poor usability, and was not optimized for mobile devices, resulting in high bounce rates and abandoned carts.",
    solution: "I conducted extensive user research to identify pain points and opportunities. The redesign focused on creating a responsive, intuitive interface with streamlined navigation and checkout process. I also implemented personalized product recommendations and simplified product filtering.",
    results: "The redesign resulted in a 40% increase in mobile conversions, 25% reduction in cart abandonment, and 30% increase in average time spent on the site.",
    gallery: [
      "/e-commerce/Screenshot 2025-05-28 125131.png",
      "/e-commerce/Screenshot 2025-05-28 125139.png",
      "/e-commerce/Screenshot 2025-05-28 125147.png",
      "/e-commerce/Screenshot 2025-05-28 125155.png",
      "/e-commerce/Screenshot 2025-05-28 125205.png",
      "/e-commerce/Screenshot 2025-05-28 125217.png",
      "/e-commerce/Screenshot 2025-05-28 125227.png",
      "/e-commerce/Screenshot 2025-05-28 125247.png"
    ]
  },
  {
    id: "project-2",
    title: "Real estate Mobile App",
    description: "Built a full-featured real estate web application with advanced role-based access control and interactive user interfaces.",
    category: "Full Stack Web App",
    image: "/real-estate/Screenshot 2025-05-28 120529.png",
    demoUrl: "https://realestate-app.amanr.dev",
    githubUrl: "https://github.com/Amankumar-007/real-estate-app",
    year: "2025",
    client: "Capstone Project",
    role: "Full Stack Developer",
    challenge: "The challenge was to build a scalable and interactive real estate platform that supports three types of users — Admin, Owner, and User — with specific permissions and functionalities while ensuring performance, security, and ease of use.",
    solution: "Developed a Full Stack web application with role-based dashboards. Users can like, save, and message owners; owners can post and manage property listings; admins can block/delete users and listings from the frontend. Integrated MongoDB for dynamic data, used Redux for state management, and ensured responsive design using Tailwind CSS.",
    results: "Successfully deployed the app with real-time interactivity, smooth navigation, and clear separation of roles. The project demonstrated practical knowledge of full stack development, including authentication, CRUD operations, and frontend/backend integration, and received positive feedback from mentors and peers.",

    gallery: [
      "/real-estate/Screenshot 2025-05-28 120529.png",
      "/real-estate/Screenshot 2025-05-28 120553.png",
      "/real-estate/Screenshot 2025-05-28 120608.png",
      "/real-estate/Screenshot 2025-05-28 120626.png",
      "/real-estate/Screenshot 2025-05-28 120654.png",
      "/real-estate/Screenshot 2025-05-28 120734.png",
      "/real-estate/Screenshot 2025-05-28 120746.png"
    ]
  },
  {
    id: "project-3",
    title: "Leaarning Management System (LMS)",
    description: "Complete brand identity and platform development for a role-based Learning Management System (LMS), including admin dashboard, course creation tools, student interface, and examiner functionality.",
    category: "Web Application / EdTech",
    image: "/lms/Screenshot 2025-05-27 131624.png",
    demoUrl: "https://lms.amanr.dev",
    githubUrl: "https://github.com/Amankumar-007/Mern-LMS",
    year: "2025",
    client: "Ninepages Techsolutions Pvt. Ltd.",
    role: "Full-Stack Developer & Product Designer",
    challenge: "The goal was to build a comprehensive LMS that supports multiple user roles—Admin, Trainer, Student, and Examiner—each with tailored access, while maintaining security, usability, and scalability.",
    solution: "I designed and developed a full-stack LMS platform with React for the frontend and Node.js/Express with MongoDB on the backend. The system features role-based dashboards, course creation and management, video lectures, downloadable materials, exams, performance tracking, certification, and secure login with authentication context.",
    results: "The LMS is now fully functional and scalable, supporting role-based operations, exam systems, and content delivery. It has been praised for its clean UI/UX, smooth role-switching, and clear navigation. It’s positioned for deployment in educational institutions and freelance training programs.",
    gallery: [

      "/lms/front-poster.png",
      "/lms/Screenshot 2025-05-27 131655.png",
      "/lms/Screenshot 2025-05-27 131711.png",
      "/lms/Screenshot 2025-05-27 131723.png",
      "/lms/Screenshot 2025-05-27 131742.png",
      "/lms/Screenshot 2025-05-27 131756.png",
      "/lms/Screenshot 2025-05-27 131808.png",
      "/lms/Screenshot 2025-05-27 131820.png"
    ]
  },
  {
    id: "project-4",
    title: "Employee Management System",
    description: "Developed a comprehensive employee management system with role-based access, CRUD operations, and a responsive design for efficient HR management.",
    category: "Web Application",
    image: "/emp/Screenshot 2025-05-29 122724.png",
    demoUrl: "https://uber-clone.amanr.dev",
    githubUrl: "https://github.com/Amankumar-007/Staff-Manager",
    year: "2024",
    client: "Personal Project",
    role: "Full Stack Developer",
    challenge: "Creating a scalable ride-hailing platform that handles real-time location tracking, efficient ride matching, and secure payment processing while ensuring a seamless user experience for both riders and drivers.",
    solution: "Implemented a modern tech stack with Next.js for the frontend, Node.js backend, and MongoDB for data storage. Integrated Google Maps API for real-time tracking, WebSocket for live updates, and Stripe for payments. Built separate interfaces for riders and drivers with real-time communication.",
    results: "Successfully deployed a fully functional Uber clone with features like real-time tracking, automated ride matching, and secure payments. The platform demonstrates excellent performance metrics with low latency in real-time updates.",
    gallery: [
      "/emp/Screenshot 2025-05-29 122724.png",
      "/emp/Screenshot 2025-05-29 122734.png",
      "/emp/Screenshot 2025-05-29 122743.png",
      "/emp/Screenshot 2025-05-29 122756.png",
      "/emp/Screenshot 2025-05-29 122804.png",
      "/emp/Screenshot 2025-05-29 122811.png"
    ]
  },
  {
    id: "project-5",
    title: "AI Tools Platform",
    description: "A suite of AI-powered tools for text, image, and workflow automation. Includes chat assistants, content generation, summarization, and image enhancement with fine-tuned models.",
    category: "AI Tools",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
    demoUrl: "https://ai-tools-web-app-topaz.vercel.app/",
    githubUrl: "#",
    year: "2025",
    client: "Personal Project",
    role: "Full Stack Developer",
    challenge: "Build a unified interface for multiple AI capabilities with reliable prompts, guardrails, and cost-optimized inference while keeping UX simple.",
    solution: "Implemented modular tool architecture with rate-limiting, retry logic, and prompt templates. Added history, export, and share features. Optimized inference through batching and caching.",
    results: "Reduced average response latency by 32% and cut inference costs ~18% with caching. Early users reported 2x faster content creation.",
    gallery: [
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
      "https://images.pexels.com/photos/8438925/pexels-photo-8438925.jpeg",
      "https://images.pexels.com/photos/5473956/pexels-photo-5473956.jpeg"
    ]
  },
  {
    id: "project-6",
    title: "Lenis Restaurant App",
    description: "Modern restaurant web app featuring Lenis smooth scrolling, digital menu, online ordering, and table reservations with a delightful micro-interaction rich UI.",
    category: "Restaurant",
    image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
    demoUrl: "#",
    githubUrl: "#",
    year: "2025",
    client: "Restaurant Pilot",
    role: "Front-end Developer",
    challenge: "Deliver a high-performance, mobile-first restaurant experience with buttery-smooth scrolling, quick navigation, and a frictionless checkout.",
    solution: "Integrated Lenis for silky scroll behavior, route-based transitions, and skeleton loading. Implemented cart, ordering, and reservation flows with validation and status updates.",
    results: "Time-on-page increased 24% with a 17% improvement in checkout completion during pilot tests.",
    gallery: [
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
      "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
      "https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg"
    ]
  }
  ,
  {
    id: "project-7",
    title: "Lenis Restaurant Reservation System",
    description: "A focused reservation platform for restaurants using Lenis for fluid scrolling, real-time slot availability, waitlist management, and SMS/email reminders.",
    category: "Restaurant",
    image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
    demoUrl: "#",
    githubUrl: "#",
    year: "2025",
    client: "Hospitality Labs",
    role: "Full Stack Developer",
    challenge: "Streamline booking management while preventing overbooking and ensuring accessibility across devices.",
    solution: "Built reservation flows with time-slot rules, capacity limits, and blackout dates. Added admin dashboard for table management and integrations for notifications.",
    results: "Cut no-show rates by 12% via reminders and improved table utilization in simulated trials.",
    gallery: [
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
      "https://images.pexels.com/photos/887827/pexels-photo-887827.jpeg",
      "https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg"
    ]
  }
  ,
  {
    id: "project-8",
    title: "Type Riser – Typing Practice App",
    description: "Practice typing with engaging drills, real-time WPM/accuracy metrics, and progression tracks. Includes custom texts, daily streaks, leaderboards, and dark mode.",
    category: "Productivity / EdTech",
    image: "https://images.pexels.com/photos/574073/pexels-photo-574073.jpeg",
    demoUrl: "https://typing-riser.vercel.app/",
    githubUrl: "#",
    year: "2025",
    client: "Personal Project",
    role: "Full Stack Developer",
    challenge: "Build a highly responsive typing experience with precise timing, error detection, and analytics that works smoothly across devices.",
    solution: "Implemented precise keystroke tracking with debounce-free input, per-character accuracy, adjustable difficulty, and lesson packs. Added charts for WPM/accuracy trends and profiles with streaks.",
    results: "Beta testers improved average WPM by 18% over two weeks and reported higher consistency due to focused drills and instant feedback.",
    gallery: [
      "https://images.pexels.com/photos/574073/pexels-photo-574073.jpeg",
      "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg",
      "https://images.pexels.com/photos/4458554/pexels-photo-4458554.jpeg"
    ]
  }
];

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    return {
      title: "Project Not Found | Aman Kumar",
      description: "The requested project could not be found.",
    };
  }

  const isExternalImage = project.image.startsWith("http");
  const ogImage = isExternalImage ? project.image : `https://amankumarr.in${project.image}`;

  return {
    title: `${project.title} | Aman Kumar`,
    description: `${project.description} Category: ${project.category}. Built by Aman Kumar, Full Stack Developer.`,
    alternates: {
      canonical: `https://amankumarr.in/projects/${project.id}`,
    },
    openGraph: {
      title: `${project.title} — Aman Kumar`,
      description: project.description,
      url: `https://amankumarr.in/projects/${project.id}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${project.title} — Project by Aman Kumar`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Aman Kumar`,
      description: project.description,
      images: [ogImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  // Find the project server-side
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    return <div className="container py-20 px-4">Project not found</div>;
  }

  return (
    <Suspense fallback={<Loading />}>
      <ProjectClient project={project} />
    </Suspense>
  );
}