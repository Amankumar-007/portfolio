"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import ThemeToggleButton from "@/components/ui/theme-toggle-button";
import "./ModernNavbar.css";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Featured", href: "/projects/featured" },
  { label: "Skills", href: "/skills" },
  { label: "Journey", href: "/roadmap" },
  { label: "Careers", href: "/career" },
  { label: "Case Study", href: "/case-study" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { icon: <Github size={18} />, href: "https://github.com/Amankumar-007", label: "GitHub" },
  { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/amankumarweb/", label: "LinkedIn" },
  { icon: <Twitter size={18} />, href: "https://twitter.com/amankumarweb", label: "Twitter" },
  { icon: <Mail size={18} />, href: "mailto:amanr3388@gmail.com", label: "Email" },
];

export default function ModernNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const navItemVariants = {
    closed: { opacity: 0, y: 30 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 + i * 0.05, duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
    }),
  };

  return (
    <>
      <header className={`modern-nav-wrapper ${scrolled ? "scrolled" : ""} ${isOpen ? "menu-open" : ""}`}>
        <motion.div className="nav-scroll-progress" style={{ scaleX }} />

        <nav className="modern-nav-container">
          <Link href="/" className="modern-nav-logo" onClick={() => setIsOpen(false)}>
            <div className="logo-text-row">
              <span className="logo-main font-black tracking-tighter">AMAN</span>
              <span className="logo-sub font-serif italic text-orange-500">kumar.</span>
            </div>
          </Link>

          <div className="desktop-links">
            {navItems.slice(0, 5).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`desktop-link-item ${pathname === item.href ? "active" : ""}`}
              >
                <span className="link-content">{item.label}</span>
                {pathname === item.href && (
                  <motion.div layoutId="active-nav-pill" className="active-pill" />
                )}
              </Link>
            ))}
          </div>

          <div className="modern-nav-right">
            <ThemeToggleButton />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`compact-burger ${isOpen ? "active" : ""}`}
            >
              <div className="burger-bundle">
                <span className="line" />
                <span className="line" />
              </div>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="compact-menu-overlay"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="menu-noise" />
            
            <div className="compact-menu-content container">
              <div className="menu-inner-grid">
                <div className="nav-col main-links">
                  <span className="nav-label">Arsenal.Directory</span>
                  <div className="links-grid">
                    {navItems.map((item, i) => (
                      <motion.div key={item.href} custom={i} variants={navItemVariants}>
                        <Link
                          href={item.href}
                          className={`menu-compact-link ${pathname === item.href ? "active" : ""}`}
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="link-num">0{i + 1}</span>
                          <span className="link-val">{item.label}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="nav-col meta-info">
                  <div className="meta-block">
                    <span className="nav-label">Connectivity</span>
                    <a href="mailto:amanr3388@gmail.com" className="email-meta">
                      Amanr3388@gmail.com
                    </a>
                  </div>

                  <div className="meta-block">
                    <span className="nav-label">Socials</span>
                    <div className="social-meta-grid">
                      {socialLinks.map((social) => (
                        <a key={social.label} href={social.href} className="social-meta-link">
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="location-stamp">
                    <div className="l-dot" />
                    <span>Based in India • Open to Global SaaS Roles</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="menu-bg-accent">PORTFOLIO</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
