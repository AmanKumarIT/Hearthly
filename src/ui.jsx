import React, { createContext, useContext, useEffect, useRef, useState } from 'react'

export const AppCtx = createContext(null)
export const useApp = () => useContext(AppCtx)

export const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN')
export const short = (n) =>
  n >= 1e7 ? '₹' + +(n / 1e7).toFixed(2) + ' Cr' : n >= 1e5 ? '₹' + +(n / 1e5).toFixed(2) + ' L' : inr(n)

const P = {
  arrow: 'M7 17 17 7M8 7h9v9',
  key: 'M15.5 8.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM12 12v9m0-3h3m-3-3h2',
  home: 'M4 11 12 4l8 7v9H4zM10 20v-6h4v6',
  building: 'M6 21V4h9v17M15 9h3v12M9 8h3M9 12h3M9 16h3M3 21h18',
  tag: 'M3 12V4h8l10 10-8 8zM7.5 8.5h.01',
  door: 'M6 21V4h12v17M3 21h18M14 12.5h.01',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM21 21l-5-5',
  check: 'M5 12.5 10 17.5 19 7',
  pin: 'M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21ZM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  sun: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  moon: 'M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z',
  chat: 'M4 5h16v11H9l-5 4zM8.5 10h7',
  plus: 'M12 5v14M5 12h14',
  quote: 'M9 7H5v6h4v-2c0 2-1 3-3 3M19 7h-4v6h4v-2c0 2-1 3-3 3',
  bed: 'M3 19V6M3 14h18v5M21 14v-2a3 3 0 0 0-3-3h-7v5M6.5 11.5h.01',
  bath: 'M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM6 12V6a2 2 0 0 1 4 0M7 19l-1 2M17 19l1 2',
  area: 'M4 4h16v16H4zM4 9h5M9 4v5',
  heart: 'M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11Z',
  play: 'M8 5v14l11-7z',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z',
  cal: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  close: 'M6 6l12 12M18 6 6 18',
  menu: 'M4 7h16M4 12h16M4 17h16',
  down: 'M12 5v14M6 13l6 6 6-6',
  school: 'M3 9l9-5 9 5-9 5zM7 11.5V16c0 1 2.2 2.5 5 2.5s5-1.5 5-2.5v-4.5',
  bus: 'M5 4h14v13H5zM5 11h14M8 20v-3M16 20v-3',
  tree: 'M12 21v-6M12 3a5 5 0 0 0-4 8 4 4 0 0 0 4 4 4 4 0 0 0 4-4 5 5 0 0 0-4-8Z',
  hand: 'M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11ZM8 11l3 3 5-4',
  star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',
  doc: 'M7 3h8l4 4v14H7zM10 12h6M10 16h6',
}
export const Ic = ({ n, s = 22, fill, className = '' }) => (
  <svg className={`ic ${className}`} width={s} height={s} viewBox="0 0 24 24" fill={fill ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={P[n]} />
  </svg>
)

export function Btn({ tone = 'yellow', href, onClick, children, arrow = true, className = '', ...rest }) {
  const C = href ? 'a' : 'button'
  return (
    <C className={`btn ${tone} ${className}`} href={href} onClick={onClick} type={href ? undefined : 'button'} {...rest}>
      <span>{children}</span>
      {arrow && <Ic n="arrow" s={18} className="arr" />}
    </C>
  )
}

export function Reveal({ children, delay = 0, className = '', ...p }) {
  const r = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { threshold: 0.15 })
    io.observe(r.current)
    return () => io.disconnect()
  }, [])
  return <div ref={r} className={`reveal ${on ? 'in' : ''} ${className}`} style={{ '--d': delay + 'ms' }} {...p}>{children}</div>
}

export function useInView(threshold = 0.3) {
  const r = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { threshold })
    io.observe(r.current)
    return () => io.disconnect()
  }, [threshold])
  return [r, on]
}

export function useCountUp(v, ms = 400) {
  const [n, setN] = useState(v)
  const cur = useRef(v)
  useEffect(() => {
    const s = cur.current, t0 = performance.now()
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { cur.current = v; setN(v); return }
    let id
    const step = (t) => {
      const p = Math.min(1, (t - t0) / ms)
      cur.current = s + (v - s) * (1 - Math.pow(1 - p, 3))
      setN(cur.current)
      if (p < 1) id = requestAnimationFrame(step)
    }
    id = requestAnimationFrame(step)
    return () => cancelAnimationFrame(id)
  }, [v, ms])
  return n
}

// Slow horizontal drift of a ghost word, max 40px
export function useParallax() {
  const r = useRef(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf
    const f = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (!r.current) return
        const b = r.current.parentElement.getBoundingClientRect()
        const p = (b.top + b.height / 2) / innerHeight - 0.5
        r.current.style.transform = `translate3d(${Math.max(-40, Math.min(40, p * -80))}px,0,0)`
      })
    }
    f(); addEventListener('scroll', f, { passive: true })
    return () => { removeEventListener('scroll', f); cancelAnimationFrame(raf) }
  }, [])
  return r
}

// Picture used on cards. The address comes from images.js
export function Art({ src, alt = 'Illustrative home scene' }) {
  return <img className="art" src={src} alt={alt} loading="lazy" />
}

export const Logo = ({ light }) => (
  <span className={`logo ${light ? 'light' : ''}`}>
    <svg width="34" height="34" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 18 20 6l14 12v16H6z" /><path d="M20 20v8" strokeLinecap="round" />
    </svg>
    <span><b>hearthly</b><small>HOMES · AGRA</small></span>
  </span>
)
