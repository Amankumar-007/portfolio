import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://amankumarr.in'

    // List of all static routes
    const routes = [
        '',
        '/about',
        '/career',
        '/case-study',
        '/contact',
        '/projects',
        '/projects/featured',
        '/roadmap',
        '/skills',
    ]

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : 0.8,
    }))
}
