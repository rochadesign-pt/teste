import { GameRow } from "@/components/GameRow";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { results, upcomingGames } from "@/data/games";

// Base estrutural: Relume Event 5 — tabs de filtro no topo + lista de eventos
// em linhas, adaptado a calendário e resultados desportivos.
export default function Jogos() {
  return (
    <>
      <PageHeader
        eyebrow="Jogos"
        title={
          <>
            Calendário <span className="text-gold-500">e resultados</span>
          </>
        }
        description="Todos os jogos do Illiabum, da equipa sénior à formação. Dados de exemplo — em produção, sincronizados com o calendário oficial da FPB."
      />

      <section className="bg-white py-16 md:py-24">
        <div className="container-site">
          <Reveal>
            <Tabs defaultValue="proximos">
              <TabsList className="mb-10 flex-wrap md:mb-14">
                <TabsTrigger value="proximos">Próximos jogos</TabsTrigger>
                <TabsTrigger value="resultados">Resultados</TabsTrigger>
              </TabsList>

              <TabsContent value="proximos">
                {upcomingGames.map((game) => (
                  <GameRow key={game.id} game={game} />
                ))}
              </TabsContent>

              <TabsContent value="resultados">
                {results.map((game) => (
                  <GameRow key={game.id} game={game} />
                ))}
              </TabsContent>
            </Tabs>
          </Reveal>
        </div>
      </section>
    </>
  );
}
