import { ProjectClient } from "./ProjectClient";
import { Suspense } from "react";
import Loading from "./loading";

// Sample project data (in a real app, you'd fetch this from an API or database)
const projects = [
  {
    id: "project-1",
    title: "E-commerce Website Redesign",
    description: "Complete redesign of an e-commerce platform focused on improving user experience and conversion rates.",
    category: "UI/UX Design",
    image: "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg",
    demoUrl: "https://ecommerce-demo.amanr.dev",
    githubUrl: "https://github.com/amanr/ecommerce-redesign",
    year: "2023",
    client: "Fashion Retailer Inc.",
    role: "Lead Designer",
    challenge: "The client's existing e-commerce platform was outdated, had poor usability, and was not optimized for mobile devices, resulting in high bounce rates and abandoned carts.",
    solution: "I conducted extensive user research to identify pain points and opportunities. The redesign focused on creating a responsive, intuitive interface with streamlined navigation and checkout process. I also implemented personalized product recommendations and simplified product filtering.",
    results: "The redesign resulted in a 40% increase in mobile conversions, 25% reduction in cart abandonment, and 30% increase in average time spent on the site.",
    gallery: [
      "https://images.pexels.com/photos/5076515/pexels-photo-5076515.jpeg",
      "https://images.pexels.com/photos/5076521/pexels-photo-5076521.jpeg",
      "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg"
    ]
  },
  {
    id: "project-2",
    title: "Real estate Mobile App",
    description: "Built a full-featured real estate web application with advanced role-based access control and interactive user interfaces.",
category: "Full Stack Web App",
image: "/real-estate/Screenshot 2025-05-28 120529.png",
demoUrl: "https://realestate-app.amanr.dev",
githubUrl: "https://github.com/amanr/realestate-mobile-app",
year: "2025",
client: "Capstone Project",
role: "Full Stack Developer",
challenge: "The challenge was to build a scalable and interactive real estate platform that supports three types of users — Admin, Owner, and User — with specific permissions and functionalities while ensuring performance, security, and ease of use.",
solution: "Developed a MERN stack web application with role-based dashboards. Users can like, save, and message owners; owners can post and manage property listings; admins can block/delete users and listings from the frontend. Integrated MongoDB for dynamic data, used Redux for state management, and ensured responsive design using Tailwind CSS.",
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
  {    id: "project-3",
    title: "Leaarning Management System (LMS)",
    description: "Complete brand identity and platform development for a role-based Learning Management System (LMS), including admin dashboard, course creation tools, student interface, and examiner functionality.",
    category: "Web Application / EdTech",
    image: "/lms/Screenshot 2025-05-27 131624.png",
    demoUrl: "https://lms.amanr.dev",
    githubUrl: "https://github.com/amanr/role-based-lms",
year: "2025",
client: "Ninepages Techsolutions Pvt. Ltd.",
role: "Full-Stack Developer & Product Designer",
challenge: "The goal was to build a comprehensive LMS that supports multiple user roles—Admin, Trainer, Student, and Examiner—each with tailored access, while maintaining security, usability, and scalability.",
solution: "I designed and developed a full-stack LMS platform with React for the frontend and Node.js/Express with MongoDB on the backend. The system features role-based dashboards, course creation and management, video lectures, downloadable materials, exams, performance tracking, certification, and secure login with authentication context.",
results: "The LMS is now fully functional and scalable, supporting role-based operations, exam systems, and content delivery. It has been praised for its clean UI/UX, smooth role-switching, and clear navigation. It’s positioned for deployment in educational institutions and freelance training programs.",
    gallery: [
      
      "/lms/Screenshot 2025-05-27 131643.png",
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
    title: "Corporate Website",
    description: "Designed and developed a responsive website for a corporate client with focus on clarity and brand messaging.",
    category: "Web Development",
    image: "https://images.pexels.com/photos/5076531/pexels-photo-5076531.jpeg",
    demoUrl: "https://corporate.amanr.dev",
    githubUrl: "https://github.com/amanr/corporate-website",
    year: "2022",
    client: "Global Consulting Group",
    role: "Web Designer & Developer",
    challenge: "The client needed a website redesign that would better represent their global presence, streamline information for potential clients, and highlight their expertise across industries.",
    solution: "I designed and developed a fully responsive website with a clean, professional aesthetic. The site features an intuitive navigation structure, case study highlights, team profiles, and integrated contact forms. Custom animations and microinteractions enhance the user experience without compromising performance.",
    results: "The new website led to a 45% increase in contact form submissions, 30% increase in average session duration, and significant improvement in SEO rankings for key industry terms.",
    gallery: [
      "https://images.pexels.com/photos/5076531/pexels-photo-5076531.jpeg",
      "https://images.pexels.com/photos/3182743/pexels-photo-3182743.jpeg",
      "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg"
    ]
  },
  {
    id: "project-5",
    title: "Travel App UI Design",
    description: "Created a UI design for a travel planning application with focus on intuitive navigation and visual appeal.",
    category: "Mobile App",
    image: "https://images.pexels.com/photos/6956503/pexels-photo-6956503.jpeg",
    demoUrl: "https://travel-app.amanr.dev",
    githubUrl: "https://github.com/amanr/travel-app-ui",
    year: "2021",
    client: "TravelEase",
    role: "UI Designer",
    challenge: "The client wanted to create a travel planning app that would stand out in a crowded market by offering a more visual and intuitive experience for users planning trips.",
    solution: "I designed a visually rich interface that emphasizes destination imagery while maintaining usability. The app features custom illustrations, thoughtful microinteractions, and a streamlined booking flow. Special attention was paid to information architecture to simplify complex travel planning.",
    results: "The app received recognition at several design awards and achieved a conversion rate 28% higher than the industry average for travel booking apps.",
    gallery: [
      "https://images.pexels.com/photos/6956503/pexels-photo-6956503.jpeg",
      "https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg",
      "https://images.pexels.com/photos/4353813/pexels-photo-4353813.jpeg"
    ]
  },
  {
    id: "project-6",
    title: "Health & Fitness Platform",
    description: "Web platform for tracking fitness goals, nutrition, and workout plans with personalized recommendations.",
    category: "Web Development",
    image: "https://images.pexels.com/photos/5082581/pexels-photo-5082581.jpeg",
    demoUrl: "https://fitness-platform.amanr.dev",
    githubUrl: "https://github.com/amanr/health-fitness-platform",
    year: "2021",
    client: "FitLife Inc.",
    role: "UX Designer & Front-end Developer",
    challenge: "The client needed a fitness platform that could offer personalized workout and nutrition plans while maintaining high engagement through an intuitive, motivating interface.",
    solution: "I designed and developed a comprehensive platform with progress tracking, personalized workout recommendations, meal planning tools, and social features. The interface uses gamification elements to encourage consistent usage and achievement of fitness goals.",
    results: "The platform achieved a 68% user retention rate after 3 months, compared to the industry average of 29%. Users who engaged with the personalized recommendations showed 42% better progress toward their fitness goals.",
    gallery: [
      "https://images.pexels.com/photos/5082581/pexels-photo-5082581.jpeg",
      "https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg",
      "https://images.pexels.com/photos/5067739/pexels-photo-5067739.jpeg"
    ]
  }
];

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
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