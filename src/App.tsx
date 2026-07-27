import { useEffect } from "react";
import {
  BrowserRouter,
  HashRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Cursor } from "@/components/motion/Cursor";
import { Grain } from "@/components/motion/Grain";
import { Preloader } from "@/components/motion/Preloader";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import Clube from "@/pages/Clube";
import Contactos from "@/pages/Contactos";
import Equipas from "@/pages/Equipas";
import Home from "@/pages/Home";
import Jogos from "@/pages/Jogos";
import Noticias from "@/pages/Noticias";

// Em builds "single-file" (pré-visualização partilhável) usamos HashRouter,
// porque a página é servida num URL fixo sem controlo de rotas no servidor.
const Router = import.meta.env.VITE_HASH_ROUTER === "true" ? HashRouter : BrowserRouter;

const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;

const curtainVariants = {
  enter: { scaleY: 1, originY: 0 },
  idle: {
    scaleY: 0,
    originY: 0,
    transition: { duration: 0.7, ease: CURTAIN_EASE, delay: 0.05 },
  },
  leave: {
    scaleY: 1,
    originY: 1,
    transition: { duration: 0.45, ease: CURTAIN_EASE },
  },
};

function ScrollToTop() {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  useEffect(() => {
    // Espera que a cortina cubra o ecrã antes de saltar para o topo.
    const t = setTimeout(() => window.scrollTo(0, 0), reduce ? 0 : 450);
    return () => clearTimeout(t);
  }, [pathname, reduce]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  const reduce = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="enter"
        animate="idle"
        exit="leave"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/clube" element={<Clube />} />
          <Route path="/equipas" element={<Equipas />} />
          <Route path="/jogos" element={<Jogos />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="*" element={<Home />} />
        </Routes>
        {!reduce && (
          <motion.div
            variants={curtainVariants}
            className="pointer-events-none fixed inset-0 z-[90] bg-bordeaux-950"
            aria-hidden="true"
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <SmoothScroll>
        <Preloader>
          <ScrollToTop />
          <Cursor />
          <Grain />
          <Navbar />
          <main>
            <AnimatedRoutes />
          </main>
          <Footer />
        </Preloader>
      </SmoothScroll>
    </Router>
  );
}
