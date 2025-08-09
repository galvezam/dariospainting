type Theme = 'light' | 'dark'

export function getStoredTheme(): Theme | null {
  const t = localStorage.getItem('theme')
  return t === 'light' || t === 'dark' ? t : null
}

export function getPreferredTheme(): Theme {
  const stored = getStoredTheme()
  if (stored) return stored
  const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  return system
}

export function applyTheme(t: Theme) {
  const root = document.documentElement
  if (t === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')
  localStorage.setItem('theme', t)
}
