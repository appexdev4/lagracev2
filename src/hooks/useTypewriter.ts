import { useEffect, useState, useRef } from 'react'

export const useTypewriter = (text: string, speed: number = 150, deleteSpeed: number = 75) => {
  const [displayText, setDisplayText] = useState('')
  const isDeletingRef = useRef(false)
  const iRef = useRef(0)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const type = () => {
      if (!isDeletingRef.current && iRef.current < text.length) {
        // Écriture
        setDisplayText(text.substring(0, iRef.current + 1))
        iRef.current++
        timeoutId = setTimeout(type, speed)
      } else if (!isDeletingRef.current && iRef.current >= text.length) {
        // Pause avant d'effacer
        isDeletingRef.current = true
        timeoutId = setTimeout(type, 2000)
      } else if (isDeletingRef.current && iRef.current > 0) {
        // Effacement
        setDisplayText(text.substring(0, iRef.current - 1))
        iRef.current--
        timeoutId = setTimeout(type, deleteSpeed)
      } else {
        // Recommencer
        isDeletingRef.current = false
        setDisplayText('')
        iRef.current = 0
        timeoutId = setTimeout(type, 500)
      }
    }

    type()

    return () => {
      clearTimeout(timeoutId)
    }
  }, [text, speed, deleteSpeed])

  return { displayText }
}

