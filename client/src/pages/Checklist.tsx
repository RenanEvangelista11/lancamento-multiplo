import { useState, useEffect } from "react";
import { ChevronDown, Check, ArrowRight, X } from "lucide-react";
import { useFacebookPixel } from "@/hooks/useFacebookPixel";

// ─── ZION DESIGN TOKENS ────────────────────────────────────────────────────
const Z = {
  bg:       "#0B0B0B",
  bgDeep:   "#080808",
  grafite:  "#1A1A1A",
  grafite2: "#222222",
  border:   "rgba(255,255,255,0.08)",
  borderHover: "rgba(214,239,42,0.35)",
  green:    "#D6EF2A",
  greenSoft:"#BFE221",
  white:    "#F2F2F2",
  muted:    "#BFC2C0",
  dark:     "#0B0B0B",
} as const;

const fontTitle = "'Space Grotesk', 'Sora', 'Exo 2', ui-sans-serif, system-ui, sans-serif";
const fontBody  = "'Inter', 'Manrope', ui-sans-serif, system-ui, sans-serif";

// ─── DATA ──────────────────────────────────────────────────────────────────

const gargalos = [
  {
    num: "01",
    question: '"Preciso estar ao vivo em todo lançamento?"',
    answer: "Não, se os CPLs forem gravados uma vez. O checklist mostra exatamente como estruturar isso sem prender a operação à sua agenda.",
  },
  {
    num: "02",
    question: '"Como eu vendo pra quem ainda não me conhece?"',
    answer: "Tráfego pago alimenta a captação, e as automações de e-mail, API, URA e SMS conduzem o lead até o checkout sozinhas. O checklist te dá a sequência.",
  },
  {
    num: "03",
    question: '"Dá pra repetir isso sem remontar tudo de novo?"',
    answer: "Dá, se a estrutura estiver mapeada item por item. É exatamente isso que os 257 itens fazem: viram checklist, não memória.",
  },
];

const steps = [
  { num: "01", title: "Você abre na fase que está executando", desc: "Estratégia, páginas, CPLs, automações ou tráfego — o sumário aponta direto pra frente certa." },
  { num: "02", title: "Marca item por item, sem pular etapa", desc: "Cada uma das 257 linhas já vem no formato de execução, não de teoria." },
  { num: "03", title: "Grava os CPLs uma única vez", desc: "O roteiro de gravação está no checklist. Depois de gravado, essa etapa não volta a te ocupar." },
  { num: "04", title: "Liga tráfego e automações", desc: "Com anúncio, e-mail, API, URA e SMS configurados, o lançamento roda sozinho — lançamento após lançamento." },
];

const phases = [
  { title: "Estratégia, oferta e definição do lançamento gravado", desc: "Como decidir o formato, a oferta e o ângulo antes de gravar qualquer coisa." },
  { title: "Páginas, checkout e abertura de carrinho", desc: "A estrutura de páginas e o fluxo de abertura que sustentam a venda automática." },
  { title: "Roteiro e gravação dos CPLs", desc: "O expert grava uma vez. O roteiro garante que essa gravação sirva pra todas as rodadas seguintes." },
  { title: "Automações de e-mail, API, URA e SMS", desc: "A sequência que conduz o lead da aula até o checkout sem você operar na mão." },
  { title: "Tráfego para público frio", desc: "Da captação ao fechamento do carrinho, o mapeamento de como alimentar a operação com público que ainda não te conhece." },
];

const benefits = [
  { num: "01", title: "O expert grava uma vez, a estrutura roda sozinha", desc: "Os CPLs ficam gravados e a operação se repete a cada lançamento, sem arrastar o especialista pra uma nova maratona ao vivo." },
  { num: "02", title: "Venda pra público frio no automático", desc: "O tráfego pago alimenta a captação e as automações conduzem o lead até o checkout, sem você operar na mão." },
  { num: "03", title: "Uma estrutura pra copiar e repetir", desc: "Cada fase já vem mapeada item por item. Você replica o mesmo lançamento quantas vezes quiser, mantendo o padrão." },
];

const bonuses = [
  {
    label: "Bônus 1", title: "Aula de Lançamento Múltiplo", price: "R$97",
    items: [
      "Aprofunda a metodologia por trás do checklist, direto com Luiz Filho",
      "Mostra quando faz sentido sair de um lançamento gravado único e passar a rodar vários ao mesmo tempo",
      "Explica como estruturar a operação pra escalar sem multiplicar o trabalho manual",
    ],
  },
  {
    label: "Bônus 2", title: "Trello do checklist", price: "R$47",
    items: [
      "Os 257 itens já organizados em board, prontos pra usar direto na operação",
      "Sem precisar transformar a lista em processo do zero",
      "Cada fase vira uma coluna, cada item vira um card, pronto pra atribuir e acompanhar com o time",
    ],
  },
];

