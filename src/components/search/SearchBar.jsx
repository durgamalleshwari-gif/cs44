import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Search, X, Command, Mic, Square } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSpeechToText } from '@/hooks/useSpeechToText'
import { useTextToSpeech } from '@/hooks/useTextToSpeech'

import { searchVoiceAnswer } from "@/lib/searchVoiceAnswer"


export default function SearchBar({ onSearch, variant = 'navbar' }) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const debounceRef = useRef(null)
const { speak } = useTextToSpeech()
const isVoiceInput = useRef(false)

const updateQuery = (value, debounce = true) => {
  setQuery(value)
  if (debounceRef.current) clearTimeout(debounceRef.current)

  if (debounce) {
    debounceRef.current = setTimeout(() => {
      onSearch?.(value)
    }, 300)
    return
  }

  onSearch?.(value)
}
  const { supported: sttSupported, listening, start, stop } = useSpeechToText({
  onResult: (text) => {
        isVoiceInput.current = true

    setQuery(text)
    
    updateQuery(text, false)
  },
})

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
      if (e.key === 'Escape') {
        inputRef.current?.blur()
        setFocused(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])


  const handleChange = (e) => {
    updateQuery(e.target.value)
  }
// const { speak } = useTextToSpeech()
useEffect(() => {
  if (!query) return

  if (!isVoiceInput.current) return

  const timeout = setTimeout(async () => {
    console.log("VOICE AUTO TRIGGER:", query)

    const result = await searchVoiceAnswer(query)

    window.speechSynthesis.cancel()

    if (result?.answer) {
      speak(result.answer)
    } else {
      speak("Sorry, I couldn't find an answer.")
    }

    isVoiceInput.current = false
  }, 800)

  return () => clearTimeout(timeout)
}, [query])
const handleSubmit = async (e) => {
  e.preventDefault()

  const trimmed = query.trim()
  if (!trimmed) return

  isVoiceInput.current = true

  console.log("VOICE INPUT:", isVoiceInput.current)
  console.log("QUERY:", trimmed)

  const result = await searchVoiceAnswer(trimmed)

  console.log("SEARCH RESULT:", result)

  window.speechSynthesis.cancel()

  if (isVoiceInput.current && result?.answer) {
    speak(result.answer)
  } else if (isVoiceInput.current) {
    speak("Sorry, I couldn’t find an answer. Try asking differently.")
  }

  isVoiceInput.current = false

  onSearch?.(trimmed)
}
  const clearQuery = () => {
    updateQuery('', false)
    inputRef.current?.focus()
  }

  const toggleDictation = () => {
    if (!sttSupported) return
    if (listening) {
      stop()
      return
    }
     // 🔊 stop voice output when user starts speaking again
  window.speechSynthesis?.cancel()

    inputRef.current?.focus()
    start()
  }

  const isNavbar = variant === 'navbar'

  return (
    <form onSubmit={handleSubmit} className={isNavbar ? 'relative' : 'relative w-full max-w-2xl mx-auto'}>
      <motion.div
        animate={{
          width: isNavbar && focused ? '320px' : isNavbar ? '260px' : '100%',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative"
      >
        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 ${isNavbar ? 'w-4 h-4' : 'w-5 h-5'}`} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          
          onBlur={() => {
  setTimeout(() => setFocused(false), 150)
}}
          placeholder={isNavbar ? 'Search...' : 'Search questions, topics, tags...'}
          className={`
            w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700
            text-slate-900 dark:text-white placeholder-slate-400
            focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white dark:focus:bg-slate-800
            outline-none transition-all duration-300
            ${isNavbar
              ? 'pl-9 pr-20 py-2 text-sm rounded-full'
              : 'pl-12 pr-12 py-4 text-base rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50'
            }
          `}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {listening && (
    <div className="absolute -top-6 right-0 text-xs text-white-500 animate-pulse whitespace-nowrap">
      🎙 Listening...
    </div>
  )}
          {query && (
            <button
              type="button"
              onClick={clearQuery}
              className="p-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <X className={`text-slate-400 ${isNavbar ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
            </button>
          )}
          <button
            type="button"
            onClick={toggleDictation}
            disabled={!sttSupported}
            className={`p-0.5 rounded transition-colors ${
              sttSupported
                ? 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400'
                : 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
            }`}
            aria-label={listening ? 'Stop voice typing' : 'Start voice typing'}
            title={sttSupported ? (listening ? 'Stop voice typing' : 'Start voice typing') : 'Voice typing not supported'}
          >
            {listening ? (
              <Square className={`${isNavbar ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
            ) : (
              <Mic className={`${isNavbar ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
            )}
          </button>
          {isNavbar && !query && (
            <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-[10px] text-slate-400 font-mono">
              <Command className="w-2.5 h-2.5" />K
            </kbd>
          )}
        </div>
      </motion.div>
    </form>
  )
}

