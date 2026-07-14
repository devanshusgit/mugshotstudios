import { useEffect, useRef, useState } from 'react'
import { useInView, animate } from 'framer-motion'

/**
 * Counts up from 0 to `to` the first time it scrolls into view.
 *
 * Props: to (number), duration (s), prefix, suffix, decimals, className
 */
export function CountUp({ to, duration = 1.8, prefix = '', suffix = '', decimals = 0, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    })
    return () => controls.stop()
  }, [inView, to, duration])

  const formatted = value.toFixed(decimals)

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