const offerItems = [
  { title: "Checklist Lançamento Secreto.", desc: "257 itens, 7 fases, do anúncio ao fechamento do carrinho.", price: "R$97" },
  { title: "Bônus 1 — Aula de Lançamento Múltiplo.", desc: "Com Luiz Filho.", price: "R$97" },
  { title: "Bônus 2 — Trello do checklist.", desc: "Board pronto pra usar direto na operação.", price: "R$47" },
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
  { q: "Por que só R$19,90?", a: "Porque o preço aqui não é o filtro de valor, é o filtro de intenção. Ele separa quem vai aplicar o checklist na próxima rodada de quem só acumula conteúdo teórico. O conteúdo é o mesmo padrão que a Zion usa nas operações que gerencia." },
  { q: "Preciso do expert presente em cada lançamento?", a: "Não. O checklist mostra como estruturar CPLs gravados uma única vez, que continuam vendendo em rodadas seguintes sem exigir uma nova maratona ao vivo." },
  { q: "Funciona para público que ainda não me conhece?", a: "Sim. A estrutura foi desenhada pra tráfego frio: o anúncio alimenta a captação e as automações conduzem o lead até o checkout, sem depender de audiência aquecida prévia." },
  { q: "Preciso ter experiência com lançamentos para usar?", a: "Ajuda, mas não é pré-requisito. O checklist assume que você já tem produto e oferta definidos — a partir daí, ele guia a execução item por item, mesmo que seja seu primeiro lançamento gravado." },
  { q: "Isso substitui um mentor ou consultoria de lançamento?", a: "Não. O checklist te dá a estrutura de execução testada em mais de 300 lançamentos. Decisões específicas do seu nicho e ajustes finos de operação continuam se beneficiando de acompanhamento especializado." },
  { q: "O que exatamente eu recebo ao comprar?", a: "Três peças, com acesso imediato: o Checklist Lançamento Secreto, mais os dois bônus — a Aula de Lançamento Múltiplo com Luiz Filho e o Trello do checklist." },
  { q: "Como recebo o material depois da compra?", a: "Acesso imediato após a confirmação do pagamento, para baixar e consultar quando quiser." },
  { q: "Como funciona a garantia?", a: "Sete dias. Se o checklist não te der uma estrutura que você não tinha, é só pedir o reembolso dentro do prazo, sem justificativa." },
];

// ─── SUB-COMPONENTS ────────────────────────────────────────────────────────

function CTAButton({ label = "BAIXAR O CHECKLIST AGORA", fullWidth = false }: { label?: string; fullWidth?: boolean }) {
  return (
    <a
      href="https://pay.onprofit.com.br/p9dF8nYr?off=3FEUra"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        background: Z.green,
        color: Z.dark,
        fontFamily: fontBody,
        fontWeight: 700,
        fontSize: 14,
        letterSpacing: "0.08em",
        padding: "14px 28px",
        borderRadius: 8,
        textDecoration: "none",
        transition: "opacity 0.15s",
        width: fullWidth ? "100%" : undefined,
        boxSizing: "border-box",
      }}
      onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
      onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
    >
      {label}
      <ArrowRight size={16} />
    </a>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: "inline-block",
      border: `1px solid ${Z.border}`,
      background: Z.grafite,
      color: Z.muted,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.08em",
      padding: "4px 12px",
      borderRadius: 99,
      fontFamily: fontBody,
    }}>
      {children}
    </span>
  );
}

function SLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ color: Z.green, fontSize: 11, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: fontBody, marginBottom: 12 }}>
      {children}
    </p>
  );
}

function Divider() {
  return <div style={{ borderTop: `1px solid ${Z.border}` }} />;
}

function Card({ children, highlight = false, style = {} }: { children: React.ReactNode; highlight?: boolean; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: Z.grafite,
      border: `1px solid ${highlight ? Z.borderHover : Z.border}`,
      borderRadius: 16,
      padding: "28px 28px",
      ...style,
    }}>
      {children}
    </div>
  );
}

