import { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { dict } from '../data/i18n.js'
const Ctx = createContext()
export const useApp = () => useContext(Ctx)

/** Global state: language (RTL/LTR), dark mode, cart, coupon and a tiny state-based router. */
export function AppProvider({ children }) {
  const [lang, setLang] = useState('en'), [dark, setDark] = useState(false)
  const [cart, setCart] = useState([]), [page, setPage] = useState({ name:'home' }), [coupon, setCoupon] = useState(null)
  // Sync <html> dir/lang/dark class whenever they change
  useEffect(() => { const h = document.documentElement; h.lang = lang; h.dir = lang==='ar'?'rtl':'ltr'; h.classList.toggle('dark', dark) }, [lang, dark])
  const t = k => dict[lang][k] ?? k
  const go = (name, id) => { setPage({ name, id }); window.scrollTo(0,0) }
  // `img` is stored so the cart/checkout can show the chosen colour's picture
  const add = (p, color = p.colors[0], qty = 1, img = p.img) => setCart(c => {
    const hit = c.find(i => i.id===p.id && i.color===color)
    return hit ? c.map(i => i===hit ? { ...i, qty:i.qty+qty } : i) : [...c, { id:p.id, name:p.name, price:p.price, color, qty, img }] })
  const setQty = (i, q) => setCart(c => c.map((x,n) => n===i ? { ...x, qty:Math.max(1,q||1) } : x))
  const remove = i => setCart(c => c.filter((_,n) => n!==i))
  const value = useMemo(() => ({ lang, setLang, dark, setDark, cart, setCart, page, go, add, setQty, remove, t, coupon, setCoupon }), [lang, dark, cart, page, coupon])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
