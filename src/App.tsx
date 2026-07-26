import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import Clube from "@/pages/Clube";
import Contactos from "@/pages/Contactos";
import Equipas from "@/pages/Equipas";
import Home from "@/pages/Home";
import Jogos from "@/pages/Jogos";
import Noticias from "@/pages/Noticias";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clube" element={<Clube />} />
            <Route path="/equipas" element={<Equipas />} />
            <Route path="/jogos" element={<Jogos />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/contactos" element={<Contactos />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </SmoothScroll>
    </BrowserRouter>
  );
}