function GreenCheck() {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 20, height: 20, borderRadius: "50%",
      background: "rgba(214,239,42,0.12)", border: `1px solid rgba(214,239,42,0.35)`,
      flexShrink: 0, marginTop: 2,
    }}>
      <Check size={11} color={Z.green} strokeWidth={3} />
    </span>
  );
}

function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {faqs.map((faq, i) => (
        <div key={i} style={{
          border: `1px solid ${open === i ? Z.borderHover : Z.border}`,
          borderRadius: 12, overflow: "hidden",
          background: Z.grafite, transition: "border-color 0.15s",
        }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: "100%", padding: "16px 20px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "transparent", border: "none", cursor: "pointer", textAlign: "left",
            }}
          >
            <span style={{ color: Z.white, fontFamily: fontBody, fontWeight: 600, fontSize: 15, paddingRight: 16 }}>
              {faq.q}
            </span>
            <ChevronDown
              size={18} color={Z.green} strokeWidth={2}
              style={{ flexShrink: 0, transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
            />
          </button>
          {open === i && (
            <div style={{ padding: "4px 20px 18px", borderTop: `1px solid ${Z.border}`, background: Z.bgDeep }}>
              <p style={{ color: Z.muted, fontFamily: fontBody, fontSize: 14, lineHeight: 1.7, margin: "12px 0 0" }}>
                {faq.a}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function OfferBox() {
  return (
    <Card highlight style={{ maxWidth: 520, margin: "0 auto" }}>
      <p style={{ color: Z.green, fontSize: 11, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: fontBody, marginBottom: 20 }}>
        Tudo o que você leva hoje
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
        {offerItems.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <span style={{ color: Z.green, fontWeight: 700, flexShrink: 0 }}>◆</span>
            <div style={{ flex: 1 }}>
              <span style={{ color: Z.white, fontFamily: fontBody, fontWeight: 600, fontSize: 14 }}>{item.title} </span>
              <span style={{ color: Z.muted, fontFamily: fontBody, fontSize: 14 }}>{item.desc}</span>
            </div>
            <span style={{ color: Z.muted, fontFamily: fontBody, fontSize: 13, textDecoration: "line-through", flexShrink: 0 }}>{item.price}</span>
          </div>
        ))}
      </div>

      <div style={{ borderTop: `1px solid ${Z.border}`, paddingTop: 20, marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ color: Z.muted, fontFamily: fontBody, fontSize: 13 }}>Valor total:</span>
          <span style={{ color: Z.muted, fontFamily: fontBody, fontSize: 13, textDecoration: "line-through" }}>R$241</span>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ color: Z.white, fontFamily: fontTitle, fontWeight: 700, fontSize: 52, lineHeight: 1 }}>R$19,90</span>
        </div>
        <p style={{ color: Z.muted, fontFamily: fontBody, fontSize: 13, marginTop: 6 }}>Pagamento único. Acesso imediato.</p>
      </div>

      <CTAButton fullWidth />

      <p style={{ color: Z.muted, fontFamily: fontBody, fontSize: 12, textAlign: "center", marginTop: 12 }}>
        🔒 Compra segura · Garantia de 7 dias
      </p>
    </Card>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────

export default function Checklist() {
  useFacebookPixel();

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  const section = (children: React.ReactNode, bg = Z.bg, py = 80) => (
    <section style={{ background: bg, padding: `${py}px 0` }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
        {children}
      </div>
    </section>
  );

  const centerWrap = (children: React.ReactNode, maxW = 680) => (
    <div style={{ maxWidth: maxW, margin: "0 auto", textAlign: "center" }}>
      {children}
    </div>
  );

  return (
    <div style={{ background: Z.bg, minHeight: "100vh", color: Z.white }}>

      {/* ── DOBRA 1: Hero ─────────────────────────────────────────────────── */}
      <section style={{ background: Z.bgDeep, padding: "72px 0 80px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>

          {/* Kicker */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid rgba(214,239,42,0.3)`, borderRadius: 99, padding: "5px 14px", marginBottom: 36 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: Z.green }} />
            <span style={{ color: Z.green, fontSize: 11, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase" as const, fontFamily: fontBody }}>
              Checklist Gratuito · Lançamento Secreto
            </span>
          </div>

          {/* Mockup — aguardando imagem */}

          {/* Headline */}
          <h1 style={{ fontFamily: fontTitle, fontWeight: 700, fontSize: "clamp(28px, 5vw, 46px)", lineHeight: 1.1, color: Z.white, marginBottom: 20 }}>
            Copie e cole a estrutura de lançamento gravado que vende para público frio no automático,{" "}
            <span style={{ color: Z.green }}>sem depender do expert.</span>
          </h1>

          {/* Sub */}
          <p style={{ color: Z.muted, fontFamily: fontBody, fontSize: 16, lineHeight: 1.7, marginBottom: 32, maxWidth: 520, margin: "0 auto 32px" }}>
            Método validado em mais de <strong style={{ color: Z.white }}>300 lançamentos</strong> para você executar cada fase com previsibilidade, do início da captação ao fechamento do carrinho.
          </p>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8, justifyContent: "center", marginBottom: 40 }}>
            {["257 itens", "7 fases", "300+ lançamentos", "Sem depender do expert"].map(tag => <Tag key={tag}>{tag}</Tag>)}
          </div>

          <CTAButton />
        </div>
      </section>

      <Divider />

      {/* ── DOBRA 2: Gargalos ─────────────────────────────────────────────── */}
      {section(<>
        {centerWrap(<>
          <SLabel>O que trava seu próximo lançamento</SLabel>
          <h2 style={{ fontFamily: fontTitle, fontWeight: 700, fontSize: "clamp(22px, 3.5vw, 36px)", color: Z.white, lineHeight: 1.2, marginBottom: 48 }}>
            Não são hipóteses. São os três gargalos que aparecem toda vez que um lançamento gravado é montado do zero.
          </h2>
        </>, 760)}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {gargalos.map(g => (
            <Card key={g.num}>
              <div style={{ fontFamily: fontTitle, fontWeight: 700, fontSize: 48, color: "rgba(214,239,42,0.12)", lineHeight: 1, marginBottom: 16 }}>{g.num}</div>
              <p style={{ color: Z.white, fontFamily: fontBody, fontWeight: 600, fontSize: 15, marginBottom: 10, lineHeight: 1.5 }}>{g.question}</p>
              <p style={{ color: Z.muted, fontFamily: fontBody, fontSize: 14, lineHeight: 1.7 }}>{g.answer}</p>
            </Card>
          ))}
        </div>
      </>)}

      <Divider />

      {/* ── DOBRA 3: Antes / Depois ───────────────────────────────────────── */}
      {section(<>
        {centerWrap(<>
          <SLabel>A diferença na prática</SLabel>
          <h2 style={{ fontFamily: fontTitle, fontWeight: 700, fontSize: "clamp(22px, 3.5vw, 36px)", color: Z.white, lineHeight: 1.2, marginBottom: 48 }}>
            Antes e depois do checklist
          </h2>
        </>, 560)}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {/* Antes */}
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <span style={{ width: 26, height: 26, borderRadius: "50%", background: Z.grafite2, border: `1px solid ${Z.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <X size={13} color={Z.muted} />
              </span>
              <span style={{ color: Z.muted, fontFamily: fontBody, fontWeight: 700, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" as const }}>Antes</span>
            </div>
            {/* Imagem antes — aguardando */}
            <p style={{ color: Z.muted, fontFamily: fontBody, fontSize: 14, lineHeight: 1.7 }}>
              Expert precisando estar ao vivo em cada rodada. Equipe remontando o funil do zero. Agenda do especialista como gargalo principal da operação.
            </p>
          </Card>

          {/* Depois */}
          <Card highlight>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <span style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(214,239,42,0.12)", border: `1px solid rgba(214,239,42,0.35)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Check size={13} color={Z.green} />
              </span>
              <span style={{ color: Z.green, fontFamily: fontBody, fontWeight: 700, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" as const }}>Depois</span>
            </div>
            {/* Imagem depois — aguardando */}
            <p style={{ color: Z.muted, fontFamily: fontBody, fontSize: 14, lineHeight: 1.7 }}>
              CPL gravado, tráfego ligado, automação conduzindo o lead até o carrinho. O lançamento roda sozinho — sem o expert disponível a cada rodada.
            </p>
          </Card>
        </div>
      </>)}

      <Divider />

      {/* ── DOBRA 4: Como usar ────────────────────────────────────────────── */}
      {section(<>
        {centerWrap(<>
          <SLabel>Como usar o checklist</SLabel>
          <h2 style={{ fontFamily: fontTitle, fontWeight: 700, fontSize: "clamp(22px, 3.5vw, 36px)", color: Z.white, lineHeight: 1.2, marginBottom: 8 }}>
            Você não precisa executar tudo de uma vez.
          </h2>
          <p style={{ color: Z.muted, fontFamily: fontBody, fontSize: 16, marginBottom: 48 }}>
            O checklist te encontra na fase em que você está agora.
          </p>
        </>, 600)}
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column" as const, gap: 8 }}>
          {steps.map(step => (
            <Card key={step.num} style={{ display: "flex", alignItems: "flex-start", gap: 20, padding: "20px 24px" }}>
              <span style={{ fontFamily: fontTitle, fontWeight: 700, fontSize: 36, color: "rgba(214,239,42,0.2)", lineHeight: 1, flexShrink: 0, minWidth: 48 }}>{step.num}</span>
              <div>
                <p style={{ color: Z.white, fontFamily: fontBody, fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{step.title}</p>
                <p style={{ color: Z.muted, fontFamily: fontBody, fontSize: 14, lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            </Card>
          ))}
        </div>
        <p style={{ textAlign: "center", fontFamily: fontBody, fontSize: 15, color: Z.white, fontWeight: 600, marginTop: 32 }}>
          Uma tarde hoje. <span style={{ color: Z.green }}>Um lançamento gravado rodando amanhã.</span>
        </p>
      </>)}

      <Divider />

      {/* ── DOBRA 5: O que tem dentro ─────────────────────────────────────── */}
      {section(<>
        {centerWrap(<>
          <SLabel>O que tem dentro</SLabel>
          <h2 style={{ fontFamily: fontTitle, fontWeight: 700, fontSize: "clamp(22px, 3.5vw, 36px)", color: Z.white, lineHeight: 1.2, marginBottom: 8 }}>
            257 itens em 7 fases
          </h2>
          <p style={{ color: Z.muted, fontFamily: fontBody, fontSize: 15, marginBottom: 48 }}>
            Não é teoria de lançamento. É o passo a passo de execução, pronto para copiar.
          </p>
        </>, 600)}

        <div style={{ maxWidth: 720, margin: "0 auto 40px", border: `1px solid ${Z.border}`, borderRadius: 16, overflow: "hidden" }}>
          {phases.map((phase, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 16, padding: "20px 24px",
              background: i % 2 === 0 ? Z.grafite : Z.grafite2,
              borderBottom: i < phases.length - 1 ? `1px solid ${Z.border}` : "none",
            }}>
              <GreenCheck />
              <div>
                <p style={{ color: Z.white, fontFamily: fontBody, fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Fase — {phase.title}</p>
                <p style={{ color: Z.muted, fontFamily: fontBody, fontSize: 13, lineHeight: 1.7 }}>{phase.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mockup dobra 5 — aguardando */}
      </>, Z.bgDeep)}

      <Divider />

      {/* ── DOBRA 6: Por que baixar ───────────────────────────────────────── */}
      {section(<>
        {centerWrap(<>
          <SLabel>Por que baixar</SLabel>
          <h2 style={{ fontFamily: fontTitle, fontWeight: 700, fontSize: "clamp(22px, 3.5vw, 36px)", color: Z.white, lineHeight: 1.2, marginBottom: 48 }}>
            O que muda na sua operação
          </h2>
        </>, 560)}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {benefits.map(b => (
            <Card key={b.num}>
              <div style={{ fontFamily: fontTitle, fontWeight: 700, fontSize: 48, color: "rgba(214,239,42,0.12)", lineHeight: 1, marginBottom: 16 }}>{b.num}</div>
              <p style={{ color: Z.white, fontFamily: fontBody, fontWeight: 600, fontSize: 15, marginBottom: 10, lineHeight: 1.5 }}>{b.title}</p>
              <p style={{ color: Z.muted, fontFamily: fontBody, fontSize: 14, lineHeight: 1.7 }}>{b.desc}</p>
            </Card>
          ))}
        </div>
      </>)}

      <Divider />

      {/* ── DOBRA 7: Bônus ────────────────────────────────────────────────── */}
      {section(<>
        {centerWrap(<>
          <SLabel>E vem com mais duas peças</SLabel>
          <h2 style={{ fontFamily: fontTitle, fontWeight: 700, fontSize: "clamp(22px, 3.5vw, 36px)", color: Z.white, lineHeight: 1.2, marginBottom: 8 }}>
            O checklist te dá a estrutura de execução.
          </h2>
          <p style={{ color: Z.muted, fontFamily: fontBody, fontSize: 15, marginBottom: 48 }}>
            Estas duas te dão o aprofundamento pra escalar e o formato pra usar sem fricção.
          </p>
        </>, 600)}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, maxWidth: 760, margin: "0 auto" }}>
          {bonuses.map((bonus, i) => (
            <Card key={i} highlight>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ color: Z.green, fontFamily: fontBody, fontWeight: 700, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" as const }}>{bonus.label}</span>
                <span style={{ color: Z.muted, fontFamily: fontBody, fontSize: 13, textDecoration: "line-through" }}>{bonus.price}</span>
              </div>
              <h3 style={{ fontFamily: fontTitle, fontWeight: 700, fontSize: 20, color: Z.white, marginBottom: 20, lineHeight: 1.3 }}>{bonus.title}</h3>
              <ul style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
                {bonus.items.map((item, j) => (
                  <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <GreenCheck />
                    <span style={{ color: Z.muted, fontFamily: fontBody, fontSize: 14, lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </>, Z.bgDeep)}

      <Divider />

      {/* ── DOBRA 8: Urgência ─────────────────────────────────────────────── */}
      {section(<>
        {centerWrap(<>
          <h2 style={{ fontFamily: fontTitle, fontWeight: 700, fontSize: "clamp(22px, 3.5vw, 36px)", color: Z.white, lineHeight: 1.2, marginBottom: 24 }}>
            Enquanto você monta do zero, tem operação rodando 3 lançamentos com a mesma estrutura
          </h2>
          <p style={{ color: Z.muted, fontFamily: fontBody, fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>
            Cada rodada ao vivo que depende 100% da agenda do expert é uma rodada que não escala. Operações de diferentes nichos já pararam de remontar o funil toda vez — elas gravaram uma vez e deixaram a estrutura rodar.
          </p>
          <div style={{ borderLeft: `3px solid ${Z.green}`, paddingLeft: 20, textAlign: "left" as const }}>
            <p style={{ color: Z.white, fontFamily: fontBody, fontWeight: 600, fontSize: 15, lineHeight: 1.7 }}>
              <strong style={{ color: Z.green }}>Isso muda quem sai na frente.</strong> Enquanto uma operação trava esperando o expert ficar livre de novo, outra já está captando público frio no automático. A pergunta não é se dá pra escalar — é quem vai fazer isso primeiro na sua concorrência.
            </p>
          </div>
        </>, 680)}
      </>)}

      <Divider />

      {/* ── DOBRA 9: Para quem é / não é ─────────────────────────────────── */}
      {section(<>
        {centerWrap(<>
          <SLabel>Prefiro ser direto agora</SLabel>
          <h2 style={{ fontFamily: fontTitle, fontWeight: 700, fontSize: "clamp(22px, 3.5vw, 36px)", color: Z.white, lineHeight: 1.2, marginBottom: 48 }}>
            Para quem é, e para quem não é
          </h2>
        </>, 520)}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, maxWidth: 840, margin: "0 auto" }}>
          <Card highlight>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <span style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(214,239,42,0.12)", border: `1px solid rgba(214,239,42,0.35)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Check size={13} color={Z.green} />
              </span>
              <span style={{ color: Z.white, fontFamily: fontBody, fontWeight: 700, fontSize: 14 }}>É para você se</span>
            </div>
            <ul style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
              {forYes.map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ color: Z.green, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ color: Z.muted, fontFamily: fontBody, fontSize: 14, lineHeight: 1.6 }}>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <span style={{ width: 26, height: 26, borderRadius: "50%", background: Z.grafite2, border: `1px solid ${Z.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={13} color={Z.muted} />
              </span>
              <span style={{ color: Z.muted, fontFamily: fontBody, fontWeight: 700, fontSize: 14 }}>Não é para você se</span>
            </div>
            <ul style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
              {forNo.map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ color: Z.muted, opacity: 0.5, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✕</span>
                  <span style={{ color: Z.muted, fontFamily: fontBody, fontSize: 14, lineHeight: 1.6 }}>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </>, Z.bgDeep)}

      <Divider />

      {/* ── DOBRA 10: Custo comparativo ───────────────────────────────────── */}
      {section(<>
        {centerWrap(<>
          <SLabel>Quanto custa montar essa estrutura sozinho?</SLabel>
          <h2 style={{ fontFamily: fontTitle, fontWeight: 700, fontSize: "clamp(22px, 3.5vw, 36px)", color: Z.white, lineHeight: 1.2, marginBottom: 48 }}>
            Não é sobre capacidade. É sobre as horas que faltam.
          </h2>
        </>, 600)}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, maxWidth: 760, margin: "0 auto 32px" }}>
          <Card>
            <p style={{ color: Z.muted, fontFamily: fontBody, fontWeight: 700, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: 20 }}>Por conta própria</p>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
              {[["mapear tudo do zero", "dias"], ["testar cada automação", "mais dias"], ["errar a sequência e refazer", "o gap real"], ["próximo lançamento já marcado", "tarde demais"]].map(([a, c]) => (
                <div key={a} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <span style={{ color: Z.muted, fontFamily: fontBody, fontSize: 13 }}>{a}</span>
                  <span style={{ color: Z.muted, fontFamily: fontBody, fontSize: 11, fontWeight: 600, background: Z.grafite2, padding: "3px 10px", borderRadius: 99, flexShrink: 0, opacity: 0.7 }}>{c}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card highlight>
            <p style={{ color: Z.green, fontFamily: fontBody, fontWeight: 700, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: 20 }}>Com o checklist</p>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
              {[["5 frentes mapeadas prontas pra copiar", "uma tarde"], ["automação já desenhada", "inclusa"], ["roteiro de CPL validado", "incluso"], ["tráfego pra público frio mapeado", "incluso"]].map(([a, c]) => (
                <div key={a} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <span style={{ color: Z.muted, fontFamily: fontBody, fontSize: 13 }}>{a}</span>
                  <span style={{ color: Z.dark, fontFamily: fontBody, fontSize: 11, fontWeight: 700, background: Z.green, padding: "3px 10px", borderRadius: 99, flexShrink: 0 }}>{c}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <p style={{ textAlign: "center", color: Z.muted, fontFamily: fontBody, fontSize: 14 }}>
          Você levaria dias pra montar e testar tudo isso sozinho. <strong style={{ color: Z.white }}>O checklist te entrega pronto pra copiar.</strong>
        </p>
      </>)}

      <Divider />

      {/* ── DOBRA 11: Oferta ──────────────────────────────────────────────── */}
      {section(<OfferBox />, Z.bgDeep)}

      <Divider />

      {/* ── DOBRA 12: Garantia ────────────────────────────────────────────── */}
      {section(<>
        {centerWrap(<>
          <div style={{
            display: "inline-flex", flexDirection: "column" as const, alignItems: "center", gap: 16,
            border: `1px solid rgba(214,239,42,0.25)`, borderRadius: 20, padding: "40px 48px",
          }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(214,239,42,0.1)", border: `1px solid rgba(214,239,42,0.3)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>
              🛡️
            </div>
            <h3 style={{ fontFamily: fontTitle, fontWeight: 700, fontSize: 28, color: Z.white, textAlign: "center" as const }}>Garantia de 7 dias</h3>
            <p style={{ color: Z.muted, fontFamily: fontBody, fontSize: 14, lineHeight: 1.8, maxWidth: 380, textAlign: "center" as const }}>
              Se o checklist não te der uma estrutura que você ainda não tinha pra copiar, é só pedir o reembolso dentro de 7 dias. Sem justificativa, sem constrangimento.
            </p>
          </div>
        </>)}
      </>)}

      <Divider />

      {/* ── DOBRA 13: Narrativa ───────────────────────────────────────────── */}
      {section(<>
        {centerWrap(<>
          <SLabel>Você já sabe lançar</SLabel>
          <h2 style={{ fontFamily: fontTitle, fontWeight: 700, fontSize: "clamp(22px, 3.5vw, 36px)", color: Z.white, lineHeight: 1.2, marginBottom: 32 }}>
            O problema não é esse.
          </h2>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 16, textAlign: "left" as const }}>
            {[
              "Você já rodou lançamento. Sabe fazer CPL, sabe configurar automação, sabe comprar tráfego.",
              "Mas toda vez que uma rodada nova começa, alguma coisa se repete: remontar a sequência de e-mail do zero, redefinir o fluxo de carrinho, esperar o expert ter uma janela livre pra gravar de novo.",
              "Não é falta de conhecimento. É que ninguém te deu o checklist de execução com as 257 decisões já mapeadas — só a teoria de como um lançamento gravado funciona.",
            ].map((p, i) => (
              <p key={i} style={{ color: Z.muted, fontFamily: fontBody, fontSize: 15, lineHeight: 1.8 }}>{p}</p>
            ))}
            <div style={{ borderLeft: `3px solid ${Z.green}`, paddingLeft: 20 }}>
              <p style={{ color: Z.white, fontFamily: fontBody, fontWeight: 600, fontSize: 15, lineHeight: 1.7 }}>
                Este checklist não é curso de lançamento, nem resumo de estratégia. É a estrutura de execução pronta pra copiar: o que fazer em cada uma das 7 fases, na ordem certa, sem remontar do zero.
              </p>
            </div>
          </div>
        </>, 640)}
      </>, Z.bgDeep)}

      <Divider />

      {/* ── DOBRA 14: Quem está por trás ─────────────────────────────────── */}
      {section(<>
        {centerWrap(<>
          <SLabel>Quem está por trás do método</SLabel>
          <h2 style={{ fontFamily: fontTitle, fontWeight: 700, fontSize: "clamp(22px, 3.5vw, 36px)", color: Z.white, lineHeight: 1.2, marginBottom: 4 }}>
            Luiz Filho
          </h2>
          <p style={{ color: Z.green, fontFamily: fontBody, fontWeight: 600, fontSize: 14, marginBottom: 48 }}>
            Fundador da Zion · Criador do Lançamento Múltiplo
          </p>
        </>, 560)}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32, maxWidth: 900, margin: "0 auto", alignItems: "start" }}>
          {/* Foto Luiz Filho — aguardando */}
          <ul style={{ display: "flex", flexDirection: "column" as const, gap: 16 }}>
            {[
              "Criador do Lançamento Múltiplo e fundador da Zion, uma das maiores agências de lançamentos digitais do Brasil",
              "Começou no digital em 2019, faturando múltiplos 8 dígitos em dropshipping e vendas diretas por WhatsApp",
              "Como gestor de tráfego, atendeu mais de 50 e-commerces e dezenas de lançamentos ao mesmo tempo — análise de dados, processos e leitura de funil viraram a base de tudo que ele constrói",
              "À frente da Zion, com um time de mais de 70 pessoas, comanda operações que faturaram mais de R$50 milhões nos últimos dois anos",
              "Hoje também é sócio e estrategista de operações como as de Pablo Marçal e Rapha Tarso",
            ].map((item, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <GreenCheck />
                <span style={{ color: Z.muted, fontFamily: fontBody, fontSize: 14, lineHeight: 1.7 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </>)}

      <Divider />

      {/* ── DOBRA 15: Repetição da oferta ────────────────────────────────── */}
      {section(<>
        <p style={{ textAlign: "center", color: Z.muted, fontFamily: fontBody, fontSize: 13, marginBottom: 24 }}>
          Checklist Lançamento Secreto + Aula de Lançamento Múltiplo + Trello do checklist
        </p>
        <OfferBox />
      </>, Z.bgDeep)}

      <Divider />

      {/* ── DOBRA 16: FAQ ─────────────────────────────────────────────────── */}
      {section(<>
        {centerWrap(<>
          <SLabel>Dúvidas</SLabel>
          <h2 style={{ fontFamily: fontTitle, fontWeight: 700, fontSize: "clamp(20px, 3vw, 32px)", color: Z.white, lineHeight: 1.2, marginBottom: 40 }}>
            Perguntas Frequentes
          </h2>
        </>, 560)}
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <FAQAccordion />
        </div>
      </>)}

      <Divider />

      {/* ── DOBRA 17: CTA Final ───────────────────────────────────────────── */}
      {section(<>
        {centerWrap(<>
          <h2 style={{ fontFamily: fontTitle, fontWeight: 700, fontSize: "clamp(22px, 3.5vw, 36px)", color: Z.white, lineHeight: 1.2, marginBottom: 16 }}>
            Se você quer parar de remontar tudo do zero e de depender da agenda do expert a cada lançamento
          </h2>
          <p style={{ color: Z.muted, fontFamily: fontBody, fontSize: 15, lineHeight: 1.8, marginBottom: 8 }}>
            e quer uma estrutura que capta e vende pra público frio no automático, este checklist é o seu ponto de partida.
          </p>
          <p style={{ color: Z.white, fontFamily: fontBody, fontWeight: 600, fontSize: 15, marginBottom: 32 }}>
            Baixe agora e copie a estrutura de lançamento gravado que vende no automático.
          </p>
          <CTAButton />
        </>, 600)}
      </>, Z.bgDeep)}

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: `1px solid ${Z.border}`, padding: "32px 24px", textAlign: "center" as const, background: Z.bgDeep }}>
        <p style={{ color: Z.muted, fontFamily: fontBody, fontSize: 13 }}>© 2026. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
