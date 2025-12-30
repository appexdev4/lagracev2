import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Précharger les images critiques dès le démarrage de l'application
const preloadCriticalImages = () => {
  const criticalImages = [
    '/assets/opendoor.jpg',
    '/assets/result.jpg',
    '/assets/LAB.jpg',
    '/assets/journalisme.jpg',
    '/assets/dicte.jpg',
    '/assets/appellation.jpg'
  ]
  
  criticalImages.forEach((src, index) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    if (index < 2) {
      link.setAttribute('fetchpriority', 'high')
    }
    document.head.appendChild(link)
    
    // Précharger aussi avec Image() pour le cache
    const img = new Image()
    img.src = src
  })
}

// Précharger immédiatement
preloadCriticalImages()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)



