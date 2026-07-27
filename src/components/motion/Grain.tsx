// Grain fixo por cima de tudo — textura de filme que tira o aspeto
// "digital limpo" aos blocos de cor sólida.
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[105] opacity-[0.05]"
      style={{ backgroundImage: `url("${NOISE}")` }}
    />
  );
}
