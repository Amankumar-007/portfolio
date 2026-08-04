"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Folder, Wrench, BookOpen, Newspaper, Briefcase, Edit3 } from "lucide-react";

export default function ModernNavbar() {
  const pathname = usePathname();

  // Hide on homepage since sticky-portfolio-homepage.tsx renders its own navbar dock
  if (pathname === "/") return null;

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-[#1e1e20]/90 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-2xl shadow-2xl flex items-center gap-2 sm:gap-2.5">
        <Link
          href="/"
          className={`p-2 rounded-xl transition-all ${
            pathname === "/" ? "bg-white/15 text-white shadow-sm" : "text-zinc-400 hover:text-white hover:bg-white/5"
          }`}
          title="Home"
        >
          <Home className="w-4 h-4" />
        </Link>

        <Link
          href="/projects"
          className={`p-2 rounded-xl transition-all ${
            pathname.startsWith("/projects") ? "bg-white/15 text-white shadow-sm" : "text-zinc-400 hover:text-white hover:bg-white/5"
          }`}
          title="Projects Directory"
        >
          <Folder className="w-4 h-4" />
        </Link>

        <Link
          href="/skills"
          className={`p-2 rounded-xl transition-all ${
            pathname === "/skills" ? "bg-white/15 text-white shadow-sm" : "text-zinc-400 hover:text-white hover:bg-white/5"
          }`}
          title="Tools & Skills"
        >
          <Wrench className="w-4 h-4" />
        </Link>

        <Link
          href="/about"
          className={`p-2 rounded-xl transition-all ${
            pathname === "/about" ? "bg-white/15 text-white shadow-sm" : "text-zinc-400 hover:text-white hover:bg-white/5"
          }`}
          title="About"
        >
          <BookOpen className="w-4 h-4" />
        </Link>

        <Link
          href="/thoughts"
          className={`p-2 rounded-xl transition-all ${
            pathname.startsWith("/thoughts") ? "bg-white/15 text-white shadow-sm" : "text-zinc-400 hover:text-white hover:bg-white/5"
          }`}
          title="Thoughts"
        >
          <Newspaper className="w-4 h-4" />
        </Link>

        <Link
          href="/career"
          className={`p-2 rounded-xl transition-all ${
            pathname === "/career" ? "bg-white/15 text-white shadow-sm" : "text-zinc-400 hover:text-white hover:bg-white/5"
          }`}
          title="Experience / Career"
        >
          <Briefcase className="w-4 h-4" />
        </Link>

        <Link
          href="/contact"
          className={`p-2 rounded-xl transition-all ${
            pathname === "/contact"
              ? "bg-white/15 text-white shadow-sm"
              : "text-zinc-400 hover:text-white hover:bg-white/5"
          }`}
          title="Contact"
        >
          <Edit3 className="w-4 h-4" />
        </Link>
      </div>
    </header>
  );
}
