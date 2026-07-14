import { useState } from 'react'

const NAV_ITEMS = ['home', 'technology', 'works', 'about', 'contact']

export default function Navigation({ activeSection, setActiveSection }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = (section) => {
    setActiveSection(section)
    setMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="w-full px-[5%] h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center hover:opacity-80 transition-opacity"
          aria-label="Mugshot Studios — Home"
        >
          <span className="text-base md:text-lg font-bold tracking-tight text-foreground">MUGSHOT STUDIOS</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item}
              onClick={() => handleNav(item)}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                activeSection === item
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item}
              onClick={() => handleNav(item)}
              className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium capitalize transition-colors ${
                activeSection === item
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
