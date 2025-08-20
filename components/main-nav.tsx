"use client";

import { memo, useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggleButton from "./ui/theme-toggle-button";

const routes = [
	{ href: "/", label: "Home" },
	{ href: "/about", label: "About" },
	{ href: "/projects", label: "Projects" },
	{ href: "/skills", label: "Skills" },
	{ href: "/roadmap", label: "Journey" },
	{ href: "/contact", label: "Contact" },
] as const;

const NavLink = memo(function NavLink({
	href,
	label,
	isActive,
}: {
	href: string;
	label: string;
	isActive: boolean;
}) {
	return (
		<Link href={href} className="relative group">
			<Button
				variant="ghost"
				className={`relative px-4 py-2 transition-all duration-300 ${
					isActive ? "text-primary" : "hover:text-primary"
				}`}
			>
				{label}
				<span
					className={`absolute left-0 bottom-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ${
						isActive
							? "scale-x-100"
							: "scale-x-0 group-hover:scale-x-100"
					}`}
				/>
			</Button>
		</Link>
	);
});

function MainNavComponent() {
	const pathname = usePathname();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	const isActive = useCallback(
		(path: string) => {
			return pathname === path;
		},
		[pathname]
	);

	const toggleMobileMenu = useCallback(() => {
		setIsMobileMenuOpen((prev) => !prev);
	}, []);

	// Track scroll position
	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 ${
				scrolled
					? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
					: "bg-transparent"
			}`}
		>
			<nav className="container flex h-16 items-center justify-between">
				<Link
					href="/"
					className="relative text-xl font-semibold hover:text-primary transition-colors duration-300 group"
				>
					Aman Kumar
					<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
				</Link>

				<div className="flex items-center gap-4">
					{/* Desktop Menu */}
					<div className="hidden md:flex items-center gap-1">
						{routes.map(({ href, label }) => (
							<NavLink
								key={href}
								href={href}
								label={label}
								isActive={isActive(href)}
							/>
						))}
					</div>

					<div className="flex items-center gap-2">
					<ThemeToggleButton />

						{/* Mobile Menu Button */}
						<Button
							variant="ghost"
							size="icon"
							className="md:hidden"
							onClick={toggleMobileMenu}
						>
							{isMobileMenuOpen ? (
								<X className="h-6 w-6" />
							) : (
								<Menu className="h-6 w-6" />
							)}
						</Button>
					</div>
				</div>
			</nav>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className="md:hidden border-b bg-background"
					>
						<nav className="container py-4">
							<ul className="flex flex-col gap-2">
								{routes.map(({ href, label }) => (
									<li key={href}>
										<Link
											href={href}
											onClick={() => setIsMobileMenuOpen(false)}
											className={`block px-4 py-2 rounded-lg transition-colors ${
												isActive(href)
													? "bg-primary/10 text-primary"
													: "hover:bg-primary/10 hover:text-primary"
											}`}
										>
											{label}
										</Link>
									</li>
								))}
							</ul>
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}

export const MainNav = memo(MainNavComponent);