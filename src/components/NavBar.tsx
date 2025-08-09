import { Paintbrush } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NavBar({ onQuote }: { onQuote: () => void }) {
  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Estimator', href: '#estimator' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <div className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b dark:bg-slate-950/80 dark:supports-[backdrop-filter]:bg-slate-950/60 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 grid place-items-center shadow animate-floaty">
            <Paintbrush className="h-5 w-5 text-white" />
          </div>
          <span className="font-extrabold tracking-tight text-lg text-blue-900 dark:text-blue-200">Dario&apos;s Painting</span>
        </a>

        {/* desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-slate-700 hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-300 transition-colors">
              {l.label}
            </a>
          ))}
          <Button onClick={onQuote} className="bg-blue-600 hover:bg-blue-700">Get a Quote</Button>
          <ThemeToggle />
        </div>

        {/* mobile */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <a href="#contact" className="rounded-xl border px-3 py-1.5 text-sm text-slate-700 hover:bg-blue-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">Contact</a>
        </div>
      </div>
    </div>
  )
}

function ThemeToggle() {
  return (
    <button
      onClick={() => {
        const root = document.documentElement
        const next = root.classList.contains('dark') ? 'light' : 'dark'
        root.classList.toggle('dark', next === 'dark')
        localStorage.setItem('theme', next)
      }}
      title="Toggle dark mode"
      className="rounded-xl border px-3 py-1.5 text-sm text-slate-700 hover:bg-blue-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
    >
      🌙/☀️
    </button>
  )
}
