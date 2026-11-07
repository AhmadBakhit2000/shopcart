import { fmt } from '../data/products.js'
/** Price with small superscript currency and cents ($89.00 → $⁸⁹.⁰⁰ style from the design) */
export default function Price({ value }) {
  const [a, b] = fmt(value)
  return <span className="font-bold">$<span>{a}</span><sup className="text-[10px]">.{b}</sup></span>
}
