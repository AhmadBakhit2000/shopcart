import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react'
import { dict } from '../data/i18n.js'

const Ctx = createContext()
export const useApp = () => useContext(Ctx)

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')
  const [dark, setDark] = useState(() => localStorage.getItem('dark') === 'true')
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) || []
    } catch {
      return []
    }
  })
  const [page, setPage] = useState({ name: 'home' })
  const [coupon, setCoupon] = useState(null)

  useEffect(() => {
    const h = document.documentElement
    h.lang = lang
    h.dir = lang === 'ar' ? 'rtl' : 'ltr'
    h.classList.toggle('dark', dark)
    localStorage.setItem('lang', lang)
    localStorage.setItem('dark', String(dark))
  }, [lang, dark])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const t = useCallback((k) => dict[lang]?.[k] ?? k, [lang])

  const go = useCallback((name, id) => {
    setPage({ name, id })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const add = useCallback((p, color = p.colors, qty = 1, img = p.img) => {
    setCart((c) => {
      const hit = c.find((i) => i.id === p.id && i.color === color)
      return hit
        ? c.map((i) => (i === hit ? { ...i, qty: i.qty + qty } : i))
        : [...c, { id: p.id, name: p.name, price: p.price, color, qty, img }]
    })
  }, [])

  const setQty = useCallback((i, q) => {
    setCart((c) => c.map((x, n) => (n === i ? { ...x, qty: Math.max(1, q || 1) } : x)))
  }, [])

  const remove = useCallback((i) => {
    setCart((c) => c.filter((_, n) => n !== i))
  }, [])

  const value = useMemo(
    () => ({ lang, setLang, dark, setDark, cart, setCart, page, go, add, setQty, remove, t, coupon, setCoupon }),
    [lang, dark, cart, page, coupon, t, go, add, setQty, remove]
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
