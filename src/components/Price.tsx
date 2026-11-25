export default function Price({ amount, className = '' }: { amount: number; className?: string }) {
  const [whole, cents] = Number(amount).toFixed(2).split('.')
  return (
    <span className={`inline-flex items-start font-bold ${className}`}>
      <span className="text-[0.65em] leading-none mt-0.5">$</span>
      <span>{whole}</span>
      <span className="text-[0.65em] leading-none mt-0.5">.{cents}</span>
    </span>
  )
}
