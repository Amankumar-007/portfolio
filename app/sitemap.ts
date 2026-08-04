import { MetadataRoute } from 'next'
import { getAllProjects } from '@/data/projects'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://amankumarr.in'
    const currentDate = new Date().toISOString()

    // Get all actual projects from data
    const projects = getAllProjects()

    // Static routes — only pages that actually exist and return 200
    const staticRoutes = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 1.0
        },
        {
            url: `${baseUrl}/about`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.9
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.9
        },
        {
            url: `${baseUrl}/skills`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.8
        },
        {
            url: `${baseUrl}/career`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.8
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.7
        },
        {
            url: `${baseUrl}/roadmap`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.6
        }
    ]

    // Dynamic project detail pages
    const projectRoutes = projects.map((project) => ({
        url: `${baseUrl}/projects/${project.id}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.7
    }))

    return [...staticRoutes, ...projectRoutes]
}
