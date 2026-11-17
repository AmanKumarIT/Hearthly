import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ROUTES } from './routes.js'
import { useApp, Ic, Btn, Reveal, Art, Logo, inr, short, useCountUp, useInView, useParallax } from './ui.jsx'
import { IMAGES } from './images.js'
import { AREAS, LISTINGS, TEAM, TYPES, MOVES, COSTS, FAQ, PHONE, WHATSAPP, CITY } from './data.js'

/* ---------- Header ---------- */
const LINKS = [['properties', 'Properties', 'प्रॉपर्टी'], ['help', 'How we help', 'हम कैसे मदद करते हैं'], ['process', 'How it works', 'कैसे काम करता है'], ['calculator', 'Calculator', 'कैलकुलेटर'], ['team', 'Our people', 'हमारी टीम'], ['resources', 'Resources', 'संसाधन']]

export function Header() {
  const { t, lang, setLang, themePref, setTheme, go } = useApp()
  const [small, setSmall] = useState(false)
  const [menu, setMenu] = useState(false)
  const [pop, setPop] = useState(null) // 'theme' | 'chat'
  const chatBtn = useRef(null)
  useEffect(() => {
    const f = () => setSmall(scrollY > 40)
    f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f)
  }, [])
  useEffect(() => {
    const k = (e) => { if (e.key === 'Escape') { setPop(null); setMenu(false); chatBtn.current && pop === 'chat' && chatBtn.current.focus() } }
    addEventListener('keydown', k); return () => removeEventListener('keydown', k)
  }, [pop])
  const nav = (id) => (e) => { e.preventDefault(); setMenu(false); go(id) }
  return (
    <header className={`hdr ${small ? 'small' : ''}`}>
      <div className="wrap">
        <Link to="/" aria-label="Hearthly home"><Logo /></Link>
        <nav className="nav" aria-label="Main">
          {LINKS.map(([id, en, hi]) => <NavLink key={id} to={ROUTES[id]} className={({ isActive }) => (isActive ? 'on' : '')}>{t(en, hi)}</NavLink>)}
        </nav>
        <div className="tools">
          <div className="lang" role="group" aria-label="Language">
            <button className={lang === 'en' ? 'on' : ''} aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
            <button className={lang === 'hi' ? 'on' : ''} aria-pressed={lang === 'hi'} onClick={() => setLang('hi')} lang="hi">हिन्दी</button>
          </div>
          <div className="rel">
            <button className="icon-btn" aria-label={`Theme: ${themePref}`} aria-haspopup="true" aria-expanded={pop === 'theme'} onClick={() => setPop(pop === 'theme' ? null : 'theme')}>
              <span className="morph"><Ic n="sun" className="sun" /><Ic n="moon" className="moon" /></span>
            </button>
            {pop === 'theme' && <div className="pop sm" role="menu">{['light', 'dark', 'system'].map((m) => <button key={m} aria-pressed={themePref === m} onClick={() => { setTheme(m); setPop(null) }}>{m === 'light' ? t('Light', 'लाइट') : m === 'dark' ? t('Dark', 'डार्क') : t('System', 'सिस्टम')}</button>)}</div>}
          </div>
          <div className="rel">
            <button ref={chatBtn} className="icon-btn" aria-label="Chat" aria-expanded={pop === 'chat'} onClick={() => setPop(pop === 'chat' ? null : 'chat')}>
              <Ic n="chat" /><i className="dotg" />
            </button>
            {pop === 'chat' && (
              <div className="pop" role="dialog" aria-label="Chat">
                <h3 style={{ fontSize: '1.2rem', marginBottom: 6 }}>{t('Hi there 👋', 'नमस्ते 👋')}</h3>
                <p className="serif" style={{ fontSize: '1rem', marginBottom: 16 }}>{t('We’re online. Ask us anything about homes or loans.', 'हम ऑनलाइन हैं। घर या लोन के बारे में कुछ भी पूछिए।')}</p>
                <div style={{ display: 'grid', gap: 10 }}>
                  <Btn tone="teal" autoFocus onClick={() => setPop(null)}>{t('Start chat', 'चैट शुरू करें')}</Btn>
                  <Btn tone="yellow" href={WHATSAPP} target="_blank" rel="noreferrer">{t('Continue on WhatsApp', 'WhatsApp पर जारी रखें')}</Btn>
                </div>
                <p className="note" style={{ marginTop: 10 }}>Placeholder chat. Connect your provider here.</p>
              </div>
            )}
          </div>
          <Btn tone="teal" href="/contact" onClick={nav('contact')}>{t('Let’s talk', 'बात करें')}</Btn>
          <button className="icon-btn menu-btn" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu(!menu)}><Ic n={menu ? 'close' : 'menu'} /></button>
        </div>
      </div>
      {menu && <nav className="mnav" aria-label="Mobile">{LINKS.map(([id, en, hi]) => <NavLink key={id} to={ROUTES[id]} className={({ isActive }) => (isActive ? 'on' : '')} onClick={() => setMenu(false)}>{t(en, hi)}</NavLink>)}</nav>}
    </header>
  )
}

/* ---------- Hero ---------- */
function HeroArt() {
  return <img className="hero-art" src={IMAGES.hero} alt="Illustration of a couple holding keys outside a brick home" />
}

export function Hero() {
  const { t, go } = useApp()
  const lines = [t('Big life moves.', 'बड़े फ़ैसले।'), t('Small property', 'छोटी प्रॉपर्टी')]
  return (
    <section className="hero" id="top">
      <HeroArt />
      <div className="wrap">
        <p className="eyebrow dot y" style={{ color: '#fff' }}>{t(`${CITY} roots. Your next chapter.`, `${CITY} की जड़ें। आपका अगला अध्याय।`)}</p>
        <h1>
          <span className="hl" style={{ '--i': 0 }}><span>{lines[0]}</span></span>
          <span className="hl" style={{ '--i': 1 }}><span>{lines[1]}</span></span>
          <span className="hl" style={{ '--i': 2 }}><span><span className="yw">{t('worries.', 'चिंताएँ।')}<svg viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true"><path d="M3 12C60 4 150 3 297 8M20 17C100 11 190 11 280 15" /></svg></span></span></span>
        </h1>
        <p className="serif">{t('From your first set of keys to your next investment. Friendly, independent advice. Minus the jargon.', 'पहली चाबी से अगले निवेश तक। दोस्ताना, स्वतंत्र सलाह। बिना मुश्किल शब्दों के।')}</p>
        <div className="cta-row">
          <Btn href="/contact" onClick={(e) => { e.preventDefault(); go('contact') }}>{t('Book a free appointment', 'मुफ़्त अपॉइंटमेंट बुक करें')}</Btn>
          <Btn tone="link w" href="/calculator" onClick={(e) => { e.preventDefault(); go('calculator') }}>{t('Try our calculator', 'कैलकुलेटर आज़माएँ')}</Btn>
        </div>
      </div>
      <p className="hero-note"><Ic n="check" s={16} />{t('No pressure. No obligation. Just a good chat.', 'कोई दबाव नहीं। कोई बाध्यता नहीं। बस एक अच्छी बातचीत।')}</p>
      <div className="sticker"><Ic n="key" s={30} className="wig" /><span>{t('A little advice.', 'थोड़ी सलाह।')}<br />{t('A big new beginning.', 'एक बड़ी नई शुरुआत।')}</span></div>
      <a className="scroll-dn" href="#trust" aria-label="Scroll down" onClick={(e) => { e.preventDefault(); document.getElementById('trust')?.scrollIntoView({ behavior: 'smooth' }) }}><Ic n="down" s={20} /></a>
    </section>
  )
}

