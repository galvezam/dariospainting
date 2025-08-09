import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Home from '@/pages/Home'
import { QuoteModal } from '@/pages/Shared'
import NavBar from '@/components/NavBar'

export default function App() {
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen bg-white text-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <NavBar onQuote={() => setOpen(true)} />
      <Routes>
        <Route path="/" element={<Home onQuote={() => setOpen(true)} />} />
      </Routes>
      <QuoteModal open={open} onClose={() => setOpen(false)} />
    </div>
  )
}
