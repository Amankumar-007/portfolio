import { MetadataRoute } from 'next'
import { getAllProjects } from '@/data/projects'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://amankumarr.in'
    const currentDate = new Date().toISOString()

    // Get all projects
    const projects = getAllProjects()

    // Static routes with different priorities and update frequencies
    const staticRoutes = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'daily' as const,
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
            url: `${baseUrl}/projects/featured`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.8
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
            url: `${baseUrl}/case-study`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
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

    // Generate project detail pages
    const projectRoutes = projects.map((project) => ({
        url: `${baseUrl}/projects/${project.id}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.7
    }))

    // Category-based routes (based on project categories)
    const categories = ['AI Tools', 'Full Stack', 'Web Development', 'Restaurant', 'Mobile App', 'SaaS']
    const categoryRoutes = categories.map((category) => ({
        url: `${baseUrl}/projects/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.6
    }))

    // Technology-based routes (based on project tags)
    const technologies = ['React', 'Node.js', 'TypeScript', 'Next.js', 'MongoDB', 'AI', 'SaaS', 'Mobile']
    const techRoutes = technologies.map((tech) => ({
        url: `${baseUrl}/skills/${tech.toLowerCase()}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.5
    }))

    // Additional useful pages for a portfolio
    const utilityRoutes = [
        {
            url: `${baseUrl}/api/chat`,
            lastModified: currentDate,
            changeFrequency: 'yearly' as const,
            priority: 0.3
        }
    ]

    return [...staticRoutes, ...projectRoutes, ...categoryRoutes, ...techRoutes, ...utilityRoutes]
}
