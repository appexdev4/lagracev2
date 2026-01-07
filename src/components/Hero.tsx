import { useTypewriter } from '../hooks/useTypewriter'
import { useState, useEffect } from 'react'

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false)
  const { displayText } = useTypewriter('La Grâce', 150, 75)

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.substring(1)
    const targetSection = document.getElementById(targetId)

    if (targetSection) {
      const header = document.querySelector('.header') as HTMLElement
      const headerHeight = header?.offsetHeight || 0
      const targetPosition = targetSection.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section id="accueil" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Complexe Scolaire {isMobile ? (
              <span className="logo-text-static">La Grâce</span>
            ) : (
              <span className="typewriter-text">{displayText}</span>
            )}
          </h1>
          <p className="hero-subtitle">Excellence académique par le travail et la discipline</p>
          <p className="hero-description">
            Le Complexe Scolaire La Grâce accompagne chaque élève vers l'excellence par le travail et la discipline.
            Notre mission est de former des citoyens responsables, compétents et épanouis.
          </p>
          <div className="hero-cta">
            <a href="#atouts" className="btn btn-primary btn-large" onClick={(e) => handleLinkClick(e, '#atouts')}>
              Découvrir nos atouts
            </a>
            <a href="#apropos" className="btn btn-secondary btn-large" onClick={(e) => handleLinkClick(e, '#apropos')}>
              En savoir plus
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero



