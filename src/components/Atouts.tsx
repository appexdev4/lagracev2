import { useEffect } from 'react'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import laboimg from '/assets/laboimg.jpg'
import salleinfo from '/assets/salleinfo.jpg'
import enseignant from '/assets/enseignant.jpg'

const Atouts = () => {
  const headerRef = useRevealOnScroll()

  // Révéler tous les éléments avec la classe "reveal" dans cette section
  useEffect(() => {
    const revealElements = document.querySelectorAll('#atouts .reveal')
    if (revealElements.length === 0) return

    const revealPoint = 150
    const windowHeight = window.innerHeight

    const revealOnScroll = () => {
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        if (elementTop < windowHeight - revealPoint) {
          element.classList.add('active')
        }
      })
    }

    // Vérifier immédiatement au chargement
    setTimeout(revealOnScroll, 100)
    window.addEventListener('scroll', revealOnScroll)
    window.addEventListener('resize', revealOnScroll)

    return () => {
      window.removeEventListener('scroll', revealOnScroll)
      window.removeEventListener('resize', revealOnScroll)
    }
  }, [])

  return (
    <section id="atouts" className="section">
      <div className="container">
        <div className="section-header reveal" ref={headerRef}>
          <h2 className="section-title">Nos Atouts</h2>
          <p className="section-subtitle">Ce qui fait notre excellence</p>
        </div>

        <div className="atouts-grid">
          {/* Top Left: Image Laboratoire */}
          <div className="atout-image-block reveal">
            <div className="atout-image-wrapper">
              <img src={laboimg} alt="Laboratoire scientifique" />
              <div className="atout-tag atout-tag-orange">Inauguré en 2024</div>
            </div>
          </div>

          {/* Top Right: Texte Laboratoire */}
          <div className="atout-text-block reveal reveal-delay-1">
            <div className="atout-icon-wrapper">
              <svg className="atout-feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <h3 className="atout-feature-title">Laboratoire Scientifique Moderne</h3>
            <p className="atout-feature-desc">
              Notre laboratoire de pointe offre aux élèves une expérience pratique inégalée avec des équipements
              scientifiques modernes pour l'apprentissage des sciences.
            </p>
          </div>

          {/* Bottom Left: Texte Enseignants */}
          <div className="atout-text-block reveal reveal-delay-2">
            <div className="atout-icon-wrapper">
              <svg className="atout-feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v7" />
              </svg>
            </div>
            <h3 className="atout-feature-title">Enseignants Hautement Qualifiés</h3>
            <p className="atout-feature-desc">
              Notre équipe pédagogique est composée d'enseignants expérimentés et passionnés, dédiés à la réussite de
              chaque élève avec des méthodes d'enseignement innovantes.
            </p>
          </div>

          {/* Bottom Right: Image Enseignant */}
          <div className="atout-image-block reveal reveal-delay-3">
            <div className="atout-image-wrapper">
              <img src={enseignant} alt="Enseignant en cours" />
              <div className="atout-tag atout-tag-orange">Excellence pédagogique</div>
            </div>
          </div>

          {/* Third Row Left: Image Salle Informatique */}
          <div className="atout-image-block reveal reveal-delay-4">
            <div className="atout-image-wrapper">
              <img src={salleinfo} alt="Salle informatique" />
              <div className="atout-tag atout-tag-orange">Équipements modernes</div>
            </div>
          </div>

          {/* Third Row Right: Texte Salle Informatique */}
          <div className="atout-text-block reveal reveal-delay-5">
            <div className="atout-icon-wrapper">
              <svg className="atout-feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="atout-feature-title">Salle Informatique Moderne</h3>
            <p className="atout-feature-desc">
              Notre salle informatique équipée d'ordinateurs performants permet aux élèves de maîtriser les outils
              numériques et de développer leurs compétences technologiques dans un environnement adapté.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Atouts

