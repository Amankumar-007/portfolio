"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Folder,
  Cpu,
  Briefcase,
  Wrench,
  GraduationCap,
  Newspaper,
  HelpCircle,
  Edit3,
  BookOpen
} from "lucide-react";

interface NavItem {
  id: string;
  title: string;
  href: string;
  isSection: boolean;
  icon: React.ReactNode;
  activeColorClass: string;
}

export default function ModernNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("hero");

  const navItems: NavItem[] = [
    {
      id: "hero",
      title: "Home",
      href: "/#hero",
      isSection: true,
      icon: <Home className="w-4 h-4" />,
      activeColorClass: "bg-white text-black shadow-lg shadow-white/20 scale-105"
    },
    {
      id: "projects",
      title: "Projects",
      href: "/projects",
      isSection: false,
      icon: <Folder className="w-4 h-4" />,
      activeColorClass: "bg-white text-black shadow-lg shadow-white/20 scale-105"
    },
    {
      id: "architecture",
      title: "Architecture",
      href: "/#architecture",
      isSection: true,
      icon: <Cpu className="w-4 h-4" />,
      activeColorClass: "bg-sky-400 text-black shadow-lg shadow-sky-400/30 scale-105"
    },
    {
      id: "experience",
      title: "Experience",
      href: "/#experience",
      isSection: true,
      icon: <Briefcase className="w-4 h-4" />,
      activeColorClass: "bg-white text-black shadow-lg shadow-white/20 scale-105"
    },
    {
      id: "career",
      title: "Career & Credentials",
      href: "/career",
      isSection: false,
      icon: <BookOpen className="w-4 h-4" />,
      activeColorClass: "bg-white text-black shadow-lg shadow-white/20 scale-105"
    },
    {
      id: "skills",
      title: "Tools & Skills",
      href: "/skills",
      isSection: false,
      icon: <Wrench className="w-4 h-4" />,
      activeColorClass: "bg-white text-black shadow-lg shadow-white/20 scale-105"
    },
    {
      id: "education",
      title: "Education",
      href: "/#education",
      isSection: true,
      icon: <GraduationCap className="w-4 h-4" />,
      activeColorClass: "bg-purple-400 text-black shadow-lg shadow-purple-400/30 scale-105"
    },
    {
      id: "thoughts",
      title: "Thoughts",
      href: "/thoughts",
      isSection: false,
      icon: <Newspaper className="w-4 h-4" />,
      activeColorClass: "bg-white text-black shadow-lg shadow-white/20 scale-105"
    },
    {
      id: "faq",
      title: "FAQ",
      href: "/#faq",
      isSection: true,
      icon: <HelpCircle className="w-4 h-4" />,
      activeColorClass: "bg-amber-400 text-black shadow-lg shadow-amber-400/30 scale-105"
    },
    {
      id: "contact",
      title: "Contact",
      href: "/#contact",
      isSection: true,
      icon: <Edit3 className="w-4 h-4" />,
      activeColorClass: "bg-[#F05335] text-white shadow-lg shadow-orange-500/40 scale-105"
    }
  ];

  // Scroll spy on homepage
  useEffect(() => {
    if (pathname !== "/") return;

    const handleScroll = () => {
      const sections = [
        "hero",
        "projects",
        "architecture",
        "experience",
        "tools",
        "education",
        "testimonials",
        "thoughts",
        "faq",
        "contact"
      ];
      const scrollPos = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNavClick = (item: NavItem, e: React.MouseEvent) => {
    e.preventDefault();

    if (item.isSection) {
      if (pathname === "/") {
        const el = document.getElementById(item.id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push(`/#${item.id}`);
      }
    } else {
      router.push(item.href);
    }
  };

  const isItemActive = (item: NavItem) => {
    if (pathname === "/") {
      return activeSection === item.id || (item.id === "hero" && activeSection === "home");
    }
    return pathname.startsWith(item.href) && item.href !== "/";
  };

  return (
    <header className="fixed top-2 sm:top-5 left-1/2 -translate-x-1/2 z-50 max-w-[calc(100vw-1rem)] sm:max-w-max px-1">
      <div className="bg-[#18181a]/95 backdrop-blur-xl border border-white/10 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none scroll-smooth">
        {navItems.map((item) => {
          const active = isItemActive(item);
          return (
            <button
              key={item.id}
              onClick={(e) => handleNavClick(item, e)}
              className={`p-2 sm:p-2.5 rounded-full transition-all duration-300 relative group cursor-pointer flex-shrink-0 ${
                active
                  ? item.activeColorClass
                  : "text-zinc-400 hover:text-white hover:bg-white/10 active:scale-95"
              }`}
              title={item.title}
            >
              {item.icon}
              <span className="hidden sm:block absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/90 text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap border border-white/10 shadow-lg z-50">
                {item.title}
              </span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
