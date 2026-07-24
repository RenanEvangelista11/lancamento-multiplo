import { useState } from "react";
import { ChevronDown, Check, ArrowRight, X } from "lucide-react";
import { useFacebookPixel } from "@/hooks/useFacebookPixel";

const luizImg = "/images/luiz-filho_34458625.webp";

// ─── DATA ──────────────────────────────────────────────────────────────────

const gargalos = [
  {
    num: "01",
    question: '"Preciso estar ao vivo em todo lançamento?"',
    answer:
      "Não, se os CPLs forem gravados uma vez. O checklist mostra exatamente como estruturar isso sem prender a operação à sua agenda.",
  },
  {
    num: "02",
    question: '"Como eu vendo pra quem ainda não me conhece?"',
    answer:
      "Tráfego pago alimenta a captação, e as automações de e-mail, API, URA e SMS conduzem o lead até o checkout sozinhas. O checklist te dá a sequência.",
  },
  {
    num: "03",
    question: '"Dá pra repetir isso sem remontar tudo de novo?"',
    answer:
      "Dá, se a estrutura estiver mapeada item por item. É exatamente isso que os 257 itens fazem: viram checklist, não memória.",
  },
];

const steps = [
  {
    num: "01",
    title: "Você abre na fase que está executando",
    desc: "Estratégia, páginas, CPLs, automações ou tráfego — o sumário aponta direto pra frente certa.",
  },
  {
    num: "02",
    title: "Marca item por item, sem pular etapa",
    desc: "Cada uma das 257 linhas já vem no formato de execução, não de teoria.",
  },
  {
    num: "03",
    title: "Grava os CPLs uma única vez",
    desc: "O roteiro de gravação está no checklist. Depois de gravado, essa etapa não volta a te ocupar.",
  },
  {
    num: "04",
    title: "Liga tráfego e automações",
    desc: "Com anúncio, e-mail, API, URA e SMS configurados, o lançamento roda sozinho — lançamento após lançamento.",
  },
];

const phases = [
  {
    title: "Estratégia, oferta e definição do lançamento gravado",
    desc: "Como decidir o formato, a oferta e o ângulo antes de gravar qualquer coisa.",
  },
  {
    title: "Páginas, checkout e abertura de carrinho",
    desc: "A estrutura de páginas e o fluxo de abertura que sustentam a venda automática.",
  },
  {
    title: "Roteiro e gravação dos CPLs",
    desc: "O expert grava uma vez. O roteiro garante que essa gravação sirva pra todas as rodadas seguintes.",
  },
  {
    title: "Automações de e-mail, API, URA e SMS",
    desc: "A sequência que conduz o lead da aula até o checkout sem você operar na mão.",
  },
  {
    title: "Tráfego para público frio",
    desc: "Da captação ao fechamento do carrinho, o mapeamento de como alimentar a operação com público que ainda não te conhece.",
  },
];

const benefits = [
  {
    num: "01",
    title: "O expert grava uma vez, a estrutura roda sozinha",
    desc: "Os CPLs ficam gravados e a operação se repete a cada lançamento, sem arrastar o especialista pra uma nova maratona ao vivo.",
  },
  {
    num: "02",
    title: "Venda pra público frio no automático",
    desc: "O tráfego pago alimenta a captação e as automações conduzem o lead até o checkout, sem você operar na mão.",
  },
  {
    num: "03",
    title: "Uma estrutura pra copiar e repetir",
    desc: "Cada fase já vem mapeada item por item. Você replica o mesmo lançamento quantas vezes quiser, mantendo o padrão.",
  },
];

const bonuses = [
  {
    label: "Bônus 1",
    title: "Aula de Lançamento Múltiplo",
    price: "R$97",
    items: [
      "Aprofunda a metodologia por trás do checklist, direto com Luiz Filho",
      "Mostra quando faz sentido sair de um lançamento gravado único e passar a rodar vários ao mesmo tempo",
      "Explica como estruturar a operação pra escalar sem multiplicar o trabalho manual",
    ],
  },
  {
    label: "Bônus 2",
    title: "Trello do checklist",
    price: "R$47",
    items: [
      "Os 257 itens já organizados em board, prontos pra usar direto na operação",
      "Sem precisar transformar a lista em processo do zero",
      "Cada fase vira uma coluna, cada item vira um card, pronto pra atribuir e acompanhar com o time",
    ],
  },
];

