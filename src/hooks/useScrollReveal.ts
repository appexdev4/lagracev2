import { useEffect, useRef } from 'react'

export const useScrollReveal = () => {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const revealPoint = 150
    let windowHeight = window.innerHeight

    let ticking = false
    let isRevealed = false

    const revealOnScroll = () => {
      if (ticking || isRevealed) return
      ticking = true

      requestAnimationFrame(() => {
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
      windowHeight = window.innerHeight
      revealOnScroll()
    }

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