export function Trust() {
  const { t } = useApp()
  return (
    <div className="trust" id="trust"><div className="wrap">
      <span><Ic n="search" /><b>{t('Many lenders.', 'कई बैंक।')}</b> {t('One right fit for you.', 'आपके लिए एक सही विकल्प।')}</span>
      <span><Ic n="check" />{t('Independent advice. Always personal.', 'स्वतंत्र सलाह। हमेशा व्यक्तिगत।')}</span>
      <span><Ic n="pin" />{t(`Here in ${CITY}. Here for you.`, `यहीं ${CITY} में। आपके लिए।`)}</span>
    </div></div>
  )
}

/* ---------- Audience ---------- */
const AUD = [
  ['key', 'First-time buyers', 'पहली बार खरीदार', 'Your first home', 'आपका पहला घर', 'Big dreams. Lots of questions. We’ll help you understand what you can borrow and make that first step feel smaller.', 'बड़े सपने, ढेर सारे सवाल। हम समझाएँगे कि आप कितना लोन ले सकते हैं।', 'var(--mint)', 'First home'],
  ['home', 'Home movers', 'घर बदलने वाले', 'Your next chapter', 'आपका अगला अध्याय', 'More space, a new postcode, a fresh start. Let’s find a loan that moves with you.', 'ज़्यादा जगह, नया इलाक़ा, नई शुरुआत। ऐसा लोन ढूँढें जो आपके साथ चले।', 'var(--cream)', 'Next chapter'],
  ['building', 'Investors', 'निवेशक', 'Your next investment', 'आपका अगला निवेश', 'Your first rental or a growing portfolio. Clear advice to help you move with confidence.', 'पहला किराये का घर या बढ़ता पोर्टफ़ोलियो। भरोसे से आगे बढ़ने की साफ़ सलाह।', 'var(--subtle)', 'Investment'],
  ['tag', 'Sellers', 'विक्रेता', 'Your next sale', 'आपकी अगली बिक्री', 'Thinking of selling? We’ll help you price it well and plan the move.', 'बेचने की सोच रहे हैं? सही कीमत तय करने और आगे की योजना में हम साथ हैं।', 'var(--sage)', 'Selling'],
  ['door', 'Renters', 'किरायेदार', 'Your next rental', 'आपका अगला किराये का घर', 'Renting or letting? Clear steps, fair terms, no surprises.', 'किराये पर लेना या देना? साफ़ कदम, उचित शर्तें, कोई चौंकाने वाली बात नहीं।', 'var(--sand)', 'Renting'],
]
export function Audience() {
  const { t, setCtx, go } = useApp()
  return (
    <section id="help">
      <div className="wrap">
        <div className="sec-head">
          <div><p className="eyebrow">{t('A home for your kind of next', 'आपके अगले क़दम के लिए एक घर')}</p><h2>{t('Wherever life’s taking you,', 'ज़िंदगी जहाँ भी ले जाए,')}<br />{t('let’s find your way home.', 'चलिए घर का रास्ता ढूँढें।')}</h2></div>
          <p className="serif">{t('Different plans. Different possibilities. The same friendly people in your corner.', 'अलग योजनाएँ, अलग संभावनाएँ। वही दोस्ताना लोग आपके साथ।')}</p>
        </div>
        <div className="aud">
          {AUD.map((a, i) => (
            <Reveal key={a[0]} delay={i * 80}>
              <button className="card" style={{ '--tint': a[7] }} onClick={() => { setCtx((c) => ({ ...c, move: a[8] })); go('contact') }}>
                <span className="top"><span className="circ"><Ic n={a[0]} s={28} className="wig" /></span><span>/0{i + 1}</span></span>
                <span className="label">{t(a[1], a[2])}</span>
                <h3>{t(a[3], a[4])}</h3>
                <p className="serif">{t(a[5], a[6])}</p>
                <span className="go">{t('Start here', 'यहाँ से शुरू करें')} <Ic n="arrow" s={18} /></span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Properties ---------- */
export function Properties() {
  const { t, filters: f, setFilters, setCtx, go } = useApp()
  const [shown, setShown] = useState(6)
  const [saved, setSaved] = useState({})
  const max = f.intent === 'buy' ? 50000000 : 100000
  const step = f.intent === 'buy' ? 500000 : 1000
  const set = (p) => { setFilters((x) => ({ ...x, ...p })); setShown(6) }
  const list = useMemo(() => {
    const hi = f.max ?? max
    let r = LISTINGS.filter((l) => l.intent === f.intent && (!f.area || l.area === f.area) && l.price >= f.min && l.price <= hi && (f.beds === 0 || (f.beds === 5 ? l.beds >= 5 : l.beds === f.beds)) && (!f.types.length || f.types.includes(l.type)))
    if (f.sort === 'low') r = [...r].sort((a, b) => a.price - b.price)
    if (f.sort === 'high') r = [...r].sort((a, b) => b.price - a.price)
    return r
  }, [f, max])
  const areaName = (id) => AREAS.find((a) => a.id === id)?.name
  const chips = [
    f.area && ['area', areaName(f.area), () => set({ area: '' })],
    (f.min > 0 || f.max != null) && ['price', `${short(f.min)} – ${short(f.max ?? max)}`, () => set({ min: 0, max: null })],
    f.beds > 0 && ['beds', `${f.beds}${f.beds === 5 ? '+' : ''} BHK`, () => set({ beds: 0 })],
    ...f.types.map((ty) => ['t' + ty, TYPES.find((x) => x[0] === ty)[1], () => set({ types: f.types.filter((z) => z !== ty) })]),
  ].filter(Boolean)
  const clear = () => set({ area: '', min: 0, max: null, beds: 0, types: [] })
  const enquire = (l) => { setCtx((c) => ({ ...c, property: { id: l.id, title: l.title }, move: l.intent === 'rent' ? 'Renting' : c.move })); go('contact') }
  const lo = f.min, hi = f.max ?? max
  return (
    <section id="properties" className="bg-subtle">
      <div className="wrap">
        <div className="sec-head">
          <div><p className="eyebrow">{t('Homes worth a look', 'देखने लायक घर')}</p><h2>{t('Find a place', 'ढूँढिए एक ऐसी जगह')}<br />{t('that feels like yours.', 'जो अपनी लगे।')}</h2></div>
          <p className="serif">{t('Filter by area, budget and bedrooms. Tap a home and we’ll take it from there.', 'इलाक़ा, बजट और बेडरूम से छाँटिए। घर चुनिए, आगे हम संभाल लेंगे।')}</p>
        </div>
        <div className="fbar">
          <div><span className="lbl">{t('I want to', 'मुझे चाहिए')}</span><div className="seg" role="group">{[['buy', 'Buy', 'खरीदना'], ['rent', 'Rent', 'किराये पर']].map(([k, e, h]) => <button key={k} className={f.intent === k ? 'on' : ''} aria-pressed={f.intent === k} onClick={() => set({ intent: k, min: 0, max: null })}>{t(e, h)}</button>)}</div></div>
          <div><label htmlFor="area">{t('Area', 'इलाक़ा')}</label><select id="area" value={f.area} onChange={(e) => set({ area: e.target.value })}><option value="">{t('Anywhere in Agra', 'आगरा में कहीं भी')}</option>{AREAS.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}</select></div>
          <div className="range"><span className="lbl">{t('Price', 'कीमत')}: {short(lo)} – {short(hi)}</span>
            <input type="range" aria-label="Minimum price" min="0" max={max} step={step} value={lo} onChange={(e) => set({ min: Math.min(+e.target.value, hi) })} />
            <input type="range" aria-label="Maximum price" min="0" max={max} step={step} value={hi} onChange={(e) => set({ max: Math.max(+e.target.value, lo) })} /></div>
          <div><span className="lbl">{t('Bedrooms', 'बेडरूम')}</span><div className="chips">{[0, 1, 2, 3, 4, 5].map((b) => <button key={b} className="chip" aria-pressed={f.beds === b} onClick={() => set({ beds: b })}>{b === 0 ? t('Any', 'कोई भी') : b === 5 ? '5+' : b}</button>)}</div></div>
          <div><span className="lbl">{t('Property type', 'प्रॉपर्टी का प्रकार')}</span><div className="chips">{TYPES.map(([k, e, h]) => <button key={k} className="chip" aria-pressed={f.types.includes(k)} onClick={() => set({ types: f.types.includes(k) ? f.types.filter((z) => z !== k) : [...f.types, k] })}>{t(e, h)}</button>)}</div></div>
          <div><label htmlFor="sort">{t('Sort by', 'क्रम')}</label><select id="sort" value={f.sort} onChange={(e) => set({ sort: e.target.value })}><option value="new">{t('Newest', 'नया पहले')}</option><option value="low">{t('Price: low to high', 'कीमत: कम से ज़्यादा')}</option><option value="high">{t('Price: high to low', 'कीमत: ज़्यादा से कम')}</option></select></div>
        </div>
        <div className="rowbar">
          <p className="count" aria-live="polite">{list.length} {t(list.length === 1 ? 'home' : 'homes', 'घर')}</p>
          {chips.map(([k, label, rm]) => <button key={k} className="chip rm" onClick={rm} aria-label={`Remove filter ${label}`}>{label} <Ic n="close" s={14} /></button>)}
          {chips.length > 0 && <button className="btn link" onClick={clear}>{t('Clear all', 'सब हटाएँ')}</button>}
        </div>
        {list.length === 0 ? (
          <div className="empty"><h3>{t('No homes match yet', 'अभी कोई घर मेल नहीं खाता')}</h3><p className="serif" style={{ margin: '10px 0 20px' }}>{t('Try widening your budget or clearing a filter, or ask an adviser to look for you.', 'बजट बढ़ाकर या कोई फ़िल्टर हटाकर देखें, या सलाहकार से कहें कि वे ढूँढें।')}</p><Btn tone="teal" onClick={clear} arrow={false}>{t('Clear filters', 'फ़िल्टर हटाएँ')}</Btn><Btn tone="yellow" onClick={() => go('contact')}>{t('Talk to an adviser', 'सलाहकार से बात करें')}</Btn></div>
        ) : (
          <div className="grid3">
            {list.slice(0, shown).map((l, i) => (
              <Reveal key={l.id} delay={(i % 3) * 80}>
                <article className="prop" tabIndex={0} role="link" onClick={() => enquire(l)} onKeyDown={(e) => e.key === 'Enter' && enquire(l)} aria-label={`${l.title}, ${areaName(l.area)}`}>
                  <div className="pic"><Art src={IMAGES.listings[l.id]} alt={l.title} />{l.tag && <span className="tagp">{l.tag}</span>}<span className="flag">Sample listing</span>
                    <button className="save" aria-pressed={!!saved[l.id]} aria-label="Save home" onClick={(e) => { e.stopPropagation(); setSaved((s) => ({ ...s, [l.id]: !s[l.id] })) }}><Ic n="heart" /></button></div>
                  <div className="pbody">
                    <div className="price">{short(l.price)}{l.intent === 'rent' && <small> {t('/ month', '/ माह')}</small>}</div>
                    <h3 style={{ fontSize: '1.15rem', margin: '8px 0 4px' }}>{l.title}</h3>
                    <p className="note">{areaName(l.area)}, {CITY} · {t(...TYPES.find((x) => x[0] === l.type).slice(1))}</p>
                    <div className="meta"><span><Ic n="bed" s={18} />{l.beds}</span><span><Ic n="bath" s={18} />{l.baths}</span><span><Ic n="area" s={18} />{l.sqft} sq ft</span></div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
        {list.length > shown && <div style={{ textAlign: 'center', marginTop: 44 }}><Btn tone="teal" onClick={() => setShown((s) => s + 6)}>{t('Show more homes', 'और घर दिखाएँ')}</Btn></div>}
      </div>
    </section>
  )
}

/* ---------- Process ---------- */
const STEPS = [
  ['Let’s have a chat', 'आइए बात करें', 'Tell us your plans over a free, friendly conversation. We’ll listen first and explain your options.', 'एक मुफ़्त, दोस्ताना बातचीत में अपनी योजना बताइए। हम पहले सुनेंगे, फिर विकल्प समझाएँगे।'],
  ['We do the legwork', 'दौड़-भाग हम करेंगे', 'We compare suitable loans from many lenders, so you don’t have to start from scratch.', 'हम कई बैंकों के उपयुक्त लोन की तुलना करते हैं, ताकि आपको शुरू से न करना पड़े।'],
  ['Make it happen', 'इसे सच करें', 'We help with your application and paperwork, keeping you in the loop along the way.', 'आवेदन और काग़ज़ी काम में हम मदद करते हैं और आपको हर क़दम की जानकारी देते हैं।'],
  ['Hello, new chapter', 'नमस्ते, नया अध्याय', 'From your loan offer to completion, we stay by your side and help you get ready for the keys.', 'लोन ऑफ़र से रजिस्ट्री तक, हम आपके साथ रहते हैं और चाबियाँ पाने की तैयारी करवाते हैं।'],
]
export function Process() {
  const { t, go } = useApp()
  const g = useParallax()
  const [r, on] = useInView(0.4)
  return (
    <section id="process" className="band">
      <span className="ghost" ref={g} aria-hidden="true">NEXT</span>
      <div className="wrap">
        <div className="sec-head" style={{ marginBottom: 0 }}>
          <div><p className="eyebrow y">{t('Less head-scratching. More hand-holding.', 'कम उलझन। ज़्यादा साथ।')}</p><h2>{t('From “where do I start?”', '“कहाँ से शुरू करूँ?” से')}<br />{t('to “we’ve got the keys.”', '“हमें चाबियाँ मिल गईं” तक।')}</h2></div>
          <div ref={r} style={{ textAlign: 'center', color: 'var(--accent)' }}><Ic n="hand" s={64} className={on ? 'pulse' : ''} /><p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', transform: 'rotate(-4deg)' }}>{t('With you, every step.', 'हर क़दम पर, आपके साथ।')}</p></div>
        </div>
        <div className="steps">
          {STEPS.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="step"><div className="n"><span>0{i + 1}</span><i /></div><h3>{t(s[0], s[1])}</h3><p className="serif">{t(s[2], s[3])}</p></div>
            </Reveal>
          ))}
        </div>
        <div className="proc-foot"><p>{t('You bring the plans. We’ll bring the know-how.', 'आप योजनाएँ लाइए। जानकारी हम लाएँगे।')}</p><Btn onClick={() => go('contact')}>{t('Take the first step', 'पहला क़दम उठाएँ')}</Btn></div>
      </div>
    </section>
  )
}

/* ---------- Calculator ---------- */
const num = (v) => Number(String(v).replace(/\D/g, '')) || 0
function Money({ label, v, set, id }) {
  return <div><label className="lbl" htmlFor={id}>{label}</label><div className="fld"><span className="pre">₹</span><input id={id} className="p" inputMode="numeric" value={v.toLocaleString('en-IN')} onChange={(e) => set(num(e.target.value))} /></div></div>
}
export function Calculator() {
  const { t, setCtx, go } = useApp()
  const [tab, setTab] = useState('pay')
  const [mode, setMode] = useState('rep')
  const [price, setPrice] = useState(5000000)
  const [dep, setDep] = useState(500000)
  const [term, setTerm] = useState(25)
  const [rate, setRate] = useState(8.5)
  const [buyer, setBuyer] = useState('first')
  const err = price <= 0 ? t('Enter a property price.', 'संपत्ति की कीमत लिखें।') : dep > price ? t('Your deposit can’t be more than the price.', 'डाउन पेमेंट कीमत से ज़्यादा नहीं हो सकता।') : ''
  const P = err ? 0 : price - dep, r = rate / 1200, n = term * 12
  const monthly = !P ? 0 : mode === 'rep' ? (r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)) : P * r
  const interest = mode === 'rep' ? monthly * n - P : monthly * n
  const costs = [
    ['Stamp duty', 'स्टांप ड्यूटी', (price * COSTS.stamp[buyer]) / 100],
    ['Registration', 'रजिस्ट्रेशन', (price * COSTS.reg) / 100],
    ['Legal fees', 'क़ानूनी शुल्क', (price * COSTS.legal) / 100],
    ['Survey & valuation', 'सर्वे और मूल्यांकन', (price * COSTS.survey) / 100],
    ['Loan or broker fees', 'लोन या ब्रोकर शुल्क', (price * COSTS.broker) / 100],
    ['Moving costs', 'शिफ़्टिंग का खर्च', COSTS.moving],
  ].map((c) => [c[0], c[1], Math.round(c[2])])
  const upfront = err ? 0 : dep + costs.reduce((s, c) => s + c[2], 0)
  const big = useCountUp(tab === 'pay' ? monthly : upfront)
  const cMon = useCountUp(P), cInt = useCountUp(interest), cTot = useCountUp(P + interest)
  const pct = price ? Math.round((dep / price) * 100) : 0
  const cta = () => { setCtx((c) => ({ ...c, calc: { price, dep, term } })); go('contact') }
  return (
    <section id="calculator">
      <div className="wrap">
        <div className="sec-head">
          <h2>{t('Big plans.', 'बड़ी योजनाएँ।')}<br />{t('Let’s make the sums simple.', 'हिसाब आसान बनाते हैं।')}</h2>
          <p className="serif">{t('Get a feel for your monthly repayments. No spreadsheets. No guesswork.', 'अपनी मासिक किस्त का अंदाज़ा लगाइए। न स्प्रेडशीट, न अटकलें।')}</p>
        </div>
        <div className="tabs" role="tablist">{[['pay', 'Monthly payment', 'मासिक किस्त'], ['cost', 'Buying costs', 'खरीद का खर्च']].map(([k, e, h]) => <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{t(e, h)}</button>)}</div>
        <div className="calc">
          <div className="cin">
            {tab === 'pay' ? <div className="seg" role="group">{[['rep', 'Repayment', 'किस्त (मूल+ब्याज)'], ['int', 'Interest-only', 'केवल ब्याज']].map(([k, e, h]) => <button key={k} className={mode === k ? 'on' : ''} aria-pressed={mode === k} onClick={() => setMode(k)}>{t(e, h)}</button>)}</div>
              : <div><span className="lbl">{t('Buyer type', 'खरीदार का प्रकार')}</span><div className="chips">{[['first', 'First home', 'पहला घर'], ['next', 'Next home', 'अगला घर'], ['extra', 'Additional property', 'अतिरिक्त संपत्ति']].map(([k, e, h]) => <button key={k} className="chip" aria-pressed={buyer === k} onClick={() => setBuyer(k)}>{t(e, h)}</button>)}</div></div>}
            <div className="two">
              <Money id="pr" label={t('Property price', 'संपत्ति की कीमत')} v={price} set={setPrice} />
              <div><label className="lbl" htmlFor="dp">{t('Your deposit', 'आपका डाउन पेमेंट')}</label><div className="fld"><span className="pre">₹</span><input id="dp" className="p" inputMode="numeric" aria-invalid={!!err} value={dep.toLocaleString('en-IN')} onChange={(e) => setDep(num(e.target.value))} /><span className="badge">{pct}%</span></div></div>
            </div>
            {err && <p className="err" role="alert">{err}</p>}
            {tab === 'pay' && <>
              <div><div className="row"><span className="lbl" style={{ margin: 0 }}>{t('Loan term', 'लोन की अवधि')}</span>
                <div className="step-in"><button aria-label="Decrease term" onClick={() => setTerm(Math.max(1, term - 1))}>−</button><b>{term} <small className="note">{t('years', 'वर्ष')}</small></b><button aria-label="Increase term" onClick={() => setTerm(Math.min(40, term + 1))}>+</button></div></div>
                <input type="range" min="1" max="40" value={term} aria-label="Loan term in years" onChange={(e) => setTerm(+e.target.value)} style={{ marginTop: 14 }} />
                <div className="row note"><span>1 {t('year', 'वर्ष')}</span><span>40 {t('years', 'वर्ष')}</span></div></div>
              <div style={{ maxWidth: 200 }}><label className="lbl" htmlFor="rt">{t('Interest rate (%)', 'ब्याज दर (%)')}</label><input id="rt" type="number" step="0.1" min="0" max="30" value={rate} onChange={(e) => setRate(Math.min(30, Math.max(0, +e.target.value)))} /></div>
              <p className="note">{t('An example rate, not a current loan offer.', 'यह एक उदाहरण दर है, मौजूदा लोन ऑफ़र नहीं।')}</p></>}
            {tab === 'cost' && <p className="note">{t('Estimates only. Rates and rules change, so we’ll confirm your actual costs.', 'केवल अनुमान। दरें और नियम बदलते हैं, इसलिए असली खर्च हम पुष्टि करेंगे।')}<br />Placeholder rates · effective {COSTS.effective} · owner: {COSTS.owner}</p>}
          </div>
          <div className="cout" aria-live="polite">
            <p className="eyebrow y" style={{ margin: 0 }}>{tab === 'pay' ? t('Your estimated monthly payment', 'आपकी अनुमानित मासिक किस्त') : t('Cash needed upfront', 'शुरू में ज़रूरी नकद')}</p>
            <div className="big">{inr(big)}{tab === 'pay' && <small> {t('/ month', '/ माह')}</small>}</div>
            {tab === 'pay' ? <>
              <p className="serif">{t(`For a loan of ${inr(P)} over ${term} years.`, `${term} वर्षों के लिए ${inr(P)} के लोन पर।`)}</p>
              <div className="lines"><div><span>{t('Loan amount', 'लोन राशि')}</span><b>{inr(cMon)}</b></div><div><span>{t('Total interest over the term', 'अवधि में कुल ब्याज')}</span><b>{inr(cInt)}</b></div><div><span>{t('Total amount to repay', 'कुल चुकाने की राशि')}</span><b>{inr(cTot)}</b></div></div></>
              : <div className="lines"><div><span>{t('Deposit', 'डाउन पेमेंट')}</span><b>{inr(err ? 0 : dep)}</b></div>{costs.map((c) => <div key={c[0]}><span>{t(c[0], c[1])}</span><b>{inr(err ? 0 : c[2])}</b></div>)}<div className="tot"><span>{t('Total cash needed', 'कुल नकद ज़रूरत')}</span><b>{inr(upfront)}</b></div></div>}
            <Btn onClick={cta} style={{ marginTop: 'auto' }} className="block">{t('Let’s talk about your options', 'अपने विकल्पों पर बात करें')}</Btn>
            <p className="note">{t('The numbers are a start. The advice makes the difference.', 'आँकड़े एक शुरुआत हैं। फ़र्क़ सलाह से पड़ता है।')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Neighbourhoods ---------- */
export function Neighbourhoods() {
  const { t, setFilters, go } = useApp()
  const ic = ['school', 'bus', 'tree']
  return (
    <section id="areas" className="bg-subtle">
      <div className="wrap">
        <div className="sec-head"><div><p className="eyebrow">{t('Know the neighbourhood', 'इलाक़े को जानिए')}</p><h2>{t('Love where you live', 'जहाँ रहें, उसे पसंद करें')}<br />{t('before you move.', 'पहुँचने से पहले ही।')}</h2></div><p className="serif">Sample facts and price ranges. To be replaced with sourced, dated data.</p></div>
        <div className="nbs">
          {AREAS.map((a, i) => (
            <Reveal key={a.id} delay={(i % 3) * 80}>
              <article className="nb"><div className="pic" style={{ aspectRatio: '16/9' }}><Art src={IMAGES.areas[a.id]} alt={a.name} /><span className="flag">Sample data</span></div>
                <div className="pbody"><h3>{a.name}</h3><p className="price" style={{ fontSize: '1.1rem' }}>{a.range}</p><p className="serif" style={{ fontSize: '1rem' }}>{t(...a.sum)}</p>
                  <div className="facts">{a.facts.map((x, k) => <span key={x}><Ic n={ic[k]} s={16} />{x}</span>)}</div>
                  <Btn tone="link" onClick={() => { setFilters((f) => ({ ...f, area: a.id })); go('properties') }}>{t(`See homes in ${a.name}`, `${a.name} में घर देखें`)}</Btn></div></article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Team ---------- */
export function Team() {
  const { t, setCtx, go } = useApp()
  return (
    <section id="team">
      <div className="wrap">
        <div className="sec-head"><div><p className="eyebrow">{t('People first. Homes second.', 'पहले लोग। फिर घर।')}</p><h2>{t('Real people.', 'असली लोग।')}<br />{t('Really on your side.', 'सच में आपके साथ।')}</h2></div>
          <div><p className="serif">{t('A friendly face, a listening ear and someone who’s happy to explain it one more time.', 'एक मिलनसार चेहरा, सुनने वाला कान, और कोई जो एक बार और समझाने को तैयार।')}</p><Btn tone="link" onClick={() => go('contact')}>{t('Meet your match', 'अपने सलाहकार से मिलें')}</Btn></div></div>
        <p className="note" style={{ marginBottom: 20 }}>Meet-the-team preview. Illustrative profiles, to be replaced with your real advisers.</p>
        <div className="team">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i * 100}>
              <div className="tcard">
                <button className="tp" onClick={() => { setCtx((c) => ({ ...c, adviser: m.name })); go('contact') }} aria-label={`A good chat starts here with ${m.name}`}>
                  <img className="av" src={IMAGES.team[i]} alt="" />
                  <span className="bar">{t('A good chat starts here', 'अच्छी बातचीत यहाँ से शुरू')} <Ic n="arrow" s={16} /></span>
                </button>
                <h3>{m.name}</h3><p className="role">{t(...m.role)}</p><p className="serif" style={{ fontSize: '1.02rem' }}>{t(...m.bio)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Reviews + stories + resources ---------- */
const QUOTES = [
  ['From “where do we start?” to feeling ready.', '“Everything was explained in a way we could actually understand. Having someone to guide us made buying our first home feel less daunting.”', 'Example first-time buyer feedback'],
  ['Less paperwork stress. More looking ahead.', '“It was helpful to have our options laid out clearly, without the jargon. We knew what the next step was.”', 'Example home mover feedback'],
]
export function Reviews() {
  const { t } = useApp()
  const [open, setOpen] = useState(null)
  useEffect(() => { const k = (e) => e.key === 'Escape' && setOpen(null); addEventListener('keydown', k); return () => removeEventListener('keydown', k) }, [])
  const stories = [['Priya & Rohan', 'First home', '“We finally understood every step.”'], ['The Sharma family', 'Next chapter', '“Moving felt calm, not chaotic.”'], ['Imran', 'Investment', '“Clear advice, no pressure.”']]
  return (
    <section id="reviews" className="bg-subtle">
      <div className="wrap">
        <div className="split">
          <div><p className="eyebrow">{t('It’s about more than a loan', 'यह सिर्फ़ लोन से कहीं ज़्यादा है')}</p><h2>{t('A little reassurance', 'थोड़ा सा भरोसा')}<br />{t('goes a long way.', 'बहुत आगे तक जाता है।')}</h2>
            <p className="serif" style={{ margin: '20px 0' }}>{t('Clear advice. A friendly conversation. That’s the experience we’re here to offer.', 'साफ़ सलाह। दोस्ताना बातचीत। यही अनुभव हम देना चाहते हैं।')}</p>
            <a className="tpl" href="https://www.trustpilot.com" target="_blank" rel="noreferrer"><Ic n="star" fill s={26} /> Trustpilot <Ic n="arrow" s={16} /></a>
            <p className="note" style={{ marginTop: 14 }}>Search Trustpilot for independent reviews. No verified rating has been supplied yet.</p></div>
          <div><p className="note" style={{ textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 16 }}>Illustrative feedback · not verified customer reviews</p>
            {QUOTES.map((q, i) => <Reveal key={i} delay={i * 100}><div className="q"><Ic n="quote" s={34} /><div><h3>{q[0]}</h3><p className="serif">{q[1]}</p><span className="src">{q[2]}</span></div></div></Reveal>)}</div>
        </div>
        <div className="stories">
          {stories.map((s, i) => (
            <Reveal key={s[0]} delay={i * 100}>
              <button className="story" onClick={() => setOpen(s)}>
                <div className="pic"><Art src={IMAGES.stories[i]} alt={s[0]} /><span className="play"><Ic n="play" fill s={26} /></span><span className="flag">Placeholder story</span></div>
                <div className="pbody"><p className="cat">{s[1]}</p><h3 style={{ fontSize: '1.15rem', margin: '6px 0' }}>{s[0]}</h3><p className="serif" style={{ fontSize: '1rem' }}>{s[2]}</p></div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      {open && <div className="modal" onClick={() => setOpen(null)}><div className="mbox" role="dialog" aria-modal="true" aria-label={open[0]} onClick={(e) => e.stopPropagation()}>
        <button className="icon-btn" style={{ position: 'absolute', top: 14, right: 14 }} aria-label="Close" autoFocus onClick={() => setOpen(null)}><Ic n="close" /></button>
        <h3>{open[0]}</h3><p className="serif" style={{ margin: '12px 0' }}>{open[2]}</p><p className="note">Placeholder story. A captioned video will play here once a real client consents to appear.</p></div></div>}
    </section>
  )
}

export function Resources() {
  const { t } = useApp()
  const items = [['Buying', 'How much deposit do you really need?', 'A plain-English look at deposits, and ways to build yours faster.', '5 min read'], ['Moving', 'Selling and buying at the same time', 'How to line up dates so you’re never stuck in between.', '6 min read'], ['Investing', 'Your first rental: what to check', 'Yield, costs and the questions worth asking early.', '7 min read']]
  return (
    <section id="resources">
      <div className="wrap">
        <div className="sec-head"><div><p className="eyebrow">{t('Straight-talking advice', 'सीधी-सादी सलाह')}</p><h2>{t('Little reads', 'छोटे लेख')}<br />{t('for big decisions.', 'बड़े फ़ैसलों के लिए।')}</h2></div><Btn tone="link">{t('See all resources', 'सभी संसाधन देखें')}</Btn></div>
        <div className="grid3">{items.map((a, i) => <Reveal key={a[1]} delay={i * 100}><article className="res" tabIndex={0}><div className="pic"><Art src={IMAGES.resources[i]} alt={a[1]} /><span className="flag">Placeholder article</span></div><div className="pbody"><p className="cat">{a[0]} · {a[3]}</p><h3 style={{ fontSize: '1.25rem', margin: '8px 0' }}>{a[1]}</h3><p className="serif" style={{ fontSize: '1rem' }}>{a[2]}</p></div></article></Reveal>)}</div>
      </div>
    </section>
  )
}

/* ---------- FAQ ---------- */
export function Faq() {
  const { t } = useApp()
  const [open, setOpen] = useState(-1)
  return (
    <section id="faq" className="bg-subtle">
      <div className="wrap split">
        <div><p className="eyebrow">{t('No such thing as a silly question', 'कोई सवाल छोटा नहीं होता')}</p><h2>{t('Wondering', 'कुछ जानना')}<br />{t('about something?', 'चाहते हैं?')}</h2><p className="serif" style={{ marginTop: 20 }}>{t('You’re not the only one. Here’s a good place to start.', 'आप अकेले नहीं हैं। शुरुआत के लिए यह अच्छी जगह है।')}</p></div>
        <div className="faq">{FAQ.map((q, i) => (
          <div key={i}><button aria-expanded={open === i} aria-controls={`a${i}`} id={`q${i}`} onClick={() => setOpen(open === i ? -1 : i)}>{t(q[0], q[1])}<Ic n="plus" /></button>
            <div className={`ans ${open === i ? 'open' : ''}`} id={`a${i}`} role="region" aria-labelledby={`q${i}`}><div><p className="serif">{q[2]}</p></div></div></div>
        ))}</div>
      </div>
    </section>
  )
}

/* ---------- Contact ---------- */
export function Contact() {
  const { t, ctx, setCtx } = useApp()
  const g = useParallax()
  const blank = { name: '', email: '', phone: '', mode: 'Phone call', date: '', time: 'No preference', note: '', ok: false }
  const [f, setF] = useState(blank)
  const [e, setE] = useState({})
  const [done, setDone] = useState(false)
  const up = (k) => (ev) => setF({ ...f, [k]: ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value })
  const submit = (ev) => {
    ev.preventDefault()
    const x = {}
    if (!f.name.trim()) x.name = t('Please tell us your name.', 'कृपया अपना नाम बताएँ।')
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = t('Enter an email like you@example.com.', 'you@example.com जैसा ईमेल लिखें।')
    if (!/^(\+91[\s-]?)?[6-9]\d{9}$/.test(f.phone.replace(/\s/g, ''))) x.phone = t('Enter a 10-digit Indian mobile number.', '10 अंकों का भारतीय मोबाइल नंबर लिखें।')
    if (!ctx.move) x.move = t('Choose what’s next for you.', 'चुनें कि आपका अगला क़दम क्या है।')
    if (!f.ok) x.ok = t('Please tick the box so we can contact you.', 'कृपया बॉक्स पर टिक करें ताकि हम संपर्क कर सकें।')
    setE(x)
    if (!Object.keys(x).length) setDone(true) // UI only: no backend
  }
  const Err = ({ k }) => (e[k] ? <p className="err" role="alert">{e[k]}</p> : null)
  const summary = [ctx.property && ['property', `Home ${ctx.property.id}: ${ctx.property.title}`], ctx.calc && ['calc', `${inr(ctx.calc.price)} price · ${inr(ctx.calc.dep)} deposit · ${ctx.calc.term} yrs`], ctx.adviser && ['adviser', `Adviser: ${ctx.adviser}`]].filter(Boolean)
  return (
    <section id="contact" className="yel">
      <span className="ghost" ref={g} aria-hidden="true">NEXT</span>
      <div className="wrap split2">
        <div>
          <p className="eyebrow dot" style={{ color: 'var(--ink)' }}>{t('Your next chapter starts here', 'आपका अगला अध्याय यहाँ से शुरू')}</p>
          <h2>{t('Let’s talk', 'बात करें')}<br />{t('about ', 'आपके ')}<em>{t('your next.', 'अगले क़दम की।')}</em></h2>
          <p className="serif" style={{ margin: '28px 0' }}>{t('One free conversation. A whole lot more clarity.', 'एक मुफ़्त बातचीत। कहीं ज़्यादा स्पष्टता।')}</p>
          <ul className="ticks">{[['A free, no-obligation first appointment', 'मुफ़्त, बिना बाध्यता की पहली अपॉइंटमेंट'], [`Phone, video or a chat in ${CITY}`, `फ़ोन, वीडियो या ${CITY} में मुलाक़ात`], ['Advice that starts with listening to you', 'सलाह जो आपको सुनने से शुरू होती है']].map((x) => <li key={x[0]}><Ic n="check" />{t(...x)}</li>)}</ul>
          <div className="hand"><Ic n="cal" s={44} /><span>{t('No pressure.', 'कोई दबाव नहीं।')}<br />{t('Just possibilities.', 'बस संभावनाएँ।')}</span></div>
        </div>
        <form className="form" onSubmit={submit} noValidate>
          {done ? (
            <div className="success" role="status">
              <svg className="big" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"><circle cx="40" cy="40" r="34" /><path d="M24 41l12 12 21-24" /></svg>
              <h3>{t(`Thanks, ${f.name.split(' ')[0]}!`, `धन्यवाद, ${f.name.split(' ')[0]}!`)}</h3>
              <p className="serif">{t('We’ve got your request. An adviser will contact you shortly to confirm a time.', 'हमें आपका अनुरोध मिल गया। सलाहकार जल्द ही समय तय करने के लिए संपर्क करेंगे।')}</p>
              <p className="note">{ctx.move} · {f.mode}{f.date && ' · ' + f.date}</p>
              <Btn tone="teal" arrow={false} onClick={() => { setDone(false); setF(blank); setCtx({}) }}>{t('Send another request', 'एक और अनुरोध भेजें')}</Btn>
            </div>
          ) : (<>
            <div><h3>{t('A good chat, on your terms.', 'आपकी शर्तों पर, एक अच्छी बातचीत।')}</h3><p className="serif" style={{ fontSize: '1.05rem' }}>{t('Leave a few details and we’ll arrange your free appointment.', 'कुछ जानकारी दीजिए, हम आपकी मुफ़्त अपॉइंटमेंट तय करेंगे।')}</p></div>
            {summary.length > 0 && <div className="chiprow">{summary.map(([k, s]) => <button type="button" key={k} className="chip rm" onClick={() => setCtx((c) => { const n = { ...c }; delete n[k]; return n })} aria-label={`Remove ${s}`}>{s} <Ic n="close" s={14} /></button>)}</div>}
            <div className="two">
              <div><label className="lbl" htmlFor="fn">{t('Your full name', 'आपका पूरा नाम')} <i>*</i></label><input id="fn" placeholder="e.g. Aarav Sharma" value={f.name} onChange={up('name')} aria-invalid={!!e.name} /><Err k="name" /></div>
              <div><label className="lbl" htmlFor="em">{t('Email address', 'ईमेल पता')} <i>*</i></label><input id="em" type="email" placeholder="you@example.com" value={f.email} onChange={up('email')} aria-invalid={!!e.email} /><Err k="email" /></div>
              <div><label className="lbl" htmlFor="ph">{t('Phone number', 'फ़ोन नंबर')} <i>*</i></label><input id="ph" type="tel" placeholder="98765 43210" value={f.phone} onChange={up('phone')} aria-invalid={!!e.phone} /><Err k="phone" /></div>
              <div><label className="lbl" htmlFor="mv">{t('What’s your next move?', 'आपका अगला क़दम क्या है?')} <i>*</i></label><select id="mv" value={ctx.move || ''} onChange={(ev) => setCtx((c) => ({ ...c, move: ev.target.value }))}><option value="">{t('Please choose', 'कृपया चुनें')}</option>{MOVES.map((m) => <option key={m}>{m}</option>)}</select><Err k="move" /></div>
              <div><label className="lbl" htmlFor="md">{t('How would you like to chat?', 'आप कैसे बात करना चाहेंगे?')} <i>*</i></label><select id="md" value={f.mode} onChange={up('mode')}><option>Phone call</option><option>Video call</option><option>In person</option></select></div>
              <div><label className="lbl" htmlFor="dt">{t('Preferred date', 'पसंदीदा तारीख़')} <span>({t('optional', 'वैकल्पिक')})</span></label><input id="dt" type="date" min={new Date().toISOString().slice(0, 10)} value={f.date} onChange={up('date')} /></div>
            </div>
            <div><label className="lbl" htmlFor="tm">{t('Best time to reach you', 'संपर्क का सबसे अच्छा समय')}</label><select id="tm" value={f.time} onChange={up('time')}><option>No preference</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select></div>
            <div><label className="lbl" htmlFor="nt">{t('Anything you’d like us to know?', 'कुछ और जो हमें जानना चाहिए?')} <span>({t('optional', 'वैकल्पिक')})</span></label><textarea id="nt" placeholder={t('Tell us a little about your plans. Please don’t include financial documents or sensitive information.', 'अपनी योजनाओं के बारे में थोड़ा बताइए। कृपया वित्तीय दस्तावेज़ या संवेदनशील जानकारी न लिखें।')} value={f.note} onChange={up('note')} /></div>
            <div><label className="consent"><input type="checkbox" checked={f.ok} onChange={up('ok')} aria-invalid={!!e.ok} /><span>{t('I agree to be contacted about my enquiry and have read the', 'मैं अपनी पूछताछ के लिए संपर्क किए जाने से सहमत हूँ और मैंने पढ़ लिया है:')} <a href="#privacy">{t('privacy notice', 'गोपनीयता सूचना')}</a>. *</span></label><Err k="ok" /></div>
            <Btn tone="teal" className="block" type="submit">{t('Request my free appointment', 'मेरी मुफ़्त अपॉइंटमेंट का अनुरोध करें')}</Btn>
            <p className="note" style={{ textAlign: 'center' }}>{t('No obligation. We’ll confirm availability with you before your appointment.', 'कोई बाध्यता नहीं। अपॉइंटमेंट से पहले हम उपलब्धता की पुष्टि करेंगे।')}</p>
          </>)}
        </form>
      </div>
    </section>
  )
}

/* ---------- Footer + floating sphere ---------- */
export function Footer() {
  const { t, lang, setLang, themePref, setTheme, go } = useApp()
  const L = [['properties', 'Properties', 'प्रॉपर्टी'], ['help', 'How we help', 'हम कैसे मदद करते हैं'], ['calculator', 'Calculator', 'कैलकुलेटर'], ['team', 'Our people', 'हमारी टीम'], ['resources', 'Resources', 'संसाधन'], ['faq', 'Your questions', 'आपके सवाल']]
  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          <div><Logo /><p className="serif" style={{ margin: '20px 0 12px' }}>{t('Good advice. A place to call yours.', 'अच्छी सलाह। एक जगह जिसे आप अपना कह सकें।')}</p><p className="note" style={{ display: 'flex', gap: 8 }}><Ic n="pin" s={16} />{CITY} {t('roots. Advice across India.', 'की जड़ें। पूरे भारत में सलाह।')}</p></div>
          <nav aria-label="Footer">{L.map(([id, e, h]) => <a key={id} href={ROUTES[id]} onClick={(ev) => { ev.preventDefault(); go(id) }}>{t(e, h)}</a>)}</nav>
          <div><p className="serif" style={{ fontSize: '1.5rem', color: 'var(--text)', marginBottom: 18 }}>{t('Every next chapter starts with a conversation.', 'हर नया अध्याय एक बातचीत से शुरू होता है।')}</p><Btn tone="link" onClick={() => go('contact')}>{t('Book your free appointment', 'अपनी मुफ़्त अपॉइंटमेंट बुक करें')}</Btn></div>
        </div>
        <div className="risk"><b>{t('Your home may be repossessed if you do not keep up repayments on your loan.', 'यदि आप लोन की किस्तें नहीं चुकाते हैं तो आपका घर ज़ब्त किया जा सकता है।')}</b>
          <p>Placeholder compliance text: your first appointment is free. Any adviser fee will be explained before you proceed. Loan availability is subject to status and lender criteria. Final regulatory wording must be confirmed by the client’s compliance lead.</p></div>
        <div className="fbot"><span>© 2026 Hearthly. All rights reserved.</span>
          <span style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
            <span className="lang"><button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button><button className={lang === 'hi' ? 'on' : ''} onClick={() => setLang('hi')}>हिन्दी</button></span>
            <span className="lang">{['light', 'dark', 'system'].map((m) => <button key={m} className={themePref === m ? 'on' : ''} aria-pressed={themePref === m} onClick={() => setTheme(m)}>{m}</button>)}</span>
            <a href="#privacy" id="privacy">{t('Privacy & your data', 'गोपनीयता और आपका डेटा')}</a><a href="/contact" onClick={(ev) => { ev.preventDefault(); go('contact') }}>{t('Get in touch', 'संपर्क करें')}</a></span></div>
      </div>
    </footer>
  )
}

export function Sphere() {
  const { t, go } = useApp()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const d = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false)
    const k = (e) => e.key === 'Escape' && setOpen(false)
    addEventListener('pointerdown', d); addEventListener('keydown', k)
    return () => { removeEventListener('pointerdown', d); removeEventListener('keydown', k) }
  }, [])
  return (
    <div className={`sphere ${open ? 'open' : ''}`} ref={ref}>
      <div className="acts" aria-hidden={!open}>
        <button tabIndex={open ? 0 : -1} onClick={() => { setOpen(false); go('contact') }}><Ic n="cal" s={20} />{t('Book an appointment', 'अपॉइंटमेंट बुक करें')}</button>
        <a tabIndex={open ? 0 : -1} href={`tel:${PHONE}`}><Ic n="phone" s={20} />{t('Call us', 'हमें कॉल करें')}</a>
      </div>
      <button className="orb" aria-label="Quick actions" aria-expanded={open} onClick={() => setOpen(!open)}><Ic n="plus" s={28} /></button>
    </div>
  )
}
