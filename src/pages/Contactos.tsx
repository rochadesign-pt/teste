import { type FormEvent, useState } from "react";

import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { club, contacts } from "@/data/club";

const inputClasses =
  "w-full border-2 border-ink-950/15 bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink-950/40 focus:border-bordeaux-800";

export default function Contactos() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Sem backend nesta fase — ligar a um serviço de email/formulários em produção.
    setSent(true);
  }

  return (
    <>
      <PageHeader
        eyebrow="Contactos"
        title={
          <>
            Fala <span className="text-gold-500">connosco</span>
          </>
        }
        description="Sócios, inscrições na formação, parcerias ou imprensa — estamos no pavilhão e do outro lado do email."
      />

      <section className="bg-white py-16 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <h2 className="display-title text-3xl md:text-4xl">Envia-nos uma mensagem</h2>
            {sent ? (
              <div className="mt-8 border-2 border-ink-950 bg-gold-500 p-8">
                <p className="display-title text-2xl">Mensagem enviada!</p>
                <p className="mt-2 text-sm text-ink-950/70">
                  Obrigado pelo contacto. Respondemos o mais depressa possível.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-xs font-bold uppercase tracking-wider2">
                    Nome
                    <input required name="name" placeholder="O teu nome" className={inputClasses} />
                  </label>
                  <label className="grid gap-2 text-xs font-bold uppercase tracking-wider2">
                    Email
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="o.teu@email.pt"
                      className={inputClasses}
                    />
                  </label>
                </div>
                <label className="grid gap-2 text-xs font-bold uppercase tracking-wider2">
                  Assunto
                  <select name="subject" className={inputClasses} defaultValue="socios">
                    <option value="socios">Quero ser sócio</option>
                    <option value="formacao">Inscrição na formação</option>
                    <option value="parcerias">Parcerias e patrocínios</option>
                    <option value="outro">Outro assunto</option>
                  </select>
                </label>
                <label className="grid gap-2 text-xs font-bold uppercase tracking-wider2">
                  Mensagem
                  <textarea
                    required
                    name="message"
                    rows={5}
                    placeholder="Conta-nos o que precisas"
                    className={inputClasses}
                  />
                </label>
                <Button type="submit" size="lg" className="justify-self-start">
                  Enviar mensagem
                </Button>
              </form>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <div id="socios" className="court-lines bg-bordeaux-900 p-8 text-white">
              <h2 className="display-title text-3xl">Torna-te sócio</h2>
              <p className="mt-3 text-sm text-white/70">
                Ser sócio do {club.name} é a forma mais direta de apoiar o clube — dá
                acesso aos jogos em casa e faz crescer o basquetebol em Ílhavo.
              </p>
              <p className="mt-4 text-xs uppercase tracking-wider2 text-gold-500">
                Quotas e benefícios [a confirmar com a direção]
              </p>
            </div>

            <div className="mt-6 border-2 border-ink-950/10 p-8">
              <h3 className="display-title text-2xl">Onde estamos</h3>
              <ul className="mt-4 space-y-3 text-sm text-ink-950/70">
                <li>{contacts.address}</li>
                <li>
                  <a href={`mailto:${contacts.email}`} className="font-semibold text-bordeaux-800">
                    {contacts.email}
                  </a>
                </li>
                <li>{contacts.phone} [a confirmar]</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
