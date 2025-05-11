"use client";

import { memo, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

const routes = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

const NavLink = memo(function NavLink({ 
  href, 
  label, 
  isActive 
}: { 
  href: string; 
  label: string; 
  isActive: boolean;
}) {
  return (
    <Link href={href}>
      <Button 
        variant={isActive ? "default" : "ghost"} 
        className="transition-colors"
      >
        {label}
      </Button>
    </Link>
  );
});

function MainNavComponent() {
  const pathname = usePathname();

  const isActive = useCallback((path: string) => {
    return pathname === path;
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-semibold">
          Aman Kumar
        </Link>
        
        <div className="flex items-center gap-2">
          {routes.map(({ href, label }) => (
            <NavLink
              key={href}
              href={href}
              label={label}
              isActive={isActive(href)}
            />
          ))}
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}

export const MainNav = memo(MainNavComponent);