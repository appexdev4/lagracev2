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

const jeuxEtConcours = [
  {
    id: 1,
    title: 'Concours de Journalisme',
    description:
      'Participez à notre concours de journalisme annuel ! Les élèves peuvent exprimer leur créativité à travers l\'écriture d\'articles, de reportages et d\'interviews. Une excellente opportunité pour développer les compétences en communication et en expression écrite.',
    image: imagelabo,
    alt: 'Concours de Journalisme',
  },
  {
    id: 2,
    title: 'Concours de Dictée',
    description:
      'Testez vos compétences orthographiques et grammaticales lors de notre concours de dictée. Ouvert à tous les niveaux, ce concours encourage l\'excellence en français et récompense les meilleurs participants.',
    image: imagelabo2,
    alt: 'Concours de Dictée',
  },
  {
    id: 3,
    title: 'Concours d\'Appellation',
    description:
      'Défiez votre vocabulaire et votre culture générale avec notre concours d\'appellation. Les participants doivent identifier et nommer correctement des objets, concepts et personnalités. Un défi intellectuel stimulant pour tous les élèves.',
    image: layout1,
    alt: 'Concours d\'Appellation',
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

        {/* Section Jeux et Concours */}
        <div className="jeux-concours-section reveal">
          <h3 className="jeux-concours-title">Jeux et concours organisés</h3>
          <div className="jeux-concours-grid">
            {jeuxEtConcours.map((concours) => (
              <div key={concours.id} className="concours-card">
                <div className="concours-card-image">
                  <img src={concours.image} alt={concours.alt} />
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

