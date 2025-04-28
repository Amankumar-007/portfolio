"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function MainNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center space-x-2"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold"
          >
            <span className="font-playfair">Aman Kumar</span>
          </motion.div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item, index) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative",
                pathname === item.href ? "text-foreground" : "text-muted-foreground"
              )}
            >
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            </Link>
          ))}
          <ModeToggle />
        </nav>

        <div className="flex md:hidden items-center gap-4">
          <ModeToggle />
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-16 z-50 bg-background border-t flex flex-col items-center pt-12"
            >
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-2 right-4"
                aria-label="Close Menu"
              >
                <X className="h-6 w-6" />
              </Button>
              <nav className="flex flex-col items-center gap-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <Link 
                      href={item.href}
                      className={cn(
                        "text-xl font-medium transition-colors hover:text-primary",
                        pathname === item.href ? "text-foreground" : "text-muted-foreground"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}