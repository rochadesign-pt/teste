import { Badge } from "@/components/ui/badge";
import { Crest } from "@/components/Logo";
import type { Article } from "@/data/news";
import { cn } from "@/lib/utils";

const covers: Record<Article["tone"], string> = {
  bordeaux: "bg-bordeaux-900",
  gold: "bg-gold-500",
  ink: "bg-ink-950",
};

// Cartão de notícia com capa gráfica gerada (sem fotografia):
// bloco de cor do clube + emblema em marca de água.
export function NewsCard({ article }: { article: Article }) {
  return (
    <article className="group flex h-full flex-col border-2 border-ink-950/10 bg-white transition-colors hover:border-ink-950">
      <div
        className={cn(
          "halftone relative flex aspect-[16/9] items-end overflow-hidden p-5",
          covers[article.tone],
        )}
      >
        <Crest className="absolute -right-6 -top-6 size-32 opacity-20 transition-transform duration-500 ease-out group-hover:rotate-12" />
        <Badge variant={article.tone === "gold" ? "bordeaux" : "gold"}>
          {article.category}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider2 text-ink-950/40">
          {article.date}
        </p>
        <h3 className="display-title mt-2 text-2xl transition-colors group-hover:text-bordeaux-800">
          {article.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-950/60">{article.excerpt}</p>
      </div>
    </article>
  );
}
