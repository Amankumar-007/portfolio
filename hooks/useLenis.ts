import { useEffect, useState } from 'react'

export const useLenis = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadLenis = async () => {
      try {
        // Import the Lenis configuration
        await import('@/lib/lenis-scroll.js')
        
        // Set loading to false after a short delay
        setTimeout(() => {
          setIsLoading(false)
          document.body.style.cursor = 'default'
          window.scrollTo(0, 0)
        }, 800)
      } catch (error) {
        console.error('Error loading Lenis:', error)
        setIsLoading(false)
      }
    }

    loadLenis()
  }, [])

  return { isLoading }
}
