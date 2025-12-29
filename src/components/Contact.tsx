import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.nom || !formData.email || !formData.sujet || !formData.message) {
      alert('Veuillez remplir tous les champs obligatoires.')
      return
    }

    // Simulation d'envoi (à remplacer par un vrai envoi)
    console.log('Données du formulaire de contact:', formData)

    // Message de confirmation
    alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.')
    setFormData({
      nom: '',
      email: '',
      sujet: '',
      message: '',
    })
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Contact</h2>
          <p className="section-subtitle">Nous sommes à votre écoute</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h4>Adresses</h4>
                <div className="address-list">
                  <div className="address-item">
                    <strong>Site 01 :</strong> Makélékélé<br />
                    <span className="address-detail">Quartier : Quartier Chic</span>
                  </div>
                  <div className="address-item">
                    <strong>Site 02 :</strong> Makélékélé<br />
                    <span className="address-detail">Adresse : 1199, Rue Samba-Ndongo</span>
                  </div>
                  <div className="address-item">
                    <strong>Site 03 :</strong> Madibou<br />
                    <span className="address-detail">Adresse : 2, Rue Nkouka-Boussongo</span>
                    <br />
                    <span className="address-detail">Référence : Arrêt Faubourt</span>
                  </div>
                  <div className="address-item">
                    <strong>Site 02 (bis) :</strong> Kinsoundi<br />
                    <span className="address-detail">Référence : En face de l'Arrêt Manguier</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h4>Téléphone</h4>
                <p>+242 05 042 4731</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h4>Email</h4>
                <p>complexescolairelagrace04@gmail.com</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4>Horaires</h4>
                <p>
                  Lundi - Vendredi : 8h00 - 17h00<br />
                  Samedi : 9h00 - 12h00
                </p>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <div className="card">
              <h3>Envoyez-nous un message</h3>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="contact-nom">Nom complet *</label>
                  <input
                    type="text"
                    id="contact-nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Email *</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-sujet">Sujet *</label>
                  <input
                    type="text"
                    id="contact-sujet"
                    name="sujet"
                    value={formData.sujet}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message">Message *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact



