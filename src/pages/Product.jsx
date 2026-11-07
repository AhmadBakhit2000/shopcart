import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { products, specs, COLORS, AIRPODS_VARIANTS, fmt } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import Stars from '../components/Stars.jsx'

/** Round colour swatch: solid top half + lighter bottom half, like the design */
const Swatch = ({ c, active, onClick }) => <button onClick={onClick} aria-label={c} className={`w-9 h-9 rounded-full p-[3px] border-2 ${active?'border-brand':'border-transparent'}`}>
  <span className="block w-full h-full rounded-full overflow-hidden"><span className="block h-1/2" style={{background:COLORS[c]}}/><span className="block h-1/2" style={{background:COLORS[c],opacity:.35}}/></span></button>

/** Product details: breadcrumb, gallery that follows the chosen colour, qty, delivery info, spec tables, similar items */
export default function Product() {
  const { t, page, add, go } = useApp()
  const p = products.find(x => x.id===page.id) || products[1]
  const [color, setColor] = useState(p.colors[0]), [qty, setQty] = useState(1), [zip, setZip] = useState(''), [ok, setOk] = useState(false), [askZip, setAskZip] = useState(false)
  const variants = p.airpods ? AIRPODS_VARIANTS : { [p.colors[0]]: p.img }
  const main = variants[color] || p.img
  const monthly = p.airpods ? '99.99' : (p.price/6).toFixed(2), [pa, pb] = fmt(p.price)
  const sp = p.airpods ? specs : { general:[['Model',p.name],['Price',`$${p.price.toFixed(2)}`],['Headphone Type',p.type],['Material',p.material]], details:[['Colors',p.colors.length],['Rating',p.rating],['Reviews',p.reviews]] }
  const row = ([k,v],i) => <tr key={k} className={i%2===0?'bg-white dark:bg-gray-900':''}><td className="py-2.5 px-3 font-semibold w-1/2">{k}</td><td className="px-3">{v}</td></tr>
  const similar = products.filter(x => x.id!==p.id).slice(0,4)
  return <main className="max-w-7xl mx-auto px-4 py-6">
    <nav className="text-xs text-gray-500 mb-6 flex flex-wrap gap-2"><button onClick={()=>go('home')}>{t('electronics')}</button>/<span>{t('audio')}</span>/<button onClick={()=>go('home')}>{t('headphone')}s</button>/<span>{t('byType')}</span>/<b className="text-gray-900 dark:text-gray-100">{p.name.toLowerCase().replace(/\s+/g,'-')}</b></nav>
    <div className="grid md:grid-cols-[1.2fr_1fr] gap-10">
      <div><div className="bg-soft dark:bg-gray-800 rounded-lg aspect-[411/410]"><img src={main} alt={`${p.name} ${color}`} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"/></div>
        {p.airpods && <div className="grid grid-cols-4 gap-4 mt-4">{['Green','Black','Blue','White'].map(c =>
          <button key={c} onClick={()=>setColor(c)} aria-label={c} className={`bg-soft dark:bg-gray-800 rounded-md ${c===color?'ring-2 ring-brand':''}`}><img src={variants[c]} alt="" className="w-full aspect-square object-cover rounded-md mix-blend-multiply dark:mix-blend-normal"/></button>)}</div>}</div>
      <div className="space-y-5 md:max-w-sm">
        <h1 className="text-3xl font-bold">{p.name}</h1><p className="text-xs text-gray-600 dark:text-gray-400 max-w-xs">{p.desc}</p><Stars rating={p.rating} reviews={p.reviews}/>
        <div className="border-t border-b py-4 dark:border-gray-800"><p className="text-xl font-semibold">${pa}.{pb} or {monthly}{t('month')}</p><p className="text-[11px] text-gray-500 mt-1">{t('financing')}</p></div>
        {p.colors.length>1 && <div className="border-b pb-5 dark:border-gray-800"><p className="font-semibold mb-3">{t('chooseColor')}</p><div className="flex gap-2">{p.colors.map(c => <Swatch key={c} c={c} active={c===color} onClick={()=>setColor(c)}/>)}</div></div>}
        <div className="flex items-center gap-6"><div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full">
          <button className="px-4 py-2" onClick={()=>setQty(Math.max(1,qty-1))} aria-label="-">−</button><span className="w-8 text-center text-sm">{qty}</span><button className="px-4 py-2" onClick={()=>setQty(qty+1)} aria-label="+">+</button></div>
          <p className="text-[11px] leading-snug">{t('only')} <b className="text-accent">12 {t('left').replace('!','')}</b>!<br/>{t('dontMiss')}</p></div>
        <div className="flex gap-3"><button className="btn-primary flex-1 !py-3" onClick={()=>{add(p,color,qty,main);go('checkout')}}>{t('buyNow')}</button><button className="btn-outline flex-1 !py-3" onClick={()=>add(p,color,qty,main)}>{t('add')}</button></div>
        <div className="card text-xs divide-y dark:divide-gray-700">
          <div className="p-4"><p className="font-semibold text-sm"><span className="text-accent">🚚</span> {t('freeDel')}</p>
            {askZip ? <div className="flex gap-2 mt-2"><input className="input !py-1.5" placeholder={t('postal')} value={zip} onChange={e=>{setZip(e.target.value);setOk(false)}}/><button className="btn-outline !py-1" onClick={()=>setOk(!!zip)}>OK</button></div>
              : <button className="underline mt-1" onClick={()=>setAskZip(true)}>{t('postal')}</button>}
            {ok && <p className="text-green-600 mt-1">{t('ok2')}</p>}</div>
          <div className="p-4"><p className="font-semibold text-sm"><span className="text-accent">📦</span> {t('returnDel')}</p><p className="mt-1">{t('returnP')} <a href="#" className="underline">{t('details')}</a></p></div></div></div></div>
    <h2 className="text-lg font-bold mt-16 mb-4">{p.airpods ? t('specsT') : p.name}</h2>
    <div className="grid md:grid-cols-2 gap-5">{[['general',sp.general],['pdetails',sp.details]].map(([k,rows]) =>
      <div key={k} className="bg-soft dark:bg-gray-800 rounded-lg p-5"><h3 className="font-semibold mb-3">{t(k)}</h3><table className="w-full text-xs"><tbody>{rows.map(row)}</tbody></table></div>)}</div>
    <h2 className="text-xl font-bold mt-16 mb-6">{t('similar')}</h2>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8">{similar.map(x=><ProductCard key={x.id} p={x}/>)}</div>
  </main>
}
