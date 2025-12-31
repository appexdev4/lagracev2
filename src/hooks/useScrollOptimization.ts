import { useEffect } from 'react'

/**
 * Hook pour optimiser les performances pendant le scroll
 * Pause les animations pendant le scroll pour améliorer la fluidité
 */
export const useScrollOptimization = () => {
  useEffect(() => {
    let scrollTimer: ReturnType<typeof setTimeout>

    const handleScroll = () => {
      // Ajouter la classe pendant le scroll
      document.body.classList.add('scrolling')

      // Retirer la classe après 150ms de scroll inactif
      clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => {
        document.body.classList.remove('scrolling')
      }, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimer)
    }
  }, [])
}

