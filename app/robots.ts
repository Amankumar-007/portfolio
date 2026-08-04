import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            // Allow Googlebot full access
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: ['/api/', '/_next/'],
            },
            // Allow Bingbot full access
            {
                userAgent: 'Bingbot',
                allow: '/',
                disallow: ['/api/', '/_next/'],
            },
            // Allow social crawlers for OG preview
            {
                userAgent: ['facebookexternalhit', 'Twitterbot', 'LinkedInBot'],
                allow: '/',
            },
            // Generic robots: allow all but disallow internal paths
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/_next/'],
            },
        ],
        sitemap: 'https://amankumarr.in/sitemap.xml',
        host: 'https://amankumarr.in',
    }
}
