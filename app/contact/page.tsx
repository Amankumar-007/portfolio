import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact — Aman Kumar | Hire Full Stack Developer",
  description:
    "Get in touch with Aman Kumar — Full Stack Developer available for freelance projects, collaborations, and SaaS development. Email: amanr3388@gmail.com",
  alternates: {
    canonical: "https://amankumarr.in/contact",
  },
  openGraph: {
    title: "Contact — Aman Kumar | Hire Full Stack Developer",
    description:
      "Get in touch with Aman Kumar for freelance projects, SaaS development, and web app collaborations.",
    url: "https://amankumarr.in/contact",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Aman Kumar — Full Stack Developer",
      },
    ],
  },
  twitter: {
    title: "Contact — Aman Kumar | Hire Full Stack Developer",
    description:
      "Get in touch with Aman Kumar for freelance projects, SaaS development, and web app collaborations.",
    images: ["/og-image.jpg"],
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}