const offerItems = [
  {
    symbol: "◆",
    title: "Checklist Lançamento Secreto.",
    desc: "257 itens, 7 fases, do anúncio ao fechamento do carrinho.",
    price: "R$97",
  },
  {
    symbol: "◆",
    title: "Bônus 1 — Aula de Lançamento Múltiplo.",
    desc: "Com Luiz Filho.",
    price: "R$97",
  },
  {
    symbol: "◆",
    title: "Bônus 2 — Trello do checklist.",
    desc: "Board pronto pra usar direto na operação.",
    price: "R$47",
  },
];

const forYes = [
  "Você já roda ou já vendeu em lançamento e quer parar de remontar tudo do zero a cada rodada",
  "Você depende da agenda do expert pra lançar e quer tirar esse gargalo da operação",
  "Você é gestor de tráfego ou operador de lançamento e quer um padrão testado pra copiar",
  "Você quer vender pra público frio no automático, sem maratona ao vivo repetida",
];

const forNo = [
  "Você ainda não tem produto, oferta ou audiência mínima pra sustentar um lançamento",
  "Você procura teoria de lançamento, não checklist de execução",
  "Você não pretende gravar CPL nem estruturar automação nos próximos lançamentos",
  "Você quer fórmula de anúncio pronta, e não uma estrutura de operação completa",
];

const faqs = [
  {
    q: "Por que só R$19,90?",
    a: "Porque o preço aqui não é o filtro de valor, é o filtro de intenção. Ele separa quem vai aplicar o checklist na próxima rodada de quem só acumula conteúdo teórico. O conteúdo é o mesmo padrão que a Zion usa nas operações que gerencia.",
  },
  {
    q: "Preciso do expert presente em cada lançamento?",
    a: "Não. O checklist mostra como estruturar CPLs gravados uma única vez, que continuam vendendo em rodadas seguintes sem exigir uma nova maratona ao vivo.",
  },
  {
    q: "Funciona para público que ainda não me conhece?",
    a: "Sim. A estrutura foi desenhada pra tráfego frio: o anúncio alimenta a captação e as automações conduzem o lead até o checkout, sem depender de audiência aquecida prévia.",
  },
  {
    q: "Preciso ter experiência com lançamentos para usar?",
    a: "Ajuda, mas não é pré-requisito. O checklist assume que você já tem produto e oferta definidos — a partir daí, ele guia a execução item por item, mesmo que seja seu primeiro lançamento gravado.",
  },
  {
    q: "Isso substitui um mentor ou consultoria de lançamento?",
    a: "Não. O checklist te dá a estrutura de execução testada em mais de 300 lançamentos. Decisões específicas do seu nicho e ajustes finos de operação continuam se beneficiando de acompanhamento especializado.",
  },
  {
    q: "O que exatamente eu recebo ao comprar?",
    a: "Três peças, com acesso imediato: o Checklist Lançamento Secreto, mais os dois bônus — a Aula de Lançamento Múltiplo com Luiz Filho e o Trello do checklist.",
  },
  {
    q: "Como recebo o material depois da compra?",
    a: "Acesso imediato após a confirmação do pagamento, para baixar e consultar quando quiser.",
  },
  {
    q: "Como funciona a garantia?",
    a: "Sete dias. Se o checklist não te der uma estrutura que você não tinha, é só pedir o reembolso dentro do prazo, sem justificativa.",
  },
];

// ─── SUB-COMPONENTS ────────────────────────────────────────────────────────

function CTAButton({ label = "BAIXAR O CHECKLIST AGORA" }: { label?: string }) {
  return (
    <a
      href="#"
      className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-bold text-base md:text-lg px-8 py-4 rounded-lg transition-colors"
      style={{
        boxShadow: "0 0 30px rgba(255,68,68,0.5), 0 0 60px rgba(255,68,68,0.25)",
        fontFamily: "var(--font-body)",
      }}
    >
      {label}
      <ArrowRight className="w-5 h-5" />
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold text-accent uppercase tracking-[0.3em] mb-3">
      {children}
    </p>
  );
}

function Divider() {
  return <div className="border-t border-border/50 my-0" />;
}

