import { ShaderAnimation } from '../components/ShaderAnimation'
import { GlowCard } from '@/components/ui/glow-card'

const people = [
  {
    name: 'Vivek Shukla',
    role: 'Founder & Director',
    photo: '/images/FOUNDR.jpg',
    bio: "Filmmaker, writer, and animation creator with a vision to make broadcast-quality animation accessible to producers worldwide through technology. Vivek leads Mugshot Studios' creative direction, international partnerships, and the ongoing development of the Vartool production system.",
  },
  {
    name: 'Jeet',
    role: 'Creative Director / Writer',
    photo: '/images/Jeet.jpg',
    bio: 'Theatre-rooted screenwriter working in the creative industry since 2009 — across Sony TV, Disney+ Hotstar, Zee TV, and Sun TV. Has served as Creative Head for multiple production houses, leading projects from concept to execution, with strong experience in animation writing.',
  },
  {
    name: 'Samrat Dixit',
    role: 'Production Head',
    photo: '/images/Samrat.jpg',
    bio: '4+ years across animation, live action, and brand films. Heads AI-assisted animation and live action production.',
  },
  {
    name: 'Manav Mishra',
    role: 'Chief Technology Officer',
    photo: '/images/CTO.jpg',
    bio: 'Manav leads the technology vision at Mugshot Studios, building AI-driven creative tools, automation systems, and scalable production platforms. He focuses on combining storytelling, software engineering, and artificial intelligence to transform modern media production.',
  },
]

export default function About() {
  return (
    <div>
      {/* ── Hero with Shader ── */}
      <div className="relative h-56 md:h-72 flex items-center justify-center overflow-hidden border-b border-border">
        <ShaderAnimation />
        <div className="relative z-10 text-center px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-3">About Us</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">We Are Mugshot Studios</h1>
        </div>
      </div>

      {/* ── Studio Overview ── */}
      <section className="section-padding border-b border-border">
        <div className="max-w-3xl mx-auto">
          <p className="section-label mb-4">Our Story</p>
          <p className="body-text mb-5">
            Mugshot Studios is a Mumbai-based animation and content production studio incorporated in August 2024. In less than two years we have built active international partnerships across four continents, developed a proprietary AI production system unlike anything else in the animation industry, and created original IP for the global market.
          </p>
          <p className="body-text">
            We are not a traditional service studio. We are not a generic AI tool provider. We are a creative technology studio — where human storytelling and intelligent production systems work together to produce content that is faster, cheaper, and more faithful to each client's creative vision than anything a traditional pipeline can offer.
          </p>
        </div>
      </section>

      {/* ── People ── */}
      <section className="section-padding border-b border-border" style={{ backgroundColor: 'var(--card)' }}>
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-4">Team</p>
          <h2 className="section-title mb-10">The people behind the studio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {people.map((person, i) => (
              <GlowCard key={i} glowColor="orange" customSize className="w-full min-h-[230px]">
                <div className="flex flex-col">
                  <img
                    src={person.photo}
                    alt={person.name}
                    loading="lazy"
                    className="w-20 h-20 rounded-full object-cover object-top mb-5 border border-border"
                  />
                  <h3 className="text-xl font-bold mb-1">{person.name}</h3>
                  <p className="text-sm font-medium mb-4" style={{ color: 'var(--primary)' }}>{person.role}</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)', opacity: 0.82 }}>{person.bio}</p>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Address ── */}
      <section className="py-10 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Studio</p>
          <p className="text-sm text-muted-foreground">Unit 112, IJMIMA Complex, Off Link Road, Malad West, Mumbai 400064, India</p>
        </div>
      </section>
    </div>
  )
}
