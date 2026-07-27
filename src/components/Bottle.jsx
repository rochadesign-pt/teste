export function Bottle({ className }) {
  return (
    <svg
      viewBox="0 0 300 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Embalagem Tiragorduras HTG-30 750mL com pulverizador"
    >
      {/* spray head */}
      <path
        d="M60 52c0-9 7-16 16-16h96c30 0 54 20 54 48v14H92L60 74V52z"
        fill="#16241c"
      />
      <rect x="34" y="46" width="34" height="22" rx="6" fill="#ff5c1f" />
      {/* trigger */}
      <path
        d="M78 98h30v52c0 20-12 34-26 40l-10 4c-4-30 2-66 6-96z"
        fill="#16241c"
      />
      {/* neck */}
      <rect x="140" y="98" width="64" height="34" rx="6" fill="#e0d8c6" />
      {/* shoulder + body */}
      <path
        d="M110 132h124c26 34 38 60 38 96 0 28-12 44-12 70v186c0 26-20 46-46 46H128c-26 0-46-20-46-46V298c0-26-12-42-12-70 0-36 14-62 40-96z"
        fill="#f8f6f0"
      />
      {/* liquid */}
      <path
        d="M82 314v170c0 26 20 46 46 46h86c26 0 46-20 46-46V314c-30-12-60 10-90 10s-58-22-88-10z"
        fill="#ff5c1f"
      />
      <path
        d="M82 330v154c0 26 20 46 46 46h86c26 0 46-20 46-46V330c-24 14-58-8-88-8s-66 20-90 8z"
        fill="#e84a10"
        opacity="0.55"
      />
      {/* label */}
      <rect x="96" y="196" width="152" height="150" rx="14" fill="#16241c" />
      <text
        x="172"
        y="242"
        textAnchor="middle"
        fill="#f5f1e8"
        style={{
          font: '800 15px Archivo, sans-serif',
          letterSpacing: '0.22em',
        }}
      >
        MISTOLIN PRO
      </text>
      <text
        x="172"
        y="292"
        textAnchor="middle"
        fill="#ff5c1f"
        style={{ font: '900 44px Archivo, sans-serif', letterSpacing: '-0.01em' }}
      >
        HTG-30
      </text>
      <text
        x="172"
        y="322"
        textAnchor="middle"
        fill="#f5f1e8"
        style={{ font: '600 13px Archivo, sans-serif', letterSpacing: '0.14em' }}
      >
        TIRAGORDURAS
      </text>
      {/* volume tag */}
      <rect x="120" y="452" width="104" height="34" rx="17" fill="#16241c" />
      <text
        x="172"
        y="474"
        textAnchor="middle"
        fill="#f5f1e8"
        style={{ font: '700 15px Archivo, sans-serif', letterSpacing: '0.08em' }}
      >
        750 mL
      </text>
      {/* highlight */}
      <path
        d="M104 160c-10 18-16 34-16 52"
        stroke="#fff"
        strokeOpacity="0.7"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function SprayMist({ className }) {
  return (
    <svg viewBox="0 0 120 90" fill="none" className={className} aria-hidden="true">
      <circle cx="14" cy="46" r="5" fill="#ff5c1f" />
      <circle cx="38" cy="24" r="4" fill="#ff5c1f" opacity="0.8" />
      <circle cx="42" cy="62" r="4" fill="#ff5c1f" opacity="0.8" />
      <circle cx="66" cy="12" r="3" fill="#ff5c1f" opacity="0.6" />
      <circle cx="72" cy="42" r="3.5" fill="#ff5c1f" opacity="0.6" />
      <circle cx="68" cy="74" r="3" fill="#ff5c1f" opacity="0.6" />
      <circle cx="98" cy="28" r="2.5" fill="#ff5c1f" opacity="0.4" />
      <circle cx="104" cy="56" r="2.5" fill="#ff5c1f" opacity="0.4" />
    </svg>
  )
}
