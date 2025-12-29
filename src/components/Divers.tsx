import { useEffect } from 'react'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

const Divers = () => {
  const headerRef = useRevealOnScroll()

  // Révéler tous les éléments avec la classe "reveal" dans cette section
  useEffect(() => {
    const revealElements = document.querySelectorAll('#divers .reveal')
    if (revealElements.length === 0) return

    const revealPoint = 150
    let windowHeight = window.innerHeight
    let ticking = false
    const revealedElements = new Set<Element>()

    const revealOnScroll = () => {
      if (ticking) return
      ticking = true

      requestAnimationFrame(() => {
        revealElements.forEach((element) => {
          if (revealedElements.has(element)) return
          
          const elementTop = element.getBoundingClientRect().top
          if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active')
            revealedElements.add(element)
          }
        })
        ticking = false
      })
    }

    const handleResize = () => {
      windowHeight = window.innerHeight
      revealOnScroll()
    }

    // Vérifier immédiatement au chargement
    setTimeout(revealOnScroll, 100)
    window.addEventListener('scroll', revealOnScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('scroll', revealOnScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const documents = [
    {
      id: 1,
      title: 'Programmes et Modalités',
      description: 'Téléchargez les programmes pédagogiques et les modalités d\'inscription de notre établissement.',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      fileUrl: '/documents/programmes-modalites.pdf',
      fileName: 'programmes-modalites.pdf',
    },
    {
      id: 2,
      title: 'Liste des Fournitures',
      description: 'Consultez la liste complète des fournitures scolaires nécessaires pour chaque niveau.',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      fileUrl: '/documents/liste-fournitures.pdf',
      fileName: 'liste-fournitures.pdf',
    },
    {
      id: 3,
      title: 'Prix de la Scolarité',
      description: 'Découvrez les tarifs et les modalités de paiement pour l\'année scolaire en cours.',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      fileUrl: '/documents/prix-scolarite.pdf',
      fileName: 'prix-scolarite.pdf',
    },
  ]

  const handleDownload = (fileUrl: string, fileName: string) => {
    // Créer un lien temporaire pour télécharger le fichier
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="divers" className="section">
      <div className="container">
        <div className="section-header reveal" ref={headerRef}>
          <h2 className="section-title">Divers</h2>
          <p className="section-subtitle">Téléchargez les documents importants de l'établissement</p>
        </div>

        <div className="divers-grid reveal">
          {documents.map((document) => (
            <div key={document.id} className="document-card">
              <div className="document-icon">{document.icon}</div>
              <h3 className="document-title">{document.title}</h3>
              <p className="document-description">{document.description}</p>
              <button
                className="btn btn-download"
                onClick={() => handleDownload(document.fileUrl, document.fileName)}
                aria-label={`Télécharger ${document.title}`}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="download-icon">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Télécharger
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Divers

