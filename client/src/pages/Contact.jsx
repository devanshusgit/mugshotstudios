import { useState } from 'react'
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react'
import { ContactCard } from '@/components/ui/contact-card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { SocialLinks } from '@/components/ui/contact-info'

const contactInfo = [
  { icon: MailIcon, label: 'Email', value: 'admin@mugshotstudios.com', href: 'mailto:admin@mugshotstudios.com' },
  { icon: PhoneIcon, label: 'Phone / WhatsApp', value: '+91 9833979711', href: 'tel:+919833979711' },
  { icon: MapPinIcon, label: 'Address', value: 'Unit 112, IJMIMA Complex, Off Link Road, Malad West, Mumbai 400064, India', href: 'https://share.google/Nhfs5AMX6JqS6eWSS' },
]

const socialLinks = [
  { icon: 'whatsapp', href: 'https://wa.me/919833979711', label: 'WhatsApp' },
]

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    // Open the visitor's own email app with a pre-filled message to us.
    const subject = `New enquiry from ${formData.name} — Mugshot Studios`
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    window.location.href = `mailto:admin@mugshotstudios.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setStatus('opened')
    setTimeout(() => setStatus(null), 8000)
  }

  return (
    <div className="section-padding">
      <div className="max-w-5xl mx-auto">
        <ContactCard
          title="Let's build something together"
          description="Whether you're a broadcaster, distributor, co-production partner, or brand — tell us about your project and we'll get back to you within 24 hours."
          contactInfo={contactInfo}
        >
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required placeholder="Your name" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={4} placeholder="Tell us about your project..." />
            </div>
            <Button className="w-full" type="submit">
              Send Message
            </Button>
            {status === 'opened' && (
              <div className="rounded-md px-4 py-3 text-sm font-medium" style={{ backgroundColor: 'var(--secondary)', color: 'var(--secondary-foreground)' }}>
                Your email app is opening — just press send to deliver your message. If nothing opened, email us at admin@mugshotstudios.com
              </div>
            )}
          </form>
        </ContactCard>

        {/* Social */}
        <div className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Follow us</p>
          <SocialLinks links={socialLinks} size="md" />
        </div>
      </div>
    </div>
  )
}
