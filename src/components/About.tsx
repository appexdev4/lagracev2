import { useRef, useEffect } from 'react'
import { useStatsCounter } from '../hooks/useStatsCounter'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

const StatBlob = ({ target, suffix, label, blobClass, delay }: {
  target: number
  suffix: string
  label: string
  blobClass: string
  delay: number
}) => {
  const { count, suffix: suffixValue, elementRef } = useStatsCounter(target, suffix)

  return (
    <div className={`stat-blob ${blobClass} reveal reveal-delay-${delay}`} ref={elementRef}>
      <div className="stat-number">{count}{suffixValue}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

const About = () => {
  const headerRef = useRevealOnScroll()

  // Révéler tous les éléments avec la classe "reveal" dans cette section
  useEffect(() => {
    const revealElements = document.querySelectorAll('#apropos .reveal')
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
    <section id="apropos" className="section section-alt">
      <div className="container">
        <div className="section-header" ref={headerRef}>
          <h2 className="section-title">À propos de notre établissement</h2>
          <p className="section-subtitle">Une institution d'excellence depuis plusieurs décennies</p>
        </div>

        <div className="about-grid">
          <div className="about-content">
            <h3>Notre mission</h3>
            <p>
              Le Complexe Scolaire La Grâce s'engage à offrir une éducation de qualité qui allie excellence académique,
              développement personnel et valeurs humaines. Nous croyons en la capacité de chaque élève à réussir grâce
              à un encadrement rigoureux et bienveillant.
            </p>

            <h3>Nos valeurs</h3>
            <ul className="values-list">
              <li>
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Excellence académique</span>
              </li>
              <li>
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <span>Respect et discipline</span>
              </li>
              <li>
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>Bienveillance</span>
              </li>
              <li>
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span>Innovation pédagogique</span>
              </li>
            </ul>
          </div>

          <div className="about-stats">
            <StatBlob target={500} suffix="+" label="Élèves" blobClass="stat-blob-1" delay={0} />
            <StatBlob target={50} suffix="+" label="Enseignants" blobClass="stat-blob-2" delay={1} />
            <StatBlob target={95} suffix="%" label="Taux de réussite" blobClass="stat-blob-3" delay={2} />
            <StatBlob target={20} suffix="+" label="Années d'expérience" blobClass="stat-blob-4" delay={3} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

