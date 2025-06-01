"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

const contactInfo = [
	{
		icon: <Mail className="h-6 w-6" />,
		title: "Email",
		details: "amanr3388@gmail.com",
		link: "mailto:amanr3388@gmail.com",
	},
	{
		icon: <Phone className="h-6 w-6" />,
		title: "Phone",
		details: "+91-7906753589",
		link: "tel:+91-7906753589",
	},
	{
		icon: <MapPin className="h-6 w-6" />,
		title: "Home",
		details: "Agra Uttar Pradesh, India",
		link: "#",
	},
];

export function Contact() {
	// Replace with your Formspree endpoint or any other service
	const FORMSPREE_ENDPOINT = "https://formspree.io/f/your-form-id";

	return (
		<section className="py-24 px-4 bg-muted/30">
			<div className="container max-w-6xl">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center max-w-3xl mx-auto mb-16"
				>
					<div className="flex items-center justify-center space-x-4 mb-4">
						<div className="w-12 h-0.5 bg-primary"></div>
						<span className="text-sm font-medium uppercase tracking-wider">
							Get in Touch
						</span>
						<div className="w-12 h-0.5 bg-primary"></div>
					</div>
					<h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
						Let&apos;s Work Together
					</h2>
					<p className="text-lg text-muted-foreground">
						Having a project in mind or just want to say hello? I&apos;d love to
						hear from you.
					</p>
				</motion.div>

				<div className="grid md:grid-cols-[1fr_1.5fr] gap-12">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<h3 className="text-2xl font-semibold mb-6">
							Contact Information
						</h3>

						<div className="space-y-8 mb-12">
							{contactInfo.map((item, index) => (
								<motion.a
									key={index}
									href={item.link}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{
										duration: 0.4,
										delay: 0.3 + index * 0.1,
									}}
									className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted transition-colors"
								>
									<div className="mt-1 text-primary">{item.icon}</div>
									<div>
										<h4 className="font-medium">{item.title}</h4>
										<p className="text-muted-foreground">
											{item.details}
										</p>
									</div>
								</motion.a>
							))}
						</div>

						<div>
							<h3 className="text-xl font-semibold mb-4">Follow Me</h3>
							<div className="flex gap-4">
								<Button
									asChild
									variant="outline"
									size="icon"
									className="rounded-full"
								>
									<Link
										href="https://www.linkedin.com/in/amankumarweb/"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="LinkedIn"
									>
										<Linkedin className="w-5 h-5" />
									</Link>
								</Button>
								<Button
									asChild
									variant="outline"
									size="icon"
									className="rounded-full"
								>
									<Link
										href="https://github.com/Amankumar-007"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="GitHub"
									>
										<Github className="w-5 h-5" />
									</Link>
								</Button>
								<Button
									asChild
									variant="outline"
									size="icon"
									className="rounded-full"
								>
									<Link
										href="https://twitter.com/"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Twitter"
									>
										<Twitter className="w-5 h-5" />
									</Link>
								</Button>
								<Button
									asChild
									variant="outline"
									size="icon"
									className="rounded-full"
								>
									<Link
										href="https://instagram.com/"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Instagram"
									>
										<Instagram className="w-5 h-5" />
									</Link>
								</Button>
							</div>
						</div>
					</motion.div>

					{/* Contact Form using Formspree */}
					<motion.form
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="bg-card p-6 md:p-8 rounded-xl border"
						action={FORMSPREE_ENDPOINT}
						method="POST"
					>
						<h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
						<div className="space-y-6">
							<div className="grid md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<label htmlFor="name" className="text-sm font-medium">
										Name
									</label>
									<Input
										id="name"
										name="name"
										placeholder="Your name"
										required
									/>
								</div>
								<div className="space-y-2">
									<label htmlFor="email" className="text-sm font-medium">
										Email
									</label>
									<Input
										id="email"
										name="email"
										type="email"
										placeholder="Your email"
										required
									/>
								</div>
							</div>
							<div className="space-y-2">
								<label htmlFor="subject" className="text-sm font-medium">
									Subject
								</label>
								<Input
									id="subject"
									name="subject"
									placeholder="Subject of your message"
									required
								/>
							</div>
							<div className="space-y-2">
								<label htmlFor="message" className="text-sm font-medium">
									Message
								</label>
								<Textarea
									id="message"
									name="message"
									placeholder="Your message"
									className="min-h-[150px]"
									required
								/>
							</div>
							<Button type="submit" size="lg" className="w-full group">
								Send Message
								<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Button>
						</div>
					</motion.form>
				</div>
			</div>
		</section>
	);
}