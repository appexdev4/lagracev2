import { useEffect, useMemo } from 'react'
import { useCarousel } from '../hooks/useCarousel'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import opendoor from '/assets/opendoor.jpg'
import result from '/assets/result.jpg'
import lab from '/assets/LAB.jpg'
import journalisme from '/assets/journalisme.jpg'
import dicte from '/assets/dicte.jpg'
import appellation from '/assets/appellation.jpg'

const activities = [
  {
    id: 1,
    date: '15 Mars 2024',
    title: 'Journée portes ouvertes 2024',
    description:
      'Le Complexe Scolaire La Grâce ouvre ses portes le samedi 30 mars de 9h à 17h. Venez découvrir nos installations, rencontrer nos enseignants et découvrir nos programmes.',
    image: opendoor,
    alt: 'Journée portes ouvertes',
  },
  {
    id: 2,
    date: '10 Mars 2024',
    title: 'Résultats exceptionnels au baccalauréat',
    description:
      'Félicitations à nos élèves de terminale qui ont obtenu 95% de réussite au baccalauréat 2024, avec 60% de mentions. Un résultat qui témoigne de la qualité de notre enseignement.',
    image: result,
    alt: 'Résultats exceptionnels',
  },
  {
    id: 3,
    date: '5 Mars 2024',
    title: 'Nouveau laboratoire de sciences',
    description:
      'Inauguration de notre nouveau laboratoire de sciences équipé des dernières technologies. Un espace moderne pour favoriser l\'apprentissage pratique et l\'expérimentation.',
    image: lab,
    alt: 'Nouveau laboratoire',
  },
]

const jeuxEtConcours = [
  {
    id: 1,
    title: 'Concours de Journalisme',
    description:
      'Participez à notre concours de journalisme annuel ! Les élèves peuvent exprimer leur créativité à travers l\'écriture d\'articles, de reportages et d\'interviews. Une excellente opportunité pour développer les compétences en communication et en expression écrite.',
    image: journalisme,
    alt: 'Concours de Journalisme',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Concours de Dictée',
    description:
      'Testez vos compétences orthographiques et grammaticales lors de notre concours de dictée. Ouvert à tous les niveaux, ce concours encourage l\'excellence en français et récompense les meilleurs participants.',
    image: dicte,
    alt: 'Concours de Dictée',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Concours d\'Appellation',
    description:
      'Défiez votre vocabulaire et votre culture générale avec notre concours d\'appellation. Les participants doivent identifier et nommer correctement des objets, concepts et personnalités. Un défi intellectuel stimulant pour tous les élèves.',
    image: appellation,
    alt: 'Concours d\'Appellation',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
]

const Activites = () => {
  const headerRef = useRevealOnScroll()
  const { currentIndex, goToSlide, nextSlide, prevSlide, startAutoPlay, stopAutoPlay } = useCarousel(
    activities.length,
    5000
  )

  const trackTransform = useMemo(() => `translateX(-${currentIndex * 100}%)`, [currentIndex])

  // IntersectionObserver unique pour toute la section
  useEffect(() => {
    const revealElements = document.querySelectorAll('#activites .reveal')
    if (revealElements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
            setTimeout(() => {
              entry.target.classList.add('animation-complete')
            }, 400)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    revealElements.forEach((element) => observer.observe(element))

    return () => {
      observer.disconnect()
    }
  }, [])

  // Précharger UNIQUEMENT l'image suivante, de manière optimisée
  useEffect(() => {
    const timer = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % activities.length
      const nextImage = activities[nextIndex]?.image
      if (nextImage && typeof nextImage === 'string') {
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.as = 'image'
        link.href = nextImage
        document.head.appendChild(link)
      }
    }, 500) // Délai pour ne pas bloquer le rendu

    return () => clearTimeout(timer)
  }, [currentIndex])

  return (
    <section id="activites" className="section section-alt">
      <div className="container">
        <div className="section-header reveal" ref={headerRef}>
          <h2 className="section-title">Activités</h2>
          <p className="section-subtitle">Découvrez nos dernières actualités et événements</p>
        </div>

        <div
          className="carousel-wrapper reveal"
          onMouseEnter={stopAutoPlay}
          onMouseLeave={startAutoPlay}
        >
          <div className="carousel-container">
            <div
              className="carousel-track"
              style={{ transform: trackTransform }}
            >
              {activities.map((activity, index) => (
                <div key={activity.id} className="activity-card">
                  <div className="activity-card-image">
                    <img 
                      src={activity.image} 
                      alt={activity.alt} 
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "low"}
                      decoding="async"
                      onLoad={(e) => {
                        const target = e.target as HTMLImageElement
                        target.classList.add('loaded')
                      }}
                    />
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

        {/* Section Jeux et Concours */}
        <div className="jeux-concours-section reveal">
          <h3 className="jeux-concours-title">Jeux et concours organisés</h3>
          <div className="jeux-concours-grid">
            {jeuxEtConcours.map((concours) => (
              <div key={concours.id} className="concours-card">
                <div className="concours-card-image">
                  <img 
                    src={concours.image} 
                    alt={concours.alt} 
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                    onLoad={(e) => {
                      const target = e.target as HTMLImageElement
                      target.classList.add('loaded')
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                  />
                  <div className="concours-icon-overlay">
                    {concours.icon}
                  </div>
                </div>
                <div className="concours-card-content">
                  <h4 className="concours-title">{concours.title}</h4>
                  <p className="concours-description">{concours.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Activites

