import React from 'react';

export const StructuredData = () => {
    // 1. WebSite schema with SearchAction
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://amankumarr.in/#website",
        "name": "Aman Kumar Portfolio",
        "url": "https://amankumarr.in",
        "inLanguage": "en-US",
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://amankumarr.in/projects?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        },
        "description": "Expert Full Stack Developer and SaaS Solutions provider specializing in modern web applications.",
        "publisher": {
            "@id": "https://amankumarr.in/#person"
        }
    };

    // 2. Comprehensive Person schema
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": "https://amankumarr.in/#person",
        "name": "Aman Kumar",
        "givenName": "Aman",
        "familyName": "Kumar",
        "url": "https://amankumarr.in",
        "email": "amanr3388@gmail.com",
        "telephone": "+91 79067 53589",
        "image": {
            "@type": "ImageObject",
            "url": "https://amankumarr.in/og-image.jpg",
            "width": 1200,
            "height": 630
        },
        "jobTitle": "Full Stack Engineer",
        "description": "Full Stack Engineer with 2+ years shipping production SaaS and AI applications. Expert in React, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL, AWS, and LLM integration. Creator of SnippetsX (real-time code editor), TomatoAI (AI tools platform), and Awasdhara (real estate).",
        "nationality": {
            "@type": "Country",
            "name": "India"
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Delhi",
            "addressCountry": "India"
        },
        "knowsAbout": [
            "React", "Next.js", "Node.js", "Express", "TypeScript", "JavaScript",
            "MongoDB", "PostgreSQL", "MySQL", "Redis", "SaaS Development",
            "Full Stack Development", "Web Performance", "Docker", "AWS",
            "REST APIs", "GraphQL", "WebSockets", "Tailwind CSS", "Git",
            "JWT Authentication", "Stripe Integration", "LLM APIs",
            "OpenAI Integration", "Claude Integration", "Prompt Engineering"
        ],
        "knowsLanguage": ["English", "Hindi"],
        "sameAs": [
            "https://github.com/Amankumar-007",
            "https://www.linkedin.com/in/amankumarweb/",
            "https://x.com/AmanCodex"
        ],
        "worksFor": {
            "@type": "Organization",
            "name": "StartupCoaching",
            "url": "https://startupcoaching.in"
        },
        "alumniOf": [
            {
                "@type": "EducationalOrganization",
                "name": "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
                "educationDetails": {
                    "degreeName": "Master of Computer Applications (MCA)"
                }
            },
            {
                "@type": "EducationalOrganization",
                "name": "Dr. Bhimrao Ambedkar University, Agra",
                "educationDetails": {
                    "degreeName": "Bachelor of Computer Applications (BCA)"
                }
            },
            {
                "@type": "Organization",
                "name": "Ninepages Techsolutions Pvt. Ltd.",
                "url": "https://ninepagestech.com"
            }
        ],
        "hasOccupation": {
            "@type": "Occupation",
            "name": "Full Stack Engineer",
            "occupationLocation": {
                "@type": "Country",
                "name": "India"
            },
            "skills": "React, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL, AWS, Docker, REST APIs, GraphQL, WebSockets, JWT, Stripe, LLM APIs"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "email": "amanr3388@gmail.com",
            "telephone": "+91 79067 53589",
            "contactType": "professional",
            "availableLanguage": ["English", "Hindi"]
        }
    };

    // 3. ProfessionalService schema
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://amankumarr.in/#service",
        "name": "Aman Kumar — Full Stack Development Services",
        "url": "https://amankumarr.in",
        "description": "Professional Full Stack Development services specializing in SaaS platforms, React web apps, Node.js backends, and modern UI/UX.",
        "provider": {
            "@id": "https://amankumarr.in/#person"
        },
        "areaServed": "Worldwide",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Development Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "SaaS Development",
                        "description": "Build scalable SaaS platforms with subscription models, multi-tenancy, and analytics."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Full Stack Web App Development",
                        "description": "End-to-end web app development with React, Node.js, and MongoDB."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Performance Optimization",
                        "description": "Improve Lighthouse scores, Core Web Vitals, and SEO for existing web apps."
                    }
                }
            ]
        }
    };

    // 4. BreadcrumbList for homepage
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://amankumarr.in"
            }
        ]
    };

    const schemas = [websiteSchema, personSchema, serviceSchema, breadcrumbSchema];

    return (
        <>
            {schemas.map((schema, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
        </>
    );
};
