import { useState, useEffect, useRef } from 'react'

export const useCarousel = (totalSlides: number, autoPlayInterval: number = 5000) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goToSlide = (index: number) => {
    // Ajouter will-change juste avant la transition
    const track = document.querySelector('.carousel-track') as HTMLElement
    if (track) {
      track.style.willChange = 'transform'
      setTimeout(() => {
        track.style.willChange = 'auto'
      }, 500)
    }
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    // Ajouter will-change juste avant la transition
    const track = document.querySelector('.carousel-track') as HTMLElement
    if (track) {
      track.style.willChange = 'transform'
      setTimeout(() => {
        track.style.willChange = 'auto'
      }, 500)
    }
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    // Ajouter will-change juste avant la transition
    const track = document.querySelector('.carousel-track') as HTMLElement
    if (track) {
      track.style.willChange = 'transform'
      setTimeout(() => {
        track.style.willChange = 'auto'
      }, 500)
    }
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(nextSlide, autoPlayInterval)
  }

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    const startAutoPlay = () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides)
      }, autoPlayInterval)
    }

    startAutoPlay()

    // Pause quand la fenêtre n'est pas visible
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAutoPlay()
      } else {
        startAutoPlay()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      stopAutoPlay()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [totalSlides, autoPlayInterval])

  return {
    currentIndex,
    goToSlide,
    nextSlide,
    prevSlide,
    startAutoPlay,
    stopAutoPlay,
  }
}

