import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Star, Phone, Mail, MapPin, Clock, Sparkles, Building2, Home as HomeIcon, ChevronRight, DollarSign, Ruler, Palette, Users, Paintbrush } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { useMemo, useState, useEffect } from 'react'
import { sendEmail, TEMPLATES } from '@/lib/email'

const brandBlue = '#1B4B9B'

const palette = [
  { name: 'Beale Blue', hex: '#1E3A8A' },
  { name: 'River White', hex: '#F8FAFC' },
  { name: 'Sky Pop', hex: '#60A5FA' },
  { name: 'Midtown Steel', hex: '#64748B' },
  { name: 'Grit & Grind', hex: '#0EA5E9' },
]

type Quality = 'standard' | 'premium' | 'deluxe'

export default function Home({ onQuote }: { onQuote: () => void }) {
  return (
    <>
      <Hero onQuote={onQuote} />
      <Services />
      <Estimator />
      <Gallery />
      <Reviews />
      <AboutSection />
      <Contact />
      <Footer />
      <FloatingCTA onQuote={onQuote} />
      <ScrollToTop />
    </>
  )
}

function GradientBackdrop() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(circle at center, #60A5FA, transparent 60%)' }} />
      <div className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(circle at center, #1B4B9B, transparent 60%)' }} />
      <div className="absolute inset-0 bg-[radial-gradient(1000px_400px_at_50%_-10%,rgba(96,165,250,0.15),transparent)] dark:bg-[radial-gradient(1000px_400px_at_50%_-10%,rgba(59,130,246,0.15),transparent)]" />
    </div>
  )
}

