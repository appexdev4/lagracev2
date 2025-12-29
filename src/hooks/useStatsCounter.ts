import { useEffect, useState, useRef } from 'react'

export const useStatsCounter = (target: number, suffix: string = '') => {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element || hasStarted) return

    const checkAndAnimate = () => {
      const containerRect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const isVisible = containerRect.top < windowHeight - 100 && containerRect.bottom > 0

      if (isVisible) {
        setHasStarted(true)
        const startTime = Date.now()
        const duration = 2000

        const updateCounter = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / duration, 1)

          const easedProgress =
            progress < 0.5
              ? 2 * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 2) / 2

          const current = Math.floor(easedProgress * target)
          setCount(current)

          if (progress < 1) {
            requestAnimationFrame(updateCounter)
          } else {
            setCount(target)
          }
        }

        updateCounter()
      }
    }

    checkAndAnimate()
    window.addEventListener('scroll', checkAndAnimate)

    return () => {
      window.removeEventListener('scroll', checkAndAnimate)
    }
  }, [target, hasStarted])

  return { count, suffix, elementRef }
}



