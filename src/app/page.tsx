'use client'

import { useState, useMemo } from 'react'
import { useApp } from '@/context/AppContext'
import { categories, products, weekly } from '@/data/products'
import ProductCard from '@/components/ProductCard'

const SWATCH: Record<string, string> = {
  black: 'bg-slate-900',
  pink: 'bg-rose-300',
  green: 'bg-emerald-700',
  blue: 'bg-sky-500',
  white: 'bg-slate-100 border border-slate-300',
  red: 'bg-red-500',
}

export default function HomePage() {
  const { go, t } = useApp()
  const [cat, setCat] = useState('')
  const [type, setType] = useState('')
  const [price, setPrice] = useState('')
  const [color, setColor] = useState('')
  const [mat, setMat] = useState('')
  const [offer, setOffer] = useState('')
  const [rev, setRev] = useState('')
  const [sort, setSort] = useState('featured')
  const [pg, setPg] = useState(1)

  const list = useMemo(() => {
    let filtered = [...products]
    if (cat) filtered = filtered.filter((p) => p.cat.toLowerCase() === cat.toLowerCase())
    if (type) filtered = filtered.filter((p) => p.type === type)
    if (price) filtered = filtered.filter((p) => p.price <= +price)
    if (color) filtered = filtered.filter((p) => p.colors.includes(color))
    if (mat) filtered = filtered.filter((p) => p.material === mat)
    if (offer) filtered = filtered.filter((p) => p.offer === offer)
    if (rev) filtered = filtered.filter((p) => p.rating >= +rev)

    if (sort === 'asc') filtered.sort((a, b) => a.price - b.price)
    if (sort === 'desc') filtered.sort((a, b) => b.price - a.price)
    if (sort === 'rate') filtered.sort((a, b) => b.rating - a.rating)
    return filtered
  }, [cat, type, price, color, mat, offer, rev, sort])

  const shown = pg === 1 ? list : [...list].reverse()
  const active = cat || type || price || color || mat || offer || rev
  const reset = () => {
    setCat('')
    setType('')
    setPrice('')
    setColor('')
    setMat('')
    setOffer('')
    setRev('')
  }

  return (
    <div>
      <section className="relative bg-[#dbeff2] dark:bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 items-center gap-8">
          <div className="z-10 max-w-lg">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-brand dark:text-emerald-400 leading-tight">{t('heroTitle')}</h1>
            <p className="mt-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">{t('heroSub')}</p>
            <button type="button" onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })} className="mt-6 px-7 py-3 rounded-full bg-brand hover:bg-brand-dark text-white text-sm font-semibold transition">
              {t('learnMore')}
            </button>
          </div>
          <div className="flex justify-center md:justify-end">
            <img src="/img/hero.png" alt="Hero Shopping" className="max-h-72 md:max-h-96 object-contain drop-shadow-xl" />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pt-12">
        <h2 className="text-xl font-bold mb-6">{t('topCats')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((c) => {
            const catName = c.key.replace(/^cat/, '')
            const isSelected = cat.toLowerCase() === catName.toLowerCase()
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => {
                  setCat((prev) => (prev.toLowerCase() === catName.toLowerCase() ? '' : catName))
                  setPg(1)
                  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={`group relative h-44 rounded-xl overflow-hidden shadow-sm transition ${isSelected ? 'ring-4 ring-brand' : ''}`}
              >
                <img src={c.img} alt={t(c.key)} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              </button>
            )
          })}
        </div>
      </section>

      <section id="catalog" className="max-w-7xl mx-auto px-4 pt-12">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {[
              [type, setType, t('fType'), [['over-ear', 'Over-Ear'], ['on-ear', 'On-Ear'], ['earbuds', 'Earbuds']]],
              [price, setPrice, t('fPrice'), [['60', '≤ $60'], ['100', '≤ $100'], ['300', '≤ $300'], ['600', '≤ $600']]],
              [rev, setRev, t('fReview'), [['4.8', '4.8 ★ & up'], ['4.6', '4.6 ★ & up'], ['4.5', '4.5 ★ & up']]],
              [color, setColor, t('fColor'), Object.keys(SWATCH).map((c) => [c, c.toUpperCase() + c.slice(1)])],
              [mat, setMat, t('fMaterial'), [['aluminum', 'Aluminum'], ['leather', 'Leather'], ['plastic', 'Plastic']]],
              [offer, setOffer, t('fOffer'), [['discount', 'On Discount'], ['featured', 'Featured']]],
            ].map(([val, set, label, opts], idx) => (
              <select key={idx} value={val as string} onChange={(e) => (set as (v: string) => void)(e.target.value)} className={`text-xs font-medium rounded-full px-3.5 py-2 outline-none cursor-pointer transition ${val ? 'bg-brand text-white' : 'bg-surface dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200/70'}`}>
                <option value="">{label as string}</option>
                {(opts as [string, string][]).map(([v, l]) => (
                  <option key={v} value={v} className="bg-white text-slate-900">{l}</option>
                ))}
              </select>
            ))}
            {active && (
              <button type="button" onClick={reset} className="text-xs px-3 py-2 rounded-full text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 font-medium">
                ✕ {t('clearFilters')}
              </button>
            )}
          </div>

          <select value={sort} onChange={(e) => setSort(e.target.value)} className="text-xs font-medium rounded-full px-4 py-2 border border-slate-300 dark:border-slate-700 bg-transparent outline-none cursor-pointer">
            <option value="featured">{t('sortBy')}: {t('sFeatured')}</option>
            <option value="asc">{t('sPriceAsc')}</option>
            <option value="desc">{t('sPriceDesc')}</option>
            <option value="rate">{t('sRating')}</option>
          </select>
        </div>

        <h2 className="text-xl font-bold mb-6">{cat ? t(`cat${cat}`) : t('headphoneForYou')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {shown.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-10">
          {[1, 2, 3, 4].map((n) => (
            <button key={n} type="button" onClick={() => setPg(n)} className={`w-8 h-8 rounded-full text-xs font-semibold transition ${pg === n ? 'bg-brand text-white' : 'bg-surface dark:bg-slate-800 hover:bg-slate-200'}`}>
              {n}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pt-14">
        <div className="rounded-2xl bg-[#f7ead9] dark:bg-slate-900 px-6 sm:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-md">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand dark:text-emerald-400 leading-snug">{t('bannerT')}</h2>
            <button type="button" onClick={() => go('/product/2')} className="mt-5 px-6 py-2.5 rounded-full bg-brand hover:bg-brand-dark text-white text-xs font-semibold">
              {t('buyNow')}
            </button>
          </div>
          <img src="/img/banner.png" alt="Promo" loading="lazy" className="h-44 sm:h-52 object-contain" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pt-14">
        <h2 className="text-xl font-bold mb-6">{t('weekly')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {weekly.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pt-14">
        <h2 className="text-xl font-bold mb-6">{t('services')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            [t('s1t'), t('s1s'), '/img/srv-1.png'],
            [t('s2t'), t('s2s'), '/img/srv-2.png'],
            [t('s3t'), t('s3s'), '/img/srv-3.png'],
          ].map(([title, sub, img], i) => (
            <div key={i} className="rounded-xl bg-surface dark:bg-slate-900 overflow-hidden flex flex-col">
              <div className="p-6 flex-1">
                <h3 className="font-bold text-base max-w-[200px] leading-snug">{title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-[220px]">{sub}</p>
              </div>
              <img src={img} alt={title} loading="lazy" className="w-full h-44 object-cover" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
