import React from 'react'
import { cn } from '@/lib/utils'
import { PlusIcon } from 'lucide-react'

export function ContactCard({
  title = 'Contact With Us',
  description = 'If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day.',
  contactInfo,
  className,
  formSectionClassName,
  children,
  ...props
}) {
  return (
    <div
      className={cn(
        'bg-card border border-border relative grid h-full w-full shadow md:grid-cols-2 lg:grid-cols-3',
        className,
      )}
      {...props}
    >
      <PlusIcon className="absolute -top-3 -left-3 h-6 w-6 text-muted-foreground" />
      <PlusIcon className="absolute -top-3 -right-3 h-6 w-6 text-muted-foreground" />
      <PlusIcon className="absolute -bottom-3 -left-3 h-6 w-6 text-muted-foreground" />
      <PlusIcon className="absolute -right-3 -bottom-3 h-6 w-6 text-muted-foreground" />
      <div className="flex flex-col justify-between lg:col-span-2">
        <div className="relative h-full space-y-4 px-4 py-8 md:p-8">
          <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">{title}</h1>
          <p className="text-muted-foreground max-w-xl text-sm md:text-base lg:text-lg">
            {description}
          </p>
          <div className="grid gap-2">
            {contactInfo?.map((info, index) => (
              <ContactInfo key={index} {...info} />
            ))}
          </div>
        </div>
      </div>
      <div
        className={cn(
          'bg-muted/40 flex h-full w-full items-center border-t border-border p-5 md:col-span-1 md:border-t-0 md:border-l',
          formSectionClassName,
        )}
      >
        {children}
      </div>
    </div>
  )
}

function ContactInfo({ icon: Icon, label, value, href, className, ...props }) {
  const iconBox = (
    <div className="bg-muted/40 group-hover:bg-primary/15 rounded-lg p-3 transition-colors">
      <Icon className="h-5 w-5 group-hover:text-primary transition-colors" />
    </div>
  )
  const isExternal = href && /^https?:\/\//.test(href)
  return (
    <div className={cn('flex items-center gap-3 py-3', className)} {...props}>
      {href ? (
        <a
          href={href}
          className="group"
          aria-label={`${label}: ${value}`}
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {iconBox}
        </a>
      ) : (
        iconBox
      )}
      <div>
        <p className="font-medium">{label}</p>
        {href ? (
          <a
            href={href}
            className="text-muted-foreground hover:text-primary text-xs transition-colors hover:underline"
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {value}
          </a>
        ) : (
          <p className="text-muted-foreground text-xs">{value}</p>
        )}
      </div>
    </div>
  )
}
