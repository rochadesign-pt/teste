import { Hero } from "@/sections/home/Hero";
import { Ticker } from "@/sections/home/Ticker";
import { NextGame } from "@/sections/home/NextGame";
import { Stats } from "@/sections/home/Stats";
import { TeamsPreview } from "@/sections/home/TeamsPreview";
import { NewsPreview } from "@/sections/home/NewsPreview";
import { JoinCTA } from "@/sections/home/JoinCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <NextGame />
      <Stats />
      <TeamsPreview />
      <NewsPreview />
      <JoinCTA />
    </>
  );
}
