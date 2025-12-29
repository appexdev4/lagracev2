import { useEffect, useRef } from 'react'

export const useRevealOnScroll = (delay: number = 0) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const revealPoint = 150
    const windowHeight = window.innerHeight

    const revealOnScroll = () => {
      const elementTop = element.getBoundingClientRect().top
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active')
      }
    }

    // Vérifier immédiatement si l'élément est déjà visible
    revealOnScroll()
    
    window.addEventListener('scroll', revealOnScroll)
    window.addEventListener('resize', revealOnScroll)

    return () => {
      window.removeEventListener('scroll', revealOnScroll)
      window.removeEventListener('resize', revealOnScroll)
    }
  }, [])

  return elementRef
}



