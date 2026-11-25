export type Lang = 'en' | 'ar'

export interface ProductSpecs {
  general: Record<string, string>
  product: Record<string, string>
}

export interface Product {
  id: number
  name: string
  sub: string
  price: number
  rating: number
  reviews: number
  img: string
  variantImgs?: Record<string, string>
  cat: string
  type?: string
  material?: string
  offer?: string
  colors: string[]
  airpods?: boolean
  details: string[]
  specs: ProductSpecs
}

export interface CartItem {
  id: number
  name: string
  price: number
  color: string
  qty: number
  img: string
}
