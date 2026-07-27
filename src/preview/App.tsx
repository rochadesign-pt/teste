import { useEffect } from "react";
import {
  HashRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Cursor } from "@/components/motion/Cursor";
import { Grain } from "@/components/motion/Grain";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import Clube from "@/views/Clube";
import Contactos from "@/views/Contactos";
import Equipas from "@/views/Equipas";
import Home from "@/views/Home";
import Jogos from "@/views/Jogos";
import Noticias from "@/views/Noticias";

// Harness de pré-visualização single-file (artifact). O site real é Astro
// (src/pages/*.astro); aqui as mesmas views correm num HashRouter e os
// <a href="/..."> internos são intercetados e convertidos em navegação hash.
function InternalLinkInterceptor() {
  const navigate = useNavigate();
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const anchor = (e.target as Element | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/")) return;
      e.preventDefault();
      const [path, hash] = href.split("#");
      navigate(path || "/");
      if (hash) {
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [navigate]);
  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

function Shell() {
  const { pathname } = useLocation();
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Grain />
      <InternalLinkInterceptor />
      <ScrollToTop />
      <Navbar currentPath={pathname} />
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
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  );
}
