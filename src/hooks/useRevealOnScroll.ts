import { useEffect, useRef } from 'react'

export const useRevealOnScroll = (delay: number = 0) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Intersection Observer est beaucoup plus performant que scroll event
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Ajouter un délai si nécessaire
            setTimeout(() => {
              entry.target.classList.add('active')
              // Nettoyer will-change après l'animation pour économiser les ressources
              setTimeout(() => {
                entry.target.classList.add('animation-complete')
              }, 600)
            }, delay)
            // Une fois révélé, on arrête d'observer pour économiser les ressources
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [delay])

  return elementRef
}



