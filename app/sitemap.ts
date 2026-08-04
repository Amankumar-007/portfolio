import { MetadataRoute } from 'next'
import { getAllProjects } from '@/data/projects'
import { getAllThoughts } from '@/data/thoughts'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://amankumarr.in'
    const currentDate = new Date().toISOString()

    // Get all actual projects from data
    const projects = getAllProjects()
    const thoughts = getAllThoughts()

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
        },
        {
            url: `${baseUrl}/experience`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.8
        },
        {
            url: `${baseUrl}/thoughts`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.8
        }
    ]

    // Dynamic project detail pages
    const projectRoutes = projects.map((project) => ({
        url: `${baseUrl}/projects/${project.id}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.7
    }))

    // Dynamic thought/article detail pages
    const thoughtRoutes = thoughts.map((thought) => ({
        url: `${baseUrl}/thoughts/${thought.id}`,
        lastModified: thought.date,
        changeFrequency: 'yearly' as const,
        priority: 0.6
    }))

    return [...staticRoutes, ...projectRoutes, ...thoughtRoutes]
}
