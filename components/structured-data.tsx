import React from 'react';

export const StructuredData = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Aman Kumar Portfolio",
        "url": "https://amankumarr.in",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://amankumarr.in/projects?q={search_term_string}",
            "query-input": "required name=search_term_string"
        },
        "sameAs": [
            "https://github.com/Amankumar-007",
            "https://www.linkedin.com/in/amankumarweb/"
        ],
        "description": "Expert Full Stack Developer and SaaS Solutions provider specializing in modern web applications."
    };

    const personData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Aman Kumar",
        "url": "https://amankumarr.in",
        "jobTitle": "Full Stack Developer",
        "knowsAbout": ["Web Development", "React", "Next.js", "Node.js", "SaaS Solutions", "Full Stack Development"],
        "sameAs": [
            "https://github.com/Amankumar-007",
            "https://www.linkedin.com/in/amankumarweb/"
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personData) }}
            />
        </>
    );
};
