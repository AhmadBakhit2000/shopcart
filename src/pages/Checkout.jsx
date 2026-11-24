import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import Price from '../components/Price.jsx'

export default function Checkout() {
  const { cart, setCart, setQty, remove, go, t, coupon, setCoupon } = useApp()
  const [code, setCode] = useState('')
  const [couponMsg, setCouponMsg] = useState(null)
  const [pm, setPm] = useState('cc')
  const [done, setDone] = useState(null)
  const [form, setForm] = useState({ fn: '', ln: '', addr: '', city: '', zip: '', mob: '', email: '', holder: '', num: '', exp: '', cvc: '' })

  const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const sub = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const disc = coupon ? sub * 0.1 : 0
  const tax = (sub - disc) * 0.1
  const ship = sub > 100 || sub === 0 ? 0 : 12
  const total = Math.max(0, sub - disc + tax + ship)

  const apply = () => {
    if (code.trim().toUpperCase() === 'SAVE10') {
      setCoupon('SAVE10')
      setCouponMsg('valid')
    } else {
      setCoupon(null)
      setCouponMsg('invalid')
    }
  }

  const submit = (e) => {
    e.preventDefault()
    if (!cart.length) return
    setDone(Date.now().toString().slice(-8))
    setCart([])
    setCoupon(null)
  }

  if (!cart.length && !done) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-lg font-semibold mb-4">{t('emptyCart')}</p>
        <button type="button" onClick={() => go('home')} className="px-6 py-2.5 rounded-full bg-brand text-white text-sm font-medium">{t('continueShop')}</button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <nav className="text-xs text-slate-500 mb-5 flex items-center gap-1.5">
        <button type="button" onClick={() => go('home')} className="hover:text-brand">{t('home')}</button>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-medium">Checkout</span>
      </nav>

      <form onSubmit={submit} className="grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-5">
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-5">
            <h2 className="font-bold text-base mb-4">{t('reviewItem')}</h2>
            <div className="space-y-4">
              {cart.map((i, n) => (
                <div key={`${i.id}-${i.color}`} className="flex items-center gap-4 pb-4 border-b last:border-none border-slate-100 dark:border-slate-800">
                  <div className="w-20 h-20 rounded-xl bg-surface dark:bg-slate-800 flex items-center justify-center p-2 shrink-0">
                    <img src={i.img} alt={i.name} className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">{i.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5 capitalize">{t('fColor')}: {i.color}</p>
                    <button type="button" onClick={() => remove(n)} className="text-xs text-rose-500 hover:underline mt-1">{t('remove')}</button>
                  </div>
                  <div className="text-end">
                    <div className="font-bold text-sm"><Price amount={i.price * i.qty} /></div>
                    <div className="mt-1.5 flex items-center gap-1 text-xs text-slate-500 justify-end">
                      <span>{t('qty')}:</span>
                      <input type="number" min="1" max="99" value={i.qty} onChange={(e) => setQty(n, +e.target.value)} className="w-12 text-center border border-slate-300 dark:border-slate-700 rounded py-0.5 bg-transparent font-semibold text-slate-900 dark:text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-base">{t('delInfo')}</h2>
              <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer">
                <input type="checkbox" className="accent-brand rounded" /> {t('returning')}
              </label>
            </div>
            <div className="grid sm:grid-cols-2 gap-3.5 text-xs">
              <div><label className="block font-medium mb-1">{t('firstName')}*</label><input required value={form.fn} onChange={upd('fn')} placeholder="Type here..." className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent" /></div>
              <div><label className="block font-medium mb-1">{t('lastName')}*</label><input required value={form.ln} onChange={upd('ln')} placeholder="Type here..." className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent" /></div>
              <div className="sm:col-span-2"><label className="block font-medium mb-1">{t('address')}*</label><input required value={form.addr} onChange={upd('addr')} placeholder="Type here..." className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent" /></div>
              <div><label className="block font-medium mb-1">{t('city')}*</label><input required value={form.city} onChange={upd('city')} placeholder="Type here..." className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent" /></div>
              <div><label className="block font-medium mb-1">{t('zip')}*</label><input required pattern="[0-9]{4,10}" value={form.zip} onChange={upd('zip')} placeholder="Type here..." className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent" /></div>
              <div><label className="block font-medium mb-1">{t('mobile')}*</label><input required dir="ltr" type="tel" pattern="[+0-9 -]{7,18}" value={form.mob} onChange={upd('mob')} placeholder="+1 234 567 890" className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent" /></div>
              <div><label className="block font-medium mb-1">{t('email')}*</label><input required type="email" value={form.email} onChange={upd('email')} placeholder="name@example.com" className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent" /></div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-5">
          <h2 className="font-bold text-base">{t('summary')}</h2>
          <div>
            <div className="flex gap-2">
              <input value={code} onChange={(e) => setCode(e.target.value)} placeholder={t('couponPh')} className="flex-1 text-xs px-3.5 py-2.5 rounded-full bg-surface dark:bg-slate-800 outline-none" />
              <button type="button" onClick={apply} className="px-4 py-2.5 rounded-full bg-brand hover:bg-brand-dark text-white text-xs font-medium shrink-0">{t('apply')}</button>
            </div>
            {couponMsg === 'valid' && <p className="text-[11px] text-emerald-600 mt-1.5 px-2">{t('couponApplied')}</p>}
            {couponMsg === 'invalid' && <p className="text-[11px] text-rose-500 mt-1.5 px-2">{t('couponInvalid')}</p>}
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
            <h3 className="font-bold text-sm mb-3">{t('payDetails')}</h3>
            <div className="space-y-2 text-xs">
              {[['cod', t('cod')], ['sc', t('shopcartCard')], ['pp', t('paypal')], ['cc', t('cc')]].map(([v, l]) => (
                <label key={v} className="flex items-center gap-2.5 cursor-pointer">
                  <input type="radio" name="pm" checked={pm === v} onChange={() => setPm(v)} className="accent-brand" />
                  <span>{l}</span>
                </label>
              ))}
            </div>
          </div>

          {pm === 'cc' && (
            <div className="space-y-3 text-xs pt-1">
              <div><label className="block font-medium mb-1">{t('email')}*</label><input required type="email" placeholder="Type here..." className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent" /></div>
              <div><label className="block font-medium mb-1">{t('cardHolder')}*</label><input required value={form.holder} onChange={upd('holder')} placeholder="Full Name" className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent" /></div>
              <div><label className="block font-medium mb-1">{t('cardNum')}*</label><input required dir="ltr" inputMode="numeric" pattern="[0-9 ]{13,19}" maxLength={19} value={form.num} onChange={upd('num')} placeholder="0000 0000 0000 0000" className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block font-medium mb-1">{t('expiry')}*</label><input required dir="ltr" pattern="(0[1-9]|1[0-2])/[0-9]{2}" maxLength={5} value={form.exp} onChange={upd('exp')} placeholder="MM/YY" className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent" /></div>
                <div><label className="block font-medium mb-1">{t('cvc')}*</label><input required dir="ltr" inputMode="numeric" pattern="[0-9]{3,4}" maxLength={4} value={form.cvc} onChange={upd('cvc')} placeholder="123" className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent" /></div>
              </div>
            </div>
          )}

          <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600 dark:text-slate-400"><span>{t('subTotal')}</span><Price amount={sub} /></div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400"><span>{t('tax')}</span><Price amount={tax} /></div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400"><span>{t('couponDisc')}</span><span>-${disc.toFixed(2)}</span></div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400"><span>{t('shippingCost')}</span><span>{ship === 0 ? t('free') : `$${ship.toFixed(2)}`}</span></div>
            <div className="flex justify-between font-bold text-sm pt-2 border-t border-slate-100 dark:border-slate-800"><span>{t('total')}</span><Price amount={total} /></div>
          </div>

          <button type="submit" className="w-full py-3 rounded-full bg-brand hover:bg-brand-dark text-white text-sm font-semibold">{t('pay')} ${total.toFixed(2)}</button>

          <div className="rounded-xl bg-[#f7ead9] dark:bg-amber-950/40 p-4 flex items-center justify-between">
            <div><div className="font-bold text-sm text-slate-900 dark:text-white">{t('cashbackT')}</div><div className="text-xs text-slate-600 dark:text-slate-300">{t('cashbackS')}</div></div>
            <div className="w-12 h-8 rounded bg-brand text-white text-[9px] font-bold flex items-center justify-center shadow">Shopcart</div>
          </div>
        </div>
      </form>

      {done && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-8 text-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mx-auto flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-lg font-bold mb-1">{t('accepted')}</h3>
            <p className="text-xs text-slate-500 mb-6">{t('txn')}: #{done}</p>
            <button type="button" onClick={() => { setDone(null); go('home') }} className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold">{t('continueShop')}</button>
          </div>
        </div>
      )}
    </div>
  )
}
