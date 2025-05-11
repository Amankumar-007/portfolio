"use client";

import { memo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/yourusername",
    icon: Github,
    label: "Visit GitHub profile"
  },
  {
    name: "Twitter",
    href: "https://twitter.com/yourusername",
    icon: Twitter,
    label: "Visit Twitter profile"
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
    icon: Linkedin,
    label: "Visit LinkedIn profile"
  },
  {
    name: "Email",
    href: "mailto:your.email@example.com",
    icon: Mail,
    label: "Send an email"
  }
] as const;

const SocialIcon = memo(function SocialIcon({ 
  icon: Icon, 
  href, 
  label 
}: { 
  icon: typeof Github; 
  href: string; 
  label: string;
}) {
  return (
    <Link 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
      aria-label={label}
    >
      <Icon className="h-5 w-5" />
    </Link>
  );
});

function FooterComponent() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t"
    >
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with{" "}
            <Link
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Next.js
            </Link>
            {" "}and{" "}
            <Link
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Tailwind CSS
            </Link>
            . Hosted on{" "}
            <Link
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Vercel
            </Link>
            .
          </p>

          <div className="flex items-center gap-1">
            {socialLinks.map((social) => (
              <SocialIcon
                key={social.name}
                icon={social.icon}
                href={social.href}
                label={social.label}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

export const Footer = memo(FooterComponent);