'use client'

import { useState, use } from 'react'
import { useApp } from '@/context/AppContext'
import { products, weekly } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import Stars from '@/components/Stars'
import Price from '@/components/Price'

const SWATCH: Record<string, string> = {
  pink: 'bg-[#e8b4b8]',
  black: 'bg-[#2c2f33]',
  green: 'bg-[#a3b899]',
  blue: 'bg-[#6b8cae]',
  white: 'bg-[#e9ecef] border border-slate-300',
  red: 'bg-red-500',
  silver: 'bg-slate-300',
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { go, add, t } = useApp()
  const all = [...products, ...weekly]
  const p = all.find((x) => x.id === Number(id)) || products.at(0)!

  const [color, setColor] = useState<string>(p.colors.at(0) || 'black')

  const [qty, setQty] = useState<number>(1)
  const [pin, setPin] = useState<string>('')
  const [pinOk, setPinOk] = useState<boolean | null>(null)
  const img = p.variantImgs?.[color] || p.img



  const similar = products.filter((x) => x.id !== p.id && x.cat === p.cat).slice(0, 4)

  const checkPin = (e: React.FormEvent) => {
    e.preventDefault()
    setPinOk(pin.trim().length >= 4)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <nav className="text-xs text-slate-500 mb-4 flex items-center gap-1.5">
        <button type="button" onClick={() => go('/')} className="hover:text-brand">{t('home')}</button>
        <span>/</span>
        <span>{p.cat}</span>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-medium">{p.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div>
          <div className="bg-surface dark:bg-slate-800/80 rounded-2xl h-80 sm:h-[430px] flex items-center justify-center p-8">
            <img src={img} alt={p.name} className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal transition" />
          </div>
          {p.variantImgs && (
            <div className="grid grid-cols-4 gap-3 mt-3">
              {Object.entries(p.variantImgs).slice(0, 4).map(([c, src]) => (
                <button key={c} type="button" onClick={() => setColor(c)} className={`bg-surface dark:bg-slate-800 rounded-xl h-20 p-2 flex items-center justify-center border-2 transition ${color === c ? 'border-brand' : 'border-transparent'}`}>
                  <img src={src} alt={c} className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">{p.name}</h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5">{p.sub}</p>
          <div className="mt-2"><Stars rating={p.rating} count={p.reviews} /></div>

          <div className="border-y border-slate-100 dark:border-slate-800 my-5 py-4">
            <Price amount={p.price} className="text-2xl" />
            <p className="text-xs text-slate-400 mt-1">Suggested payments with 6 months special financing</p>
          </div>

          <div>
            <div className="text-sm font-bold mb-2.5">{t('chooseColor')}</div>
            <div className="flex items-center gap-2.5">
              {p.colors.map((c) => (
                <button key={c} type="button" aria-label={c} onClick={() => setColor(c)} className={`w-8 h-8 rounded-full flex items-center justify-center transition ${color === c ? 'ring-2 ring-offset-2 ring-brand dark:ring-offset-slate-950' : ''}`}>
                  <span className={`w-6 h-6 rounded-full ${SWATCH[c] || 'bg-slate-400'}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-5 mt-6">
            <div className="inline-flex items-center bg-surface dark:bg-slate-800 rounded-full px-3 py-1.5 gap-4 text-sm font-bold">
              <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="px-1 hover:text-brand">−</button>
              <span>{qty}</span>
              <button type="button" onClick={() => setQty(qty + 1)} className="px-1 hover:text-brand">+</button>
            </div>
            <div className="text-xs">
              <span className="text-amber-600 font-semibold">{t('onlyLeft')}</span><br />
              <span className="text-slate-500">{t('dontMiss')}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button type="button" onClick={() => { add(p, color, qty, img); go('/checkout') }} className="flex-1 min-w-[150px] py-3 rounded-full bg-brand hover:bg-brand-dark text-white text-sm font-semibold transition">
              {t('buyNow')}
            </button>
            <button type="button" onClick={() => add(p, color, qty, img)} className="flex-1 min-w-[150px] py-3 rounded-full border border-brand text-brand dark:text-emerald-400 dark:border-emerald-400 hover:bg-brand hover:text-white text-sm font-semibold transition">
              {t('addToCart')}
            </button>
          </div>

          <div className="mt-6 border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-200 dark:divide-slate-800 text-xs">
            <div className="p-4 flex items-start gap-3">
              <span className="text-amber-600 text-base">🚚</span>
              <div className="flex-1">
                <div className="font-bold text-sm">{t('freeDel')}</div>
                <div className="text-slate-500 mt-0.5">{t('enterPostal')}</div>
                <form onSubmit={checkPin} className="flex gap-2 mt-2 max-w-xs">
                  <input value={pin} onChange={(e) => setPin(e.target.value)} placeholder="e.g. 10001" className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent outline-none" />
                  <button type="submit" className="px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-700 text-white font-medium">{t('check')}</button>
                </form>
                {pinOk === true && <p className="text-emerald-600 mt-1">{t('available')}</p>}
                {pinOk === false && <p className="text-rose-500 mt-1">{t('invalidPin')}</p>}
              </div>
            </div>
            <div className="p-4 flex items-start gap-3">
              <span className="text-amber-600 text-base">📦</span>
              <div>
                <div className="font-bold text-sm">{t('returnDel')}</div>
                <div className="text-slate-500 mt-0.5">{t('returnP')} <span className="underline cursor-pointer">{t('details')}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-14">
        <h2 className="text-lg font-bold mb-5">{p.name} {t('fullSpecs')}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[[t('general'), p.specs.general], [t('productDetails'), p.specs.product]].map(([title, obj], idx) => (
            <div key={idx} className="bg-surface dark:bg-slate-900 rounded-xl p-5">
              <h3 className="font-bold text-sm mb-3">{title as string}</h3>
              <dl className="divide-y divide-slate-200/70 dark:divide-slate-800 text-xs">
                {Object.entries(obj as Record<string, string>).map(([k, v]) => (
                  <div key={k} className="py-2.5 flex justify-between gap-4">
                    <dt className="text-slate-500">{k}</dt>
                    <dd className="font-medium text-end">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-bold mb-6">{t('similar')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {similar.map((x) => (
            <ProductCard key={x.id} p={x} />
          ))}
        </div>
      </section>
    </div>
  )
}
