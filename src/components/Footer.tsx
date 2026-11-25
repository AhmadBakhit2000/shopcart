'use client'

import { useApp } from '@/context/AppContext'

export default function Footer() {
  const { go, t } = useApp()
  const cols: [string, string[]][] = [
    [t('dept'), ['Fashion', 'Education Product', 'Frozen Food', 'Beverages', 'Organic Grocery', 'Office Supplies', 'Beauty Products', 'Books', 'Electronics & Gadget', 'Travel Accessories', 'Fitness', 'Sneakers', 'Toys', 'Furniture']],
    [t('aboutUs'), ['About Shopcart', 'Careers', 'News & Blog', 'Help', 'Press Center', 'Shop By Location', 'Shopcart Brands', 'Affiliate & Partners', 'Ideas & Guides']],
    ['Services', ['Gift Card', 'Mobile App', 'Shipping & Delivery', 'Order Pickup', 'Account Signup']],
    [t('help'), ['Shopcart Help', 'Returns', 'Track Orders', 'Contact Us', 'Feedback', 'Security & Fraud']],
  ]

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 mt-16 bg-white dark:bg-slate-950 text-xs text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4 space-y-4">
          <button type="button" onClick={() => go('/')} className="flex items-center gap-2">
            <img src="/img/logo.png" alt="Shopcart logo" className="w-8 h-8 object-contain" />
            <span className="text-xl font-extrabold text-brand dark:text-emerald-400">Shopcart</span>
          </button>
          <p className="leading-relaxed max-w-xs">{t('footerDesc')}</p>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2.5 text-sm">{t('acceptedPay')}</h4>
            <div className="flex flex-wrap gap-2">
              {['Stripe', 'VISA', 'Mastercard', 'Amazon', 'Klarna', 'PayPal', 'Apple Pay', 'G Pay'].map((p) => (
                <span key={p} className="px-2.5 py-1 border border-slate-200 dark:border-slate-700 rounded text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {cols.map(([title, items]) => (
          <div key={title} className="md:col-span-2">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-sm">{title}</h4>
            <ul className="space-y-2">
              {items.map((x) => (
                <li key={x}>
                  <button type="button" onClick={() => go('/')} className="hover:text-brand text-start">
                    {x}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-5 font-medium text-slate-800 dark:text-slate-200">
            <span>💼 {t('becomeSeller')}</span>
            <span>🎁 {t('giftCards')}</span>
            <span>❓ {t('helpCenter')}</span>
          </div>
          <div className="flex items-center gap-5">
            <span>{t('terms')}</span>
            <span>{t('privacy')}</span>
          </div>
          <span>{t('rights')}</span>
        </div>
      </div>
    </footer>
  )
}
