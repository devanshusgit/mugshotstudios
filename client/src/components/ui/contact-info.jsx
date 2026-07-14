import { Icon, IconButton } from '@/components/ui/icon'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/lamp-tooltip'
import { cn } from '@/lib/utils'

/**
 * A single contact row: icon + label + value. When `href` is provided the
 * value becomes a link (mailto:/tel:/https). External http(s) links get
 * safe target/rel defaults automatically.
 *
 * Props: icon, label, value, href, size, className
 */
export function ContactInfo({ icon, label, value, href, size = 'md', className }) {
  const valueEl = href ? (
    (() => {
      const isExternal = /^https?:\/\//.test(href)
      return (
        <a
          href={href}
          className="text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:underline"
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {value}
        </a>
      )
    })()
  ) : (
    <span className="text-sm font-medium text-foreground">{value}</span>
  )

  const iconBox = (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border transition-colors group-hover:border-primary"
      style={{ backgroundColor: 'var(--muted)', color: 'var(--primary)' }}
    >
      <Icon icon={icon} size={16} />
    </span>
  )

  return (
    <div className={cn('flex items-start gap-3', className)}>
      {href ? (
        <a
          href={href}
          className="group"
          aria-label={`${label}: ${value}`}
          {...(/^https?:\/\//.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {iconBox}
        </a>
      ) : (
        iconBox
      )}
      <div className="flex flex-col">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</span>
        {valueEl}
      </div>
    </div>
  )
}

/**
 * A responsive row of social icon links. Pass an array of
 * { icon, href, label }. Renders icon-only IconButtons with the "social"
 * variant, accessible names, and external-link safety.
 *
 * Props: links, size, variant, className
 */
export function SocialLinks({ links, size = 'md', variant = 'social', className }) {
  if (!links?.length) return null
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {links.map((link) => {
        const tooltip = link.comingSoon ? 'Coming soon' : link.label
        return (
          <Tooltip key={link.label}>
            <TooltipTrigger asChild>
              <IconButton
                icon={link.icon}
                // Coming-soon platforms render as a non-navigating button.
                href={link.comingSoon ? undefined : link.href}
                label={link.comingSoon ? `${link.label} — coming soon` : link.label}
                variant={variant}
                size={size}
                iconOnly
                className={link.comingSoon ? 'opacity-50 cursor-default' : undefined}
              />
            </TooltipTrigger>
            <TooltipContent side="top">{tooltip}</TooltipContent>
          </Tooltip>
        )
      })}
    </div>
  )
}
