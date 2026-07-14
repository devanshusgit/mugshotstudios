import { ContactInfo, SocialLinks } from '@/components/ui/contact-info'

const socialLinks = [
  { icon: 'whatsapp', href: 'https://wa.me/919833979711', label: 'WhatsApp' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src="/images/mugshot-logo.png" alt="Mugshot Studios" className="h-20 w-auto mb-4" />
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            AI animation production studio.<br />Mumbai, India.
          </p>
          <SocialLinks links={socialLinks} size="md" />
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-semibold text-sm text-foreground">Contact</p>
          <ContactInfo icon="email" label="Email" value="admin@mugshotstudios.com" href="mailto:admin@mugshotstudios.com" />
          <ContactInfo icon="phone" label="Phone / WhatsApp" value="+91 9833979711" href="tel:+919833979711" />
        </div>
      </div>
      <div className="border-t border-border px-6 py-4 max-w-7xl mx-auto">
        <p className="text-xs text-muted-foreground">&copy; 2026 Mugshot Studios. All rights reserved.</p>
      </div>
    </footer>
  )
}
