import * as React from 'react'
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiGlobe,
  FiClock,
  FiSearch,
  FiMenu,
  FiX,
  FiUser,
  FiSettings,
  FiHome,
  FiDownload,
  FiUpload,
  FiArrowRight,
  FiArrowLeft,
  FiArrowUp,
  FiArrowDown,
  FiShoppingCart,
  FiHeart,
  FiBell,
} from 'react-icons/fi'
import {
  FaYoutube,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter,
  FaWhatsapp,
} from 'react-icons/fa6'
import { cn } from '@/lib/utils'

/**
 * Single source of truth for every icon used across the site.
 * Import icons only from this registry so the set stays consistent
 * and tree-shaking keeps the bundle lean.
 */
export const icons = {
  // Contact
  location: FiMapPin,
  phone: FiPhone,
  email: FiMail,
  website: FiGlobe,
  clock: FiClock,
  // UI
  search: FiSearch,
  menu: FiMenu,
  close: FiX,
  user: FiUser,
  settings: FiSettings,
  home: FiHome,
  download: FiDownload,
  upload: FiUpload,
  cart: FiShoppingCart,
  heart: FiHeart,
  bell: FiBell,
  // Arrows
  'arrow-right': FiArrowRight,
  'arrow-left': FiArrowLeft,
  'arrow-up': FiArrowUp,
  'arrow-down': FiArrowDown,
  // Social
  youtube: FaYoutube,
  instagram: FaInstagram,
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  twitter: FaXTwitter,
  whatsapp: FaWhatsapp,
}

export const iconNames = Object.keys(icons)

/**
 * Pure glyph. Decorative by default (aria-hidden); pass `label` to make it
 * an accessible standalone image (role="img" + aria-label).
 */
export function Icon({ icon, size = 20, color, className, label, ...props }) {
  const Glyph = icons[icon]
  if (!Glyph) {
    if (import.meta.env.DEV) console.warn(`Icon "${icon}" not found in registry.`)
    return null
  }
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true }
  return (
    <Glyph
      size={size}
      color={color}
      className={cn('shrink-0', className)}
      {...a11y}
      {...props}
    />
  )
}

const variantClasses = {
  // filled cream pill
  solid:
    'bg-primary text-primary-foreground hover:opacity-85 border border-transparent',
  // outlined, fills muted on hover
  outline:
    'border border-border text-foreground hover:bg-muted',
  // transparent, text dims->brightens
  ghost:
    'text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent',
  // social: subtle until hover, then primary
  social:
    'border border-border text-muted-foreground hover:text-primary hover:border-primary',
}

const sizeClasses = {
  sm: { box: 'h-8 gap-1.5 text-xs', pad: 'px-3', iconOnly: 'w-8', icon: 16 },
  md: { box: 'h-10 gap-2 text-sm', pad: 'px-4', iconOnly: 'w-10', icon: 18 },
  lg: { box: 'h-12 gap-2.5 text-base', pad: 'px-6', iconOnly: 'w-12', icon: 20 },
}

/**
 * Interactive icon control. Renders an <a> when `href` is set (with safe
 * external-link defaults), otherwise a <button>. Supports text-with-icon
 * and icon-only layouts, theme-aware variants, hover/focus transitions.
 *
 * Props: icon, label, href, size ('sm'|'md'|'lg'), color, variant, iconOnly,
 *        external, iconPosition ('left'|'right'), plus native a/button props.
 */
export const IconButton = React.forwardRef(function IconButton({
  icon,
  label,
  href,
  size = 'md',
  color,
  variant = 'ghost',
  iconOnly = false,
  external,
  iconPosition = 'left',
  className,
  children,
  ...props
}, ref) {
  const s = sizeClasses[size] ?? sizeClasses.md
  const text = children ?? label
  const showText = !iconOnly && text

  const base = cn(
    'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-50',
    variantClasses[variant] ?? variantClasses.ghost,
    showText ? s.pad : s.iconOnly,
    s.box,
    className,
  )

  const glyph = <Icon icon={icon} size={s.icon} color={color} label={iconOnly ? label : undefined} aria-hidden={showText ? true : undefined} />

  const content = (
    <>
      {iconPosition === 'left' && glyph}
      {showText && <span>{text}</span>}
      {iconPosition === 'right' && glyph}
    </>
  )

  // Icon-only controls must carry an accessible name.
  const a11yLabel = iconOnly ? label : undefined

  if (href) {
    const isExternal = external ?? /^https?:\/\//.test(href)
    return (
      <a
        ref={ref}
        href={href}
        className={base}
        aria-label={a11yLabel}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {content}
      </a>
    )
  }

  return (
    <button ref={ref} type="button" className={base} aria-label={a11yLabel} {...props}>
      {content}
    </button>
  )
})
