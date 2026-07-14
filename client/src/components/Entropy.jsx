import { useEffect, useRef } from 'react'

export default function Entropy({ className = '', size = 400 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)

    const particleColor = '#ffffff'
    // Reduced from 25×25=625 to 16×16=256 particles to prevent main-thread freezes
    const gridSize = 16
    const spacing = size / gridSize
    // Neighbor search radius — kept tight so grid lookup stays O(n)
    const LINK_RADIUS = 50
    const NEIGHBOR_RADIUS = 80

    class Particle {
      constructor(x, y, order) {
        this.x = x
        this.y = y
        this.originalX = x
        this.originalY = y
        this.size = 2
        this.order = order
        this.velocity = {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
        }
        this.influence = 0
        this.neighbors = []
      }

      update() {
        if (this.order) {
          const dx = this.originalX - this.x
          const dy = this.originalY - this.y
          const chaosInfluence = { x: 0, y: 0 }

          this.neighbors.forEach(neighbor => {
            if (!neighbor.order) {
              const distance = Math.hypot(this.x - neighbor.x, this.y - neighbor.y)
              const strength = Math.max(0, 1 - distance / NEIGHBOR_RADIUS)
              chaosInfluence.x += neighbor.velocity.x * strength
              chaosInfluence.y += neighbor.velocity.y * strength
              this.influence = Math.max(this.influence, strength)
            }
          })

          this.x += dx * 0.05 * (1 - this.influence) + chaosInfluence.x * this.influence
          this.y += dy * 0.05 * (1 - this.influence) + chaosInfluence.y * this.influence
          this.influence *= 0.99
        } else {
          this.velocity.x += (Math.random() - 0.5) * 0.5
          this.velocity.y += (Math.random() - 0.5) * 0.5
          this.velocity.x *= 0.95
          this.velocity.y *= 0.95
          this.x += this.velocity.x
          this.y += this.velocity.y

          if (this.x < size / 2 || this.x > size) this.velocity.x *= -1
          if (this.y < 0 || this.y > size) this.velocity.y *= -1
          this.x = Math.max(size / 2, Math.min(size, this.x))
          this.y = Math.max(0, Math.min(size, this.y))
        }
      }

      draw(ctx) {
        const alpha = this.order ? 0.8 - this.influence * 0.5 : 0.8
        ctx.fillStyle = `${particleColor}${Math.round(alpha * 255)
          .toString(16)
          .padStart(2, '0')}`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const particles = []
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = spacing * i + spacing / 2
        const y = spacing * j + spacing / 2
        const order = x < size / 2
        particles.push(new Particle(x, y, order))
      }
    }

    // Grid-based O(n) spatial lookup instead of O(n²) filter
    const CELL = NEIGHBOR_RADIUS
    function buildGrid() {
      const grid = new Map()
      particles.forEach(p => {
        const cx = Math.floor(p.x / CELL)
        const cy = Math.floor(p.y / CELL)
        const key = `${cx},${cy}`
        if (!grid.has(key)) grid.set(key, [])
        grid.get(key).push(p)
      })
      return grid
    }

    function updateNeighbors() {
      const grid = buildGrid()
      particles.forEach(p => {
        const cx = Math.floor(p.x / CELL)
        const cy = Math.floor(p.y / CELL)
        p.neighbors = []
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            const key = `${cx + dx},${cy + dy}`
            const cell = grid.get(key)
            if (!cell) continue
            cell.forEach(other => {
              if (other === p) return
              const dist = Math.hypot(p.x - other.x, p.y - other.y)
              if (dist < NEIGHBOR_RADIUS) p.neighbors.push(other)
            })
          }
        }
      })
    }

    let time = 0
    let animationId
    let alive = true

    function animate() {
      if (!alive) return
      ctx.clearRect(0, 0, size, size)
      // Update neighbors every 30 frames — now cheap with grid lookup
      if (time % 30 === 0) updateNeighbors()

      particles.forEach(particle => {
        particle.update()
        particle.draw(ctx)

        particle.neighbors.forEach(neighbor => {
          const distance = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y)
          if (distance < LINK_RADIUS) {
            const alpha = 0.2 * (1 - distance / LINK_RADIUS)
            ctx.strokeStyle = `${particleColor}${Math.round(alpha * 255)
              .toString(16)
              .padStart(2, '0')}`
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(neighbor.x, neighbor.y)
            ctx.stroke()
          }
        })
      })

      ctx.strokeStyle = `${particleColor}4D`
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(size / 2, 0)
      ctx.lineTo(size / 2, size)
      ctx.stroke()

      time++
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      alive = false
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [size])

  return (
    <div className={`relative bg-black ${className}`} style={{ width: size, height: size }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}
