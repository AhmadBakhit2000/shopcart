import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'

/** Cart review + delivery form + order summary (coupon, tax, shipping, payment) + success modal */
export default function Checkout() {
  const { t, cart, setCart, setQty, remove, coupon, setCoupon, go } = useApp()
  const [code, setCode] = useState(''), [pay, setPay] = useState('card'), [brand, setBrand] = useState('mc'), [done, setDone] = useState(null)
  const sub = cart.reduce((s,i)=>s+i.price*i.qty,0), disc = coupon==='SAVE10' ? sub*0.1 : 0
  const tax = (sub-disc)*0.1, ship = sub===0||sub>100 ? 0 : 9.99, total = sub-disc+tax+ship
  const field = (k, type='text', ph) => <label className="block text-xs font-semibold">{t(k)}*<input required type={type} placeholder={ph||t('typeHere')} className="input mt-2 font-normal"/></label>
  const submit = e => { e.preventDefault(); if (cart.length) setDone(String(Math.floor(1e9+Math.random()*9e9))) }
  return <main className="max-w-7xl mx-auto px-4 py-6">
    <nav className="text-xs text-gray-500 mb-6"><button onClick={()=>go('home')}>{t('home')}</button> / <b className="text-gray-900 dark:text-gray-100">{t('checkout')}</b></nav>
    <form onSubmit={submit} className="grid lg:grid-cols-[1.7fr_1fr] gap-6 items-start">
      <div className="space-y-5">
        <section className="card p-5"><h2 className="text-xl font-bold mb-4">{t('review2')}</h2>
          {cart.length===0 && <p className="text-sm text-gray-500">{t('empty')}</p>}
          {cart.map((i,n) => <div key={n} className="flex items-center gap-6 py-3 border-b dark:border-gray-800 last:border-0">
            <img src={i.img} alt={i.name} className="w-32 h-32 bg-soft dark:bg-gray-800 rounded object-contain"/>
            <div className="flex-1"><p className="text-lg font-bold">{i.name}</p><p className="text-xs mt-2">{t('color')}: {i.color}</p></div>
            <div className="text-end text-sm space-y-2"><p className="text-base font-bold">${(i.price*i.qty).toFixed(2)}</p>
              <label className="font-semibold flex items-center gap-2 justify-end">{t('qty')}: <input type="number" min="1" value={i.qty} onChange={e=>setQty(n,+e.target.value)} className="w-14 rounded border dark:border-gray-700 bg-transparent px-2 py-1 text-xs"/></label>
              <button type="button" onClick={()=>remove(n)} className="text-red-500 text-xs">{t('remove')}</button></div></div>)}</section>
        <label className="flex items-center gap-3 text-sm"><input type="checkbox" className="w-4 h-4"/>{t('returning')}</label>
        <section className="card p-5"><div className="flex items-center justify-between mb-5"><h2 className="text-xl font-bold">{t('deliveryInfo')}</h2><button type="button" className="chip">{t('saveInfo')}</button></div>
          <div className="grid sm:grid-cols-2 gap-4">{field('first')}{field('last')}<div className="sm:col-span-2">{field('address')}</div>{field('city')}{field('zip')}{field('mobile','tel')}{field('email','email')}</div></section></div>
      <aside className="space-y-5">
        <div className="card p-5 space-y-5"><h2 className="text-xl font-bold pb-3 border-b dark:border-gray-800">{t('summary')}</h2>
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1.5 ps-5"><input className="flex-1 bg-transparent text-xs outline-none min-w-0" placeholder={t('coupon')+' (SAVE10)'} value={code} onChange={e=>setCode(e.target.value)}/>
            <button type="button" className="btn-primary !py-2 !text-xs whitespace-nowrap" onClick={()=>setCoupon(code.trim().toUpperCase())}>{t('apply')}</button></div>
          <h3 className="font-semibold pt-3 border-t dark:border-gray-800">{t('payment')}</h3>
          {['cod','scard','paypal','card'].map(v => <label key={v} className="flex items-center gap-3 text-sm"><input type="radio" name="pay" className="w-4 h-4 accent-green-600" checked={pay===v} onChange={()=>setPay(v)}/>{t(v)}</label>)}
          {pay==='card' && <div className="space-y-4">
            <div className="flex gap-2">{[['amazon','amazon'],['mc','●●'],['visa','VISA']].map(([k,l]) => <button type="button" key={k} onClick={()=>setBrand(k)} className={`h-10 w-20 rounded text-xs font-bold bg-gray-100 dark:bg-gray-800 border ${brand===k?'border-green-500':'border-transparent'} ${k==='mc'?'text-red-500 tracking-[-0.2em] text-lg':k==='visa'?'text-blue-800 italic text-sm':''}`}>{l}</button>)}</div>
            {field('email','email')}{field('holder')}
            <label className="block text-xs font-semibold">{t('number')}*<input required inputMode="numeric" placeholder="0000*****1245" className="input mt-2 font-normal"/></label>
            <div className="grid grid-cols-2 gap-3"><label className="block text-xs font-semibold">{t('exp')}<input required placeholder="MM/YY" maxLength={5} className="input mt-2 font-normal"/></label>
              <label className="block text-xs font-semibold">CVC<input required placeholder="000" maxLength={4} className="input mt-2 font-normal"/></label></div></div>}
          <dl className="text-sm space-y-3 pt-3 border-t dark:border-gray-800">{[['sub',sub],['tax',tax],['disc',-disc],['ship',ship]].map(([k,v])=><div key={k} className="flex justify-between"><dt>{t(k)}</dt><dd>{v<0?'-':''}${Math.abs(v).toFixed(2)}</dd></div>)}
            <div className="flex justify-between font-bold border-t pt-3 dark:border-gray-700"><dt>{t('total')}</dt><dd>${total.toFixed(2)}</dd></div></dl>
          <button className="btn-primary w-full !py-3" disabled={!cart.length}>{t('payBtn')} ${total.toFixed(2)}</button></div>
        <div className="rounded-lg bg-[#f3ede3] dark:bg-gray-900 p-4 flex items-center gap-4"><div className="w-20 h-12 rounded bg-brand text-white text-[8px] font-bold p-1.5">Shopcart</div>
          <p className="text-sm"><b>{t('cashback')}</b><br/><a href="#" className="text-xs underline">{t('learnMore')}</a></p></div></aside></form>
    {done && <div className="fixed inset-0 z-50 bg-black/40 grid place-items-center p-4" role="dialog" aria-modal="true">
      <div className="bg-white dark:bg-gray-900 rounded-[32px] max-w-md w-full text-center overflow-hidden shadow-2xl">
        <div className="h-52 grid place-items-center" style={{background:'radial-gradient(circle at 20% 40%,#a9b8ff 0,transparent 45%),radial-gradient(circle at 85% 20%,#c4f5d6 0,transparent 40%),linear-gradient(#eef2ff,#fff)'}}>
          <div className="w-28 h-28 rounded-full bg-white/80 shadow-lg grid place-items-center"><div className="w-20 h-20 rounded-full bg-gradient-to-b from-green-300 to-green-500 grid place-items-center text-white text-4xl">✓</div></div></div>
        <div className="px-8 pb-10 space-y-4"><h2 className="text-2xl font-bold">{t('ok')}</h2><p className="text-sm text-gray-600 dark:text-gray-300">{t('txn')}: {done}</p>
          <button className="rounded-full bg-accent text-white px-8 py-3 text-sm font-semibold" onClick={()=>{setCart([]);setCoupon(null);setDone(null);go('home')}}>{t('cont')}</button></div></div></div>}
  </main>
}
