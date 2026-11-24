import { lazy, Suspense } from 'react'
import { useApp } from './context/AppContext.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'

const Product = lazy(() => import('./pages/Product.jsx'))
const Checkout = lazy(() => import('./pages/Checkout.jsx'))

export default function App() {
  const { page, lang } = useApp()

  return (
    <div className={`min-h-screen flex flex-col dark:[color-scheme:dark] ${lang === 'ar' ? 'font-ar' : 'font-en'}`}>
      <Navbar />
      <main key={`${page.name}-${page.id || ''}`} className="flex-1">
        <Suspense fallback={<div className="py-20 text-center text-slate-500">Loading...</div>}>
          {page.name === 'home' && <Home />}
          {page.name === 'product' && <Product />}
          {page.name === 'checkout' && <Checkout />}
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
