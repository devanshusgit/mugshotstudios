import HoverPlayCard from '@/components/ui/hover-play-card'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

const videoWorks = [
  {
    title: 'PINK',
    type: 'Showreel',
    desc: "A striking visual piece showcasing Mugshot Studios' animation style and production capability.",
    src: '/PINK.mp4',
  },
  {
    title: 'TOOPY & BINOO',
    type: 'Client Work',
    desc: 'Animation production sample showcasing character animation and style consistency.',
    src: '/Toopy-Binoo.mp4',
  },
  {
    title: 'SWAT KAT — Sample Trailer',
    type: 'Animation',
    desc: 'High-energy action animation produced through the Vartool pipeline.',
    src: '/SWAT-KAT-TRAILER.mp4',
  },
  {
    title: 'THE BEGINNING — Trailer',
    type: 'Original IP',
    desc: 'Official trailer for an original Mugshot Studios production currently in development.',
    src: '/The-Beginning-Trailer.mp4',
  },
]

const projects = [
  { title: 'WONDER WORLD', type: 'Original IP', desc: 'A living magical amusement park island. Three children. One unforgettable villain. 52 × 11 minutes.' },
  { title: 'THE FIXERS', type: 'Original IP', desc: '26 × 11 minutes · 3D Animation · Ages 4–7. Currently in production.' },
  { title: 'OPAL PRODUCTION CONTRACT', type: 'Client Work', desc: 'Contracted animation production for Opal Production SRL, Romania. Broadcast-quality episodes via Vartool.' },
  { title: 'THE FOURTH WALL', type: 'Original IP', desc: 'A surreal thriller about characters trapped inside an AI-generated world. In development.' },
]

function ComingSoonCard({ title, type, desc }) {
  return (
    <div className="card flex flex-col overflow-hidden p-0">
      <div className="aspect-video flex items-center justify-center" style={{ backgroundColor: 'var(--muted)' }}>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Video coming soon</p>
      </div>
      <div className="p-5 flex flex-col gap-1">
        {type && <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{type}</p>}
        <h3 className="text-base font-bold">{title}</h3>
        {desc && <p className="text-sm text-muted-foreground">{desc}</p>}
      </div>
    </div>
  )
}

export default function Works() {
  return (
    <div>
      {/* ── Header ── */}
      <section className="section-padding border-b border-border">
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-4">Portfolio</p>
          <h1 className="page-title mb-3">Our Work</h1>
          <p className="body-text max-w-xl">
            From original IP to contracted productions — here's what we build.
          </p>
        </div>
      </section>

      {/* ── Video Showcase ── */}
      <section className="section-padding border-b border-border" style={{ backgroundColor: 'var(--card)' }}>
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-4">Video Showcase</p>
          <h2 className="section-title mb-8">See it in motion</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videoWorks.map((v, i) =>
              v.src ? (
                <HoverPlayCard key={i} src={v.src} title={v.title} type={v.type} desc={v.desc} />
              ) : (
                <ComingSoonCard key={i} title={v.title} type={v.type} desc={v.desc} />
              )
            )}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-4">Projects</p>
          <h2 className="section-title mb-8">All productions</h2>
          <Accordion type="single" collapsible className="border-t border-border">
            {projects.map((p, i) => (
              <AccordionItem key={i} value={`project-${i}`}>
                <AccordionTrigger>
                  <span className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-4">
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground md:w-32 md:shrink-0">{p.type}</span>
                    <span className="text-base md:text-lg">{p.title}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="body-text text-sm md:pl-36">{p.desc}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  )
}
