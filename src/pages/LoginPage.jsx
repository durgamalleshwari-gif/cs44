import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import LoginForm from '@/components/auth/LoginForm'
import iitLogo from '@/assets/iit_ropar_logo.png'

const pageVariants = {
  initial: { opacity: 0, scale: 0.96, y: 15 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 22 } },
  exit: { opacity: 0, scale: 0.96, y: -15, transition: { duration: 0.2 } },
}

export default function LoginPage() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-6 relative"
    >
      {/* Elegant Vector Wave Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <svg
          className="absolute -top-12 right-0 w-[300px] sm:w-[450px] md:w-[600px] h-[300px] sm:h-[450px] md:h-[600px] text-purple-600/[0.08] dark:text-purple-500/[0.04]"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.18"
          strokeLinecap="round"
        >
          <path d="M100,10 C80,12 60,5 40,15 C20,25 10,45 0,60" />
          <path d="M100,14 C82,16 62,9 42,19 C22,29 12,49 0,64" />
          <path d="M100,18 C84,20 64,13 44,23 C24,33 14,53 0,68" />
          <path d="M100,22 C86,24 66,17 46,27 C26,37 16,57 0,72" />
          <path d="M100,26 C88,28 68,21 48,31 C28,41 18,61 0,76" />
          <path d="M100,30 C90,32 70,25 50,35 C30,45 20,65 0,80" />
          <path d="M100,34 C92,36 72,29 52,39 C32,49 22,69 0,84" />
          <path d="M100,38 C94,40 74,33 54,43 C34,53 24,73 0,88" />
          <path d="M100,42 C96,44 76,37 56,47 C36,57 26,77 0,92" />
          <path d="M100,46 C98,48 78,41 58,51 C38,61 28,81 0,96" />
        </svg>
      </div>

      <div className="w-full max-w-[440px] relative z-10">
        
        {/* Immersive Cyber-Glass Card */}
        <motion.div
          className="backdrop-blur-2xl bg-white/80 dark:bg-zinc-950/35 border border-slate-100 dark:border-zinc-900 rounded-[32px] shadow-2xl dark:shadow-[0_0_50px_-12px_rgba(168,85,247,0.15)] p-8 md:p-10 relative overflow-hidden"
        >
          {/* Subtle inside spotlight */}
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Logo & Headline */}
          <div className="text-center mb-8 pt-6 md:pt-8">
            {/* Institutional Logo */}
            <img
              src={iitLogo}
              alt="IIT Ropar Logo"
              className="w-[80px] sm:w-[100px] md:w-[120px] h-auto object-contain mx-auto mb-6 select-none pointer-events-none drop-shadow-[0_2px_8px_rgba(139,92,246,0.08)] dark:drop-shadow-[0_4px_12px_rgba(168,85,247,0.22)]"
            />
            <h2 className="text-[28px] font-extrabold tracking-tight text-slate-800 dark:text-white flex items-center justify-center gap-1.5 leading-none">
              Access Portal
              <Sparkles className="w-5 h-5 text-purple-500 animate-pulse fill-purple-500/10" />
            </h2>
            <p className="mt-2.5 text-slate-500 dark:text-zinc-400 text-sm font-medium">
              Provide credentials to establish encrypted session.
            </p>
          </div>

          <LoginForm />
        </motion.div>

        {/* Footer Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6 text-sm text-slate-600 dark:text-zinc-400"
        >
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="font-bold text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors underline decoration-purple-500/30 underline-offset-4"
          >
            Create portal account
          </Link>
        </motion.p>
      </div>
    </motion.div>
  )
}
