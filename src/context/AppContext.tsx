'use client'

import { createContext, useContext, useEffect, useState, useMemo, useCallback, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { dict, DictKey } from '@/data/i18n'
import { CartItem, Lang, Product } from '@/types'

interface AppContextType {
  lang: Lang
  setLang: (l: Lang) => void
  dark: boolean
  setDark: (d: boolean) => void
  cart: CartItem[]
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
  go: (path: string) => void
  add: (p: Product, color?: string, qty?: number, img?: string) => void
  setQty: (index: number, qty: number) => void
  remove: (index: number) => void
  t: (key: DictKey | string) => string
  coupon: string | null
  setCoupon: (c: string | null) => void
}

const Ctx = createContext<AppContextType | undefined>(undefined)

export const useApp = () => {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

export function AppProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [lang, setLang] = useState<Lang>('en')
  const [dark, setDark] = useState<boolean>(false)
  const [cart, setCart] = useState<CartItem[]>([])
  const [coupon, setCoupon] = useState<string | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const savedLang = (localStorage.getItem('lang') as Lang) || 'en'
    const savedDark = localStorage.getItem('dark') === 'true'
    try {
      const savedCart = JSON.parse(localStorage.getItem('cart') || '[]')
      setCart(savedCart)
    } catch {
      setCart([])
    }
    setLang(savedLang)
    setDark(savedDark)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    const h = document.documentElement
    h.lang = lang
    h.dir = lang === 'ar' ? 'rtl' : 'ltr'
    h.classList.toggle('dark', dark)
    localStorage.setItem('lang', lang)
    localStorage.setItem('dark', String(dark))
  }, [lang, dark, hydrated])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart, hydrated])

  const t = useCallback(
    (k: string) => (dict[lang] as Record<string, string>)?.[k] ?? k,
    [lang]
  )

  const go = useCallback(
    (path: string) => {
      router.push(path)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [router]
  )

    const add = useCallback((p: Product, color = p.colors?.[0] || '', qty = 1, img = p.img) => {
    setCart((c) => {
      const hit = c.find((i) => i.id === p.id && i.color === color)
      return hit
        ? c.map((i) => (i === hit ? { ...i, qty: i.qty + qty } : i))
        : [...c, { id: p.id, name: p.name, price: p.price, color, qty, img }]
    })
  }, [])

  const setQty = useCallback((i: number, q: number) => {
    setCart((c) => c.map((x, n) => (n === i ? { ...x, qty: Math.max(1, q || 1) } : x)))
  }, [])

  const remove = useCallback((i: number) => {
    setCart((c) => c.filter((_, n) => n !== i))
  }, [])

  const value = useMemo(
    () => ({ lang, setLang, dark, setDark, cart, setCart, go, add, setQty, remove, t, coupon, setCoupon }),
    [lang, dark, cart, coupon, t, go, add, setQty, remove]
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
