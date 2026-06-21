import { useEffect, useRef, useState } from 'react'

export function useTextToSpeech() {
  const [supported, setSupported] = useState(false)
  const [speakingId, setSpeakingId] = useState(null)
  const [error, setError] = useState(null)
  const utteranceRef = useRef(null)

useEffect(() => {
  if ('speechSynthesis' in window) {
    setSupported(true)
  } else {
    setSupported(false)
  }

  return () => {
    window.speechSynthesis?.cancel()
  }
}, [])

  const stop = () => {
    window.speechSynthesis?.cancel()
    setSpeakingId(null)
      setError(null)
  }

  const speak = (text, id = 'default') => {
    if (!('speechSynthesis' in window)|| !text) return

    stop()
    setError(null)

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.onend = () => {
      setSpeakingId(null)
    }
    utterance.onerror = () => {
      setError('synthesis-failed')
      setSpeakingId(null)
    }

    utteranceRef.current = utterance
    setSpeakingId(id)
    window.speechSynthesis?.speak(utterance)
  }

  return {
    supported,
    speakingId,
    error,
    speak,
    stop,
  }
}
