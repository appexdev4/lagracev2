import { useState, useEffect } from 'react'
import logo2 from '/assets/logo2.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('accueil')

  const navLinks = [
    { id: 'accueil', label: 'Accueil', href: '#accueil' },
    { id: 'apropos', label: 'À Propos', href: '#apropos' },
    { id: 'atouts', label: 'Nos Atouts', href: '#atouts' },
    { id: 'activites', label: 'Activités', href: '#activites' },
    { id: 'divers', label: 'Divers', href: '#divers' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ]

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    let ticking = false
    const sectionData = Array.from(sections).map((section) => ({
      element: section as HTMLElement,
      id: section.getAttribute('id') || 'accueil',
      top: 0,
      height: 0,
    }))

    const updateSectionData = () => {
      sectionData.forEach((data) => {
        data.top = data.element.offsetTop - 100
        data.height = data.element.getBoundingClientRect().height
      })
    }

    const updateActiveNav = () => {
      if (ticking) return
      ticking = true

      requestAnimationFrame(() => {
        const scrollY = window.pageYOffset

        for (const data of sectionData) {
          if (scrollY > data.top && scrollY <= data.top + data.height) {
            setActiveSection(data.id)
            break
          }
        }
        ticking = false
      })
    }

    const handleResize = () => {
      updateSectionData()
      updateActiveNav()
    }

    updateSectionData()
    updateActiveNav()
    window.addEventListener('scroll', updateActiveNav, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateActiveNav)
      window.removeEventListener('resize', handleResize)
    }
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

    if (window.innerWidth <= 768) {
      setIsMenuOpen(false)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <img src={logo2} alt="Complexe Scolaire La Grâce" className="logo-img" />
            <span className="logo-text">La Grâce</span>
          </div>

          <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
            <ul className="nav-list">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                    onClick={(e) => handleLinkClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a href="#contact" className="btn btn-primary" onClick={(e) => handleLinkClick(e, '#contact')}>
            Contact
          </a>

          <button
            className="menu-toggle"
            aria-label="Menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header



