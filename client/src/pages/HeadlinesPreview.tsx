import { HEADLINES } from "@/lib/headlines";

export default function HeadlinesPreview() {
  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", padding: "48px 24px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
          Headlines — A/B Test Preview
        </h1>
        <p style={{ color: "#666", fontSize: 14, marginBottom: 48 }}>
          {HEADLINES.length} variações · Clique em "Ver ao vivo" para testar cada uma na página real.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {HEADLINES.map((h) => (
            <div
              key={h.id}
              style={{
                border: "1px solid #222",
                borderRadius: 12,
                padding: "28px 32px",
                background: "#111",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <span
                  style={{
                    background: "#1f1f1f",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 13,
                    padding: "3px 10px",
                    borderRadius: 6,
                    border: "1px solid #333",
                  }}
                >
                  #{h.id}
                </span>
                <span style={{ color: "#888", fontSize: 13 }}>{h.type}</span>
                <a
                  href={`/?headline=${h.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginLeft: "auto",
                    color: "#e04040",
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  Ver ao vivo →
                </a>
              </div>

              <p
                style={{
                  color: "#ffffff",
                  fontSize: 26,
                  fontWeight: 700,
                  lineHeight: 1.25,
                  margin: "0 0 10px 0",
                }}
              >
                {h.main}
              </p>
              <p
                style={{
                  color: "#e04040",
                  fontSize: 17,
                  fontWeight: 500,
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                {h.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
