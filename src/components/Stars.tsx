export default function Stars({ rating = 5, count = 121 }: { rating?: number; count?: number }) {
  const full = Math.round(rating)
  return (
    <div className="flex items-center gap-1 text-xs">
      <span role="img" className="text-emerald-600 tracking-tighter" aria-label={`${rating} out of 5`}>
        {'★'.repeat(full)}
        <span className="text-slate-300 dark:text-slate-600">{'★'.repeat(5 - full)}</span>
      </span>
      <span className="text-slate-500 dark:text-slate-400">({count})</span>
    </div>
  )
}
