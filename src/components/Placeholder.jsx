// Neutral gray image placeholder — stand-in for real product/lifestyle
// photography. Keeps the layout organised without the illustrated bottle.
// Pass `src` later to swap in a real photograph (Shopify-image-ready).
export function Placeholder({ src, alt = '', className = '', rounded = 'rounded-xl', zoom = false, children }) {
  const zoomCls = zoom
    ? 'transition-transform duration-[600ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]'
    : ''
  return (
    <div className={`relative overflow-hidden bg-[#e7eaea] ${rounded} ${className}`}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" className={`absolute inset-0 h-full w-full object-cover ${zoomCls}`} />
      ) : (
        <div className={`absolute inset-0 ${zoomCls}`}>
          <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(255,255,255,0.55)_0%,transparent_48%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 48 48" className="h-9 w-9 text-[#c3cbcb]" fill="none" aria-hidden="true">
              <rect x="6" y="8" width="36" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
              <circle cx="17" cy="19" r="3.5" stroke="currentColor" strokeWidth="2" />
              <path d="M9 34l9-9 7 7 5-5 9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      )}
      {children}
    </div>
  )
}
