import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { products, weekly } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
const PAGE_SIZE = 8
const tiles = ['Furniture','Handbag','Books','Tech','Sneakers','Travel']

/** Home: hero, top categories, promo banner, filter chips + paginated grid, weekly popular, services */
export default function Home() {
  const { t, go } = useApp()
  const [f, setF] = useState({ type:'', price:'', review:'', color:'', material:'', offer:'' }), [sort, setSort] = useState(''), [pg, setPg] = useState(1)
  // Apply filters then sorting
  let list = products.filter(p => (!f.type||p.type===f.type) && (!f.color||p.colors.includes(f.color)) && (!f.material||p.material===f.material)
    && (!f.price||p.price<=+f.price) && (!f.review||p.rating>=+f.review) && (!f.offer||p.offer))
  if (sort==='low') list=[...list].sort((a,b)=>a.price-b.price)
  if (sort==='high') list=[...list].sort((a,b)=>b.price-a.price)
  if (sort==='rate') list=[...list].sort((a,b)=>b.rating-a.rating)
  const pages = Math.max(1, Math.ceil(list.length/PAGE_SIZE)), cur = Math.min(pg, pages), shown = list.slice((cur-1)*PAGE_SIZE, cur*PAGE_SIZE)
  const setFilter = (k,v) => { setF({ ...f, [k]:v }); setPg(1) }
  const sel = (k, label, opts) => <select value={f[k]} onChange={e=>setFilter(k,e.target.value)} className="chip" aria-label={label}>
    <option value="">{label}</option>{opts.map(([v,l]) => <option key={v} value={v}>{l}</option>)}</select>
  const reset = () => { setF({ type:'', price:'', review:'', color:'', material:'', offer:'' }); setSort(''); setPg(1) }
  return <main>
    {/* Hero */}
    <section className="relative overflow-hidden min-h-[320px] md:min-h-[410px]" style={{ background:'linear-gradient(176deg,#a8d3e3 0%,#bfe0ec 55%,#c7b89c 55.1%,#c2b394 100%)' }}>
      <img src="/img/hero.jpg" alt="" className="absolute end-0 top-0 h-full w-[62%] object-cover object-left hidden sm:block" style={{ WebkitMaskImage:'linear-gradient(to right,transparent,#000 14%)', maskImage:'linear-gradient(to right,transparent,#000 14%)' }}/>
      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 md:ps-24">
        <h1 className="text-4xl md:text-5xl font-bold text-brand max-w-md leading-tight">{t('heroT')}</h1>
        <p className="my-5 max-w-sm text-sm">{t('heroP')}</p><a href="#products" className="btn-primary inline-block !px-8 !py-3">{t('learn')}</a></div></section>
    {/* Top categories */}
    <section className="max-w-7xl mx-auto px-4 pt-16 pb-6"><h2 className="text-xl font-bold mb-6">{t('top')}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">{tiles.map((k,i) =>
        <a key={k} href="#products" aria-label={t(k)} className="block rounded-lg overflow-hidden hover:-translate-y-1 transition"><img src={`/img/cat${i}.jpg`} alt={t(k)} className="w-full aspect-[126/129] object-cover"/></a>)}</div></section>
    {/* Promo banner */}
    <section className="max-w-7xl mx-auto px-4 pt-10"><div className="relative overflow-hidden bg-[#faf0e6] dark:bg-gray-900 flex items-center justify-between min-h-[195px]">
      <div className="px-8 md:px-16 py-8"><h2 className="text-2xl md:text-3xl font-bold text-brand dark:text-green-300 max-w-sm leading-snug">{t('bannerT')}</h2>
        <a href="#products" className="btn-primary inline-block mt-6 !px-8 !py-3">{t('buyNow')}</a></div>
      <img src="/img/banner.jpg" alt="" className="h-[195px] hidden sm:block"/></div></section>
    {/* Filters + grid */}
    <section id="products" className="max-w-7xl mx-auto px-4 pt-10 scroll-mt-32">
      <div className="flex flex-wrap items-center gap-3 mb-10">
        {sel('type',t('type'),['Over-ear','In-ear','On-ear'].map(x=>[x,x]))}{sel('price',t('price'),[[100,'≤ $100'],[250,'≤ $250'],[600,'≤ $600']])}{sel('review',t('review'),[[4.5,'4.5★+'],[5,'5★']])}
        {sel('color',t('color'),['Pink','Black','Green','Blue','White'].map(x=>[x,x]))}{sel('material',t('material'),['Plastic','Metal'].map(x=>[x,x]))}{sel('offer',t('offer'),[['1',t('onOffer')]])}
        <button className="chip" onClick={reset}>{t('allFilters')} ⚙</button>
        <select value={sort} onChange={e=>setSort(e.target.value)} className="chip !bg-transparent border border-gray-400 ms-auto" aria-label={t('sort')}><option value="">{t('sort')}</option>
          {['low','high','rate'].map(k=><option key={k} value={k}>{t(k)}</option>)}</select></div>
      <h2 className="text-xl font-bold mb-6">{t('hp')}</h2>
      {shown.length ? <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">{shown.map(p=><ProductCard key={p.id} p={p}/>)}</div> : <p>{t('none')}</p>}
      {pages>1 && <nav className="flex justify-center items-center gap-3 mt-12" aria-label="pagination">
        {Array.from({length:pages},(_,i)=>i+1).map(n => <button key={n} onClick={()=>setPg(n)} className={`w-10 h-10 rounded-full text-sm font-semibold ${n===cur?'bg-brand text-white':'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>{n}</button>)}
        <button onClick={()=>setPg(Math.min(pages,cur+1))} className="w-10 h-10 rounded-full border border-brand text-brand dark:text-green-400" aria-label="next">›</button></nav>}</section>
    {/* Weekly popular */}
    <section className="max-w-7xl mx-auto px-4 pt-20"><h2 className="text-xl font-bold mb-6">{t('weekly')}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8">{weekly.map(p=><ProductCard key={p.id} p={p} link={false}/>)}</div>
      <div className="mt-10 h-px bg-gray-200 dark:bg-gray-800 relative"><div className="absolute start-0 top-0 h-px w-1/3 bg-gray-900 dark:bg-gray-300"/></div></section>
    {/* Services */}
    <section className="max-w-7xl mx-auto px-4 pt-20"><h2 className="text-xl font-bold mb-6">{t('services')}</h2>
      <div className="grid md:grid-cols-3 gap-4">{[['faq','s0'],['pay','s1'],['del','s2']].map(([k,im]) =>
        <div key={k} className="rounded-lg overflow-hidden bg-soft dark:bg-gray-900"><div className="p-6 min-h-[140px]"><h3 className="text-xl font-bold max-w-[12rem] leading-snug">{t(k)}</h3><p className="text-xs mt-4 max-w-[10rem]">{t('svcP')}</p></div>
          <img src={`/img/${im}.jpg`} alt="" className="w-full"/></div>)}</div></section>
  </main>
}
