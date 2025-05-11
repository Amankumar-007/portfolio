import { ProjectClient } from "./ProjectClient";
// Sample project data (in a real app, you'd fetch this from an API or database)
const projects = [
  {
    id: "project-1",
    title: "E-commerce Website Redesign",
    description: "Complete redesign of an e-commerce platform focused on improving user experience and conversion rates.",
    category: "UI/UX Design",
    image: "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg",
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
    title: "Financial App Design",
    description: "Designed a modern finance tracking application with focus on data visualization and user engagement.",
    category: "Mobile App",
    image: "https://images.pexels.com/photos/6693655/pexels-photo-6693655.jpeg",
    year: "2023",
    client: "FinTech Startup",
    role: "UI/UX Designer",
    challenge: "The startup needed an intuitive, engaging mobile app that could simplify complex financial data for everyday users while encouraging regular engagement.",
    solution: "I designed an interface that uses clear data visualization, personalized insights, and gamification elements to make finance tracking more accessible and engaging. The design includes customizable dashboards, goal tracking, and automated saving features.",
    results: "The app achieved a 4.8/5 rating on app stores with over 500,000 downloads in the first six months. User retention rate exceeded industry average by 35%.",
    gallery: [
      "https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg",
      "https://images.pexels.com/photos/6693655/pexels-photo-6693655.jpeg",
      "https://images.pexels.com/photos/6693663/pexels-photo-6693663.jpeg"
    ]
  },
  {
    id: "project-3",
    title: "Restaurant Branding",
    description: "Complete brand identity for a high-end restaurant, including logo, menu design, and website.",
    category: "Branding",
    image: "https://images.pexels.com/photos/5082580/pexels-photo-5082580.jpeg",
    year: "2022",
    client: "Essence Restaurant",
    role: "Brand Designer",
    challenge: "A new high-end restaurant needed a cohesive brand identity that would convey sophistication, culinary excellence, and a unique dining experience.",
    solution: "I developed a comprehensive brand identity system including logo design, color palette, typography, menu design, website, signage, and packaging. The design language balanced modern elegance with warmth and approachability.",
    results: "The restaurant opened to critical acclaim, with several publications specifically mentioning the distinctive branding. The client reported that the cohesive visual identity helped establish customer loyalty and recognition in a competitive market.",
    gallery: [
      "https://images.pexels.com/photos/5082580/pexels-photo-5082580.jpeg",
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
      "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg"
    ]
  },
  {
    id: "project-4",
    title: "Corporate Website",
    description: "Designed and developed a responsive website for a corporate client with focus on clarity and brand messaging.",
    category: "Web Development",
    image: "https://images.pexels.com/photos/5076531/pexels-photo-5076531.jpeg",
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

  return <ProjectClient project={project} />;
}