import { Bottle, SprayMist } from './Bottle'

// Art-directed photo placeholder. Pass `src` to swap in a real photograph —
// every usage is Shopify-image-ready. Scenes emulate the lighting of the
// photography we'll commission: kitchen (warm dark), steel (inox), green
// (brand), cream (studio light).
const SCENES = {
  kitchen:
    'bg-[linear-gradient(135deg,#241c14_0%,#3a2c1d_38%,#54402a_62%,#2c2218_100%)]',
  steel:
    'bg-[linear-gradient(120deg,#aeb6bb_0%,#e2e7ea_30%,#9aa3a9_55%,#d4dadd_78%,#8f979c_100%)]',
  green:
    'bg-[linear-gradient(130deg,#1d2a16_0%,#3d5c1e_45%,#64a70b_110%)]',
  cream:
    'bg-[linear-gradient(135deg,#efece5_0%,#f7f5f0_45%,#e4e0d6_100%)]',
}

export function FauxPhoto({ src, alt = '', scene = 'cream', subject, className = '', children }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <>
          <div className={`absolute inset-0 ${SCENES[scene]}`} />
          {/* light streak */}
          <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,0.14)_44%,transparent_58%)]" />
          {/* vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_20%,transparent_55%,rgba(0,0,0,0.22)_100%)]" />
          {subject === 'bottle' && (
            <div className="absolute inset-x-0 bottom-0 flex justify-center">
              <div className="w-[34%] max-w-[190px] translate-y-[10%] drop-shadow-[0_24px_36px_rgba(0,0,0,0.35)]">
                <Bottle className="w-full" />
              </div>
            </div>
          )}
          {subject === 'set' && (
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-center">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{ zIndex: 3 - i, marginLeft: i ? '-12%' : 0 }}
                  className="w-[26%] max-w-[130px] translate-y-[10%] drop-shadow-[0_18px_26px_rgba(0,0,0,0.35)]"
                >
                  <Bottle className="w-full" />
                </div>
              ))}
            </div>
          )}
          {subject === 'mist' && (
            <SprayMist className="absolute top-[16%] left-[10%] w-1/3 opacity-70" />
          )}
        </>
      )}
      {children}
    </div>
  )
}
