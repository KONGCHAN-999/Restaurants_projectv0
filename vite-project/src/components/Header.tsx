import ThemeToggle from './ThemeToggle'
import { useLocation } from 'react-router-dom'
import {
  ChefHat
} from "lucide-react"

export default function Header() {
  const { pathname } = useLocation()
  const title = pathname.includes('tables') ? 'Manage Tables' : 'Dashboard'
  return (
    <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60 bg-white/90 dark:bg-gray-950/90 border-b border-black/10 dark:border-white/10">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <ChefHat className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bistro Manager</h1>
          </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
