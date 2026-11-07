import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import Stars from './Stars.jsx'
import Price from './Price.jsx'
/** Product tile: image with wishlist heart, title, price, description, stars, add-to-cart */
export default function ProductCard({ p, link = true }) {
  const { t, add, go } = useApp(), [fav, setFav] = useState(false)
  return <div className="flex flex-col">
    <div className="relative bg-soft dark:bg-gray-800 rounded-lg aspect-square overflow-hidden">
      <button onClick={()=>link && go('product', p.id)} className="w-full h-full" aria-label={p.name}><img src={p.img} alt={p.name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"/></button>
      <button onClick={()=>setFav(!fav)} aria-label="wishlist" className="absolute top-3 end-3 w-8 h-8 rounded-full bg-white grid place-items-center text-gray-700 shadow-sm">{fav?'♥':'♡'}</button>
    </div>
    <div className="flex justify-between items-baseline mt-3 text-sm"><span className="font-semibold">{p.name}</span><Price value={p.price}/></div>
    <p className="text-[11px] text-gray-500 my-1">{p.desc}</p>
    <Stars rating={p.rating} reviews={p.reviews}/>
    <button onClick={()=>add(p)} className="btn-outline mt-3 w-fit !py-1.5 !text-xs">{t('add')}</button></div>
}
