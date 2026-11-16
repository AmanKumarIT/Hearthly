import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AppCtx } from './ui.jsx'
import { Header, Hero, Trust, Audience, Properties, Process, Calculator, Neighbourhoods, Team, Reviews, Resources, Faq, Contact, Footer, Sphere } from './sections.jsx'

const read = (k, d) => { try { return localStorage.getItem(k) || d } catch { return d } }
const urlFilters = () => {
  const p = new URLSearchParams(location.search)
  return { intent: p.get('intent') === 'rent' ? 'rent' : 'buy', area: p.get('area') || '', min: +p.get('min') || 0, max: p.get('max') ? +p.get('max') : null, beds: +p.get('beds') || 0, types: p.get('types') ? p.get('types').split(',') : [], sort: p.get('sort') || 'new' }
}

export default function App() {
  const [lang, setLangS] = useState(read('hl-lang', 'en'))
  const [themePref, setThemeS] = useState(read('hl-theme', 'system'))
  const [filters, setFilters] = useState(urlFilters)
  const [ctx, setCtx] = useState({})
  const main = useRef(null)

  const t = useCallback((en, hi) => (lang === 'hi' && hi ? hi : en), [lang])
  const go = useCallback((id) => {
    const el = document.getElementById(id)
    el && el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }, [])
  const setLang = (l) => {
    setLangS(l)
    try { localStorage.setItem('hl-lang', l) } catch {}
    const m = main.current
    if (m) { m.animate([{ opacity: 0.3 }, { opacity: 1 }], { duration: 200 }) } // cross-fade, keeps form values
  }
  const setTheme = (p) => {
    document.documentElement.classList.add('fade')
    setThemeS(p)
    try { localStorage.setItem('hl-theme', p) } catch {}
    setTimeout(() => document.documentElement.classList.remove('fade'), 400)
  }

  useEffect(() => { document.documentElement.lang = lang }, [lang])
  useEffect(() => {
    const mq = matchMedia('(prefers-color-scheme: dark)')
    const apply = () => { document.documentElement.dataset.theme = themePref === 'dark' || (themePref === 'system' && mq.matches) ? 'dark' : 'light' }
    apply(); mq.addEventListener('change', apply); return () => mq.removeEventListener('change', apply)
  }, [themePref])
  useEffect(() => { // filter state lives in the URL so searches can be shared
    const p = new URLSearchParams()
    if (filters.intent !== 'buy') p.set('intent', filters.intent)
    if (filters.area) p.set('area', filters.area)
    if (filters.min) p.set('min', filters.min)
    if (filters.max != null) p.set('max', filters.max)
    if (filters.beds) p.set('beds', filters.beds)
    if (filters.types.length) p.set('types', filters.types.join(','))
    if (filters.sort !== 'new') p.set('sort', filters.sort)
    const q = p.toString()
    history.replaceState(null, '', q ? `?${q}${location.hash}` : location.pathname + location.hash)
  }, [filters])

  return (
    <AppCtx.Provider value={{ t, lang, setLang, themePref, setTheme, go, filters, setFilters, ctx, setCtx }}>
      <Header />
      <main ref={main}>
        <Hero /><Trust /><Audience /><Properties /><Process /><Calculator /><Neighbourhoods /><Team /><Reviews /><Resources /><Faq /><Contact />
      </main>
      <Footer />
      <Sphere />
    </AppCtx.Provider>
  )
}
