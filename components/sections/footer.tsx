"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa6";

export function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        {
            title: "Explore",
            links: [
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Projects", href: "/projects" },
                { label: "Contact", href: "/#contact" },
            ],
        },
        {
            title: "Creative Hub",
            links: [
                { label: "View Portfolio", href: "/projects" },
                { label: "Read Blog", href: "/blog" },
            ],
        },
        {
            title: "Connect",
            links: [
                { label: "LinkedIn", href: "https://www.linkedin.com/in/amankumarweb/" },
                { label: "GitHub", href: "https://github.com/Amankumar-007" },
                { label: "Twitter", href: "https://twitter.com/amankumarweb" },
                { label: "Instagram", href: "https://instagram.com" },
            ],
        },
        {
            title: "Extras",
            links: [
                { label: "Design Archive", href: "/archive" },
                { label: "Style Guide", href: "/style-guide" },
            ],
        },
    ];

    return (
        <footer className="w-full px-4 py-8 md:px-8 bg-transparent" id="footer">
            <div className="max-w-[1600px] mx-auto bg-[#0a0a0a] text-[#e0e0e0] rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden border border-[#222]">

                {/* Corner Screws */}
                <div className="absolute top-6 left-6 text-[#333]">
                    <ScrewIcon />
                </div>
                <div className="absolute top-6 right-6 text-[#333]">
                    <ScrewIcon />
                </div>
                <div className="absolute bottom-6 left-6 text-[#333]">
                    <ScrewIcon />
                </div>
                <div className="absolute bottom-6 right-6 text-[#333]">
                    <ScrewIcon />
                </div>

                {/* Big Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full text-center mb-16 pt-8"
                >
                    <h1 className="font-playfair text-[12vw] md:text-[8vw] leading-none tracking-tighter  text-white opacity-90 select-none">
                        AMAN KUMAR
                    </h1>
                </motion.div>

                {/* Columns Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 mb-24 px-4 md:px-12">
                    {footerLinks.map((column, colIndex) => (
                        <motion.div
                            key={column.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: colIndex * 0.1 }}
                            className="flex flex-col items-start md:items-center"
                        >
                            <h3 className="text-[#888] font-medium mb-6 uppercase tracking-wider text-sm">
                                {column.title}
                            </h3>
                            <ul className="space-y-4 flex flex-col items-start md:items-center">
                                {column.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link
                                            href={link.href}
                                            className="text-lg md:text-xl text-[#ccc] hover:text-white transition-colors duration-300 relative group flex items-center gap-1"
                                        >
                                            {link.label}
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-1">
                                                <ArrowUpRight className="w-3 h-3" />
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#222] text-[#666] text-sm uppercase tracking-widest font-mono"
                >
                    <div className="mb-4 md:mb-0">
                        &copy; Aman Kumar // {currentYear}
                    </div>
                    <div className="flex gap-8">
                        <span>Local Time: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })} IST</span>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}

function ScrewIcon() {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-50"
        >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}
