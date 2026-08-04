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
        "image": {
            "@type": "ImageObject",
            "url": "https://amankumarr.in/about-image.png",
            "width": 1200,
            "height": 630
        },
        "jobTitle": "Full Stack Engineer",
        "description": "Full Stack Engineer with 2+ years of professional experience specializing in the MERN stack, Next.js, and TypeScript. Creator of SnippetsX, TomatoAI, and Awasdhara.",
        "nationality": {
            "@type": "Country",
            "name": "India"
        },
        "knowsAbout": [
            "React", "Next.js", "Node.js", "TypeScript", "JavaScript", "MongoDB",
            "Express.js", "Redux.js", "MERN Stack", "SaaS Development", "Full Stack Development",
            "Web Performance", "Docker", "REST APIs", "Tailwind CSS", "Git"
        ],
        "knowsLanguage": ["English", "Hindi"],
        "sameAs": [
            "https://github.com/Amankumar-007",
            "https://www.linkedin.com/in/amankumarweb/"
        ],
        "worksFor": {
            "@type": "Organization",
            "name": "StartupCoaching",
            "url": "https://startupcoaching.in"
        },
        "alumniOf": [
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
            "skills": "React, Next.js, Node.js, TypeScript, MongoDB, Redux.js, MERN Stack"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "email": "amanr3388@gmail.com",
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
