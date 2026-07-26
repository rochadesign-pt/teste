import { Badge } from "@/components/ui/badge";
import { isIlliabum, type Game } from "@/data/games";
import { cn } from "@/lib/utils";

function TeamName({ name, highlight }: { name: string; highlight: boolean }) {
  return (
    <span
      className={cn(
        "font-display text-xl uppercase leading-tight md:text-2xl",
        highlight ? "text-bordeaux-800" : "text-ink-950",
      )}
    >
      {name}
    </span>
  );
}

// Linha de jogo — base estrutural: Relume Event 5 (lista com border-t por item),
// adaptada a marcador desportivo: equipas, resultado/hora, competição e pavilhão.
export function GameRow({ game }: { game: Game }) {
  const played = game.homeScore !== undefined && game.awayScore !== undefined;
  const illiabumWon =
    played &&
    ((isIlliabum(game.home) && game.homeScore! > game.awayScore!) ||
      (isIlliabum(game.away) && game.awayScore! > game.homeScore!));

  return (
    <article className="grid grid-cols-1 gap-4 border-t border-ink-950/10 py-6 last:border-b sm:grid-cols-[1fr_auto] sm:items-center md:py-8">
      <div>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="bordeaux">{game.competition}</Badge>
          <span className="text-xs font-semibold uppercase tracking-wider2 text-ink-950/50">
            {game.round} · {game.date}
          </span>
          {played && (
            <Badge variant={illiabumWon ? "gold" : "outline"}>
              {illiabumWon ? "Vitória" : "Derrota"}
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <TeamName name={game.home} highlight={isIlliabum(game.home)} />
          <span className="text-sm font-bold text-ink-950/40">vs</span>
          <TeamName name={game.away} highlight={isIlliabum(game.away)} />
        </div>
        <p className="mt-2 text-sm text-ink-950/50">{game.venue}</p>
      </div>

      <div className="sm:pl-8 sm:text-right">
        {played ? (
          <p className="font-display text-4xl text-ink-950 md:text-5xl">
            {game.homeScore}
            <span className="mx-1 text-ink-950/30">–</span>
            {game.awayScore}
          </p>
        ) : (
          <p className="font-display text-3xl text-bordeaux-800 md:text-4xl">{game.time}</p>
        )}
      </div>
    </article>
  );
}
