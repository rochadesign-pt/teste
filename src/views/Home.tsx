import { Preloader } from "@/components/motion/Preloader";
import { Hero } from "@/sections/home/Hero";
import { Ticker } from "@/sections/home/Ticker";
import { NextGame } from "@/sections/home/NextGame";
import { Stats } from "@/sections/home/Stats";
import { TeamsPreview } from "@/sections/home/TeamsPreview";
import { NewsPreview } from "@/sections/home/NewsPreview";
import { JoinCTA } from "@/sections/home/JoinCTA";

// A Home é uma ilha única para o Preloader partilhar contexto com o Hero.
export default function Home() {
  return (
    <Preloader>
      <Hero />
      <Ticker />
      <NextGame />
      <Stats />
      <TeamsPreview />
      <NewsPreview />
      <JoinCTA />
    </Preloader>
  );
}
