import { NextResponse } from "next/server";

interface ResponseTemplate {
  patterns: string[];
  responses: string[];
}

// Knowledge base for the AI assistant
const knowledge: { [key: string]: ResponseTemplate } = {
  skills: {
    patterns: ["skills", "skill", "what can you do", "capabilities", "expertise", "what do you know", "stack", "tech", "tools", "technology"],
    responses: [
      "Aman Kumar is a **Full Stack & SaaS Specialist** with extensive experience in modern web technologies.\n\n**Core Technical Stack:**\n• **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS, Framer Motion\n• **Backend:** Node.js, Express.js, REST APIs, GraphQL, Microservices\n• **Databases & DevOps:** MongoDB, PostgreSQL, Docker, Git/GitHub, Vercel\n\n[Explore All Skills & Tools](/skills)",
      "Aman specializes in building scalable end-to-end SaaS applications, responsive user interfaces, and high-throughput backend APIs using **React, Next.js, Node.js, and TypeScript**.\n\n[View Full Tech Stack](/skills)"
    ]
  },
  projects: {
    patterns: ["projects", "project", "portfolio", "work", "examples", "showcase", "built", "created", "apps", "snippetsx", "tomatoai", "awasdhara", "twofloww"],
    responses: [
      "Aman has engineered and shipped several high-impact production SaaS platforms and web applications:\n\n• **TomatoAI:** All-in-one AI tools platform for creative generation & workflows\n• **Awasdhara:** Real estate & land investment platform with smart filters\n• **SnippetsX:** Real-time collaborative code editor with live syntax sharing\n• **TwoFloww:** Digital agency web platform & software architecture\n\n[Explore Projects Directory](/projects)",
      "Aman's portfolio includes real-time collaborative applications, AI productivity platforms, real estate web portals, and custom client software.\n\n[View All Featured Projects](/projects)"
    ]
  },
  contact: {
    patterns: ["contact", "reach", "hire", "email", "message", "get in touch", "connect", "call", "freelance"],
    responses: [
      "Looking to hire Aman or collaborate on a project?\n\n• **Services:** Full-stack SaaS builds, custom web apps, API architecture, frontend redesigns\n• **Availability:** Freelance contracts, project engagements, and full-time roles\n• **Response Time:** Typically within 24 hours!\n\n[Send a Message to Aman](/contact)",
      "The best way to reach Aman is through the interactive contact form on this site. He's always open to discussing innovative project ideas.\n\n[Go to Contact Form](/contact)"
    ]
  },
  experience: {
    patterns: ["experience", "career", "background", "history", "worked", "jobs", "role", "company", "startupcoaching", "ninepages"],
    responses: [
      "Aman brings solid industry experience in full-stack engineering and software deployment:\n\n• **StartupCoaching** *(Oct 2025 - Present)* — Full Stack Engineer building web applications, database schemas, and dashboards.\n• **Ninepages Techsolutions** *(Jun 2024 - Oct 2025)* — Full Stack Engineer (1.5 yrs) delivering client platforms end-to-end.\n• **Learn2Earn** *(2023 - 2024)* — Full Stack Developer Intensive Training & Code Reviews.\n\n[View Full Career & Experience](/career)",
      "Aman's experience covers database schema design, RESTful API development, state management, and modern React frontends.\n\n[Check Career Experience Page](/career)"
    ]
  },
  about: {
    patterns: ["about", "who is aman", "who are you", "bio", "details", "info", "personal"],
    responses: [
      "Aman Kumar is a **Full Stack Engineer based in India** dedicated to transforming complex client ideas into fast, production-ready SaaS products.\n\nHe specializes in clean code, modern UI/UX aesthetics, scalable backend APIs, and performance optimization.\n\n[Read Full Bio on About Page](/about)"
    ]
  },
  thoughts: {
    patterns: ["thoughts", "blog", "articles", "writings", "design thoughts", "posts"],
    responses: [
      "Aman writes technical articles covering full-stack architecture, Next.js performance optimizations, and modern web UI/UX patterns.\n\n[Read Design Thoughts & Articles](/thoughts)"
    ]
  },
  roadmap: {
    patterns: ["roadmap", "path", "learning", "journey"],
    responses: [
      "Explore Aman's developer roadmap and technical skill progression over time!\n\n[View Developer Roadmap](/roadmap)"
    ]
  },
  greeting: {
    patterns: ["hi", "hello", "hey", "greetings", "good morning", "good afternoon", "good evening"],
    responses: [
      "Hello! 👋 I'm Aman's AI Assistant. How can I help you today?\n\nFeel free to ask me anything about his work, or jump directly to a page:\n\n[Read About Aman](/about)\n\n[Explore Skills & Tools](/skills)\n\n[View Featured Projects](/projects)\n\n[Check Career Experience](/career)\n\n[Contact / Hire Aman](/contact)",
      "Hi there! Ask me anything about Aman's development skills, projects, or background, or jump directly to any page:\n\n[View Projects Directory](/projects)\n\n[Check Tech Stack & Skills](/skills)\n\n[Send a Message to Aman](/contact)"
    ]
  }
};

function generateResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  // First check for exact pattern matches
  for (const [category, template] of Object.entries(knowledge)) {
    for (const pattern of template.patterns) {
      if (pattern === "*") continue;
      if (lowerMessage.includes(pattern.toLowerCase())) {
        const randomIndex = Math.floor(Math.random() * template.responses.length);
        return template.responses[randomIndex];
      }
    }
  }

  // Default response if no patterns match
  return "I'm here to help you explore Aman's work! You can ask about his skills, projects, experience, or use these direct links:\n\n• 👉 [About Aman](/about)\n• 👉 [Skills & Tools](/skills)\n• 👉 [Projects Directory](/projects)\n• 👉 [Career Experience](/career)\n• 👉 [Contact Page](/contact)";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Get the latest message
    const latestMessage = body.messages[body.messages.length - 1].content;

    // Generate a response based on the message
    const response = generateResponse(latestMessage);

    return NextResponse.json({ message: response });

  } catch (error: any) {
    console.error("Error processing chat request:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
