import { product } from '../data/product'

function Mark({ name }) {
  if (name === 'Mastercard') {
    return (
      <span className="flex items-center" aria-hidden="true">
        <span className="h-3 w-3 rounded-full bg-[#EB001B]/80" />
        <span className="-ml-1.5 h-3 w-3 rounded-full bg-[#F79E1B]/80" />
      </span>
    )
  }
  if (name === 'Visa') {
    return <span className="text-[10px] font-bold tracking-tight text-[#1434CB] italic">VISA</span>
  }
  if (name === 'MB Way') {
    return <span className="text-[9px] font-bold tracking-tight text-[#D60510]">MB WAY</span>
  }
  if (name === 'Multibanco') {
    return <span className="text-[9px] font-semibold tracking-tight text-[#0A4A8A]">Multibanco</span>
  }
  if (name === 'PayPal') {
    return <span className="text-[10px] font-bold tracking-tight text-[#003087] italic">PayPal</span>
  }
  return <span className="text-[10px] font-semibold tracking-tight"> Pay</span>
}

export function PayIcons({ className = '' }) {
  return (
    <ul className={`flex flex-wrap items-center gap-1.5 ${className}`} aria-label="Métodos de pagamento aceites">
      {product.payments.map((p) => (
        <li
          key={p}
          title={p}
          className="flex h-7 min-w-11 items-center justify-center rounded-md border border-line bg-white px-2"
        >
          <Mark name={p} />
        </li>
      ))}
    </ul>
  )
}

export function GuaranteeIcon({ icon, className = 'h-4 w-4' }) {
  const paths = {
    shield: 'M8 1.5l5.5 2v4c0 3.5-2.3 6-5.5 7-3.2-1-5.5-3.5-5.5-7v-4L8 1.5z M5.8 8l1.6 1.6L10.5 6.5',
    truck: 'M1.5 3.5h8v7h-8zM9.5 6h3l2 2.5v2h-5zM4 12.5a1.2 1.2 0 100.01 0M12 12.5a1.2 1.2 0 100.01 0',
    return: 'M13.5 8a5.5 5.5 0 11-1.6-3.9M13.5 1.5v3h-3',
  }
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d={paths[icon] || paths.shield} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Stars({ value, className = '' }) {
  return (
    <span className={`flex items-center gap-0.5 ${className}`} aria-label={`${value} em 5 estrelas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 18 18" aria-hidden="true">
          <path
            d="M9 1l2.2 5.2 5.6.5-4.2 3.7 1.2 5.5L9 13l-4.8 2.9 1.2-5.5L1.2 6.7l5.6-.5z"
            fill={i <= Math.round(value) ? '#64a70b' : '#e0e0dc'}
          />
        </svg>
      ))}
    </span>
  )
}
