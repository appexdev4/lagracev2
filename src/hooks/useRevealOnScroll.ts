import { useEffect, useRef } from 'react'

export const useRevealOnScroll = (delay: number = 0) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const revealPoint = 150
    let ticking = false
    let isRevealed = false

    const revealOnScroll = () => {
      if (isRevealed || ticking) return
      
      ticking = true
      requestAnimationFrame(() => {
        const windowHeight = window.innerHeight
        const elementTop = element.getBoundingClientRect().top
        
        if (elementTop < windowHeight - revealPoint) {
          element.classList.add('active')
          isRevealed = true
        }
        
        ticking = false
      })
    }

    const handleResize = () => {
      if (isRevealed) return
      revealOnScroll()
    }

    // Vérifier immédiatement si l'élément est déjà visible
    revealOnScroll()
    
    window.addEventListener('scroll', revealOnScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('scroll', revealOnScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return elementRef
}



