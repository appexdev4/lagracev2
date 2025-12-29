import { useState, useRef, useEffect } from 'react'

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Bonjour ! Je suis l\'assistant virtuel du Complexe Scolaire La Grâce. Comment puis-je vous aider ?',
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Base de connaissances pour les questions fréquentes
  const getResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase().trim()

    // Salutations
    if (message.match(/bonjour|salut|bonsoir|hello|hi/)) {
      return 'Bonjour ! Comment puis-je vous aider concernant le Complexe Scolaire La Grâce ?'
    }

    // Questions sur les cycles
    if (message.match(/cycle|niveau|classe|préscolaire|primaire|collège|lycée|université/)) {
      return 'Notre établissement propose plusieurs cycles : Préscolaire (P1, P2, P3), Primaire (CP, CE1, CE2, CM1, CM2), Collège (6ème, 5ème, 4ème, 3ème), Lycée (2nde, 1ère, Terminale) et Université (en cours de développement).'
    }

    // Questions sur les inscriptions
    if (message.match(/inscription|inscrire|admission|inscrire mon enfant|comment s'inscrire/)) {
      return 'Pour inscrire votre enfant, vous pouvez nous contacter via le formulaire de contact sur le site, ou télécharger les documents (Programmes et Modalités) dans la section Divers. Vous pouvez également nous appeler ou nous rendre visite.'
    }

    // Questions sur les tarifs
    if (message.match(/prix|tarif|coût|frais|scolarité|combien coûte/)) {
      return 'Les tarifs de la scolarité varient selon le cycle. Vous pouvez télécharger le document "Prix de la Scolarité" dans la section Divers pour connaître les tarifs détaillés.'
    }

    // Questions sur les fournitures
    if (message.match(/fourniture|matériel|liste|fournitures scolaires/)) {
      return 'La liste complète des fournitures scolaires est disponible en téléchargement dans la section Divers du site. Elle est organisée par niveau.'
    }

    // Questions sur les activités
    if (message.match(/activité|concours|jeux|journalisme|dictée|appellation/)) {
      return 'Nous organisons plusieurs activités et concours : Concours de Journalisme, Concours de Dictée, et Concours d\'Appellation. Consultez la section Activités pour plus de détails.'
    }

    // Questions sur les atouts
    if (message.match(/laboratoire|salle informatique|enseignant|équipement|atout/)) {
      return 'Notre établissement dispose d\'un laboratoire scientifique moderne, d\'une salle informatique équipée, et d\'une équipe d\'enseignants hautement qualifiés. Consultez la section "Nos Atouts" pour plus d\'informations.'
    }

    // Questions sur les horaires
    if (message.match(/horaire|heure|ouverture|fermeture|quand|à quelle heure/)) {
      return 'Les horaires de l\'établissement sont disponibles sur demande. Veuillez nous contacter pour obtenir ces informations détaillées.'
    }

    // Questions sur le contact
    if (message.match(/contact|téléphone|adresse|email|mail|où|localisation/)) {
      return 'Vous pouvez nous contacter via le formulaire de contact sur le site, ou consulter nos coordonnées dans la section Contact. Nous sommes à votre écoute pour répondre à toutes vos questions.'
    }

    // Questions sur les résultats
    if (message.match(/résultat|baccalauréat|réussite|taux|mention/)) {
      return 'Notre établissement a obtenu d\'excellents résultats avec 95% de réussite au baccalauréat, dont 60% de mentions. Consultez la section Activités pour plus de détails.'
    }

    // Questions par défaut
    if (message.match(/merci|remercier|au revoir|bye/)) {
      return 'De rien ! N\'hésitez pas si vous avez d\'autres questions. Bonne journée !'
    }

    // Réponse par défaut
    return 'Merci pour votre question. Pour des informations plus détaillées, je vous invite à consulter les différentes sections du site ou à nous contacter directement via le formulaire de contact. Comment puis-je vous aider autrement ?'
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')

    // Simuler une réponse après un court délai
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 500)
  }

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
    const userMessage: Message = {
      id: messages.length + 1,
      text: question,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getResponse(question),
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 500)
  }

  const quickQuestions = [
    'Quels sont les cycles proposés ?',
    'Comment s\'inscrire ?',
    'Quels sont les tarifs ?',
    'Où vous contacter ?',
  ]

  return (
    <>
      {/* Bouton flottant pour ouvrir le chatbot */}
      <button
        className={`chatbot-toggle ${isOpen ? 'chatbot-toggle-hidden' : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Ouvrir le chatbot"
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="chatbot-toggle-icon">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      {/* Fenêtre du chatbot */}
      <div className={`chatbot-container ${isOpen ? 'chatbot-open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-header-content">
            <div className="chatbot-avatar">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <div className="chatbot-header-text">
              <h3>Assistant La Grâce</h3>
              <p>En ligne</p>
            </div>
          </div>
          <button
            className="chatbot-close"
            onClick={() => setIsOpen(false)}
            aria-label="Fermer le chatbot"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((message) => (
            <div key={message.id} className={`chatbot-message ${message.isUser ? 'chatbot-message-user' : ''}`}>
              <div className="chatbot-message-content">
                <p>{message.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="chatbot-quick-questions">
            <p className="chatbot-quick-title">Questions fréquentes :</p>
            <div className="chatbot-quick-buttons">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  className="chatbot-quick-btn"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        <form className="chatbot-input-form" onSubmit={handleSendMessage}>
          <input
            ref={inputRef}
            type="text"
            className="chatbot-input"
            placeholder="Tapez votre message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="chatbot-send-btn" aria-label="Envoyer">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </form>
      </div>
    </>
  )
}

export default Chatbot

