import { product } from '../data/product'
import { SetCard, VolumeRow } from './OptionCards'

// All options visible at once — one radiogroup across the three groups,
// separated by quiet section labels. Only one option is ever selected.
function GroupLabel({ children, hint }) {
  return (
    <div className="mb-2 flex items-baseline justify-between gap-3">
      <p className="text-xs font-medium">{children}</p>
      <p className="truncate text-[11px] opacity-40">{hint}</p>
    </div>
  )
}

export function PurchaseSelectorOpen({ activeType, onRow, format, pickKit, pickBundle }) {
  return (
    <div role="radiogroup" aria-label="Opções de compra" className="space-y-6">
      <div>
        <GroupLabel hint="Do pulverizador à recarga industrial">Volumetrias</GroupLabel>
        <div className="space-y-2">
          {product.formats.map((f) => (
            <VolumeRow
              key={f.id}
              f={f}
              active={activeType === 'volumetria' && format === f.id}
              onSelect={() => onRow('volumetria', f.id)}
            />
          ))}
        </div>
      </div>

      <div>
        <GroupLabel hint="Conjuntos onde o HTG-30 entra">Kits</GroupLabel>
        <div className="space-y-2">
          {product.kits.map((k) => (
            <SetCard
              key={k.name}
              o={k}
              active={activeType === 'kit' && pickKit === k.name}
              onSelect={() => onRow('kit', k.name)}
            />
          ))}
        </div>
      </div>

      <div>
        <GroupLabel hint="Packs promocionais">Bundles</GroupLabel>
        <div className="space-y-2">
          {product.bundles.map((b) => (
            <SetCard
              key={b.name}
              o={b}
              active={activeType === 'bundle' && pickBundle === b.name}
              onSelect={() => onRow('bundle', b.name)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
