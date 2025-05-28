"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { PageTransition } from "@/components/page-transition";
import { Rocket } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const categories = [
	"All",
	"Web Development",
	"Mobile App",
	"Full Stack",
];

const projects = [
	{
		id: "project-1",
		title: "E-commerce Website",
		description:
			"A complete e-commerce platform with product listings, user authentication, and payment integration.",
		category: "Web Development",
		image: "/ss-1.png",
		year: "2023",
	},
	{
		id: "project-2",
		title: "Real Estate Platform",
		description:
			"A platform for listing, buying, and selling properties with a user-friendly interface and search filters.",
		category: "Web Development",
		image: "/ss-3.png",
		year: "2023",
	},
	{
		id: "project-3",
		title: "Learning Management System (LMS)",
		description:
			"An LMS with role-based access, courses, exams, and certifications for students, trainers, and admins.",
		category: "Full Stack",
		image: "/lms/Screenshot 2025-05-27 131624.png",
		year: "2023",
	},
	{
		id: "project-4",
		title: "Uber Clone",
		description:
			"A clone of Uber for ride-sharing with features like real-time tracking, booking, and payment gateway.",
		category: "Mobile App",
		image: "/ss-6.png",
		year: "2022",
	},
];

export default function ProjectsPage() {
	const [activeCategory, setActiveCategory] = useState("All");
	const [showProgress, setShowProgress] = useState(false);
	const progress = 10;

	const filteredProjects =
		activeCategory === "All"
			? projects
			: projects.filter((project) => project.category === activeCategory);

	// Example: Assume project-3 is currently being worked on
	const currentProject = projects.find((p) => p.id === "project-3");

	return (
		<PageTransition>
			<div className="container max-w-6xl py-20 px-4 md:px-6">
				{/* Currently Working On Section */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
					className="mb-16 flex items-center gap-6 bg-primary/10 rounded-xl p-6 shadow-lg"
				>
					<motion.div
						animate={{ y: [0, -10, 0] }}
						transition={{
							duration: 1.5,
							repeat: Infinity,
							ease: "easeInOut",
						}}
						className="flex-shrink-0"
					>
						<Rocket className="w-10 h-10 text-primary animate-pulse" />
					</motion.div>
					<div className="flex-1">
						<h2 className="text-2xl font-bold mb-1">
							Currently Working On
						</h2>
						<p className="text-lg text-muted-foreground mb-2">
							{currentProject?.title}: {currentProject?.description}
						</p>
						<Button
							variant="secondary"
							onClick={() => setShowProgress(true)}
							className="mt-2"
						>
							View Work Progress
						</Button>
					</div>
				</motion.div>

				{/* Work Progress Dialog */}
				<Dialog open={showProgress} onOpenChange={setShowProgress}>
					<DialogContent className="max-w-md">
						<h3 className="text-xl font-bold mb-2 flex items-center gap-2">
							<Rocket className="w-5 h-5 text-primary animate-bounce" />
							Work In Progress
						</h3>
						<p className="mb-4 text-muted-foreground">
							This project is actively being developed. New features, bug
							fixes, and improvements are being added regularly. Stay tuned
							for updates!
						</p>
						<div className="w-full bg-red-500 rounded-full h-4 mb-4 overflow-hidden relative">
							<motion.div
								initial={{ width: 0 }}
								animate={{ width: progress + "%" }}
								transition={{ duration: 1.2 }}
								className="h-4 bg-primary rounded-full flex items-center justify-center"
								style={{ position: 'absolute', left: 0, top: 0 }}
							>
								<span className="w-full text-center text-xs font-semibold text-black select-none">
									{progress}%
								</span>
							</motion.div>
						</div>
						<p className="text-sm text-gray-500">
							Progress: {progress}%
						</p>
						<p className="text-sm text-gray-500">
							Estimated completion: Q3 2025
						</p>
					</DialogContent>
				</Dialog>

				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.2 }}
					className="flex flex-wrap gap-2 mb-12"
				>
					{categories.map((category, index) => (
						<Button
							key={index}
							variant={
								activeCategory === category ? "default" : "outline"
							}
							onClick={() => setActiveCategory(category)}
							className="transition-all duration-300"
						>
							{category}
						</Button>
					))}
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					{filteredProjects.map((project, index) => (
						<ProjectCard key={project.id} project={project} index={index} />
					))}
				</motion.div>
			</div>
		</PageTransition>
	);
}