function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="border border-border rounded-lg overflow-hidden bg-card/50 hover:border-accent/40 transition-colors"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-accent/5 transition-colors text-left"
          >
            <span className="text-base font-semibold text-foreground pr-4">{faq.q}</span>
            <ChevronDown
              className={`w-5 h-5 text-accent flex-shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          {open === i && (
            <div className="px-6 pb-5 pt-1 border-t border-border bg-background/50">
              <p className="text-base text-muted-foreground leading-relaxed">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function OfferCard({ repeat = false }: { repeat?: boolean }) {
  return (
    <div
      className="bg-card border-2 border-accent/50 rounded-2xl p-7 md:p-10 max-w-xl mx-auto"
      style={{ boxShadow: "0 0 60px -15px rgba(255,68,68,0.35)" }}
    >
      {!repeat && (
        <p className="text-xs font-bold text-accent uppercase tracking-[0.3em] mb-6">
          Tudo o que você leva hoje
        </p>
      )}

      <div className="space-y-4 mb-8">
        {offerItems.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="text-accent font-bold flex-shrink-0 mt-0.5">{item.symbol}</span>
            <div className="flex-1">
              <span className="text-sm md:text-base font-semibold text-foreground">
                {item.title}
              </span>{" "}
              <span className="text-sm text-muted-foreground">{item.desc}</span>
            </div>
            <span className="text-sm text-muted-foreground line-through flex-shrink-0">
              {item.price}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-6 mb-6">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-muted-foreground">Quanto tudo isso vale:</span>
          <span className="text-sm text-muted-foreground line-through">R$241</span>
        </div>
        <div className="flex items-baseline gap-3 mt-4">
          <span className="text-5xl md:text-6xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            R$19,90
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Pagamento único. Acesso imediato.</p>
      </div>

      <CTAButton />

      <p className="text-xs text-muted-foreground text-center mt-4">
        🔒 Compra segura · Garantia de 7 dias
      </p>
    </div>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────

export default function Checklist() {
  useFacebookPixel();

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── DOBRA 1: Hero ────────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,68,68,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Kicker */}
          <div className="inline-flex items-center gap-2 border border-accent/40 bg-accent/10 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-bold text-accent uppercase tracking-[0.25em]">
              Checklist · Lançamento Secreto
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.08] mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Copie a estrutura de lançamento gravado que vende para público frio no automático, sem depender da agenda do expert.{" "}
            <em className="text-accent not-italic">Em uma tarde.</em>
          </h1>

          {/* Sub */}
          <p className="text-base md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
            Um checklist de execução com <strong className="text-foreground">257 itens em 7 fases</strong>, do primeiro anúncio ao fechamento do carrinho, testado em mais de 300 lançamentos por Luiz Filho, fundador da Zion e criador do Lançamento Múltiplo.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["257 itens", "7 fases", "Método validado em 300+ lançamentos", "Independente da agenda do expert"].map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold text-foreground bg-card border border-border rounded-full px-4 py-1.5"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Mockup */}
          <div className="mx-auto w-full max-w-lg">
            <img
              src="/images/checklist-mockup.webp"
              alt="Checklist do Lançamento Secreto — mockup"
              className="w-full h-auto drop-shadow-2xl"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <Divider />

      {/* ── DOBRA 2: Gargalos ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionLabel>O que trava seu próximo lançamento</SectionLabel>
            <h2
              className="text-2xl md:text-4xl font-bold text-foreground leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Não são hipóteses. São os três gargalos que aparecem toda vez que um lançamento gravado é montado do zero.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {gargalos.map((g) => (
              <div
                key={g.num}
                className="bg-card border border-border rounded-xl p-6 hover:border-accent/40 transition-colors"
              >
                <div
                  className="text-4xl font-black mb-4 leading-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "rgba(255,68,68,0.15)",
                  }}
                >
                  {g.num}
                </div>
                <p className="text-base font-semibold text-foreground mb-3 leading-snug">
                  {g.question}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{g.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── DOBRA 3: Antes / Depois ──────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionLabel>A diferença na prática</SectionLabel>
            <h2
              className="text-2xl md:text-4xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Antes e depois do checklist
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Antes */}
            <div className="bg-card border border-border rounded-xl p-7">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-full bg-muted/50 border border-border flex items-center justify-center flex-shrink-0">
                  <X className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="text-base font-bold text-muted-foreground uppercase tracking-wider">Antes</span>
              </div>
              <div className="w-full rounded-lg overflow-hidden mb-5">
                <img
                  src="/images/checklist-antes.webp"
                  alt="Sem método — operação travada"
                  className="w-full h-auto object-cover"
                  decoding="async"
                />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Expert precisando estar ao vivo em cada rodada. Equipe remontando o funil do zero. Agenda do especialista como gargalo principal da operação.
              </p>
            </div>

            {/* Depois */}
            <div
              className="bg-card border-2 border-accent/40 rounded-xl p-7"
              style={{ boxShadow: "0 0 40px -15px rgba(255,68,68,0.2)" }}
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-accent" />
                </div>
                <span className="text-base font-bold text-accent uppercase tracking-wider">Depois</span>
              </div>
              <div className="w-full aspect-video rounded-lg bg-accent/5 border border-accent/20 mb-5 flex items-center justify-center">
                <p className="text-xs text-accent/60">Imagem: lançamento rodando sozinho</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                CPL gravado, tráfego ligado, automação conduzindo o lead até o carrinho. O lançamento roda sozinho — sem o expert disponível a cada rodada.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── DOBRA 4: Como usar ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionLabel>Como usar o checklist</SectionLabel>
            <h2
              className="text-2xl md:text-4xl font-bold text-foreground mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Você não precisa executar tudo de uma vez.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              O checklist te encontra na fase em que você está agora.
            </p>
          </div>

          <div className="space-y-4">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="flex items-start gap-5 bg-card border border-border rounded-xl p-6 hover:border-accent/30 transition-colors"
              >
                <div
                  className="text-3xl font-black leading-none flex-shrink-0 w-12 text-center"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "rgba(255,68,68,0.25)",
                  }}
                >
                  {step.num}
                </div>
                <div>
                  <p className="text-base font-semibold text-foreground mb-1">{step.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-base md:text-lg font-semibold text-foreground">
              Uma tarde hoje.{" "}
              <span className="text-accent">Um lançamento gravado rodando amanhã.</span>
            </p>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── DOBRA 5: O que tem dentro ────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-card/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionLabel>O que tem dentro</SectionLabel>
            <h2
              className="text-2xl md:text-4xl font-bold text-foreground mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              257 itens em 7 fases
            </h2>
            <p className="text-base text-muted-foreground">
              Não é teoria de lançamento. É o passo a passo de execução, pronto para copiar.
            </p>
          </div>

          <div className="space-y-0 rounded-xl overflow-hidden border border-border">
            {phases.map((phase, i) => (
              <div
                key={i}
                className={`flex items-start gap-5 p-6 ${
                  i < phases.length - 1 ? "border-b border-border" : ""
                } bg-card hover:bg-card/80 transition-colors`}
              >
                <div
                  className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5"
                >
                  <Check className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-base font-semibold text-foreground mb-1">
                    Fase — {phase.title}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 mx-auto w-full max-w-md">
            <img
              src="/images/checklist-mockup.webp"
              alt="Checklist do Lançamento Secreto"
              className="w-full h-auto drop-shadow-xl"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <Divider />

      {/* ── DOBRA 6: Por que baixar ──────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionLabel>Por que baixar</SectionLabel>
            <h2
              className="text-2xl md:text-4xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              O que muda na sua operação
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.num} className="bg-card border border-border rounded-xl p-6">
                <div
                  className="text-5xl font-black mb-5 leading-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "rgba(255,68,68,0.12)",
                  }}
                >
                  {b.num}
                </div>
                <p className="text-base font-semibold text-foreground mb-3 leading-snug">
                  {b.title}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── DOBRA 7: Bônus ───────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-card/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionLabel>E vem com mais duas peças</SectionLabel>
            <h2
              className="text-2xl md:text-4xl font-bold text-foreground mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              O checklist te dá a estrutura de execução.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Estas duas te dão o aprofundamento pra escalar e o formato pra usar sem fricção.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {bonuses.map((bonus, i) => (
              <div
                key={i}
                className="bg-card border border-accent/30 rounded-xl p-7"
                style={{ boxShadow: "0 0 30px -10px rgba(255,68,68,0.15)" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-accent uppercase tracking-[0.25em]">
                    {bonus.label}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">{bonus.price}</span>
                </div>
                <h3
                  className="text-xl font-bold text-foreground mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {bonus.title}
                </h3>
                <ul className="space-y-3">
                  {bonus.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-accent" />
                      </span>
                      <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── DOBRA 8: Urgência ────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2
            className="text-2xl md:text-4xl font-bold text-foreground mb-6 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Enquanto você monta do zero, tem operação rodando 3 lançamentos com a mesma estrutura
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
            Cada rodada ao vivo que depende 100% da agenda do expert é uma rodada que não escala. Operações de diferentes nichos já pararam de remontar o funil toda vez — elas gravaram uma vez e deixaram a estrutura rodar.
          </p>
          <div className="bg-card border-l-4 border-accent rounded-r-xl px-6 py-5 text-left">
            <p className="text-base md:text-lg font-semibold text-foreground leading-relaxed">
              <strong className="text-accent">Isso muda quem sai na frente.</strong> Enquanto uma operação trava esperando o expert ficar livre de novo, outra já está captando público frio no automático. A pergunta não é se dá pra escalar sem gravar de novo — é quem vai fazer isso primeiro na sua concorrência.
            </p>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── DOBRA 9: Para quem é / não é ────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-card/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionLabel>Prefiro ser direto agora</SectionLabel>
            <h2
              className="text-2xl md:text-4xl font-bold text-foreground mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Para quem é, e para quem não é
            </h2>
            <p className="text-base text-muted-foreground">
              Melhor te decepcionar agora do que depois.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Para quem é */}
            <div className="bg-card border border-accent/30 rounded-xl p-7">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center">
                  <Check className="w-4 h-4 text-accent" />
                </div>
                <span className="text-base font-bold text-foreground">É para você se</span>
              </div>
              <ul className="space-y-4">
                {forYes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-accent font-bold flex-shrink-0 mt-0.5">✓</span>
                    <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Para quem não é */}
            <div className="bg-card border border-border rounded-xl p-7">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-7 h-7 rounded-full bg-muted/30 border border-border flex items-center justify-center">
                  <X className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="text-base font-bold text-muted-foreground">Não é para você se</span>
              </div>
              <ul className="space-y-4">
                {forNo.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-muted-foreground/60 font-bold flex-shrink-0 mt-0.5">✕</span>
                    <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── DOBRA 10: Comparativo de custo ──────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionLabel>Quanto custa montar essa estrutura sozinho?</SectionLabel>
            <h2
              className="text-2xl md:text-4xl font-bold text-foreground mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Não é sobre capacidade. É sobre as horas que faltam e o lançamento que já está marcado.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Sozinho */}
            <div className="bg-card border border-border rounded-xl p-7">
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-6">
                Montando por conta própria
              </p>
              <ul className="space-y-4">
                {[
                  ["mapear tudo do zero", "dias"],
                  ["testar cada automação", "mais dias"],
                  ["errar a sequência e refazer", "o gap real"],
                  ["o próximo lançamento já marcado", "tarde demais"],
                ].map(([action, cost]) => (
                  <li key={action} className="flex items-center justify-between gap-3">
                    <span className="text-sm text-muted-foreground">{action}</span>
                    <span className="text-xs font-semibold text-muted-foreground/60 bg-muted/30 px-2 py-0.5 rounded whitespace-nowrap">
                      {cost}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Com o checklist */}
            <div
              className="bg-card border-2 border-accent/40 rounded-xl p-7"
              style={{ boxShadow: "0 0 30px -10px rgba(255,68,68,0.2)" }}
            >
              <p className="text-sm font-bold text-accent uppercase tracking-widest mb-6">
                Com o checklist na mão
              </p>
              <ul className="space-y-4">
                {[
                  ["as 5 frentes mapeadas prontas pra copiar", "uma tarde"],
                  ["automação já desenhada", "inclusa"],
                  ["roteiro de CPL validado", "incluso"],
                  ["tráfego pra público frio mapeado", "incluso"],
                ].map(([action, cost]) => (
                  <li key={action} className="flex items-center justify-between gap-3">
                    <span className="text-sm text-muted-foreground">{action}</span>
                    <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded whitespace-nowrap">
                      {cost}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-center text-base text-muted-foreground mt-8">
            Você levaria dias pra montar e testar tudo isso sozinho.{" "}
            <strong className="text-foreground">O checklist te entrega pronto pra copiar.</strong>
          </p>
        </div>
      </section>

      <Divider />

      {/* ── DOBRA 11: Oferta ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-card/30">
        <div className="max-w-xl mx-auto px-6">
          <OfferCard />
        </div>
      </section>

      <Divider />

      {/* ── DOBRA 12: Garantia ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div
            className="inline-flex flex-col items-center gap-4 border-2 border-accent/40 rounded-2xl px-10 py-10"
            style={{ boxShadow: "0 0 50px -15px rgba(255,68,68,0.2)" }}
          >
            <div className="w-16 h-16 rounded-full bg-accent/15 border-2 border-accent/40 flex items-center justify-center">
              <span className="text-3xl">🛡️</span>
            </div>
            <h3
              className="text-2xl md:text-3xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Garantia de 7 dias
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed max-w-md">
              Se o checklist não te der uma estrutura que você ainda não tinha pra copiar, é só pedir o reembolso dentro de 7 dias. Sem justificativa, sem constrangimento.
            </p>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── DOBRA 13: Narrativa ──────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-card/30">
        <div className="max-w-3xl mx-auto px-6">
          <SectionLabel className="text-center block mb-6">Você já sabe lançar</SectionLabel>
          <h2
            className="text-2xl md:text-4xl font-bold text-foreground mb-8 text-center leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            O problema não é esse.
          </h2>

          <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>
              Você já rodou lançamento. Sabe fazer CPL, sabe configurar automação, sabe comprar tráfego.
            </p>
            <p>
              Mas toda vez que uma rodada nova começa, alguma coisa se repete: remontar a sequência de e-mail do zero, redefinir o fluxo de carrinho, esperar o expert ter uma janela livre pra gravar de novo.
            </p>
            <p>
              Não é falta de conhecimento. É que ninguém te deu o checklist de execução com as 257 decisões já mapeadas — só a teoria de como um lançamento gravado funciona.
            </p>
            <div className="bg-card border-l-4 border-accent rounded-r-xl px-6 py-4">
              <p className="text-foreground font-semibold">
                Este checklist não é curso de lançamento, nem resumo de estratégia. É a estrutura de execução pronta pra copiar: o que fazer em cada uma das 7 fases, na ordem certa, sem remontar do zero.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── DOBRA 14: Quem está por trás ────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionLabel>Quem está por trás do método</SectionLabel>
            <h2
              className="text-2xl md:text-4xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Luiz Filho
            </h2>
            <p className="text-base text-accent font-semibold mt-2">
              Fundador da Zion · Criador do Lançamento Múltiplo
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="rounded-xl overflow-hidden border border-border">
              <img
                src={luizImg}
                alt="Luiz Filho"
                className="w-full h-auto object-cover"
              />
            </div>

            <ul className="space-y-5">
              {[
                "Criador do Lançamento Múltiplo e fundador da Zion, uma das maiores agências de lançamentos digitais do Brasil",
                "Começou no digital em 2019, faturando múltiplos 8 dígitos em dropshipping e vendas diretas por WhatsApp",
                "Como gestor de tráfego, atendeu mais de 50 e-commerces e dezenas de lançamentos ao mesmo tempo — foi aí que análise de dados, processos e leitura de funil viraram a base de tudo que ele constrói",
                "À frente da Zion, com um time de mais de 70 pessoas, comanda operações que faturaram mais de R$50 milhões nos últimos dois anos",
                "Hoje também é sócio e estrategista de operações como as de Pablo Marçal e Rapha Tarso, e dedica parte do tempo a formar alunos capazes de lançar com previsibilidade e independência",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-accent" />
                  </span>
                  <span className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── DOBRA 15: Repetição da oferta ───────────────────────────────── */}
      <section className="py-16 md:py-24 bg-card/30">
        <div className="max-w-xl mx-auto px-6">
          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground">
              Checklist Lançamento Secreto + Aula de Lançamento Múltiplo + Trello do checklist
            </p>
          </div>
          <OfferCard repeat />
        </div>
      </section>

      <Divider />

      {/* ── DOBRA 16: FAQ ────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <SectionLabel>Dúvidas</SectionLabel>
            <h2
              className="text-2xl md:text-3xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Perguntas Frequentes
            </h2>
          </div>
          <FAQAccordion />
        </div>
      </section>

      <Divider />

      {/* ── DOBRA 17: CTA Final ──────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-card/30">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2
            className="text-2xl md:text-4xl font-bold text-foreground mb-6 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Se você quer parar de remontar tudo do zero e de depender da agenda do expert a cada lançamento
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
            e quer uma estrutura que capta e vende pra público frio no automático, este checklist é o seu ponto de partida.
          </p>
          <p className="text-base text-foreground font-semibold mb-8">
            Baixe agora e copie a estrutura de lançamento gravado que vende no automático.
          </p>
          <CTAButton />
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-border py-10 bg-background">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
