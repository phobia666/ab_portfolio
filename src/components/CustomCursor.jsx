import { useEffect, useRef } from 'react'

const lerp = (a, b, t) => a + (b - a) * t

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function isDesktop() {
  return typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches
}

/**
 * Smoothed cursor + thrust trail drawn on canvas (no per-frame React state).
 * Dot and ring use translate3d via refs for compositor-only updates.
 */
function CustomCursor() {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const rafRef = useRef(0)

  const pointerRef = useRef({ x: -100, y: -100 })
  const dotPosRef = useRef({ x: -100, y: -100 })
  const ringPosRef = useRef({ x: -100, y: -100 })
  const lastEmitRef = useRef({ x: -100, y: -100 })
  const trailRef = useRef([])
  const burstRef = useRef([])
  const visibleRef = useRef(false)
  const dprRef = useRef(1)
  /** Last pointer delta magnitude (per mousemove), decayed in RAF for smooth trail density */
  const moveSpeedRef = useRef(0)

  useEffect(() => {
    if (prefersReducedMotion() || !isDesktop()) {
      document.documentElement.classList.remove('use-custom-cursor')
      return undefined
    }

    document.documentElement.classList.add('use-custom-cursor')

    const canvas = canvasRef.current
    const dotEl = dotRef.current
    const ringEl = ringRef.current
    if (!canvas || !dotEl || !ringEl) {
      document.documentElement.classList.remove('use-custom-cursor')
      return undefined
    }

    const ctx = canvas.getContext('2d', { alpha: true })
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    const resize = () => {
      dprRef.current = Math.min(window.devicePixelRatio || 1, 2)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = Math.floor(w * dprRef.current)
      canvas.height = Math.floor(h * dprRef.current)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dprRef.current, 0, 0, dprRef.current, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const onLeave = () => {
      visibleRef.current = false
    }

    const onMove = (event) => {
      const { clientX, clientY } = event
      const prev = pointerRef.current
      if (prev.x !== -100) {
        moveSpeedRef.current = Math.min(72, Math.hypot(clientX - prev.x, clientY - prev.y))
      }
      pointerRef.current = { x: clientX, y: clientY }
      visibleRef.current = true
      if (dotPosRef.current.x === -100) {
        dotPosRef.current = { x: clientX, y: clientY }
        ringPosRef.current = { x: clientX, y: clientY }
        lastEmitRef.current = { x: clientX, y: clientY }
      }
    }

    const onClick = (event) => {
      const { clientX, clientY } = event
      for (let i = 0; i < 12; i += 1) {
        const a = Math.random() * Math.PI * 2
        const sp = 0.35 + Math.random() * 1.85
        burstRef.current.push({
          x: clientX,
          y: clientY,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          life: 1,
          maxLife: 0.38 + Math.random() * 0.22,
          size: 4 + Math.random() * 9,
          alpha: 0.35 + Math.random() * 0.35,
        })
      }
      if (burstRef.current.length > 80) {
        burstRef.current = burstRef.current.slice(-80)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    window.addEventListener('click', onClick)
    window.addEventListener('blur', onLeave)

    let lastTime = performance.now()

    const emitTrailAlongSegment = (x0, y0, x1, y1, density) => {
      const dx = x1 - x0
      const dy = y1 - y0
      const len = Math.hypot(dx, dy)
      if (len < 0.5) return

      const step = Math.max(2.8, 5.2 - Math.min(density, 48) * 0.06)
      const n = Math.min(11, Math.ceil(len / step))
      for (let i = 0; i <= n; i += 1) {
        const t = i / n
        const x = x0 + dx * t + (Math.random() - 0.5) * 1.6
        const y = y0 + dy * t + (Math.random() - 0.5) * 1.6
        const speedFactor = Math.min(1.4, len / 28)
        trailRef.current.push({
          x,
          y,
          life: 1,
          maxLife: 0.55 + Math.random() * 0.35 + speedFactor * 0.12,
          size: 5 + Math.random() * 7 + speedFactor * 3,
          alpha: 0.18 + Math.random() * 0.22 + speedFactor * 0.08,
        })
      }
      lastEmitRef.current = { x: x1, y: y1 }
    }

    const tick = (now) => {
      const dt = Math.min(32, now - lastTime) / 1000
      lastTime = now

      const ptr = pointerRef.current
      let dot = dotPosRef.current
      let ring = ringPosRef.current

      moveSpeedRef.current *= Math.pow(0.86, dt * 60)

      if (visibleRef.current) {
        // Snappy but eased follow (frame-rate independent)
        const dotT = 1 - Math.pow(1 - 0.42, dt * 60)
        const ringT = 1 - Math.pow(1 - 0.16, dt * 60)
        dot = {
          x: lerp(dot.x, ptr.x, dotT),
          y: lerp(dot.y, ptr.y, dotT),
        }
        ring = {
          x: lerp(ring.x, ptr.x, ringT),
          y: lerp(ring.y, ptr.y, ringT),
        }
      } else {
        dot = { x: ptr.x, y: ptr.y }
        ring = { x: ptr.x, y: ptr.y }
      }

      dotPosRef.current = dot
      ringPosRef.current = ring

      if (visibleRef.current) {
        const last = lastEmitRef.current
        if (last.x === -100) {
          lastEmitRef.current = { x: dot.x, y: dot.y }
        } else {
          const segLen = Math.hypot(dot.x - last.x, dot.y - last.y)
          if (segLen > 1.25) {
            emitTrailAlongSegment(last.x, last.y, dot.x, dot.y, moveSpeedRef.current)
          }
        }
      }

      const trail = trailRef.current
      for (let i = trail.length - 1; i >= 0; i -= 1) {
        const p = trail[i]
        p.life -= dt / p.maxLife
        p.alpha *= 1 - dt * 1.65
        p.size *= 1 - dt * 1.05
        if (p.life <= 0 || p.alpha < 0.02 || p.size < 0.6) trail.splice(i, 1)
      }
      if (trail.length > 96) trail.splice(0, trail.length - 96)

      const bursts = burstRef.current
      for (let i = bursts.length - 1; i >= 0; i -= 1) {
        const p = bursts[i]
        p.x += p.vx * dt * 55
        p.y += p.vy * dt * 55
        p.vx *= 1 - dt * 4.5
        p.vy *= 1 - dt * 4.5
        p.life -= dt / p.maxLife
        p.alpha *= 1 - dt * 5
        p.size *= 1 + dt * 2.8
        if (p.life <= 0 || p.alpha < 0.02) bursts.splice(i, 1)
      }

      const dx = dotPosRef.current.x
      const dy = dotPosRef.current.y
      const rx = ringPosRef.current.x
      const ry = ringPosRef.current.y
      dotEl.style.left = `${dx}px`
      dotEl.style.top = `${dy}px`
      ringEl.style.left = `${rx}px`
      ringEl.style.top = `${ry}px`
      dotEl.style.transform = 'translate3d(-50%, -50%, 0)'
      ringEl.style.transform = 'translate3d(-50%, -50%, 0)'
      dotEl.style.opacity = visibleRef.current ? '1' : '0'
      ringEl.style.opacity = visibleRef.current ? '1' : '0'

      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < trail.length; i += 1) {
        const p = trail[i]
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
        g.addColorStop(0, `rgba(244, 212, 255, ${p.alpha * 0.9})`)
        g.addColorStop(0.35, `rgba(199, 210, 254, ${p.alpha * 0.35})`)
        g.addColorStop(1, 'rgba(165, 180, 252, 0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      for (let i = 0; i < bursts.length; i += 1) {
        const p = bursts[i]
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
        g.addColorStop(0, `rgba(255, 255, 255, ${p.alpha * 0.85})`)
        g.addColorStop(0.4, `rgba(226, 232, 240, ${p.alpha * 0.25})`)
        g.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('click', onClick)
      window.removeEventListener('blur', onLeave)
      document.documentElement.classList.remove('use-custom-cursor')
    }
  }, [])

  if (typeof window !== 'undefined' && (prefersReducedMotion() || !isDesktop())) {
    return null
  }

  return (
    <div ref={wrapRef} className="pointer-events-none fixed inset-0 z-[80] hidden md:block" aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <span
        ref={ringRef}
        className="custom-cursor-ring absolute left-0 top-0 h-9 w-9 rounded-full border border-indigo-300/55 will-change-transform"
      />
      <span
        ref={dotRef}
        className="custom-cursor-dot absolute left-0 top-0 h-4 w-4 rounded-full border border-fuchsia-300/90 bg-fuchsia-200/35 shadow-[0_0_18px_#e879f9] will-change-transform"
      />
    </div>
  )
}

export default CustomCursor
