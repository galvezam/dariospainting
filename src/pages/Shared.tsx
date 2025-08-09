import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { sendEmail, TEMPLATES } from '@/lib/email'

export function QuoteModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ok, setOk] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', details: '' })

  async function submit() {
    setError(null); setOk(false)
    if (!form.name || !form.email) {
      setError('Please provide at least your name and email.')
      return
    }
    try {
      setLoading(true)
      await sendEmail(
        {
          from_name: form.name,
          reply_to: form.email,
          phone: form.phone,
          message: form.details,
          subject: 'Quote Request - Dario\'s Painting',
        },
        TEMPLATES.QUOTE
      )
      setOk(true)
      setForm({ name: '', email: '', phone: '', details: '' })
    } catch (e: any) {
      setError(e?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40 grid place-items-center p-4">
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="w-full max-w-lg rounded-3xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-200">Lock in Your Free Quote</h3>
              <button onClick={onClose} className="text-slate-500 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300">✕</button>
            </div>
            <div className="mt-4 grid gap-3">
              <Input placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <Input placeholder="Phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <Textarea placeholder="Address & brief project details" rows={4} value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} />
              <Button onClick={submit} disabled={loading} className="bg-blue-600 hover:bg-blue-700">{loading ? 'Sending…' : 'Submit'}</Button>
              {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
              {ok && <p className="text-sm text-green-600 dark:text-green-400">Thanks! We’ll call you within 1 business day.</p>}
            </div>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">We’ll call you within 1 business day. No spam, ever.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
