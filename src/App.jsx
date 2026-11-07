import { useApp } from './context/AppContext.jsx'
import Navbar from './components/Navbar.jsx'; import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'; import Product from './pages/Product.jsx'; import Checkout from './pages/Checkout.jsx'
const pages = { home:Home, product:Product, checkout:Checkout }
/** App shell: applies language font + dark-mode background, renders the active page */
export default function App() {
  const { page, lang } = useApp(); const Page = pages[page.name]
  return <div className={`min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 ${lang==='ar'?'font-ar':'font-en'}`}><Navbar/><Page key={page.name+page.id}/><Footer/></div>
}
