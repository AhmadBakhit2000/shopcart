import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { allProducts, popularCats } from '../data/products.js'
import Stars from './Stars.jsx'
import Price from './Price.jsx'

/** Green info bar + main nav: logo, categories mega-dropdown, links, live search, account, cart badge */
export default function Navbar() {
  const { t, lang, setLang, dark, setDark, cart, go } = useApp()
  const [open, setOpen] = useState(false), [q, setQ] = useState('')
  const hits = q ? allProducts.filter(p => p.name.toLowerCase().includes(q.toLowerCase())).slice(0,5) : []
  const count = cart.reduce((s,i) => s+i.qty, 0)
  return <header className="sticky top-0 z-30 bg-white dark:bg-gray-950">
    <div className="bg-brand text-white text-[11px]"><div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
      <span className="hidden sm:inline">📞 {t('phone')}</span>
      <span className="mx-auto sm:mx-0">{t('promo')} <span className="mx-2">|</span><button onClick={()=>go('home')} className="underline">{t('shop')}</button></span>
      <span className="flex items-center gap-4">
        <button onClick={()=>setLang(lang==='en'?'ar':'en')} aria-label="Toggle language">{lang==='en'?'Eng':'عربي'} ▾</button>
        <button onClick={()=>setDark(!dark)} aria-label="Toggle dark mode">{dark?'☀️':'🌙'}</button>
        <span className="hidden sm:inline">{t('location')} ▾</span></span></div></div>
    <div className="border-b border-gray-100 dark:border-gray-800"><div className="max-w-7xl mx-auto flex items-center gap-6 px-4 py-4">
      <button onClick={()=>go('home')} className="flex items-center gap-2 text-2xl font-bold text-brand dark:text-green-400"><img src="/img/logo.png" alt="" className="h-8"/>Shopcart</button>
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium ms-6">
        <div className="relative">
          <button onClick={()=>setOpen(!open)} aria-expanded={open}>{t('categories')} ▾</button>
          {open && <div className="absolute start-0 top-9 w-[440px] card p-5 shadow-xl">
            <h3 className="font-semibold text-sm pb-3 border-b dark:border-gray-700">{t('popular')}</h3>
            <div className="grid grid-cols-2 gap-3 mt-4">{popularCats.map(([k,label]) =>
              <button key={k} onClick={()=>{setOpen(false);go('home')}} className="flex items-center gap-3 bg-soft dark:bg-gray-800 rounded-md p-2 text-start">
                <img src={`/img/ic_${k}.jpg`} alt="" className="w-10 h-10 rounded"/><span><b className="block text-sm">{t(k)}</b><small className="text-[10px] text-gray-500">{t('itemsAvail')}</small></span></button>)}</div></div>}</div>
        <button onClick={()=>go('home')}>{t('deals')}</button><button onClick={()=>go('home')}>{t('whatsNew')}</button><button onClick={()=>go('home')}>{t('delivery')}</button></nav>
      <div className="relative flex-1 max-w-xs ms-auto">
        <div className="flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-4 py-2">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder={t('search')} className="w-full bg-transparent text-xs outline-none"/><span aria-hidden>🔍</span></div>
        {hits.length>0 && <ul className="absolute end-0 top-12 w-[420px] max-w-[90vw] card p-3 shadow-xl">{hits.map(p =>
          <li key={p.id}><button className="w-full flex items-center gap-4 p-2 border-b last:border-0 dark:border-gray-800 text-start" onClick={()=>{setQ(''); p.airpods||p.id<100 ? go('product',p.id) : go('home')}}>
            <img src={p.img} alt="" className="w-10 h-10 bg-soft rounded object-contain"/><span className="flex-1 text-xs font-semibold">{p.name}</span><Stars rating={p.rating} reviews={p.reviews}/><span className="w-16 text-end text-xs"><Price value={p.price}/></span></button></li>)}</ul>}</div>
      <span className="hidden sm:flex items-center gap-1 text-sm">👤 {t('account')}</span>
      <button onClick={()=>go('checkout')} className="relative text-sm" aria-label={t('cart')}>🛒 {t('cart')}
        {count>0 && <span className="absolute -top-2 -end-3 bg-accent text-white text-[10px] rounded-full w-4 h-4 grid place-items-center">{count}</span>}</button>
    </div></div></header>
}
