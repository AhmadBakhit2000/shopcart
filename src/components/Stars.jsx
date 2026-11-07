/** Green star rating + review count, as in the design */
export default function Stars({ rating = 5, reviews = 121 }) {
  const full = Math.floor(rating), half = rating - full >= 0.5
  return <p className="text-xs flex items-center gap-1"><span className="stars" aria-label={`${rating} stars`}>{'★'.repeat(full)}{half && <span className="opacity-50">★</span>}</span><span className="text-gray-500">({reviews})</span></p>
}
