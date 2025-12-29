import { useRef, useEffect } from 'react'
import { useCarousel } from '../hooks/useCarousel'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import imagelabo from '/assets/imagelabo.jpg'
import imagelabo2 from '/assets/imagelabo2.jpg'
import layout1 from '/assets/layout1.png'

const activities = [
  {
    id: 1,
    date: '15 Mars 2024',
    title: 'Journée portes ouvertes 2024',
    description:
      'Le Complexe Scolaire La Grâce ouvre ses portes le samedi 30 mars de 9h à 17h. Venez découvrir nos installations, rencontrer nos enseignants et découvrir nos programmes.',
    image: imagelabo,
    alt: 'Journée portes ouvertes',
  },
  {
    id: 2,
    date: '10 Mars 2024',
    title: 'Résultats exceptionnels au baccalauréat',
    description:
      'Félicitations à nos élèves de terminale qui ont obtenu 95% de réussite au baccalauréat 2024, avec 60% de mentions. Un résultat qui témoigne de la qualité de notre enseignement.',
    image: imagelabo2,
    alt: 'Résultats exceptionnels',
  },
  {
    id: 3,
    date: '5 Mars 2024',
    title: 'Nouveau laboratoire de sciences',
    description:
      'Inauguration de notre nouveau laboratoire de sciences équipé des dernières technologies. Un espace moderne pour favoriser l\'apprentissage pratique et l\'expérimentation.',
    image: layout1,
    alt: 'Nouveau laboratoire',
  },
]

const Activites = () => {
  const headerRef = useRevealOnScroll()
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Révéler tous les éléments avec la classe "reveal" dans cette section
  useEffect(() => {
    const revealElements = document.querySelectorAll('#activites .reveal')
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
  const { currentIndex, goToSlide, nextSlide, prevSlide, startAutoPlay, stopAutoPlay } = useCarousel(
    activities.length,
    5000
  )

  return (
    <section id="activites" className="section section-alt">
      <div className="container">
        <div className="section-header reveal" ref={headerRef}>
          <h2 className="section-title">Activités</h2>
          <p className="section-subtitle">Découvrez nos dernières actualités et événements</p>
        </div>

        <div
          className="carousel-wrapper reveal"
          ref={wrapperRef}
          onMouseEnter={stopAutoPlay}
          onMouseLeave={startAutoPlay}
        >
          <div className="carousel-container">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {activities.map((activity) => (
                <div key={activity.id} className="activity-card">
                  <div className="activity-card-image">
                    <img src={activity.image} alt={activity.alt} />
                  </div>
                  <div className="activity-card-content">
                    <div className="activity-date">{activity.date}</div>
                    <h3 className="activity-title">{activity.title}</h3>
                    <p className="activity-description">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation du carousel */}
          <button
            className="carousel-btn carousel-btn-prev"
            aria-label="Précédent"
            onClick={prevSlide}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="carousel-btn carousel-btn-next"
            aria-label="Suivant"
            onClick={nextSlide}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Indicateurs */}
          <div className="carousel-indicators">
            {activities.map((_, index) => (
              <button
                key={index}
                className={`carousel-indicator ${currentIndex === index ? 'active' : ''}`}
                aria-label={`Aller à la slide ${index + 1}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Activites

