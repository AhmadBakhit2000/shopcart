'use client'

import { useState } from 'react'
import { useApp } from '@/context/AppContext'
import { Product } from '@/types'
import Stars from './Stars'
import Price from './Price'

export default function ProductCard({ p }: { p: Product }) {
  const { add, go, t } = useApp()
  const [fav, setFav] = useState(false)
  const [ok, setOk] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    add(p)
    setOk(true)
    setTimeout(() => setOk(false), 1100)
  }

  return (
    <div className="group flex flex-col">
      <div
        onClick={() => go(`/product/${p.id}`)}
        className="relative bg-surface dark:bg-slate-800/80 rounded-xl h-56 flex items-center justify-center p-5 cursor-pointer overflow-hidden"
      >
        <img
          src={p.img}
          alt={p.name}
          className="max-h-40 object-contain group-hover:scale-105 transition-transform duration-300 mix-blend-multiply dark:mix-blend-normal"
        />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            setFav(!fav)
          }}
          aria-label="Wishlist"
          className="absolute top-3 end-3 w-8 h-8 rounded-full bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-sm hover:scale-110 transition"
        >
          <span className={fav ? 'text-rose-500' : 'text-slate-400'}>{fav ? '♥' : '♡'}</span>
        </button>
      </div>

      <div className="pt-3 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3
            onClick={() => go(`/product/${p.id}`)}
            className="font-semibold text-sm text-slate-900 dark:text-white cursor-pointer hover:text-brand line-clamp-1"
          >
            {p.name}
          </h3>
          <Price amount={p.price} className="text-sm text-slate-900 dark:text-white shrink-0" />
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{p.sub}</p>
        <div className="mt-1.5">
          <Stars rating={p.rating} count={p.reviews} />
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className={`mt-3 w-fit px-4 py-1.5 rounded-full text-xs font-medium border transition ${
            ok
              ? 'bg-brand text-white border-brand'
              : 'border-slate-800 dark:border-slate-400 text-slate-800 dark:text-slate-100 hover:bg-brand hover:text-white hover:border-brand'
          }`}
        >
          {ok ? t('added') : t('addToCart')}
        </button>
      </div>
    </div>
  )
}
