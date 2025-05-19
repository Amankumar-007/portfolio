import { NextResponse } from "next/server";

interface ResponseTemplate {
  patterns: string[];
  responses: string[];
}

// Knowledge base for the AI assistant
const knowledge: { [key: string]: ResponseTemplate } = {
  skills: {
    patterns: ["skills", "what can you do", "capabilities", "expertise", "what do you know"],
    responses: [
      "I'd be happy to tell you about Aman's skills! He's a MERN stack specialist with expertise in React, Node.js, MongoDB, and Express.js. He also has strong experience with modern tools like Next.js and TypeScript. What specific aspect would you like to know more about?",
      "Aman's primary expertise lies in full-stack development using the MERN stack. He's particularly skilled in building responsive, performant web applications with React and Next.js. Would you like me to elaborate on any specific technology?",
      "Let me share Aman's technical expertise! His core strengths include React, Node.js, MongoDB, and the entire MERN ecosystem. He's also well-versed in TypeScript and modern CSS frameworks like Tailwind. Is there a particular area you're interested in?"
    ]
  },
  projects: {
    patterns: ["projects", "portfolio", "work", "examples", "showcase", "built", "created"],
    responses: [
      "I'd love to tell you about Aman's projects! He's worked on several impressive applications, including e-commerce platforms, financial apps, and corporate websites. Would you like to hear about a specific project in detail?",
      "Aman has developed various exciting projects! His portfolio includes responsive e-commerce solutions, sophisticated financial applications, and modern corporate websites. Each project demonstrates his commitment to quality and user experience. Which type of project interests you most?",
      "Some of Aman's notable projects include custom e-commerce platforms, financial management tools, and corporate web solutions. Each showcases different aspects of his technical expertise. Would you like me to focus on any particular project?"
    ]
  },
  contact: {
    patterns: ["contact", "reach", "hire", "email", "message", "get in touch"],
    responses: [
      "You can easily get in touch with Aman through the contact form on this website! He's always excited to discuss new projects and opportunities. Would you like me to guide you to the contact section?",
      "The best way to reach Aman is through the contact form here on the website. He responds promptly to all inquiries, especially regarding potential collaborations or project discussions. Should I show you where to find the contact form?",
      "I'd be happy to help you connect with Aman! The most direct way is through the website's contact form. He's always open to discussing new opportunities and innovative project ideas. Would you like to reach out to him?"
    ]
  },
  experience: {
    patterns: ["experience", "background", "history", "worked", "career"],
    responses: [
      "Aman brings solid experience in full-stack development, specializing in the MERN stack. His background includes building various web applications from scratch and working with modern development practices. What specific aspect of his experience interests you?",
      "As a MERN stack developer, Aman has accumulated significant experience in building complex web applications. He's particularly skilled in creating responsive designs and implementing modern development practices. Would you like to know more about any specific area?",
      "Aman's experience spans across full-stack development, with a focus on modern web technologies and best practices. He's particularly experienced with React and Node.js ecosystems. Is there a particular aspect of his background you'd like to explore?"
    ]
  },
  greeting: {
    patterns: ["hi", "hello", "hey", "greetings", "good morning", "good afternoon", "good evening"],
    responses: [
      "Hello! I'm Aman's AI assistant. I'd be happy to tell you about his skills, projects, or help you get in touch. What would you like to know?",
      "Hi there! I'm here to help you learn more about Aman's work and expertise. Feel free to ask about his projects, skills, or anything else!",
      "Welcome! I can help you learn more about Aman's development expertise and projects. What brings you here today?"
    ]
  }
};
function generateResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  // First check for exact pattern matches
  for (const [category, template] of Object.entries(knowledge)) {
    for (const pattern of template.patterns) {
      if (pattern === "*") continue; // Skip wildcard pattern on first pass
      if (lowerMessage.includes(pattern.toLowerCase())) {
        const randomIndex = Math.floor(Math.random() * template.responses.length);
        return template.responses[randomIndex];
      }
    }
  }

  // If no exact matches, use the general response
  if (knowledge.general) {
    const randomIndex = Math.floor(Math.random() * knowledge.general.responses.length);
    let response = knowledge.general.responses[randomIndex];
    return response.replace("{input}", message.trim());
  }

  // Default response if no patterns match
  return "I'm here to help you learn more about Aman! Feel free to ask about his skills, projects, experience, or how to get in touch. What would you like to know?";
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
