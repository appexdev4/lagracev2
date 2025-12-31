import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Atouts from './components/Atouts'
import Activites from './components/Activites'
import Divers from './components/Divers'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import { useScrollOptimization } from './hooks/useScrollOptimization'

function App() {
  // Optimise les performances pendant le scroll
  useScrollOptimization()

  return (
    <>
      <Header />
      <Hero />
      <About />
      <Atouts />
      <Activites />
      <Divers />
      <Contact />
      <Footer />
      <Chatbot />
    </>
  )
}

export default App

