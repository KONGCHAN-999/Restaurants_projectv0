import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('theme')
      if (saved) return saved === 'dark'
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  return (
    <button
      onClick={() => setDark(d => !d)}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl ring-1 ring-black/10 dark:ring-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition"
      aria-label="Toggle theme"
    >
      <span className="text-sm">{dark ? 'Dark' : 'Light'}</span>
      <span className="w-8 h-4 rounded-full bg-black/10 dark:bg-white/20 relative">
        <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white dark:bg-gray-900 shadow transition ${dark ? 'right-0.5' : 'left-0.5'}`} />
      </span>
    </button>
  )
}
