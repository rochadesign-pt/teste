import { type FormEvent, useState } from "react";

import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { club, contacts } from "@/data/club";

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

      <section className="bg-background py-16 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <h2 className="display-title text-3xl md:text-4xl">Envia-nos uma mensagem</h2>
            {sent ? (
              <div className="mt-8 border-2 border-foreground bg-primary p-8 text-primary-foreground">
                <p className="display-title text-2xl">Mensagem enviada!</p>
                <p className="mt-2 text-sm opacity-70">
                  Obrigado pelo contacto. Respondemos o mais depressa possível.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" name="name" required placeholder="O teu nome" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="o.teu@email.pt"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="subject">Assunto</Label>
                  <Select name="subject" defaultValue="socios">
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Escolhe um assunto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="socios">Quero ser sócio</SelectItem>
                      <SelectItem value="formacao">Inscrição na formação</SelectItem>
                      <SelectItem value="parcerias">Parcerias e patrocínios</SelectItem>
                      <SelectItem value="outro">Outro assunto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Conta-nos o que precisas"
                  />
                </div>

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

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Onde estamos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>{contacts.address}</li>
                  <li>
                    <a
                      href={`mailto:${contacts.email}`}
                      className="font-semibold text-secondary"
                    >
                      {contacts.email}
                    </a>
                  </li>
                  <li>{contacts.phone} [a confirmar]</li>
                </ul>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>
    </>
  );
}
