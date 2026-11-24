import { useState, useRef, useEffect } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { categories, products, weekly } from '../data/products.js'

export default function Navbar({ onSearch }) {
  const { lang, setLang, dark, setDark, cart, go, t } = useApp()
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const dropdownRef = useRef(null)

  const count = cart.reduce((s, i) => s + i.qty, 0)
  const all = [...products, ...weekly]
  const hits = q.trim() ? all.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())).slice(0, 5) : []

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
      <div className="bg-brand text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 opacity-95">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span dir="ltr">{t('phone')}</span>
          </span>

          <span className="hidden sm:inline">
            {t('promo')} &nbsp;|&nbsp;{' '}
            <button type="button" onClick={() => go('home')} className="underline font-medium">
              {t('shopNow')}
            </button>
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="hover:underline font-medium flex items-center gap-1"
            >
              {lang === 'en' ? 'العربية' : 'English'} ▾
            </button>
            <button
              type="button"
              onClick={() => setDark(!dark)}
              aria-label="Toggle dark mode"
              className="p-1 rounded hover:bg-white/10"
            >
              {dark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <button type="button" onClick={() => go('home')} className="flex items-center gap-2 shrink-0">
          <img src="/img/logo.png" alt="Shopcart logo" className="w-8 h-8 object-contain" />
          <span className="text-xl font-extrabold text-brand dark:text-emerald-400 tracking-tight">Shopcart</span>
        </button>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-200">
          <div className="relative" ref={dropdownRef}>
            <button type="button" onClick={() => setOpen(!open)} className="flex items-center gap-1 hover:text-brand">
              {t('categories')} ▾
            </button>
            {open && (
              <div className="absolute start-0 mt-3 w-[440px] bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 p-4 grid grid-cols-2 gap-2.5">
                <div className="col-span-2 text-xs font-bold text-slate-500 pb-1 border-b border-slate-100 dark:border-slate-800">
                  Popular Categories
                </div>
                {categories.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => {
                      setOpen(false)
                      go('home')
                    }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface dark:hover:bg-slate-800 text-start"
                  >
                    <img src={c.img} alt={t(c.key)} className="w-10 h-10 rounded-md object-cover" />
                    <div>
                      <div className="text-xs font-semibold">{t(c.key)}</div>
                      <div className="text-[11px] text-slate-400">240 Item Available</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button type="button" onClick={() => go('home')} className="hover:text-brand">{t('deals')}</button>
          <button type="button" onClick={() => go('home')} className="hover:text-brand">{t('whatsNew')}</button>
          <button type="button" onClick={() => go('home')} className="hover:text-brand">{t('delivery')}</button>
        </nav>

        <div className="relative flex-1 max-w-xs hidden sm:block">
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value)
              onSearch?.(e.target.value)
            }}
            placeholder={t('searchPh')}
            className="w-full text-xs bg-surface dark:bg-slate-800 rounded-full ps-4 pe-9 py-2 outline-none focus:ring-2 focus:ring-brand/30"
          />
          <svg className="w-4 h-4 text-slate-400 absolute end-3 top-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          {hits.length > 0 && (
            <div className="absolute mt-1.5 w-full bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden">
              {hits.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setQ('')
                    go('product', p.id)
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs hover:bg-surface dark:hover:bg-slate-800 text-start"
                >
                  <img src={p.img} alt={p.name} className="w-7 h-7 object-contain" />
                  <span className="truncate flex-1">{p.name}</span>
                  <span className="font-semibold">${p.price}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-5 text-sm font-medium">
          <button type="button" onClick={() => go('home')} className="hidden md:flex items-center gap-1.5 hover:text-brand">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {t('account')}
          </button>

          <button type="button" onClick={() => go('checkout')} className="relative flex items-center gap-1.5 hover:text-brand">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span>{t('cart')}</span>
            {count > 0 && (
              <span className="ms-0.5 px-1.5 py-0.2 text-[11px] rounded-full bg-brand text-white font-bold">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
