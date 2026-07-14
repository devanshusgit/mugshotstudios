import { motion } from 'framer-motion'
import { FallingPattern } from '@/components/ui/falling-pattern'
import { CountUp } from '@/components/ui/count-up'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

// hand-drawn circle that sketches itself around a word
const drawCircle = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: 0.7, duration: 1.8, ease: [0.43, 0.13, 0.23, 0.96] },
      opacity: { delay: 0.7, duration: 0.4 },
    },
  },
}

const stats = [
  { to: 3, suffix: ' Days', label: 'to deliver an 11-minute episode' },
  { to: 100, suffix: '%', label: 'private — your IP never leaves our system' },
  { to: 4, suffix: '', label: 'continents with active partnerships' },
]

const services = [
  {
    title: 'Custom Animation Production',
    desc: '2D and 3D animation for TV series, streaming platforms, and digital content — trained on your existing IP for complete visual consistency.',
  },
  {
    title: 'AI-Accelerated Pipeline',
    desc: 'Our proprietary Vartool system delivers broadcast-quality episodes faster than any traditional studio, without compromising quality.',
  },
  {
    title: 'Live Action & Hybrid',
    desc: 'AI-assisted live action production for features, short films, and hybrid animation-live action formats.',
  },
]

const originalIP = [
  { title: 'THE FIXERS', meta: '26 × 11 min · 3D Animation · Ages 4–7', status: 'In production' },
  { title: 'WONDER WORLD', meta: '26 × 11 min · 3D Animation · Ages 6–10', status: 'In production' },
]

export default function Home({ setActiveSection }) {
  return (
    <div>
      {/* ── Hero ── */}
      <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <FallingPattern className="h-full w-full" />
          {/* balanced darkening overlay — pattern stays visible, copy stays crisp */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(12,12,12,0.32) 0%, rgba(12,12,12,0.72) 100%)',
            }}
          />
        </div>
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 py-24">
          <img
            src="/images/mugshot-logo.png"
            alt="Mugshot Studios"
            className="h-36 md:h-48 w-auto mx-auto mb-6 drop-shadow-2xl"
          />
          <p className="section-label mb-5">Mumbai · India · Est. 2024</p>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 text-white"
            style={{ textShadow: '0 2px 24px rgba(0,0,0,0.85)' }}
          >
            <span className="block md:whitespace-nowrap">We don't make animation.</span>
            <span className="block md:whitespace-nowrap">
              We make{' '}
              <span className="relative inline-block mx-2">
                <span style={{ color: 'var(--primary)' }}>your</span>
                <motion.svg
                  className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ width: '138%', height: '162%' }}
                  viewBox="0 0 200 80"
                  preserveAspectRatio="none"
                  initial="hidden"
                  animate="visible"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M 46 14 C 100 4, 156 8, 184 28 C 200 44, 174 66, 110 72 C 50 77, 12 64, 16 38 C 18 20, 34 12, 54 10"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    variants={drawCircle}
                  />
                </motion.svg>
              </span>{' '}
              animation.
            </span>
          </h1>
          <p
            className="text-lg leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ color: 'rgba(255,255,255,0.95)', textShadow: '0 2px 18px rgba(0,0,0,0.9)' }}
          >
            Combining creative direction with proprietary AI production technology, we build custom animation pipelines trained on your IP — your characters, your style, your world.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button className="btn-primary" onClick={() => setActiveSection('works')}>See Our Work</button>
            <button className="btn-secondary" style={{ backgroundColor: 'var(--card)' }} onClick={() => setActiveSection('technology')}>Explore Vartool</button>
            <button className="btn-secondary" style={{ backgroundColor: 'var(--card)' }} onClick={() => setActiveSection('contact')}>Get in Touch</button>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="border-y border-border" style={{ backgroundColor: 'var(--card)' }}>
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          {stats.map((s, i) => (
            <div key={i} className="py-8 md:py-0 px-0 md:px-10 first:pl-0 last:pr-0 text-center">
              <p className="text-3xl font-bold mb-1" style={{ color: 'var(--primary)' }}>
                <CountUp to={s.to} suffix={s.suffix} />
              </p>
              <p className="text-sm body-text">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── What We Do ── */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-4">What We Do</p>
          <h2 className="section-title max-w-2xl mb-5">We don't make generic animation. We make yours.</h2>
          <p className="body-text max-w-2xl">
            Every studio can produce animation. What Mugshot Studios does differently is build a production system trained specifically on your IP — your characters, your visual language, your world. The output isn't approximate. It is animation that looks and feels exactly like your show.
          </p>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="section-padding border-t border-border" style={{ backgroundColor: 'var(--card)' }}>
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-4">Services</p>
          <h2 className="section-title mb-8">What we build</h2>
          <Accordion type="single" collapsible className="border-t border-border">
            {services.map((s, i) => (
              <AccordionItem key={i} value={`service-${i}`}>
                <AccordionTrigger>
                  <span className="flex items-baseline gap-4">
                    <span className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-lg">{s.title}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="body-text text-sm md:pl-10">{s.desc}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── Original IP ── */}
      <section className="section-padding border-t border-border">
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-4">Original IP</p>
          <h2 className="section-title mb-3">We also create original worlds</h2>
          <p className="body-text mb-8">
            Mugshot Studios develops original animated IP for the global market. Our debut slate features two original series currently in production.
          </p>
          <Accordion type="single" collapsible className="border-t border-border">
            {originalIP.map((ip, i) => (
              <AccordionItem key={i} value={`ip-${i}`}>
                <AccordionTrigger>
                  <span className="text-lg">{ip.title}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3" style={{ backgroundColor: 'var(--secondary)', color: 'var(--secondary-foreground)' }}>
                    {ip.status}
                  </span>
                  <p className="body-text text-sm">{ip.meta}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  )
}