function Hero({ onQuote }: { onQuote: () => void }) {
  return (
    <section id="home" className="relative overflow-hidden">
      <GradientBackdrop />
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">Memphis Area • Germantown • Collierville</Badge>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-blue-900 dark:text-blue-200 leading-tight">
            Dario&apos;s Painting: <span className="gradient-text">Memphis Quality, Bold Results</span>
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300 text-lg">
            Crisp lines. Smooth finishes. Zero stress. We bring premium blue-and-white aesthetics to homes and businesses across the 901.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={onQuote} className="bg-blue-600 hover:bg-blue-700">
              <Sparkles className="mr-2 h-4 w-4" /> Get Instant Estimate
            </Button>
            <a href="#services">
              <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:border-slate-700 dark:hover:bg-slate-800">
                Explore Services <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-6 text-center">
            {[
              { icon: <Star className="h-5 w-5" />, label: '4.9★ Avg Rating' },
              { icon: <Clock className="h-5 w-5" />, label: 'On-Time, On-Budget' },
              { icon: <ShieldIcon />, label: 'Licensed & Insured' },
            ].map((i, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 8, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="rounded-2xl border bg-white/70 dark:bg-slate-900/70 dark:border-slate-800 p-4"
              >
                <div className="grid place-items-center text-blue-700 dark:text-blue-300">{i.icon}</div>
                <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-200">{i.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hide the extra hero image on mobile to prevent the “extra picture under banner” */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative hidden md:block">
          <div className="relative rounded-3xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-4 shadow-xl">
            <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-blue-100 via-white to-blue-50 dark:from-blue-900/30 dark:via-slate-900 dark:to-blue-900/10 grid place-items-center overflow-hidden">
              <motion.div animate={{ rotate: [0, 2, -2, 0] }} transition={{ repeat: Infinity, duration: 8 }} className="text-center p-6">
                <Paintbrush className="h-16 w-16 mx-auto text-blue-700 dark:text-blue-300" />
                <p className="mt-4 text-blue-900 dark:text-blue-200 font-bold text-xl">Flawless Finishes</p>
                <p className="text-slate-600 dark:text-slate-300">Premium prep • Low-VOC paints • Clean job sites</p>
              </motion.div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <Stat label="Projects" value="1,200+" />
              <Stat label="Years in 901" value="10" />
              <Stat label="Repeat Clients" value="68%" />
              <Stat label="Avg Turnaround" value="3–5 days" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-blue-700 dark:text-blue-300" fill="currentColor">
      <path d="M12 2l7 4v6c0 5-3.8 9.7-7 10-3.2-.3-7-5-7-10V6l7-4z" />
    </svg>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-blue-50/50 dark:bg-blue-900/20 dark:border-slate-800 p-4">
      <p className="text-xs uppercase tracking-wide text-blue-700 dark:text-blue-300">{label}</p>
      <p className="text-lg font-bold text-blue-900 dark:text-blue-200">{value}</p>
    </div>
  )
}

function AboutSection() {
  const items = [
    { year: '2015', text: 'Dario starts serving Memphis homeowners with a focus on prep and clean lines.' },
    { year: '2017', text: 'Expanded into exterior and deck refinishing; added dustless sanding.' },
    { year: '2020', text: 'Launched cabinet refinishing program and realtor make-ready packages.' },
    { year: '2024', text: 'Crossed 1,000+ completed projects with 4.9★ average rating.' },
  ]
  return (
    <section id="about" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 dark:text-blue-200">About Dario&apos;s Painting</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Locally owned in Memphis. We obsess over prep, punctuality, and pride in the finish.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-blue-100 dark:border-slate-800">
          <CardHeader><CardTitle className="text-blue-900 dark:text-blue-200">Our Mission</CardTitle></CardHeader>
          <CardContent className="text-slate-700 dark:text-slate-300">We transform homes with craftsmanship and care, delivering stress-free projects that feel as good as they look.</CardContent>
        </Card>
        <Card className="border-blue-100 dark:border-slate-800">
          <CardHeader><CardTitle className="text-blue-900 dark:text-blue-200">Our Promise</CardTitle></CardHeader>
          <CardContent className="text-slate-700 dark:text-slate-300">Clear communication, tidy job sites, premium paints, and finishes that last.</CardContent>
        </Card>
      </div>
      <div className="mt-8 relative pl-6">
        <div className="absolute left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-sky-500 rounded-full" />
        <div className="space-y-4">
          {items.map((it, idx) => (
            <motion.div key={it.year} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: idx * 0.05 }} className="ml-4">
              <Card className="border-blue-100 dark:border-slate-800">
                <CardHeader><CardTitle className="text-blue-900 dark:text-blue-200">{it.year}</CardTitle></CardHeader>
                <CardContent className="text-slate-700 dark:text-slate-300">{it.text}</CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services() {
  const items = [
    { icon: <HomeIcon className="h-5 w-5" />, title: 'Interior Painting', desc: 'Walls, ceilings, trim, cabinets — pristine results with dust-free sanding.' },
    { icon: <Building2 className="h-5 w-5" />, title: 'Exterior Painting', desc: 'Weatherproof finishes built for Memphis heat, humidity, and storms.' },
    { icon: <Palette className="h-5 w-5" />, title: 'Color Consultation', desc: 'Try palettes with our live preview and samples.' },
    { icon: <Ruler className="h-5 w-5" />, title: 'Drywall & Repairs', desc: 'Patching, texture match, caulk & prep so paint looks perfect.' },
    { icon: <Users className="h-5 w-5" />, title: 'HOA & Realtor Ready', desc: 'Make-ready packages that sell homes faster.' },
    { icon: <DollarSign className="h-5 w-5" />, title: 'Financing & Bundles', desc: 'Pay over time and save with seasonal bundles.' },
  ]
  return (
    <section id="services" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 dark:text-blue-200">Services</h2>
        <p className="text-slate-600 dark:text-slate-300">Residential & light commercial painting with a premium touch</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it) => (
          <motion.div key={it.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
            <Card className="border-blue-100 dark:border-slate-800 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 text-blue-700 dark:text-blue-300">
                  {it.icon}
                  <CardTitle className="text-blue-900 dark:text-blue-200">{it.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300">{it.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/** RATES tuned from typical US/TN ranges; tweak as needed */
const rates = {
  standard: { interior: 2.4, exterior: 1.6, trimFactor: 0.6, cabinetPer: 95, wash: 0.20 },
  premium:  { interior: 3.0, exterior: 2.2, trimFactor: 0.7, cabinetPer: 120, wash: 0.35 },
  deluxe:   { interior: 3.8, exterior: 3.0, trimFactor: 0.75, cabinetPer: 150, wash: 0.50 },
}

function Estimator() {
  const [sqft, setSqft] = useState<number>(1500)
  const [rooms, setRooms] = useState<number>(6)
  const [exterior, setExterior] = useState<boolean>(false)
  const [includeTrim, setIncludeTrim] = useState<boolean>(true)
  const [cabinets, setCabinets] = useState<boolean>(false)
  const [cabinetOpenings, setCabinetOpenings] = useState<number | ''>(0)
  const [pressureWash, setPressureWash] = useState<boolean>(false)
  const [washSqft, setWashSqft] = useState<number | ''>(800)
  const [quality, setQuality] = useState<Quality>('premium')
  const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))
  const chartColors = [
  '#1B4B9B', // brand blue
  '#60A5FA', // light blue
  '#34D399', // teal/green
  '#FBBF24', // amber
  '#F87171', // red
  '#A78BFA', // purple
  '#F472B6', // pink
  ]
  
  const estimate = useMemo(() => {
    const safeSqft = Math.max(0, sqft | 0)
    const safeRooms = Math.max(0, rooms | 0)
    const safeOpenings = Math.max(0, typeof cabinetOpenings === 'number' ? cabinetOpenings : 0)
    const safeWash = pressureWash ? Math.max(0, typeof washSqft === 'number' ? washSqft : 0) : 0
    const r = rates[quality]
    
    const base = 199
    const interiorCost = safeSqft * r.interior * (includeTrim ? 1 + r.trimFactor : 1)
    const exteriorCost = exterior ? safeSqft * r.exterior : 0
    const roomDetail = safeRooms * 30
    const cabs = cabinets ? safeOpenings * r.cabinetPer : 0
    const wash = pressureWash ? safeWash * r.wash : 0
    
    const total = Math.round(base + interiorCost + exteriorCost + roomDetail + cabs + wash)
    return { total, breakdown: { base, interiorCost: Math.round(interiorCost), exteriorCost: Math.round(exteriorCost), cabs, roomDetail, wash } }
  }, [sqft, rooms, exterior, includeTrim, cabinets, cabinetOpenings, pressureWash, washSqft, quality])

  // Rebuild the wheel from the current estimate breakdown
  const chartData = useMemo(() => {
    if (!estimate?.breakdown) return []
    const { interiorCost, exteriorCost, cabs, roomDetail, base, wash } = estimate.breakdown
    return [
      { name: 'Interior', value: interiorCost },
      { name: 'Exterior', value: exteriorCost },
      { name: 'Cabinets', value: cabs },
      { name: 'Pressure Wash', value: wash },
      { name: 'Rooms/Base', value: roomDetail + base },
    ].filter(d => d.value > 0)
  }, [estimate])

  const pieKey = `${sqft}-${rooms}-${exterior}-${includeTrim}-${cabinets}-${cabinetOpenings}-${pressureWash}-${washSqft}-${quality}`

  return (
    <section id="estimator" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 dark:text-blue-200">Instant Estimate</h2>
        <p className="text-slate-600 dark:text-slate-300">Get a fast ballpark — we’ll confirm with a free on-site visit</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* FORM CARD: tuned for phones */}
        <Card className="border-blue-100 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-blue-900 dark:text-blue-200">Tell us about your project</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Square Footage</label>
                <Input type="number" min={300} max={6000} step={50} value={sqft} onChange={(e) => setSqft(parseInt(e.target.value || '0', 10))} />
                <input type="range" min={300} max={6000} step={50} value={sqft} onChange={(e) => setSqft(parseInt(e.target.value || '0', 10))} className="w-full mt-2" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Rooms</label>
                <Input type="number" min={1} max={25} value={rooms} onChange={(e) => setRooms(parseInt(e.target.value || '0', 10))} />
                <input type="range" min={1} max={25} value={rooms} onChange={(e) => setRooms(parseInt(e.target.value || '0', 10))} className="w-full mt-2" />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <ToggleChip active={includeTrim} onClick={() => setIncludeTrim(!includeTrim)} label="Include Ceilings & Trim" />
              <ToggleChip active={exterior} onClick={() => setExterior(!exterior)} label="Add Exterior" />
              <ToggleChip active={cabinets} onClick={() => setCabinets(!cabinets)} label="Cabinets" />
              <ToggleChip active={pressureWash} onClick={() => setPressureWash(!pressureWash)} label="Pressure Wash" />
            </div>

            {cabinets && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Cabinet Openings (doors/drawers)</label>
                  <Input 
                    type="number" 
                    min={0} 
                    max={120} 
                    value={cabinetOpenings}         
                    onChange={(e) => {
                      // allow empty while typing
                      if (e.target.value === '') return setCabinetOpenings('')
                      const n = e.target.valueAsNumber
                      if (!Number.isNaN(n)) setCabinetOpenings(clamp(Math.trunc(n), 0, 120))
                    }}
                    onBlur={() => {
                      // if left empty, settle on 0 (or anything you prefer)
                      if (cabinetOpenings === '') setCabinetOpenings(0)
                    }}
                    inputMode="numeric"
                    pattern="[0-9]*" 
                  />
                </div>
              </div>
            )}

            {pressureWash && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Pressure Wash Area (sq ft)</label>
                  <Input
                    type="number"
                    min={0}
                    max={5000}
                    step={50}
                    value={washSqft}
                    onChange={(e) => {
                      if (e.target.value === '') return setWashSqft('')
                      const n = e.target.valueAsNumber
                      if (!Number.isNaN(n)) setWashSqft(clamp(Math.trunc(n), 0, 5000))
                    }}
                    onBlur={() => {
                      if (washSqft === '') setWashSqft(0)
                    }}
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                </div>
              </div>
            )}

            <Tabs defaultValue="premium" value={quality} onValueChange={(v) => setQuality(v as Quality)}>
              <TabsList className="bg-blue-50 dark:bg-slate-900 flex flex-wrap">
                <TabsTrigger value="standard">Standard</TabsTrigger>
                <TabsTrigger value="premium">Premium</TabsTrigger>
                <TabsTrigger value="deluxe">Deluxe</TabsTrigger>
              </TabsList>
              <TabsContent value="standard" className="text-slate-600 dark:text-slate-300">Good paints, 1–2 coats. Basic prep.</TabsContent>
              <TabsContent value="premium" className="text-slate-600 dark:text-slate-300">Top brands, 2–3 coats, detailed prep.</TabsContent>
              <TabsContent value="deluxe" className="text-slate-600 dark:text-slate-300">Best finishes, advanced protection, extended warranty.</TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* SUMMARY CARD */}
        <Card className="border-blue-100 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-blue-900 dark:text-blue-200">Your Estimate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-2xl border bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/10 dark:to-slate-900 p-6 grid gap-3">
              <p className="text-sm text-slate-600 dark:text-slate-300">Estimated Project Total</p>
              <div className="text-5xl font-extrabold tracking-tight text-blue-900 dark:text-blue-200">${estimate.total.toLocaleString()}</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Includes labor, prep, and materials for the selected options.</div>
              <ul className="mt-2 text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li>Base/Setup: ${estimate.breakdown.base}</li>
                <li>Interior: ${estimate.breakdown.interiorCost.toLocaleString()}</li>
                <li>Exterior: ${estimate.breakdown.exteriorCost.toLocaleString()}</li>
                <li>Rooms/Detail: ${estimate.breakdown.roomDetail.toLocaleString()}</li>
                <li>Cabinets: ${estimate.breakdown.cabs.toLocaleString()}</li>
                <li>Pressure Wash: ${estimate.breakdown.wash.toLocaleString()}</li>
              </ul>
              <a href="#contact" className="mt-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Lock in Free Quote</Button>
              </a>
            </div>
            <div className="mt-6 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    key={pieKey}
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    isAnimationActive
                    animationBegin={0}
                    animationDuration={600}
                  >
                    {chartData.map((_, i) => (
                      <Cell
                        key={`slice-${i}`}
                        fill={chartColors[i % chartColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function ToggleChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={active ? 'px-3 py-1.5 rounded-full border bg-blue-600 text-white border-blue-600' : 'px-3 py-1.5 rounded-full border bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-slate-700'}
    >
      {label}
    </button>
  )
}

function PalettePicker() {
  const [active, setActive] = useState(palette[0].hex)
  return (
    <section className="mx-auto max-w-7xl px-4 pb-6">
      <div className="rounded-3xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-6">
        <div className="flex items-center gap-2 mb-3">
          <Palette className="h-5 w-5 text-blue-700 dark:text-blue-300" />
          <p className="font-semibold text-blue-900 dark:text-blue-200">Try a Memphis blue-white palette</p>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          {palette.map((c) => (
            <button key={c.hex} onClick={() => setActive(c.hex)} className="group">
              <div className="h-10 w-10 rounded-xl border shadow-inner dark:border-slate-800" style={{ background: c.hex }} />
              <p className="text-xs text-slate-600 dark:text-slate-300 group-hover:text-blue-700 dark:group-hover:text-blue-300 mt-1 text-center">{c.name}</p>
            </button>
          ))}
          <div className="ml-auto text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2">
            <span>Accent preview:</span>
            <span className="h-6 w-20 rounded-full border dark:border-slate-700" style={{ background: active }} />
          </div>
        </div>
      </div>
    </section>
  )
}

function Gallery() {

  const imageFiles = [
    'IMG_2204.JPG', 
    'IMG_2207.JPG', 
    'img1.png',
    'img2.png',
    'img4.png',
    'IMG_2208.JPG', 
    'img5.png',
    'img6.png',
    'img3.png',
    'IMG_2200.png',
    'IMG_2201.png',
  ]
  
  // Create paths to images in the public/pictures folder
  const pics = imageFiles.map(filename => `/pictures/${filename}`)
  
  return (
    <section id="gallery" className="scroll-mt-24 mx-auto max-w-7xl px-0 md:px-4 py-16">
      <div className="px-4 mb-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 dark:text-blue-200">Recent Projects</h2>
        <p className="text-slate-600 dark:text-slate-300">A rolling glimpse at our finishes</p>
      </div>

      {/* Moving banner */}
      <div className="overflow-hidden">
        <div className="marquee group">
          {[...pics, ...pics].map((src, idx) => (
            <img 
              key={idx} 
              src={src} 
              alt={`Project ${idx + 1}`} 
              className="h-40 md:h-52 w-auto object-cover rounded-xl border dark:border-slate-800 mx-2"
              // onError={(e) => {
              //   // Fallback to placeholder if image fails to load
              //   const target = e.target as HTMLImageElement
              //   target.src = `https://picsum.photos/seed/memphis${idx}/800/500`
              // }}
            />
          ))}
        </div>
      </div>
      {/* <div className="overflow-hidden">
        <div className="marquee group">
          {[...pics, ...pics].map((src, idx) => (
            <img key={idx} src={src} alt={`Project ${idx + 1}`} className="h-40 md:h-52 w-auto object-cover rounded-xl border dark:border-slate-800 mx-2" />
          ))}
        </div>
      </div> */}
    </section>
  )
}

function Reviews() {
  const items = [
    { name: 'Hannah R. — Germantown', text: 'Flawless lines and zero mess. Scheduling was a breeze!', stars: 5 },
    { name: 'Marcus D. — Midtown', text: 'They finished two days early and the house looks brand new.', stars: 5 },
    { name: 'Priya K. — Collierville', text: 'Color consult saved us from a mistake. Love the final look!', stars: 5 },
  ]
  return (
    <section id="reviews" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 dark:text-blue-200">Client Reviews</h2>
        <p className="text-slate-600 dark:text-slate-300">Homeowners across the 901 trust us with their paint</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((r) => (
          <Card key={r.name} className="border-blue-100 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-blue-900 dark:text-blue-200 flex items-center justify-between">
                <span>{r.name}</span>
                <div className="flex gap-1 text-yellow-500">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4" />
                  ))}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-300">{r.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  async function submit() {
    setError(null); setOk(false)
    if (!form.name || !form.email) { setError('Please provide at least your name and email.'); return }
    try {
      setLoading(true)
      await sendEmail(
        {
          name: form.name,
          reply_to: form.email,
          phone: form.phone,
          time: new Date().toLocaleString(),
          message: form.message,
          subject: 'Contact Form - Dario\'s Painting',
        },
        TEMPLATES.CONTACT
      )
      setOk(true); setForm({ name: '', email: '', phone: '', message: '' })
    } catch (e: any) {
      setError(e?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <section id="contact" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 dark:text-blue-200">Get in Touch</h2>
        <p className="text-slate-600 dark:text-slate-300">Memphis-based. Locally owned. Free estimates.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-blue-100 dark:border-slate-800">
          <CardHeader><CardTitle className="text-blue-900 dark:text-blue-200">Send a Message</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input placeholder="Phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <Textarea placeholder="Tell us about your project…" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <Button onClick={submit} disabled={loading} className="bg-blue-600 hover:bg-blue-700 w-full">{loading ? 'Sending…' : 'Request Callback'}</Button>
            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
            {ok && <p className="text-sm text-green-600 dark:text-green-400">Thanks! We’ll contact you ASAP.</p>}
          </CardContent>
        </Card>
        <Card className="border-blue-100 dark:border-slate-800">
          <CardHeader><CardTitle className="text-blue-900 dark:text-blue-200">Memphis HQ</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3 text-slate-700 dark:text-slate-300">
              <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-blue-700 dark:text-blue-300" />(901) 550-4834</p>
              <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-blue-700 dark:text-blue-300" />dariospainting79@gmail.com</p>
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-blue-700 dark:text-blue-300" />Memphis, TN</p>
              <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-blue-700 dark:text-blue-300" />Mon–Sat 8am–6pm</p>
              <div className="rounded-2xl border dark:border-slate-800 overflow-hidden">
                <iframe title="map" className="w-full h-56" loading="lazy"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-90.2%2C35.07%2C-89.75%2C35.25&layer=mapnik" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1"><AccordionTrigger>How soon can you start?</AccordionTrigger><AccordionContent>Most projects start within 1–2 weeks. We also offer rush slots when available.</AccordionContent></AccordionItem>
          <AccordionItem value="item-2"><AccordionTrigger>Do you help with color selection?</AccordionTrigger><AccordionContent>Yes! We offer free mini-consults and on-site samples with our premium packages.</AccordionContent></AccordionItem>
          <AccordionItem value="item-3"><AccordionTrigger>Are you insured?</AccordionTrigger><AccordionContent>Fully licensed and insured for residential & light commercial projects across TN/MS.</AccordionContent></AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="mt-20 border-t bg-gradient-to-b from-white to-blue-50 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 grid place-items-center shadow">
              <Paintbrush className="h-5 w-5 text-white" />
            </div>
            <span className="font-extrabold tracking-tight text-lg text-blue-900 dark:text-blue-200">Dario&apos;s Painting</span>
          </div>
          <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-sm">
            Premium residential painting across Greater Memphis. Blue‑and‑white perfection, every time.
          </p>
        </div>

        <div className="text-slate-600 dark:text-slate-300">
          <p className="font-semibold text-blue-900 dark:text-blue-200">Service Areas</p>
          <ul className="mt-2 space-y-1">
            <li>Memphis • Midtown • East Memphis</li>
            <li>Germantown • Collierville • Bartlett • Arlington</li>
            <li>Lakeland • Cordova • Southaven • Olive Branch</li>
          </ul>
        </div>

        <div className="text-slate-600 dark:text-slate-300">
          <p className="font-semibold text-blue-900 dark:text-blue-200">Contact</p>
          <ul className="mt-2 space-y-1">
            <li className="flex items-center gap-2">
              <a href="tel:9015504834" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Phone className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                (901) 550-4834
              </a>
            </li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-blue-700 dark:text-blue-300" />dariospainting79@gmail.com</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-blue-700 dark:text-blue-300" />Memphis, TN</li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} Dario&apos;s Painting. All rights reserved.
      </div>
    </footer>
  )
}

function FloatingCTA({ onQuote }: { onQuote: () => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
        <Button onClick={onQuote} className="shadow-lg bg-blue-600 hover:bg-blue-700">
          <Sparkles className="mr-2 h-4 w-4" /> Free Quote
        </Button>
      </motion.div>
    </div>
  )
}

function ScrollToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-40 rounded-full border bg-white px-4 py-2 text-blue-700 shadow hover:bg-blue-50
                     dark:bg-slate-900 dark:text-blue-300 dark:border-slate-700"
        >
          ↑ Top
        </motion.button>
      )}
    </AnimatePresence>
  )
}
