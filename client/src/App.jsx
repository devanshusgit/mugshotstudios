import { useState } from 'react'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Technology from './pages/Technology'
import Works from './pages/Works'
import About from './pages/About'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import { TooltipProvider } from '@/components/ui/lamp-tooltip'

export default function App() {
  const [activeSection, setActiveSection] = useState('home')

  const sections = {
    home: <Home setActiveSection={setActiveSection} />,
    technology: <Technology />,
    works: <Works />,
    about: <About />,
    contact: <Contact />,
  }

  return (
    <TooltipProvider delayDuration={50}>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="pt-16">
          {sections[activeSection]}
        </main>
        <Footer />
      </div>
    </TooltipProvider>
  )
}
